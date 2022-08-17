import axios from 'axios'
import { task as taskActions } from "redux/base/actions";
import { base as baseActions } from "redux/base/actions";
import * as types from "redux/base/actionTypes";
import { norm_task } from "redux/base/normalize";
import { handleActions } from "redux-actions";
import produce from "immer";

const initState = {
  byId: [],
  tasks: {},
  selected : null
};

const tasks = handleActions(
  {
    [types.INIT_BOARD]: (state, { payload: { tasks } }) => {
      return produce(state, draft => {
        draft.byId = tasks.result;
        draft.tasks = tasks.entities.tasks || {};
      });
    },
    [types.RESET_BOARD]: (state, action) => {
      return produce(state, draft => {
        draft.byId = [];
        draft.lists = {};
        draft.selected = null
      });
    },
    [types.ADD_TASK]: (state, { payload: { result, entities: { tasks } } }) => {
      return produce(state, draft => {
        draft.byId.push(result)
        draft.tasks[result] = tasks[result]
      });
    },
    [types.REORDER_TASK]: (state, { payload: { destId, dragId, pos }}) => {
      return produce(state, draft => {
        draft.tasks[dragId].lid = destId;
        draft.tasks[dragId].pos = pos;
      });
    },
    [types.SET_TASK]: (state, { payload }) => {
      return produce(state, draft => {
        draft.selected = payload ? draft.tasks[payload] : null;
      });
    },
    [types.UPDATE_TASK]: (state, { payload: { result, entities:{ tasks }} }) => {
      return produce(state, draft => {
        draft.tasks[result] = Object.assign({}, draft.tasks[result], tasks[result]);
        draft.selected = (draft.selected !== null) ? Object.assign({}, draft.selected, tasks[result]) : null
      })
    },
    [types.REMOVE_TASK]: (state, { payload: { taskId }} ) => {
      return produce(state, draft => {
        // draft.tasks[result] = Object.assign({}, draft.tasks[result], tasks[result]);
      })
    },
  },
  initState
);

export const add_task = taskData => async (dispatch) => {
  // console.log("ADD_TASK REDUCER");
  let normalized;
  // console.log(taskData)
  const { persist, boardType, ...rest } = taskData
  try {
   if (persist) {
     const res = await axios.post("/api/task", taskData);
     if(res.status === 200) normalized = norm_task(res.data.added)
   } else {
     normalized = norm_task(rest)
   }
   dispatch(baseActions.emitServer(taskActions.addTask(normalized)));
   if(boardType === 'personal'){
    dispatch(taskActions.addTask(normalized))
   }else{
    dispatch(baseActions.emitServer(taskActions.addTask(normalized)));
   }
  //  console.log(normalized)
   return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(false)
  }
}


// Post reorder
export const post_reorder = taskData => async dispatch => {
  const { id: taskId } = taskData;
  try {
    const res = await axios.put(`/api/task/${taskId}`, taskData);
    if(res.status === 200) return Promise.resolve(true)
  } catch (error) {
    console.log('err while reordering the task ', error)
    return Promise.reject(false)
  }
}

// Reorder same
export const reorder_task_same = (src, dest, dragId, byId, isDemo) => async (dispatch, getState) => {
  // console.log("REORDER_TASK_SAME REDUCER");
  const current = getState().boards.currentBoard
  const tasks = getState().tasks.tasks
  const { index: srcIdx } = src
  const { index: destIdx , droppableId:destId } = dest
  const moveUp = srcIdx > destIdx ? true : false 
  let pos = 0, targetPos = 0;
  if(destIdx === 0) {
    pos = (tasks[byId[destIdx]].pos) / 2.0
  }else if(destIdx === byId.length - 1) { 
    pos = (tasks[byId[destIdx]].pos) + 65535.0
  }
  else {
    if(moveUp){
      targetPos = tasks[byId[destIdx-1]].pos
    }else{
      targetPos = tasks[byId[destIdx+1]].pos
    }
    pos = (targetPos + tasks[byId[destIdx]].pos)/2.0
  }

  try {
    dispatch(baseActions.emitServer(taskActions.reorderTask({ dragId, destId, pos })));
    dispatch(taskActions.reorderTask({dragId, destId, pos}))
    if (!isDemo) {
      await dispatch(post_reorder({ id: dragId, pos: pos, lid: destId }));
      if (current.type === "team") {
        dispatch(baseActions.emitServer(taskActions.reorderTask({ dragId, destId, pos })));
      }
    }
  } catch (err) {
    console.log("err while reorder list ", err);
  }

}

// Reorder diff
export const reorder_task_diff = (src, dest, dragId, byId, isDemo) => async (dispatch, getState) => {
  // console.log("REORDER_TASK_DIFF REDUCER");
  const current = getState().boards.currentBoard;
  const tasks = getState().tasks.tasks;
  const { index: destIdx, droppableId: destId } = dest;
  let pos = 0;
  if(byId.length === 0){
    pos = 16358.0;
  }else{
    if(destIdx === 0){
      pos = tasks[byId[destIdx]].pos / 2.0;
    }else if(destIdx === byId.length){
      pos = tasks[byId[destIdx-1]].pos + 65535.0;
    }else{
      pos = (tasks[byId[destIdx-1]].pos + tasks[byId[destIdx]].pos)/2.0
    }
  }
  
  try {
    dispatch(taskActions.reorderTask({ dragId, destId, pos }));
    dispatch(baseActions.emitServer(taskActions.reorderTask({ dragId, destId, pos })));
    if (!isDemo) {
      await dispatch(post_reorder({ id: dragId, pos: pos, lid: destId }));
      if (current.type === "team") {
        dispatch(baseActions.emitServer(taskActions.reorderTask({ dragId, destId, pos })));
      }
    }
  } catch (err) {
    console.log("err while reorder list ", err);
  }
}

export const set_task = (taskId) => async dispatch => {
  // console.log("SET_TASK REDUCER");
  dispatch(taskActions.setTask(taskId))
}

export const update_task = taskData => async dispatch => {
  // console.log('UPDATE_TASK REDUCER')
  let normalized;
  const { persist, boardType, ...rest } = taskData;
  try {
    if (persist) {
      const res = await axios.put(`/api/task/${rest.sid}`, taskData);
      if (res.status === 200) normalized = norm_task(res.data.updated);
    } else {
      normalized = norm_task(rest);
    }
    if (boardType === "personal") {
      dispatch(taskActions.updateTask(normalized));
    } else {
      dispatch(baseActions.emitServer(taskActions.updateTask(normalized)));
    }
    dispatch(baseActions.emitServer(taskActions.updateTask(normalized)));
    return Promise.resolve(true);
  } catch (error) {
    return Promise.reject(false);
  }
}

export const remove_task = (taskId, taskData) => async dispatch => {
  // console.log('task remove clicked , ', taskId, taskData)
  let preCheck = false
  const { persist, boardType } = taskData
  try {
    if (persist) {
      const res = await axios.delete(`/api/task/${taskId}`);
      if(res.status === 200) preCheck = true
    }else{
      preCheck = true
    }
    if(preCheck){
      if (boardType === "personal") {
        dispatch(taskActions.removeTask({taskId: taskId}));
      } else {
        dispatch(baseActions.emitServer(taskActions.removeTask({taskId:taskId})));
      }
    }
    return Promise.resolve({success: preCheck, message:'task is being used by others. try again later'});
  } catch (error) {
    console.log('err while remove task', error)
    return Promise.reject(false)
  }
}

export default tasks;
