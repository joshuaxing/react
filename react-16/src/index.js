// import React from "react";
// import ReactDOM from "react-dom";

// function App(props){
//   let [count,setCount] = useState(0)
//   return <div>
//     <h1>{props.title}</h1>
//     <p>{count}</p>
//     <button onClick={()=>setCount(count+1)}>add</button>
//   </div>
// }

// ReactDOM.render(<App title="开课吧" />, document.getElementById('root'))

/*

class Demo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      count:1
    }
  }
  handleClick = ()=>{
    this.setState({
      count:this.state.count+1
    })
  }
  render(){
    return <div>
      <h2 onClick={this.handleClick}>{this.state.count}</h2>
    </div>
  }
}
Demo = React.transfer(Demo)

function App(props){
  const [count, setCount] = React.useState(1)
  return <div id="container" className="red">
    <h1>{props.title}, {count}</h1>
    <button onClick={()=>setCount(count+1)}>??</button>
    <hr/>
    <Demo></Demo>
  </div>
}
let element = <App title="开课吧" />

*/

// import React from './kreact4'
// import React from "./yolkjs/index";
// const ReactDOM = React;
// let element = <div id="container">
//  <input value="foo" type="text" />
//  <a href="/bar">测试</a>
//  <span>开课吧</span>
// </div>

// function App(props){
//   return <div id="container" className="red">
//   <h1>{props.title}</h1>
//   <input value="foo" type="text" />
//   <a href="/bar">测试</a>
//   <span onClick={()=>alert(3)}>开课吧</span>
//   </div>
//  }

// function App(props) {
//   const [count, setCount] = React.useState(1);
//   return (
//     <div id="container" className="red">
//       <h1>{props.title}</h1>
//       <input value="foo" type="text" />
//       <a href="/bar">测试{count}</a>
//       <span onClick={() => {setCount(count+1)}}>开课吧</span>
//     </div>
//   );
// }

// let element = <App title="开课吧333" />;
// ReactDOM.render(element, document.getElementById("root"));


import React from './kreact1'
const ReactDOM = React
let element = <div id="container">
 <input value="foo" type="text" />
 <a href="/bar">测试</a>
 <span>开课吧</span>
</div>
ReactDOM.render(element, document.getElementById('root'))