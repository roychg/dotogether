import axios from 'axios'
import { base as baseActions } from 'redux/base/actions'
import { norm_lists, norm_tasks, norm_boards, norm_teams } from 'redux/base/normalize'
import { getFirstLetter } from 'utils/helpers'

// Initialize user data
export const init_user_data = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${userId}`)
    if(res.status === 200) {
      // console.log(res.data)
      const { boards, teams } = res.data.init[0]
      const payload = { 
        boards:  norm_boards(boards),
        teams : norm_teams(teams)
      }
      // console.log(payload)
      dispatch(baseActions.initUser(payload));
    }
  } catch (error) {
    console.log('err while getting user data ' , error)
  }
}

// Initiailize board data
export const init_board = (boardId) => async dispatch => {
  try {
    const res = await axios.get(`/api/board/${boardId}`);
    if(res.status === 200){
      const { lists , tasks, ...rest } = res.data.board[0]
      const payload = { 
        board:{...rest},
        lists:norm_lists(lists),
        tasks:norm_tasks(tasks)
      }
      dispatch(baseActions.initBoard(payload))
    }
  } catch (error) {
    console.log('err while getting user data ' , error)
  }
}


// Validate User
export const validate_user = () => async dispatch => {
  try {
    const res = await axios.post("/api/user/validate");
    if (res.status === 200) {
      const payload = {
        user: res.data.user,
        type: { isAuthenticated: true }
      };
      localStorage.setItem("_first", getFirstLetter(payload.user.username));
      dispatch(baseActions.setUser(payload));
    }
  } catch (error) {
    dispatch(baseActions.resetUser());
    return Promise.reject(false);
  }
}

// Set user as a guest
export const enter_guest = () => async dispatch => {
  const payload = {
    user: { id: "guest_1", username: "guest" },
    type: { isGuest: true }
  };
  localStorage.setItem("_first", getFirstLetter(payload.user.username));
  dispatch(baseActions.setUser(payload));
};

// Reset user
export const reset_user = () => async dispatch => {
  localStorage.clear()
  dispatch(baseActions.resetUser());
};


// Logout
export const logout = (history) => async dispatch => {
  await axios.post("/api/user/logout");
  history.replace('/')
  dispatch(baseActions.resetUser());
};

export const join_board = boardId => async dispatch =>{ 
  dispatch(baseActions.emitServer({type:'JOIN', room: boardId}))
}

export const leave_board = () => async dispatch =>{ 
  dispatch(baseActions.emitServer({type:'LEAVE'}))
}

export const reset_board = () => async dispatch => {
  dispatch(baseActions.resetBoard());
}