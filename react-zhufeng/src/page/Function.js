/**
 * 实现函数组件以及属性
 */


import React from '../react';
import ReactDOM from '../react-dom';

function Welcome(props) {
  return (
    <div className='title' style={{ backgroundColor: 'green', color: 'red' }}>
      <h1>hello,{props.name}</h1>
      {props.children}
    </div>
  )
}

function App() {
  return (<Welcome name="world">
    早上好
  </Welcome>)
}


let el = (<Welcome name="world">
  早上好
</Welcome>)

let el2 = React.createElement(Welcome, {name: 'world'}, '早上好')
console.log(JSON.stringify(el2, (key, val) => {
  if (key === 'type') {
    return val.name
  } else {
    return val
  }
} , 2))

// 函数组件的vdom
/**
{
  $$typeof: Symbol(react.element)
  props: {name: 'world', children: '早上好'}
  ref: null
  type: ƒ Welcome(props)
}
 */

ReactDOM.render(
  el,
  document.getElementById('root')
);

