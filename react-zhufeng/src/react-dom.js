
/**
 * 
 * 1. vdom -> 真实DOM
 * 2. vdom上属性的更新
 * 3. 把vdom的children都变成真实DOM挂载到自己的dom上
 * 4. 把自己挂载到容器上
 */
import {addEvent} from './event'

function render(vdom, container) {
  const dom = createDom(vdom)
  container.appendChild(dom)
  // 挂载
  if (dom.componentDidMount) {
    dom.componentDidMount()
  }
}

export function createDom(vdom) {
  if (typeof vdom === 'string' || typeof vdom === 'number') {
    // TODO 处理vdom的字符串
    return document.createTextNode(vdom)
  }
  // TODO 虚拟dom
  let { type, props } = vdom
  // 
  let dom;
  if (typeof type === 'function') {
    if (type.isReactComponent) {
      // 自定义类组件
      return mountClassComponent(vdom)
    } else {
      // 自定义函数组件
      return mountFunctionComponent(vdom)
    }
  } else {
    // 原生dom组件
    dom = document.createElement(type)
  }


  // 更新属性
  updateProps(dom, props)

  // 处理 props.children
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    dom.textContent = props.children
    // 只有一个儿子，而且儿子是个vdom
  } else if (typeof props.children === 'object' && props.children.type) {
    render(props.children, dom)
  } else if (Array.isArray(props.children)) {
    reconcileChildren(props.children, dom)
  } else {
    dom.textContent = props.children ? props.children.toString() : ''
  }
  // 把真实DOM作为一个dom属性放在虚拟DOM,为以后更新做准备
  // 当根据一个vdom创建出来一个真实的DOM之
  vdom.dom = dom
  return dom
}


/**
 * 处理真实DOM属性
 * @param {*} dom 当前真实dom
 * @param {*} newProps 属性props
 */

function updateProps(dom, newProps) {
  for (let key in newProps) {
    if (key === 'children') continue;
    if (key === 'style') {
      let styleObj = newProps.style;
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr]
      }
    } else if (key.startsWith('on')) {
      // dom[key.toLocaleLowerCase()] = newProps[key]
      addEvent(dom, key.toLocaleLowerCase(), newProps[key])
    } else {
      dom[key] = newProps[key]
    }
  }
}

/**
 * 处理 props.children
 * @param {*} childrenVdom  儿子们的虚拟dom
 * @param {*} parentDOM  父亲的真实dom
 */

function reconcileChildren(childrenVdom, parentDOM) {
  for (let i = 0; i < childrenVdom.length; i++) {
    render(childrenVdom[i], parentDOM)
  }
}


/**
 * 处理自定义函数组件
 * @param {*} vdom 
 */

function mountFunctionComponent(vdom) {
  let { type: FunctionComponent, props } = vdom
  let renderVdom = FunctionComponent(props)
  return createDom(renderVdom)
}

/**
 * 处理类组件
 * @param {*} vdom 
 * @returns 
 */

function mountClassComponent(vdom) {
  let { type: ClassComponent, props } = vdom
  // 创建类的实例
  const classInstance = new ClassComponent(props)
  // 生命周期-componentWillMount 
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount()
  }

  let renderVdom = classInstance.render()
  classInstance.oldRenderVdom = renderVdom
  let dom = createDom(renderVdom)
  // 生命周期-componentDidMount 
  if (classInstance.componentDidMount) {
    dom.componentDidMount = classInstance.componentDidMount.bind(classInstance)
  }

  // 为了以后组件更新，把真实dom挂载到了类的实例上
  classInstance.dom = dom
  return dom
}

/**
 * 对当前组件进行DOM-DIFF
 * parentDOM 当前组件挂载父真实的DOM节点
 * oldVdom 上一次老的虚拟DOM
 * newVdom 这一次新的虚拟DOM
 */

export function compareTwoVdom(parentDOM, oldVdom, newVdom) {
  if (!oldVdom && !newVdom) {
    // 老的虚拟DOM和新的虚拟DOM都是null
    return null
  } else if (oldVdom && !newVdom) {
    // 老的虚拟DOM有，新的虚拟DOM没有，删除
    // let currentDOM = findDOM(oldVdom)
  } else if (!oldVdom && newVdom) {
    // 老的虚拟DOM没有，新的虚拟DOM有，插入
  } else if (oldVdom && newVdom && (oldVdom.type !== newVdom.type)){
    // 老的虚拟DOM有，新的虚拟DOM有，类型不同，替换
  } 
}

function findDOM (vdom) {
  let {type} = vdom
  let dom
  if (typeof type === 'function') {
    if (type.isReactComponent) {
      dom = findDOM()
    } else {

    }
  }
}

const ReactDOM = { render }

export default ReactDOM