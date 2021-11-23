/**
 * 
 * @param {*} type 
 * @param {*} props 
 * @param  {...any} children 
 * @returns 
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
      Object.keys(vdom.props).filter((key) => key !== 'children')
      .forEach(name => {
        dom[name] = vdom.props[name]
      })
  return dom;
}



/**
 * 我们给dom添加节点的时候，如果渲染的过程中，被打
  断的，ui渲染会变得很奇怪，所以我们应该把dom操作
  独⽴出来，我们⽤⼀个全局变量来存储正在⼯作的fiber
  根节点( workInprogress tree)
 */

function commitRoot() {
  commitWorker(wipRoot.child)
  wipRoot = null;
}
function commitWorker(fiber) {
  if (!fiber) {
    return
  }
  const domParent = fiber.parent.dom;
  domParent.appendChild(fiber.dom)
  commitWorker(fiber.child)
  commitWorker(fiber.slibing)
}

function render(vdom, container) {
  wipRoot = {
    dom: container,
    props: {
      children: [vdom],
    },
  };
  nextUnitOfWork = wipRoot
}

let nextUnitOfWork = null;
let wipRoot = null;
// 任务调度
function workLoop(deadline) {
  // 有任务，并且当前帧还没结束
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if(!nextUnitOfWork && wipRoot) {
  // 没有任务，提交根节点
    commitRoot()
  }
  requestIdleCallback(workLoop);
}

// 启动空闲时间处理
requestIdleCallback(workLoop);

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    // 不是入口
    fiber.dom = createDom(fiber);
  }
  // 真实的dom操作
  // if (fiber.parent) {
  //   fiber.parent.dom.appendChild(fiber.dom);
  // }

  // 构建fiber结构 start
  //子元素遍历， 把children数组，变成链表
  console.log(fiber);
  const elements = fiber.props.children;
  // fiber结构
  // fiber = {
  //   dom: '真实dom',
  //   parent: '父亲',
  //   child: '第一个元素',
  //   slibing: '兄弟'
  // }
  let index = 0;
  let prevSlibing = null;
  while (index < elements.length) {
    let element = elements[index];
    const newFiber = {
      type: element.type,
      props: element.props,
      parent: fiber,
      dom: null
    };
    if (index === 0) {
      // 第一个元素,是父fiber的child属性
      fiber.child = newFiber;
    } else {
      prevSlibing.slibing = newFiber;
    }
    prevSlibing = newFiber;
    index++;
  }
  // 构建fiber结构 end
  

  // fiber遍历顺序
  // 子 =》 子的兄弟 => 没有兄弟了=> 父元素
  // 找下一个任务, 子元素
  if (fiber.child) {
    return fiber.child;
  }
  
  // 没有子元素,找兄弟元素
  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.slibing) {
      return nextFiber.slibing;
    }
    // 没有兄弟元素,找父元素
    nextFiber = nextFiber.parent;
  }
  
}

export default {
  createElement,
  render
};
