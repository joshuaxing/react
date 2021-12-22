import React, { Component } from "react";
import store from "../store/reduxStore";

export default class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
      // this.setState({});
    });
  }
  render() {
    return (
      <div>
        <h1>ReduxPage</h1>
        <p>counter:{store.getState()}</p>
        <button onClick={() => store.dispatch({ type: "add" })}>add</button>
        <button onClick={() => store.dispatch({ type: "minus" })}>minus</button>
      </div>
    );
  }
}
