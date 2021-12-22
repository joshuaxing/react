function f1() {
  console.log("f1");
}
function f2() {
  console.log("f2");
}
function f3() {
  console.log("f3");
}
// f3(f2(f1()));
function compose(...funcs) {
  if (funcs.length === 0) {
    console.log("empty");
  } else if (funcs.length === 1) {
    return funcs[0];
  } else {
    return funcs.reduce((left, right) => 
      (...args) => right(left(...args))
    );
  }
}
compose(
  f1,
  f2,
  f3,
)();