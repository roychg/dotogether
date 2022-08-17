import axios from 'axios'
import { list as listActions } from "redux/base/actions";
import { base as baseActions } from "redux/base/actions";
import * as types from "redux/base/actionTypes";
import { norm_list } from "redux/base/normalize";
import { handleActions } from "redux-actions";
import produce from "immer";

const initState = {
  byId: [],
  lists: {}
};

const lists = handleActions(
  {
    [types.INIT_BOARD]: (state, { payload: { lists } }) => {
      return produce(state, draft => {
        draft.byId = lists.result;
        draft.lists = lists.entities.lists || {}
      });
    },
    [types.RESET_BOARD]: (state, action) => {
      return produce(state, draft => {
        draft.byId = [];
        draft.lists = {};
      });
    },
    [types.ADD_LIST]: (state, { payload: { result, entities: { lists } } }) => {
      return produce(state, draft => {
        draft.byId.push(result);
        draft.lists[result] = lists[result];
      });
    },
    [types.REORDER_LIST]: (state, { payload: { newArr, dragId, pos } }) => {
      // console.log("reorder list")
      return produce(state, draft => {
        draft.byId = newArr;
        draft.lists[dragId].pos = pos;
      });
    },
    [types.UPDATE_LIST]: (state, { payload: { result, entities: { lists } } }) => {
      return produce(state, draft => {
        draft.lists[result] = lists[result];
      });
    },
  },
  initState
);

export const add_list = listData => async dispatch => {
  // console.log('ADD_LIST REDUCER')
  let normalized;
  const { persist, boardType, ...rest } = listData;
  try {
    if (persist) {
      const res = await axios.post("/api/list", listData);
      if (res.status === 200) normalized = norm_list(res.data.added);
    } else {
      normalized = norm_list(rest);
    }
    // if (boardType === "personal") {
    //   dispatch(listActions.addList(normalized));
    // } else {
    //   dispatch(baseActions.emitServer(listActions.addList(normalized)));
    // }
    dispatch(baseActions.emitServer(listActions.addList(normalized)));

    // Return promise in order to close adder
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(false);
  }
}

export const update_list = listData => async dispatch => {
  // console.log("UPDATE_LIST REDUCER");
  let normalized;
  const { boardType, persist, ...rest  } = listData
  try {
    if(persist){
      const res = await axios.put(`/api/list/${rest.sid}`, listData)
      if(res.status === 200) normalized = norm_list(res.data.updated)
    }else{
      normalized = norm_list(rest)
    }
    dispatch(baseActions.emitServer(listActions.updateList(normalized)));
    // if (boardType === "personal") {
    //   dispatch(listActions.updateList(normalized));
    // } else {
    //   dispatch(baseActions.emitServer(listActions.updateList(normalized)));
    // }
  } catch (error) {
    console.log('err while updating a list ', error)
    return Promise.reject(false)
  }
}

export const post_reorder = listData => async dispatch => {
  const { id: listId  } = listData
  try {
    const res = await axios.put(`/api/list/${listId}`, listData)
    if(res.status === 200) return Promise.resolve(true)
  } catch (error) {
    console.log('err while reordering the list ', error)
    return Promise.reject(false)
  }
}


export const reorder_list = (srcIdx, destIdx, dragId, isDemo) => async (dispatch, getState) => {
  // console.log(getState())
  // console.log("REORDER_LIST REDUCER");
  const current = getState().boards.currentBoard
  const lists = getState().lists.lists
  const byId = getState().lists.byId.slice()

  let pos = 0;
  const moveLeft = srcIdx > destIdx ? true : false
  
  if(destIdx === 0){
    pos = lists[byId[destIdx]].pos / 2.0
  }
  else if(destIdx === byId.length-1){
    pos = lists[byId[destIdx]].pos + 65535.0
  }else{
    if(moveLeft){
      pos = (lists[byId[destIdx - 1]].pos + lists[byId[destIdx]].pos) / 2.0
    }else{
      pos = (lists[byId[destIdx + 1]].pos + lists[byId[destIdx]].pos) / 2.0;
    }
  }
  
  try{
    const newArr = await array_reorder(byId, srcIdx, destIdx)
    await dispatch(listActions.reorderList({newArr, dragId, pos}))
    dispatch(baseActions.emitServer(listActions.reorderList({ newArr, dragId, pos })));
    // console.log(newArr, dragId, pos)
    if (!isDemo) {
      await dispatch(post_reorder({ id: dragId, pos: pos }));
      if(current.type === 'team'){
        dispatch(baseActions.emitServer(listActions.reorderList({ newArr, dragId, pos })));
      }
    }
  }catch(err){
    console.log('err while reorder list ', err)
  }
}

const array_reorder = (arr, srcIdx, destIdx) => {
  let temp = arr;
  const [removed] = temp.splice(srcIdx,1)
  temp.splice(destIdx,0, removed)
  // console.log(temp)
  return temp
}

export default lists;
