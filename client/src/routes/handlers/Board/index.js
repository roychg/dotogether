import React from "react";
import BoardContainer from 'routes/containers/Board'
import flow from 'lodash/flow'
import withUser from "utils/hocs/withUser";
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux'

const BoardHandler = props => {
  const { auth, match, location } = props;
  if (!auth.isAuthenticated) return <Redirect to="/" />;
  else {
    if (match.params.bid === location.state.boardId)
      return <BoardContainer boardId={match.params.bid} boardType={location.state.boardType} {...props} />;
    return <Redirect to="/notfound" />;
  }
};

const mapState = state =>{
  // console.log(state) 
  return{

  }
}

export default flow(
  withUser,
  connect(mapState, null)
) (BoardHandler);
