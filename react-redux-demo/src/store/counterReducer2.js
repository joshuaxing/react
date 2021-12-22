export default function counterRedcuer2(state = 0, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    //return {...state, action.payload}
    case "minus":
      return state - 1;
    default:
      return state;
  }
}
