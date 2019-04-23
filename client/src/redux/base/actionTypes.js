// Base actions
export const INIT_USER = 'INIT_USER'
export const INIT_BOARD = 'INIT_BOARD'
export const RESET_BOARD = "RESET_BOARD";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";


// Board actions
// this has to be changed
// from change_title => update_board
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = "UPDATE_BOARD";
export const REMOVE_BOARD = "REMOVE_BOARD";

// List actions
export const ADD_LIST = "ADD_LIST";
export const REORDER_LIST = "REORDER_LIST";
export const UPDATE_LIST = "UPDATE_LIST";

  // remove list


// Task actions
export const ADD_TASK = "ADD_TASK";
export const REORDER_TASK = "REORDER_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const SET_TASK = "SET_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
  // remove edit task

// Team actions
export const ADD_TEAM = "ADD_TEAM";
export const UPDATE_TEAM = "UPDATE_TEAM";
export const REMOVE_TEAM = "REMOVE_TEAM";
  // add team
  // remove team
  // edit team
  // add team memeber??

// User actions
  // logout 
  // show profile

  // Socket actions
  export const TO_SERVER = "TO_SERVER";