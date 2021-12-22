import React, { Component } from "react";
import { connect } from "react-redux";
import { add, minus, asyAdd } from "../action/reactReduxPage";

class ReactReduxPage extends Component {
  render() {
    const { counter, add, minus, asyAdd } = this.props;
    console.log("omg", this.props);
    return (
      <div>
        <h1>ReactReduxPage</h1>
        <p>counter:{counter}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
        <button onClick={asyAdd}>asyAdd</button>
      </div>
    );
  }
}

export default connect(
  //mapStateToProps
  state => {
    console.log("state", state);
    return { counter: state.counter };
  },
  //mapDispatchToProps
  {
    add,
    minus,
    asyAdd,
  },
)(ReactReduxPage);
