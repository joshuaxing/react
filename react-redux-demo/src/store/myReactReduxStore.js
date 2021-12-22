import { createStore, applyMiddleware } from "../kRedux";

function counterRedcuer(state = 0, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
}
const store = createStore(counterRedcuer, applyMiddleware(logger, thunk));

export default store;


function logger({ dispatch, getState }) {
  return dispatch => action => {
    console.log(action.type + "执行了！");
    return dispatch(action);
  };
}

function thunk({ dispatch, getState }) {
  return (next) => {
    return (action) => {
      console.log(action)
      if (typeof action === "function") {
        return action(dispatch, getState);
      }
      return next(action);
    };
  }
}
