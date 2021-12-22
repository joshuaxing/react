import React from '../react';
import ReactDOM from '../react-dom';
/*
let el2 = React.createElement("h1", {
  id: 'title'
}, React.createElement("span", null, "hello"), "world")
console.log(el2)
*/

/*
{
  "type": "h1",
  "props": {
    "className": "title",
    "children": [
      {
        "type": "span",
        "props": {
          "children": "hello"
        },
      },
      "world"
    ]
  },
}
*/

// props.children === 'object'
/*
let obj = {}

let test =(<div>{obj}</div>)
*/

let el = (<h1 className="title">
  <span style={{color: 'red'}}>hello</span>
  world
</h1>)

console.log(JSON.stringify(el, null, 2))

ReactDOM.render(
  el,
  document.getElementById('root')
);

