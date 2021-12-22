import React, { Component } from "react";

/* function counterRedcuer(state = 0, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    default:
      return state;
  }
} */

/* const a = [1, 2, 3, 4];
const reducer = (sum, currentValue) => {
  return sum + currentValue;
}; 
console.log(a.reduce(reducer, 0));
*/

function f1() {
  console.log("f1");
}
function f2() {
  console.log("f2");
}
function f3() {
  console.log("f3");
}

/* f1();
f2();
f3(); */

//f3(f2(f1()));
compose(
  f1,
  f2,
  f3,
)();

function compose(...funcs) {
  const len = funcs.length;
  if (len === 0) {
    return arg => arg;
  }
  if (len === 1) {
    return funcs[0];
  }
  return funcs.reduce((left, right) => (...args) => right(left(...args)));
}
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>HomePage</h1>
      </div>
    );
  }
}
