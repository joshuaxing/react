import { createDom, compareTwoVdom } from './react-dom'


export let updateQueue = {
  isBatchingUpdate: false,  //是否批量更新
  updaters: new Set(),
  batchUpdate() {
    for(let updater of this.updaters) {
      updater.updateComponent()
    }
    this.isBatchingUpdate = false;
  }
}

/**
 * 判断组件是否需要更新
 * @param {*} classInstance 
 * @param {*} nextState 新的状态
 */

function shouldUpdate(classInstance, nextState) {
  classInstance.state = nextState // 不管组件要不要更新，其实组件的state状态都会变
  // 生命周期-shouldComponentUpdate
  if(classInstance.shouldComponentUpdate) {
    const isUpdate = classInstance.shouldComponentUpdate(classInstance.props, classInstance.state)
    if (!isUpdate) {
      return
    }
    classInstance.forceUpdate()
    // this.callbacks.forEach(cb => cb())
    // this.callbacks.length = 0;
  }
}

class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingStates = []; // 等待生效的状态，可能是一个对象，也可能是一个函数
    this.callbacks = [];
  }
  addState(partialState, callback) {
    this.pendingStates.push(partialState)
    if (typeof callback === 'function') {
      this.callbacks.push(callback)
    }
    /*
    if (updateQueue.isBatchingUpdate) { // 如果当前的批量模式，先缓存updater
      updateQueue.updaters.add(this) // 本次setState调用结束
    } else {
      this.updateClassComponent()
    }
    */
   this.emitUpdate()
  }
  // 一个组件不管属性变了，还是状态变了都会更新
  emitUpdate(newProps) {
    if (updateQueue.isBatchingUpdate) { // 如果当前的批量模式，先缓存updater
      updateQueue.updaters.add(this) // 本次setState调用结束
    } else {
      this.updateComponent()
    }
  }
  updateComponent() {
    let {classInstance, pendingStates, callbacks} = this;
    if (pendingStates.length > 0) {
      /*
      classInstance.state = this.getState()
      classInstance.forceUpdate()
      callbacks.forEach(cb => cb())
      callbacks.length = 0;
      */
     const nextState = this.getState()
     shouldUpdate(classInstance, nextState)
    }
  }
  getState() {
    // 计算最新的状态
    let {classInstance, pendingStates} = this;
    let { state } = classInstance;
    pendingStates.forEach((nextState) => {
      // 如果pendingState是一个函数的话，传入老状态，返回新状态，在进行合并
      if (typeof nextState === 'function') {
        nextState = nextState(state)
      }
      state = {...state, ...nextState}
    })
    pendingStates.length = 0; // 清空数组
    return state
  }
}

/**
 * 
 */

class Component {
  static isReactComponent = true
  constructor(props) {
    this.props = props
    this.state = {}
    this.updater = new Updater(this)
  }
  setState(partialState, cb) {
    /*
      let state = this.state
      this.state = {...state, ...partialState}
      let newVdom = this.render();
      updateClassComponent(this, newVdom)
    */
    this.updater.addState(partialState, cb)
  }
  forceUpdate() {
    // 生命周期-componentWillUpdate
    if(this.componentWillUpdate) {
      this.componentWillUpdate()
    }
    let newRenderVom = this.render();

    // 比较新旧虚拟DOM
    let oldRenderVdom = this.oldRenderVdom
    let oldDOM = oldRenderVdom.dom
    let currentRenderVdom = compareTwoVdom(oldDOM.parentNode, oldRenderVdom, newRenderVom)
    this.oldRenderVdom = currentRenderVdom
    // 暴力更新
    // updateClassComponent(this, newVdom)
    // 生命周期-componentDidUpdate
    if(this.componentDidUpdate) {
      this.componentDidUpdate(this.props, this.state)
    }
  }
  render() {
    throw new Error('此方法为抽象方法，需要子类实现')
  }
}

/**
 * 更新dom
 * @param {*} classInstance 
 * @param {*} newVdom 
 */

function updateClassComponent(classInstance, newVdom) {
  const oldDOM = classInstance.dom
  const newDOM = createDom(newVdom)
  oldDOM.parentNode.replaceChild(newDOM, oldDOM)
  classInstance.dom = newDOM
}

export default Component