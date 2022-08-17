import * as types from '../../redux/base/actionTypes'
import { handleActions } from 'redux-actions'

const initState = { 
  isAuthenticated: false,
  isGuest : false
}

const auth = handleActions({
  [types.SET_USER]: (state, { payload: { type } }) => {
    return {
       ...state, 
       ...type
    }
  },
  [types.RESET_USER] : () => initState
}, initState)

export default auth;


