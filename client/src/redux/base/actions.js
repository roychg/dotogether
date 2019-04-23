import { createAction } from 'redux-actions'
import * as types from './actionTypes'

// Action Creators

// Base
const initUser = createAction(types.INIT_USER)
const initBoard = createAction(types.INIT_BOARD)
const resetBoard = createAction(types.RESET_BOARD)
const setUser = createAction(types.SET_USER);
const resetUser = createAction(types.RESET_USER);
const emitServer = createAction(types.TO_SERVER, data=>data, ()=>({ server: true }))

export const base = {
         initUser,
         initBoard,
         setUser,
         resetUser,
         emitServer,
         resetBoard
       };

// Auth

export const auth = {  }

// Board
const addBoard = createAction(types.ADD_BOARD)
const updateBoard = createAction(types.UPDATE_BOARD);
const removeBoard = createAction(types.REMOVE_BOARD)
export const board = { updateBoard, addBoard, removeBoard };


// Task
const addTask = createAction(types.ADD_TASK)
const reorderTask = createAction(types.REORDER_TASK)
const updateTask = createAction(types.UPDATE_TASK);
const setTask = createAction(types.SET_TASK);
const removeTask = createAction(types.REMOVE_TASK);
export const task = { addTask, reorderTask, updateTask, setTask,removeTask };

// List
const addList = createAction(types.ADD_LIST)
const reorderList = createAction(types.REORDER_LIST)
const updateList = createAction(types.UPDATE_LIST);
export const list = { addList, reorderList, updateList };

// Team
const addTeam = createAction(types.ADD_TEAM)
const updateTeam = createAction(types.UPDATE_TEAM)
const removeTeam = createAction(types.REMOVE_TEAM)
export const team = { addTeam, updateTeam, removeTeam };

