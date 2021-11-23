## JSX
### 什么是JSX
定义: JSX 是是⼀种JavaScript的语法扩展(JavaScript XML), 实质是React.createElement(component, props, ...children) 函数的语法糖
作用: 创建虚拟DOM（元素）


### 什么是虚拟 DOM

定义：用 js 对象表示 DOM 信息和结构，当状态变更的时候，重新渲染这个 js 的对象结构，这个 js 对象称为 virtual dom
目的：提高性能，用户体验

### 安全性

ReactElement 函数

$$typeof: REACT_ELEMENT_TYPE
symbol没有办法通过json插入

### Diffing算法(React vdom渲染dom) 算法复杂度O(n)
 #### 判断是不是同一个节点,是否能复用
- 组件类型
- key键
 #### diff策略
- 深度优先
- 同一层级，避免跨层级
- 同组件类型， 避免不同类型组件生产不同的树形结构
- key prop 保持稳定

### Fiber 链表
  1. 为什么需要fiber
    对于大型项目。组件数会很大，这个时候递归遍历的成本就很高，会造成主线程被持续占用，
    结果就是主线程上的布局、动画等周期性任务就无法立即处理，造成视觉上卡顿，影响用户体验。
  2. 任务分解的意义
  3. 
