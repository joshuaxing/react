// import React, { Component } from "react";
// import ReactDOM from "react-dom";

// import React from "./kreact/";
// import ReactDOM from "./kreact/ReactDOM";
import React from "./kkreact/";
import ReactDOM from "./kkreact/ReactDOM";
import "./index.css";

class ClassCmp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  handle = () => {
    this.setState({ counter: this.state.counter + 1 });
    this.setState({ counter: this.state.counter + 2 });
    // this.setState([{ counter: 100, msg: "omg" }]);

    console.log("counter", this.state);
  };
  render() {
    console.log("render", this.state);
    return (
      <div className="border">
        name:{this.props.name}
        <p>counter: {this.state.counter}</p>
        <button onClick={this.handle}>点击</button>
        {[0, 1, 2].map(item => {
          return <FuncCmp key={item} name={"我是function组件" + item} />;
        })}
      </div>
    );
  }
}

function FuncCmp(props) {
  return <div className="border">name:{props.name}</div>;
}

let jsx = (
  <div>
    <div className="border">我是内容</div>
    <FuncCmp name="我是function组件" />
    <ClassCmp name="我是class组件" />
  </div>
);
ReactDOM.render(jsx, document.getElementById("root"));
