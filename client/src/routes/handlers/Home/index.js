import React from "react";
import withUser from "utils/hocs/withUser";
import { Redirect } from "react-router-dom";
import HomeContainer from '../../containers/Home'

const HomeHandler = ({ auth, user, match }) => {
  if(!auth.isAuthenticated) return <Redirect to='/' />
  else{
    if(match.params.username === user.username) return <HomeContainer user={user}/>
    return <Redirect to='/invalidpath' />
  }
};

export default withUser(HomeHandler);
