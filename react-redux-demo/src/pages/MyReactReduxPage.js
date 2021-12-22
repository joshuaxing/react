import React, { Component } from "react";
import { connect } from "../kReact-redux";
import { add, minus, asyAdd } from "../action/reactReduxPage";
class MyReactReduxPage extends Component {
  render() {
    console.log("props", this.props);
    const { counter, add, asyAdd} = this.props;
    return (
      <div>
        <h1>MyReactReduxPage</h1>
        <p>counter:{counter}</p>
        <button onClick={add}>add</button>
        <button onClick={asyAdd}>asyAdd</button>
      </div>
    );
  }
}
export default connect(
  state => {
    return { counter: state };
  },
  //mapDispatchToProps
  {
    add: add,
    asyAdd: asyAdd
  },
)(MyReactReduxPage);

