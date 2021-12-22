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
    callback();
    }
  } else {
    hookStates[hookIndex++] = dependencies;
    callback();
  }
}


function useMemo(factory, dependencies) {
  console.log('useMemo-hookIndex', hookIndex)
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

function App () {
  const [name, setName] = useState('');
  const [number, setNumber] = useState(0);
  
  useEffect(() => {
    document.title = number;
    console.log(number)
  }, [number])

  return (<div>
    <input value={name} onChange={(e) => setName(e.target.value)}/>
    <button onClick={() => setNumber(number+1)}> 按钮</button>
  </div>)
}

function render() {
  hookIndex = 0
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render()


