/**
 *
 * Hooks
 */

function createElement(type, props, ...children) {
  // console.log(props)
  delete props.__source;
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: "TEXT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createDom(vdom) {
  const dom =
    vdom.type === "TEXT"
      ? document.createTextNode("")
      : document.createElement(vdom.type);
  updateDom(dom, {}, vdom.props);
  return dom;
}

function updateDom(dom, prevProps, nextProps) {
  // 1,规避 children 属性
  // 2,老的存在，取消
  // 3, 新的存在，新增  并没有做新老相等的判定

  Object.keys(prevProps)
    .filter((name) => name !== "children")
    .filter((name) => !(name in nextProps))
    .forEach((name) => {
      // 删除
      if (name.slice(0, 2) === "on") {
        dom.removeEventListener(
          name.slice(2).toLowerCase(),
          prevProps[name],
          false
        );
      } else {
        dom[name] = "";
      }
    });

  Object.keys(nextProps)
    .filter((name) => name !== "children")
    .forEach((name) => {
      // 删除
      if (name.slice(0, 2) === "on") {
        dom.addEventListener(
          name.slice(2).toLowerCase(),
          nextProps[name],
          false
        );
      } else {
        dom[name] = nextProps[name];
      }
    });
}

function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(fiber.child, domParent);
  }
}

/**
 * 我们给dom添加节点的时候，如果渲染的过程中，被打
  断的，ui渲染会变得很奇怪，所以我们应该把dom操作
  独⽴出来，我们⽤⼀个全局变量来存储正在⼯作的fiber
  根节点( workInprogress tree)
 */

function commitRoot() {
  deletions.forEach(commitWork);
  // console.log(wipRoot)
  commitWork(wipRoot.child);
  currentRoot = wipRoot;
  wipRoot = null;
}

function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  // console.log(fiber)
  // const domParent = fiber.parent.dom
  let domParentFiber = fiber.parent;
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.base.props, fiber.props);
  } else if (fiber.effectTag === "DELETION") {
    // domParent.removeChild(fiber.dom)
    commitDeletion(fiber, domParent);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function render(vdom, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [vdom],
    },
    base: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

let nextUnitOfWork = null;
let wipRoot = null;
let currentRoot = null;
let deletions = [];

// 任务调度
function workLoop(deadline) {
  // 有任务，并且当前帧还没结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    // console.log(nextUnitOfWork)
  }
  if (!nextUnitOfWork && wipRoot) {
    // 没有任务，提交根节点
    commitRoot();
  }
  requestIdleCallback(workLoop);
}

// 启动空闲时间处理
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  const isFunctionComponent = fiber.type instanceof Function;
  if (isFunctionComponent) {
    updateFunctionComponent(fiber);
  } else {
    updateHostComponent(fiber);
  }
  // fiber遍历顺序
  // 子 =》 子的兄弟 => 没有兄弟了=> 父元素
  // 找下一个任务, 子元素
  if (fiber.child) {
    return fiber.child;
  }
  // 没有子元素,找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 没有兄弟元素,找父元素
    nextFiber = nextFiber.parent;
  }
}



let wipFiber = null;
let hookIndex = null;

function useState(init) {
  
  const oldHook =
    wipFiber.base && wipFiber.base.hooks && wipFiber.base.hooks[hookIndex];

    // console.log(oldHook)
    
  const hook = {
    state: oldHook ? oldHook.state : init,
    queue: [],
  };
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => {
    hook.state = action;
  });
  const setState = (action) => {
    hook.queue.push(action);
    wipRoot = {
      dom: currentRoot.dom,
      props: currentRoot.props,
      base: currentRoot,
    };
    nextUnitOfWork = wipRoot;
    deletions = [];
  };
  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

// 函数组件
function updateFunctionComponent(fiber) {

  wipFiber = fiber
  hookIndex = 0
  wipFiber.hooks = []

  // 执⾏函数，传⼊props
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}

// class组件
function updateHostComponent(fiber) {
  if (!fiber.dom) {
    // 不是入口
    fiber.dom = createDom(fiber);
  }

  reconcileChildren(fiber, fiber.props.children);
}

function reconcileChildren(wipFiber, elements) {
  // 构建fiber结构 start
  // 子元素遍历， 把children数组，变成链表
  // fiber结构
  // fiber = {
  //   dom: '真实dom',
  //   parent: '父亲',
  //   child: '第一个元素',
  //   slibing: '兄弟'
  // }

  let index = 0;
  let oldFiber = wipFiber.base && wipFiber.base.child;
  let prevSibling = null;

  while (index < elements.length || oldFiber !== null) {
    const element = elements[index];
    let newFiber = null;
    // 对比
    const sameType = oldFiber && element && element.type === oldFiber.type;
    if (sameType) {
      // update the node
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        base: oldFiber,
        effectTag: "UPDATE",
      };
    }
    if (element && !sameType) {
      // add this node
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        base: null,
        effectTag: "PLACEMENT",
      };
    }
    if (oldFiber && !sameType) {
      // delete the oldFiber's node
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      // 第一个元素,是父fiber的child属性
      wipFiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }
  // 构建fiber结构 end
}

export default {
  createElement,
  render,
  useState
};
