
import * as types from "redux/base/actionTypes";
import { handleActions } from "redux-actions";

const user = handleActions({
  [types.SET_USER]:(state, { payload: { user } }) => {
    return {
      ...user
    }
  },
  [types.RESET_USER]: () => null
}, {})



export default user;