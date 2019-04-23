import React from 'react';
import Layout from 'components/Layout'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from 'redux/modules/base'

const Protected = ({ component: Component, user, logout, home, ...rest }) => {
  return (
    <Layout user={user} handleLogout={logout} home={home} {...rest}>
      <Route {...rest} render={props => <Component {...props} user={user}/>}/>
    </Layout>
  )
}

const mapState = ({ user }) => ({
  user: user 
})

export default connect( 
  mapState, { logout }
)(Protected)