import { createStore, combineReducers } from "redux";

const initalLogin = {
  isLogin: false,
  name: null,
};
function loginReducer(state = { ...initalLogin }, action) {
  switch (action.type) {
    case "getUserInfo":
      return { ...state, isLogin: false, name: null };
    case "loginSuccess":
      return { ...state, isLogin: true, name: "xiaoming" };
    case "loginFailure":
      return { ...state, isLogin: false, name: null };
    case "Logout":
      return { ...state, isLogin: false, name: null };
    default:
      return state;
  }
}
const store = createStore(
  combineReducers({
    user: loginReducer,
  }),
);

export default store;
