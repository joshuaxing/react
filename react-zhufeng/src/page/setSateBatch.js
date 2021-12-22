/**
 * 合成事件和批量更新
 * 1. 在React里，事件的更新可能是异步的，是批量的，不是同步的
 * 调用state之后状态并没有立即更新，而是先缓存起来
 * 等到事件函数处理完成后，再进行批量更新，一次更新并重新渲染
 * 因为jsx事件处理的是react控制的，只要归react控制的就是批量，只要不归react惯了，就是非批量
 */

import React from './react';
import ReactDOM from './react-dom';
import {updateQueue} from './Component';
// handleClick2 console.log()结果
/**
a 0
b 0
callback1 2
callback2 2
callback3 3
c 3
callback4 4
d 4
*/
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0
    }
  }
  handleClick = () => {
    updateQueue.isBatchingUpdate = true
    this.setState({
      number: this.state.number + 1
    }, () => {
      console.log('callback1',this.state.number)
    })
    console.log('a',this.state.number)
    this.setState({
      number: this.state.number + 1
    }, () => {
      console.log('callback2',this.state.number)
    })
    console.log('b',this.state.number)
    // setTimeout queueMicrotask
    Promise.resolve().then(() => {
      this.setState({
        number: this.state.number + 1
      }, () => {
        console.log('callback3',this.state.number)
      })
      console.log('c',this.state.number)
      this.setState({
        number: this.state.number + 1
      }, () => {
        console.log('callback4',this.state.number)
      })
      console.log('d',this.state.number)
    })
    updateQueue.batchUpdate()
  }


  handleClick2 = () => {
    this.setState((state, props) => ({
      number: state.number + 1
    }), () => {
      console.log('callback1',this.state.number)
    })
    console.log('a',this.state.number)
    this.setState((state, props) => ({
      number: state.number + 1
    }), () => {
      console.log('callback2',this.state.number)
    })
    console.log('b',this.state.number)
    // setTimeout queueMicrotask
    Promise.resolve().then(() => {
      this.setState((state, props) => ({
        number: state.number + 1
      }), () => {
        console.log('callback3',this.state.number)
      })
      console.log('c',this.state.number)
      this.setState((state, props) => ({
        number: state.number + 1
      }), () => {
        console.log('callback4',this.state.number)
      })
      console.log('d',this.state.number)
    })
  }

  handleClick3 = () => {
    updateQueue.isBatchingUpdate = true
    this.setState({
      number: this.state.number + 1
    }, () => {
      console.log('cd1', this.state.number)
    })
    console.log(this.state.number)
    this.setState({
      number: this.state.number + 1
    },  () => {
      console.log('cd2', this.state.number)
    })
    console.log(this.state.number)
    updateQueue.batchUpdate()
  }

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        <button onClick={this.handleClick2}>+2</button>
        <button onClick={this.handleClick3}>按钮3</button>
      </div>
    )
  }
}
ReactDOM.render(
  <Counter/>,
  document.getElementById('root')
);

