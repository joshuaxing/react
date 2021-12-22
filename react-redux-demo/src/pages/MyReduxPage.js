import React, { Component } from "react";
import store from "../store/myReduxStore";

export default class MyReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
      // this.setState({});
    });
  }
  asyAdd = () => {
    store.dispatch(dispatch => {
      setTimeout(() => {
        dispatch({ type: "add" });
      }, 1000);
    });
  };
  render() {
    return (
      <div>
        <h1>MyReduxPage</h1>
        <p>counter:{store.getState()}</p>
        <button onClick={() => store.dispatch({ type: "add" })}>add</button>
        <button onClick={() => store.dispatch({ type: "minus" })}>minus</button>
        <button onClick={this.asyAdd}>asyAdd</button>
      </div>
    );
  }
}
