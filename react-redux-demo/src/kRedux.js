export function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let currentState = undefined;
  let currentListeners = []
  function getState() {
    return currentState
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.map(cb => cb())
  }

  function subscribe(listener) {
    currentListeners.push(listener)
  }
  dispatch({ type: "@IMOOC/KKB-REDUX" });
  return {
    getState,
    dispatch,
    subscribe
  }
}

export function applyMiddleware(...middleware) {
  return (createStore) => {
    return (...arg) => {
      const store = createStore(...arg)
      const mdApi = {
        dispatch: store.dispatch,
        getState: store.getState
      }
      const chain = middleware.map(mw => mw(mdApi))
      const dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch: dispatch
      }
    }
  }
}

function compose(...fnc) {
  const len = fnc.length
  if (len === 0) {
    return arg => arg
  } else if (len === 1) {
    return fnc[0]
  }
  return fnc.reduce((left, right) => {
    return (...arg) => {
      return right(left(...arg))
    }
  })
}
