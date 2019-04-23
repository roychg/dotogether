import { combineReducers } from "redux";

import auth from "./auth";
import boards from "./boards";
import teams from "./teams";
import lists from "./lists";
import tasks from "./tasks";
import user from "./user";

const rootReducer = combineReducers({
  auth,
  boards,
  teams,
  lists,
  tasks,
  user
});

export default rootReducer;
