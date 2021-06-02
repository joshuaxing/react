// import React from 'react'
// import ReactDOM from 'react-dom'

import ReactDOM from "./kreact/react-dom";
import Component from "./kreact/Component";

function FunComponent(props) {
  return <div>{props.name}渲染</div>;
}

class ClassComponent extends Component {
  render () {
    return <div>{this.props.name}渲染</div>;
  }
}

const element = (
  <div id="app">
    <h1 className="h1">实现React</h1>
    <p>createElement</p>
    <a href="https://www.baidu.com">跳转百度</a>
    <FunComponent name="函数组件" />
    <ClassComponent name="类组件" />
  </div>
);

ReactDOM.render(element, document.getElementById("root"));
