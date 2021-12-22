import React from 'react';
import ReactDOM from 'react-dom';

let hookStates = [] // 保存状态的数组
let hookIndex = 0 // 索引

function useEffect(callback, dependencies) {
  console.log('useEffect-hookIndex', hookIndex)
  if (hookStates[hookIndex]) { // 说明不是第一次
    let lastDependencies = hookStates[hookIndex] 
    // 判断新的依赖的数组的每一项是否跟上一次完全相等
    let same = dependencies.every((item, index) => item === lastDependencies[index])
    if(same) {
      hookIndex++;
    } else { // 只要有一个依赖变量不一样的话
      hookStates[hookIndex++] = dependencies;
      // callback();
      setTimeout(callback)
    }
  } else {
    hookStates[hookIndex++] = dependencies;
    // callback();
    setTimeout(callback) // 添加一个宏任务
  }
}

function useLayoutEffect(callback, dependencies) {
  console.log('useLayoutEffect-hookIndex', hookIndex)
  if (hookStates[hookIndex]) { // 说明不是第一次
    let lastDependencies = hookStates[hookIndex] 
    // 判断新的依赖的数组的每一项是否跟上一次完全相等
    let same = dependencies.every((item, index) => item === lastDependencies[index])
    if(same) {
      hookIndex++;
    } else { // 只要有一个依赖变量不一样的话
      hookStates[hookIndex++] = dependencies;
      // callback();
      queueMicrotask(callback)
    }
  } else {
    hookStates[hookIndex++] = dependencies;
    // callback();
    queueMicrotask(callback) // 添加一个宏任务
  }
}



function Animation () {
 const red = React.useRef()
 const green = React.useRef();
 // 他会新增加一个微任务，主栈结束后，要先清空微任务，再进行浏览器渲染
useLayoutEffect(() => {
  red.current.style.transform = 'translate(500px)'
  red.current.style.transition = 'all 500ms'
 })
 useEffect(() => {
  green.current.style.transform = 'translate(500px)'
  green.current.style.transition = 'all 500ms'
 })
 let style = {width: '100px', height: '100px'}
  return (<div>
    <div style={{...style, backgroundColor: 'red'}} ref={red}></div>
    <div style={{...style, backgroundColor: 'green'}} ref={green}></div>
  </div>)
}

function render() {
  hookIndex = 0
  ReactDOM.render(
    <Animation />,
    document.getElementById('root')
  );
}

render()


