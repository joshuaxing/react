### [React 事件机制](https://www.bilibili.com/video/BV1wh411i7j8?spm_id_from=333.999.0.0)

#### 事件工作流
- 事件捕获
- 事件目标
- 事件冒泡
- 事件委托
- 先绑定后执行

#### 合成事件与原生事件的区别
类型         原生事件     合成事件
命名方式      全小写       小驼峰命名
事件处理函数  字符串       函数对象
阻止默认行为  返回false    event.preventDefault()

#### 合成事件
- React把事件委托到document对象上
- 当真实DOM元素触发事件，先处理原生事件，然后再冒泡到document对象后，再处理React事件
- React事件绑定的时刻是在reconciliation(调和)阶段，会在原生事件的绑定前执行
- 优点和目的：
  1. 进行浏览器兼容，更好的跨平台
  2. React采用的是顶层事件代理机制，能够保证冒泡一致性
  2. 事件对象可能会被频繁创建和回收，因此React引入事件池，在事件池中获取和释放事件对象（React17中被废弃）

#### React16事件执行过程
document原生捕获
父元素原生捕获
子元素原生捕获
子元素原生冒泡
父元素原生冒泡
先执行React注册的事件函数dispatchEvent 重新模拟一遍捕获和冒泡的流程
父元素React事件捕获
子元素React事件捕获
子元素React事件冒泡
父元素React事件冒泡
document原生冒泡

#### React17事件执行过程
父元素React事件捕获
子元素React事件捕获
root原生捕获
父元素原生捕获
子元素原生捕获
子元素原生冒泡
父元素原生冒泡
root原生冒泡
子元素React事件冒泡
父元素React事件冒泡

#### React17事件系统变更
- 更改事件委托
  - 更改了事件委托的绑定节点，React16中，React事件委托到document元素上，在多个React版本共存的情况下，虽然某节点的函数调用了event.preventDefault()，但是会导致另外一个版本上绑定的事件没有被阻止触发。React17中会把事件绑定到render函数的节点上
- 去除事件池
- stopPropagation()  不再向上冒泡，但是本元素剩下的监听函数还是执行
- stopImmediatePropagation() 不再向上冒泡，但是本元素剩下的监听函数不执行
