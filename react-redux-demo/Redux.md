## [Flux](https://www.ruanyifeng.com/blog/2016/01/flux.html) 是什么
  - Flux 是一种架构思想，专门解决软件的结构问题，它跟MVC架构是同一类东西
  - Flux将一个应用分成四个部分
    View(视图层) Store(数据层) Action(动作层)  dispatcher(派发器)
  - 特点：单向数据流
      - 用户访问 View
      - View 发出用户的 Action
      - Dispatcher 收到 Action，要求 Store 进行相应的更新
      - Store 更新后，发出一个"change"事件
      - View 收到"change"事件后，更新页面
## [Redux](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

### Redux 的设计思想很简单，就两句话
  - Web 应用是一个状态机，视图与状态是一一对应的
  - 所有的状态，保存在一个对象里面。
### 使用场景
  - 某个组件的状态，需要共享
  - 某个状态需要在任何地方都可以拿到
  - 一个组件需要改变全局状态
  - 一个组件需要改变另一个组件的状态
### 纯函数
  - 不得改写参数
  - 不能调用系统 I/O 的API
  - 不能调用Date.now()或者Math.random()等不纯的方法，因为每次会得到不一样的结果
### 用法
  - applyMiddleware
  - Store - createStore
  - State - store.getState()
  - Action - const action = {type: 'ADD_TODO',payload: 'Learn Redux'}
  - dispatch - store.dispatch()
  - Reducer - const reducer = function (state, action) { return new_state };
  - 多个Reducer - combineReducers
  - subscribe - store.subscribe()
```
import {createStore} from 'redux'
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'add':
    return state + 1
    case 'minus':
    return state - 1
    default:
    return state
  }
 }
const store = createStore(counterReducer)
export default store
```

### combineReducer实现
```
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {} 
    );
  };
};
```

### react-redux
 - Provider 为后代组件提供store
 - connect 为组件提供数据和变更⽅法(state映射和事件映射)
```
import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import store from './store/ReactReduxStore'
import { Provider } from 'react-redux'
store.subscribe(() => {

});
ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.querySelector('#root')
)

import { connect } from "react-redux";
const mapStateToProps = state => {
 return {
  num: state,
 };
};
const mapDispatchToProps = {
 add: () => {
   return { type: "add" };
 },
 minus: () => {
   return { type: "minus" };
 },
};
export default connect(
 mapStateToProps, //状态映射 mapStateToProps
 mapDispatchToProps, //派发事件映射
)(ReactReduxPage);

```
### 中间件（middleware）
- 中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
```
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}
```
### redux-promise
```
export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)
        ? action.then(dispatch)
        : next(action);
    }

    return isPromise(action.payload)
      ? action.payload.then(
          result => dispatch({ ...action, payload: result }),
          error => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          }
        )
      : next(action);
  };
}
```
