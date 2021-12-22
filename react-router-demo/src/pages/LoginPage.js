import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class LoginPage extends Component {
  render() {
    const { isLogin, login, location } = this.props;
    const to = location.state.redirect || "/";
    if (isLogin) {
      return <Redirect to={to} />;
    }
    return (
      <div>
        <h1>LoginPage</h1>
        <button onClick={login}>login</button>
      </div>
    );
  }
}

export default connect(
  //mapStateToProps
  state => ({ isLogin: state.user.isLogin }),
  //mapDispatchToProps
  {
    login: () => ({
      type: "loginSuccess",
    }),
  },
)(LoginPage);
