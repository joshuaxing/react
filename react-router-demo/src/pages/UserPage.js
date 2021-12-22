import React, { Component } from "react";
import { connect } from "react-redux";

class UserPage extends Component {
  render() {
    const { logout } = this.props;
    return (
      <div>
        <h1>UserPage</h1>
        <button onClick={logout}>logout</button>
      </div>
    );
  }
}

export default connect(
  state => state,
  {
    //mapDisaptchToProps
    logout: () => ({ type: "Logout" }),
  },
)(UserPage);
