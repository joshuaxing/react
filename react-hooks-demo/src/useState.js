import React from 'react';
import ReactDOM from 'react-dom';

let hooksState = [] // 保存状态的数组
let hooksIndex = 0 // 索引
function useState(initState) {
  hooksState[hooksIndex] = hooksState[hooksIndex] || initState
  let currentIndex = hooksIndex;
  function setState(newState) {
    hooksState[currentIndex] = newState
    render()
  }
  return [hooksState[hooksIndex++], setState]
}

function Counter(){
  let [number, setNumber] = useState(0)
  let [number2, setNumber2] = useState(2)
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => setNumber(number+1)}>按钮</button>
      <br/>
      <p>{number2}</p>
      <button onClick={() => setNumber2(number2+1)}>按钮</button>
    </div>
  )
}

function render() {
  hooksIndex = 0
  ReactDOM.render(
    <Counter />,
    document.getElementById('root')
  );
}

render()


