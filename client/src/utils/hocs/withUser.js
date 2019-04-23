import React, { Component } from "react";
import { connect } from "react-redux";
import { validate_user } from "redux/modules/base";
import { withRouter } from "react-router-dom";
import Loading from "components/Loading";

export default WrappedComponent => {
  class withUser extends Component {
    state = {
      isValidating: !this.props.auth.isAuthenticated
    };

    componentDidMount = async () => {
      if (this.state.isValidating) {
        try {
          // console.log('withUser!! validaing!')
          await this.props.validate_user();
          this.setState({ isValidating: false });
        } catch (error) {
          this.props.history.replace('/')
        }
      }
    };

    componentWillUnmount = () => {
      // console.log("withUser WILL UNMOUNT");
    };

    render() {
      // console.log("withUser props ", this.props);
      if (this.state.isValidating) return <Loading />;
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapState = ({ auth }) => ({ auth });

  return withRouter(
    connect(
      mapState,
      { validate_user }
    )(withUser)
  );
};
