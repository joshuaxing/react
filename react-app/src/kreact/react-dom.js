function render(vnode, container) {
  // vnode -> node
  // console.log(vnode);
  const node = createNode(vnode);
  // node -> container
  container.appendChild(node);
}

// vnode -> node
function createNode(vnode) {
  let node;
  const { type } = vnode;
  if (typeof type === "string") {
    node = updateHostComponent(vnode);
  } else if (typeof type === "function") {
    node = type.prototype.isReactComponent
      ? updateClassComponent(vnode)
      : updateFunctionComponent(vnode);
  } else {
    node = updateTextComponent(vnode);
  }
  return node;
}

// 类组件渲染
function updateClassComponent(vnode) {
  const { type, props } = vnode;
  const instance = new type(props);
  const vvnode = instance.render();
  return createNode(vvnode);
}

// 函数组件渲染
function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  const vvnode = type(props);
  return createNode(vvnode);
}

// 文本节点
function updateTextComponent(vnode) {
  const node = document.createTextNode(vnode);
  return node;
}

// 原生节点
function updateHostComponent(vnode) {
  const { type, props } = vnode;
  const node = document.createElement(type);
  updateNode(node, props);
  reconcileChildren(node, props.children);
  return node;
}

// 更新属性
function updateNode(node, nextVal) {
  Object.keys(nextVal)
    .filter((k) => k !== "children")
    .forEach((k) => {
      node[k] = nextVal[k];
    });
}

// 更新子节点|协调函数
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children];
  for (let index = 0; index < newChildren.length; index++) {
    const element = newChildren[index];
    render(element, parentNode);
  }
}

export default {
  render
};
