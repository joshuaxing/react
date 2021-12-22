import React from 'react';
import ReactDOM from 'react-dom';

let CounterContext = React.createContext()

function useContext(context) {
  console.log(context)
  return context._currentValue
}


function Counter() {
  let {state, setState} = useContext(CounterContext)
  return(<div>
    {state.number}
    <br/>
    <button onClick={() => setState({number: state.number+1})}>+</button>
  </div>)
}

function Counter2() {
  return (<CounterContext.Consumer>
    {
      ctx => (
        <div>
          <p>{ctx.state.number}</p>
          <br/>
          <button onClick={() => ctx.setState({
            number: ctx.state.number+1
          })}>+</button>
        </div>
      )
    }
  </CounterContext.Consumer>)
}


function App () {
  const [state, setState] = React.useState({number: 0})
  return (<CounterContext.Provider value={{state, setState}}>
    <Counter/>
    <Counter2/>
  </CounterContext.Provider>)
}

function render() {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
}

render()


