import axios from 'axios'
import { team as teamActions } from "redux/base/actions";
import * as types from "redux/base/actionTypes";
import { norm_team } from "redux/base/normalize";
import { handleActions } from "redux-actions";
import produce from "immer";

const initState = {
  byId: [],
  teams: {}
};

const teams = handleActions(
  {
    [types.INIT_USER]: (state, { payload: { teams } }) => {
      // console.log(teams);
      return produce(state, draft => {
        draft.byId = teams.result;
        draft.teams = teams.entities.teams || {};
      });
    },
    [types.ADD_TEAM]: (state, { payload: { result, entities: { teams } } }) => {
      return produce(state, draft => {
        draft.byId.push(result);
        draft.teams[result] = teams[result]
      });
    },
    [types.UPDATE_TEAM]: (state, { payload: { result, entities: { teams } } }) => {
      return produce(state, draft => {
        draft.teams[result] = teams[result];
      });
    },
    [types.REMOVE_TEAM]: (state, { payload: { teamId }}) => {
      return produce(state, draft => {
        draft.byId.splice(draft.byId.findIndex(id => id === teamId),1);
        delete draft.teams[teamId]
      });
    }
  },
  initState
);


export const add_team = teamData => async dispatch => {
  // console.log(teamData)
  try {
    const res = await axios.post('/api/team', teamData)
    if(res.status === 200) dispatch(teamActions.addTeam(norm_team(res.data.added)))
  } catch (error) {
    console.log('err while adding a team ', error)
    return Promise.reject(false)
  }
}

export const update_team = teamData => async dispatch => {
  const { id: teamId } = teamData
  try {
    const res = await axios.put(`/api/team/${teamId}`, teamData)
    if(res.status === 200) dispatch(teamActions.updateTeam(norm_team(res.data.updated)))
  } catch (error) {
    console.log('err while updating the team ', error)
  }
}

export const remove_team = teamId => async dispatch => {
  try {
    const res = await axios.delete(`/api/team/${teamId}`)
    if(res.status === 200) dispatch(teamActions.removeTeam({teamId: teamId}))
  } catch (error) {
    console.log('err while removing team ', error)
  }
}

export default teams;
