import React from 'react';
import ReactDOM from 'react-dom';

let hookStates = [] // 保存状态的数组
let hookIndex = 0 // 索引
function useState(initState) {
  console.log('useState-hookIndex', hookIndex)
  hookStates[hookIndex] = hookStates[hookIndex] || initState
  let currentIndex = hookIndex;
  function setState(newState) {
    hookStates[currentIndex] = newState
    render()
  }
  
  return [hookStates[hookIndex++], setState]
}

function useCallback(callback, dependencies) {
  console.log('useCallback-hookIndex', hookIndex)
  if (hookStates[hookIndex]) { // 说明不是第一次
    let [lastCallback, lastDependencies] = hookStates[hookIndex] 
    // 判断新的依赖的数组的每一项是否跟上一次完全相等
    let same = dependencies.every((item, index) => item === lastDependencies[index])
    if(same) {
      hookIndex++;
      return lastCallback;
    } else { // 只要有一个依赖变量不一样的话
      hookStates[hookIndex++] = [callback, dependencies]
      return callback;
    }
  } else {
    hookStates[hookIndex++] = [callback, dependencies]
    return callback;
  }
}


function useMemo(factory, dependencies) {
  if (hookStates[hookIndex]) { // 说明不是第一次
    let [lastMemo, lastDependencies] = hookStates[hookIndex] 
    // 判断新的依赖的数组的每一项是否跟上一次完全相等
    let same = dependencies.every((item, index) => item === lastDependencies[index])
    if(same) {
      hookIndex++;
      return lastMemo;
    } else { // 只要有一个依赖变量不一样的话
      const newMemo = factory()
      hookStates[hookIndex++] = [newMemo, dependencies]
      return newMemo;
    }
  } else {
    const newMemo = factory()
    hookStates[hookIndex++] = [newMemo, dependencies]
    return newMemo;
  }
}

function memo(OldComp) {
  return class extends React.PureComponent{
    render() {
      return <OldComp {...this.props}/>
    }
  }
}

let Child = ({data, changeNumber}) => {
  console.log('Child render')
  return <div>
    <p>{data.number}</p>
    <button onClick={changeNumber}>按钮</button>
  </div>
}

Child = memo(Child)

let Child2 = ({data, changeNumber}) => {
  console.log('Child2 render')
  return <div>
    <p>{data.number2}</p>
    <button onClick={changeNumber}>按钮2</button>
  </div>
}

Child2 = React.memo(Child2)

function App () {
  console.log('app render')
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  const [number2, setNumber2] = useState(2);

  // let data = {
  //   number
  // }

  let data = useMemo(() => {
    return {number}
  }, [number])

  let data2 = useMemo(() => {
    return {number2}
  }, [number2])
  
  // function changeNumber () {
  //   setNumber(number+1)
  // }

  let changeNumber = useCallback(() => setNumber(number+1), [number])

  let changeNumber2 = useCallback(() => setNumber2(number2+1), [number2])
  console.log(hookIndex)
  console.log(hookStates)

  return (<div>
    <input value={name} onChange={(e) => setName(e.target.value)}/>
    <br/>
    <Child data={data} changeNumber={changeNumber}/>
    <Child2 data={data2} changeNumber={changeNumber2}/>
  </div>)
}

function render() {
  hookIndex = 0
  console.log('fn render')
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render()


