import React, { Component, lazy, Suspense } from 'react';
// import Home from '../pages/Home'
import { connect } from 'react-redux'
import { init_user_data } from 'redux/modules/base'
import Loading from 'components/Loading'
const Home = lazy(() => import('../pages/Home'))


class HomeContainer extends Component {
  state = {  }

  _init = async () => {
    await this.props.init_user_data(this.props.user.id)
  }

  componentDidMount = () => {
    this._init()
  }


  render() {
    const { user_data } = this.props
    return (
      <Suspense fallback={<Loading />}>
        <Home init={user_data}/>
      </Suspense>
    );
  }
}


const mapState = ({ user, teams, boards }) => {
  return { 
    user_data : {
      user,
      teams,
      boards
    }
  }
}
export default connect(
  mapState, { init_user_data } 
)(HomeContainer)