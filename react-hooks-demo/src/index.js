import React from 'react';
import ReactDOM from 'react-dom';

let hookStates = [] // 保存状态的数组
let hookIndex = 0 // 索引
function useState(initState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initState
  let currentIndex = hookIndex;
  function setState(newState) {
    if (typeof newState === 'function') {
      newState = newState(hookStates[currentIndex])
    }
    hookStates[currentIndex] = newState
    render()
  }
  return [hookStates[hookIndex++], setState]
}

function useEffect(callback, dependencies) {
  if (hookStates[hookIndex]) { // 说明不是第一次
    let [oldDestroy, lastDependencies] = hookStates[hookIndex]
    // 判断新的依赖的数组的每一项是否跟上一次完全相等
    let same = dependencies.every((item, index) => item === lastDependencies[index])
    if(same) {
      hookIndex++;
    } else { // 只要有一个依赖变量不一样的话
      oldDestroy();
      const destroy = callback();
      hookStates[hookIndex++] = [destroy, dependencies];
    }
  } else {
    const destroy = callback();
    hookStates[hookIndex++] = [destroy, dependencies];
  }
}

function App () {
  const [number, setNumber] = useState(0);
  useEffect(() => {
    console.log('useEffect-render')
    let timer = setInterval(() => {
      setNumber(state => state+1)
    }, 1000)
    return () => {
      console.log('销毁')
      clearInterval(timer)
    }
  }, [number])

  return (<div>
    <button onClick={() => setNumber(number+1)}>按钮</button>
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


