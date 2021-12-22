/**
 * 合成事件和批量更新
 * 1. 在React里，事件的更新可能是异步的，是批量的，不是同步的
 * 调用state之后状态并没有立即更新，而是先缓存起来
 * 等到事件函数处理完成后，再进行批量更新，一次更新并重新渲染
 * 因为jsx事件处理的是react控制的，只要归react控制的就是批量，只要不归react惯了，就是非批量
 */

import React from 'react';
import ReactDOM from 'react-dom';
class ChildCounter extends React.Component {
  componentDidMount() {
    console.log('ChildCounter-componentDidMount')
  }
  componentWillReceiveProps(prevProps, prevState) {
    console.log('ChildCounter-componentWillReceiveProps', prevProps, prevState)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('ChildCounter-shouldComponentUpdate', nextProps, nextState)
    return nextProps.number === 3
  }
  componentWillUpdate() {
    console.log('ChildCounter-componentWillUpdate')
  }
  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log(prevProps, prevState)
  //   console.log('ChildCounter-getSnapshotBeforeUpdate')
  //   return null
  // }
  componentDidUpdate() {
    console.log('ChildCounter-componentDidUpdate')
  }

  componentWillUnmount() {
    console.log('ChildCounter-componentWillUnmount')
  }

  render() {
    console.log('ChildCounter-render')
    return <div>{this.props.number}</div>
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 1
    }
    console.log('constructor')
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate')
    return nextState.number % 2  === 0 
  }

  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  handleClick = (e) => {
    this.setState({
      number: this.state.number + 1
    })
  }
  render() {
    console.log('render')
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}><span>+</span></button>
        <ChildCounter number={this.state.number}/>
      </div>
    )
  }
}




ReactDOM.render(
  <Counter/>,
  document.getElementById('root')
);

