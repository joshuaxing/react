import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    const { component: Cmp, isLogin, ...rest } = this.props;
    console.log("PrivateRoute", this.props);
    return (
      <Route
        {...rest}
        render={props => {
          return isLogin ? (
            <Cmp {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { redirect: this.props.location.pathname },
              }}
            />
          );
        }}
      />
    );
  }
}

export default connect(state => ({ isLogin: state.user.isLogin }))(
  PrivateRoute,
);
