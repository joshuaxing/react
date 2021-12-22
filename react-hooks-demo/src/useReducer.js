import React from 'react';
import ReactDOM from 'react-dom';

let hookStates = []
let hookIndex = 0

function useReducer(reducer, initState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initState
  let currentIndex = hookIndex
  function dispatch(action) {
    hookStates[currentIndex] = reducer ? reducer((hookStates[currentIndex]), action) : action
    render()
  }
  return [hookStates[hookIndex++], dispatch]
}

function useState(initState) {
  return useReducer(null, initState) 
}

function counterReducer(state, action) {
  switch(action.type) {
    case 'add':
      return state+1
    default:
      return state
  }
}


function Counter() {
  let [state, dispatch] = useReducer(counterReducer, 22)
  return(<div>
    {state}
    <br/>
    <button onClick={() => dispatch({type: 'add'})}>+</button>
  </div>)
}

function Counter2() {
  let [number, setNumber] = useState(66)
  return(<div>
    {number}
    <br/>
    <button onClick={() => setNumber(number+1)}>+</button>
  </div>)
}

function render() {
  hookIndex = 0
  ReactDOM.render(
    <div>
      <Counter />
      <Counter2/>
    </div>,
    document.getElementById('root')
  );
}

render()


