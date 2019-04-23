import axios from 'axios'
import { board as boardActions } from "redux/base/actions";
import { base as baseActions } from "redux/base/actions";
import * as types from "redux/base/actionTypes";
import { norm_board } from "redux/base/normalize";
import { handleActions } from "redux-actions";
import produce from "immer";

const initState = {
  teamIds:[],
  personalIds:[],
  teams:{},
  personals:{},
  currentBoard: {}
};

const boards = handleActions(
  {
    [types.INIT_USER]: (state, { payload: { boards } }) => {
      return produce(state, draft => {
        draft.teamIds = boards.result.filter(info => info.schema === 'teams');
        draft.personalIds = boards.result.filter(info => info.schema === 'personals');
        draft.personals = boards.entities.personals || {};
        draft.teams = boards.entities.teams || {};
      });
    },
    [types.INIT_BOARD]: (state, { payload: { board } }) => {
      return produce(state, draft => {
        draft.currentBoard = board;
      });
    },
    [types.RESET_BOARD]: (state, action) => {
      return produce(state, draft => {
        draft.currentBoard = {};
      });
    },
    [types.UPDATE_BOARD]: (state, { payload: { updated } }) => {
      return produce(state, draft => {
        draft.currentBoard = updated;
      });
    },
    [types.ADD_BOARD]: (state, { payload: { type, result, entities: { board }}}) => {
      const boardId = type === 'team' ? `${result}@${board[result].teamId}` : result;
      // console.log(boardId)
      return produce(state, draft => {
        draft[`${type}Ids`].push({id:boardId, schema:`${type}s`});
        draft[`${type}s`][`${boardId}`] = board[result];
      });
    },
    [types.REMOVE_BOARD]: (state, { payload: { type, boardId }}) => {
      // console.log(type, boardId)
      return produce(state, draft => {
        draft[`${type}Ids`].splice(draft[`${type}Ids`].findIndex(board => board.id === boardId),1);
        delete draft[`${type}s`][`${boardId}`];
      });
    }
  },
  initState
);

export const update_board = boardData => async dispatch => {
  // console.log('hha ', boardData)
  let updated;
  const { persist, board } = boardData
  try {
    if(persist){
      const res = await axios.put(`/api/board/${board.sid}`, board)
      if(res.status === 200) updated = res.data.updated 
    }
    else{
      updated = {...board}
    }
    if(board.type === 'personal'){
      dispatch(boardActions.updateBoard({ updated }))
    }else{
      dispatch(baseActions.emitServer(boardActions.updateBoard({ updated })));
    }
  } catch (error) {
    console.log('err while changing the title ', error)
  }
}

export const add_board = (boardType, boardData) => async dispatch => {
  try {
    const res = await axios.post('/api/board', boardData)
    if(res.status === 200) {
      const normalized = norm_board(res.data.added)
      normalized.type = boardType
      dispatch(boardActions.addBoard(normalized))
    }
  } catch (error) {
    console.log('err while adding a board ', error)
  }
}

export const remove_board = (type, boardId) => async dispatch => {
  const id = boardId.split('@')[0]
  const boardType = type === 'personals' ? 'personal' : 'team'
  try {
    const res = await axios.delete(`/api/board/${id}`)
    if(res.status === 200) {
      dispatch(boardActions.removeBoard({ type: boardType, boardId }))
    }
  } catch (error) {
    console.log('err while removing the board ', error)
  }
}

export default boards;
