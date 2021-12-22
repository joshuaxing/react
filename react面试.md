## [面试一](https://juejin.cn/post/6941546135827775525#heading-55)
## [面试二](https://zhuanlan.zhihu.com/p/304213203)
### React理解
  #### React是什么
  React 用于构建用户界面的 JavaScript 库。
  #### React能干什么
  可以通过组件化的方式构建快速响应的大型web程序
  #### React如何干的
  - 声明式：使用声明式编写用户界面，代码可方便调试
  - 声明式渲染和命令式渲染
    1. 命令式渲染 命令我们的程序去做什么，程序就会跟着你的命令去一步一步执行
    2. 声明式渲染 我们只需要告诉程序我们想要什么效果，其他的交给程序来做
      ```
        let root = docuemnt.getElementById('root')
        // 声明式
        ReactDOM.render(<div onClick={() => console.log('hello')}>hello</div>, root)
        // 命令式
        let div = document.createElement('h1')
        div.innerHTML = 'hello'
        div.addEventListener('click', () => console.log('hello'))
        root.appendChild(div)
      ```
  #### 组件化
  组件化可以把把页面拆分为一个个组件，方便视图的拆分和复用，还可以做到高内聚和低耦合

  #### 通用性，跨平台 一次学习，随处编写
  - 可以使用react开发Web,Android,IOS,VR和命令程序
  - ReactNative使用React创建Android和IOS的原生应用
  - React 360是一个创建3D和VR用户交互的框架

### JSX
  #### JSX是什么
  - JSX 是是⼀种JavaScript的语法扩展(JavaScript XML), 
  - 实质是React.createElement(component, props, ...children) 函数的语法糖
  作用: 创建虚拟DOM（元素）
  #### AST抽象语法树
  抽象语法树（Abstract Syntax Tree, AST）是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，书上的每个点都表示源代码中的一种结构
  #### babel编译
    const jsx = <h1 id="title">hello</h1>
    - 旧编译结果
      plugins: ["@babel/plugin-transform-react-jsx", {runtime:'classic'}]
      ```
      React.createElement("h1", { id: 'title'}, "hello")
      ```
    - 新编译结果
      plugins: ["@babel/plugin-transform-react-jsx", {runtime:'automatic'}]
      ```
      import { jsx as __jsx } from 'react/jsx-runtime'
      __jsx('h1', {
        id: 'title'
        children: 'hello'
      })
      ```
  #### JSX转成dom流程
    1. 获取state数据
    2. 解析JSX模板
    3. 生成虚拟dom
    4. 用虚拟dom解构，生成真实dom并显示
    5. state数据发生变化
    6. 生成新的虚拟dom
    7. 比较原始虚拟dom和新的虚拟dom的区别，找出区别是span里的内容
    8. 直接操作dom，只改变span里的内容


### 虚拟DOM(virtual dom)

  #### 虚拟DOM(virtual dom)是什么
  React.createElement方法返回是一个JS对象，它可以描述元素样子，它就是的VDOM
  ```
  createElement () {
    const element = {
      $$tyoeof: REACT_ELEMENT_TYPE,  // 标识符，表示一个React元素，symbol没有办法通过json插入
      type,
      key,
      props
    }
    return element
  }
  ```
  #### 优点
  - 处理了浏览器的兼容性问题，避免用户操作真实dom,那么又麻烦又容易出错
  - 内容经过了XSS处理，可以防范XSS攻击
  - 容易实现跨平台
  - 更新的时候可以实现差异化更新
  #### 缺点
  - 虚拟DOM需要消耗额外的内存
  - 首次渲染其实并不一定是最快的，因为每次虚拟dom会转换成真实dom。在更新时候，更新的元素内容比较少，它可以实现精准的定量更新，不需要把全部的DOM元素删除添加

  #### DOM-Diff算法 是一个对比老的Fiber链表和新的JSX数组的过程，生成新的Fiber链表的过程
    - 算法复杂度O(n)
    - 只对同级别节点进行对比，如果DOM节点跨层级移动，则React不会复用
    - 不同类型的元素会产生不同的结构，会销毁老结构，创建新结构
    - 对于同一层级的一组子节点，它们可以通过唯一 key 进行区分
  #### diff策略
  1. tree diff
    - 只会对同一父节点下的所有子节点（相同颜色方框内）的DOM节点进行比较
    - 当发现节点已经不存在，则该节点及其子节点直接移除，不再进行深度比较
  2. component diff 
    - 如果组件类型相同,暂时不更新
    - 如果组件类型不相同,就需要更新
  3. element diff 
    - INSERT_MARKUP（插入）
    - MOVE_EXISTING（移动）
    - REMOVE_NODE（删除）
  #### 判断是不是同一个节点,是否能复用
  - 组件类型
  - key键

  - 深度优先
  - 同一层级，避免跨层级
  - 同组件类型， 避免不同类型组件生产不同的树形结构
  - key prop 保持稳定


### 类组件和函数组件

- 相同点: 他们都可以接收属性并且返回React元素
- 不同点：
  1. 编程思想不同： 类组件需要创建实例，是基于面向对象的方式编程，而函数式组件不需要创建实例，接受输入，返回输出，基于函数编程的思想
  2. 内存占用：类组件需要创建并保存实例，会占用一定内存，函数组件不需要创建实例，可以节约内存
  3. 捕获特性：函数组件具有值捕获特性 
  4. 可测试性：函数组件更容易编写单元测试
  5. 状态：类组件有setState。函数式组件有useStatus
  6. 生命周期： 类组件有完整的生命周期。函数组件有useEffect
  7. 逻辑复用：类组件可以通过继承实现逻辑复用，但官方推荐HOC组件优于继承。函数组件通过自定义Hooks
  8. 跳过更新：类组件通过shouldComponentUpdate 和 PureComponent（immutable.js/immer） 来跳过更新。函数组件   React.memo
  9. 发展前景：未来函数式组件将会成为主流，因为它可以更好的屏蔽this问题，规范和复用逻辑，更好的适合时间的分片和并发渲染
- 实现深比较
  immutable.js/immer
- 实现keep-alive 
  react-keeper
- 在组件内定义state = { a : 1}
  @babel/plugin-proposal-class-properties

### React中的渲染流程

  #### 设计理念
    - 跨平台渲染 => 虚拟DOM
    - 快速响应 => 异步可中断 + 增量更新
  #### 性能瓶颈
    - JS任务执行时间过长
      - 浏览器刷新频率为60Hz,大概16.6毫秒渲染一次，而js线程和渲染线程式互斥的，所以如果js线程执行任务时间超过16.6ms,就会导致掉帧卡顿，解决方案就是React利用空闲时间进行更新
      - 把一个耗时任务切割分成一个个小任务，分布在每一帧里的方式就叫时间切片
  #### 屏幕刷新率
    - 屏幕刷新率为60次/每秒
    - 浏览器渲染动画和页面的每一帧的速率也需要跟设备屏幕的刷新率保持一致
    - 页面是一帧一帧绘制出来的，当每秒绘制的帧数（FPS）达到60次时，页面是流畅的，小于这个值时，用户会感到卡顿
    - 每个帧的预算时间是16.6ms（1s/60）
  #### 帧 Life frame(一个帧)
    - 每个帧的开头包括样式计算，布局，绘制
    - js执行js引擎和页面渲染引擎在同一个渲染线程，GUI渲染和js执行两者是互斥的
    - 如果某个任务执行时间过长，浏览器会推迟渲染
  #### 浏览器一帧内的工作
    - 处理用户输入事件
    - Javascript执行
    - 帧开始，处理浏览器事件，比如resize,scroll等
    - requestAnimation 调用
    - 布局 Layout
    - 绘制 Paint
  
  #### requestIdleCallback
    - 快速响应用户，让用户觉得够快，不能阻塞用户的交互
    - requestIdleCallback是开发者能够在主事件循环上执行后台和低级优先级工作，而不影响延迟关键事件
    - 正常帧任务完成后没超过16ms,说明时间有富余，此时就会执行requestIdleCallback里注册的任务
    - 高优级的任务：渲染，布局，绘制，资源加载，事件响应
    - 过程： 
      1. 用户代码 -> requestIdleCallback申请时间片 ->  浏览器
      2. 浏览器：执行高优级任务 -> 分配时间片 -> 用户代码：在约定的时间内完成任务
      3. 用户代码 -> 归还控制权（申请下一个时间片） -> 浏览器
    - React使用 MessageChannel + requestAnimationFrame 模拟

  #### React16+的渲染流程
  - scheduler 选择高优级的任务进入reconciler
  - reconciler 计算变更内容
  - react-dom 把变更的内容渲染到页面上
  - componentWillMount componentWillUpdate componentWillReceiveProps 被废弃
  - render的全过程，包括调度，调和和提交三个阶段
  #### React17+渲染
  - 断点续传
  - 切片


### [React Fiber](https://www.jianshu.com/p/37d7de212df1)
  https://juejin.cn/post/6844903975112671239
  #### fiber解决什么
    当React决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和比对Virtual DOM，最后更新DOM树，这整个过程是同步进行的，且不可中断的，会造成主线程被持续占用，如果用户往一个input元素中输入点什么或者主线程上的布局、动画等周期性任务就无法立即处理，造成视觉上卡顿，影响用户体验。
  #### Fiber是什么
    fiber是一种单链表的数据结构，通过Fiber的架构，提供了一种跟踪，调度，暂停和中止工作的便捷方式
  #### React Fiber的工作原理？
    把耗时长的更新任务拆解成一个个小的任务分片，每执行完一个小的任务分片，都归还一次主线程，看看有没有什么其他紧急任务要做。如果在归还主线程时恰巧发现有紧急任务，那么会马上停掉当前更新任务，转而让主线程去做紧急任务，等主线程做完 紧急任务，再重新做更新任务。
  #### React Fiber更新过程
    将一个更新过程分为Reconciliation(协调)阶段和Commit(提交)阶段，Reconciliation阶段（协调阶段）会更新数据并生成新的虚拟DOM，并且对新旧的虚拟DOM进行diff，得到需要更新的元素，放到新的更新队列中；而Commit阶段（渲染阶段）则会遍历更新队列，并且将所有的变更一次性更新到真实DOM中；
  #### React Fiber对我们日常开发有什么影响？
    - componentWillMount
    - componentWillUpdate
    - componentWillReceiveProps
    - shouldComponentUpdate
  ###  - 协调（Reconciliation） 调度（Scheduling）
  - 可以通过某些调度策略合理分配CPU资源，从而提高用户的响应速度
  - 通过Fiber架构，让自己的调和过程变成可被中断，适时的让出CPU执行权，除了可以让浏览器及时的响应用户的交互
  - Fiber是一个执行单元，每次执行完一个执行单元。React就会检查现在还剩多少时间，如果没有时间就将控制权让出去
  - 合作式调度
  - 每个fiber代表一个异步的小任务
  - 
    1. Rect目前的做法是使用链表，每个VDOM节点内部表示为一个Fiber
  
  - [调度算法](https://zhuanlan.zhihu.com/p/74548926)

### 【React setState】(https://juejin.cn/post/6844903636749778958)
  #### setState 是异步还是同步？
   - 合成事件中是异步
   - 钩子函数中是异步
   - 原生事件中是同步
   - setTimeout中是同步
  
  #### React setState怎么获取到更新后的值？ 异步函数中为什么setState会立即更新 ？
  - componentDidUpdate，
  - setState(updater, callback)
  - 变量isBatchingUpdates判断是否更新
  - React在调用事件处理函数和自身生命周期之前就会调用这个batchedUpdates，isBatchingUpdates = true 不会立即更新
  - 其他绕过了React的，则是可以立即更新的
  #### 异步更新的好处
  - 性能更好啊，相当于节流，因为vdom算法和视图更新都是需要耗费性能的，所以应当尽量减少。

### Portal
Portal 子节点渲染到存在于父组件以外的 DOM 节点。
ReactDOM.createPortal(child, container)

### 组件的生命周期

 #### 挂载 
  组件实例被创建并插入DOM中时
  1.  contructor
    - 初始化组件的state
    - 给事件处理方法绑定this
  2. static getDerivedStateFromProps(props, state)
  3. render
  4. componentDidMount()

 #### 更新
 当组件的 props 或 state 发生变化时会触发更新。
  1. static getDerivedStateFromProps(props, state)
  2. shouldComponentUpdate(nextProps, nextState)
  3. render()
  4. getSnapshotBeforeUpdate()
  5. componentDidUpdate(prevProps, prevState, snapshot)

 #### 卸载
  当组件从 DOM 中移除时
  1. componentWillUnmount()
 
 #### 错误处理
  当渲染过程，生命周期，或子组件的构造函数中抛出错误时
  1. static getDerivedStateFromError()
  2. componentDidCatch(error, info)


### Context
  ### API
  React.createContext()
  Context.Provider()

### React SSR
  renderToString 
  renderToStaticMarkup
  ReactDOM.hydrate()

### setState
#### state 和 props 之间的区别是什么？
props 是传递给组件的（类似于函数的形参），而 state 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）

### React合成事件
#### 为什么要合成事件
 1. 做浏览器兼容
 2. 可以在事件处理函数之前和之后做一些事情

 ### React有哪些优化性能的手段
  - 使用纯组件 PureComponent 作为基类
  - 使用 React.memo 高阶函数包装组件
  - useMemo 
  - useCallBack