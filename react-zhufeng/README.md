### React只读属性
Object.freeze(element) // 冻结

### render
render -> vdom -> createDom -> updateProps -> reconcileChildren -> dom
    

### React 中 $$typeof 的作用
当 React 在渲染的时候加上对 $$typeof 合法性的验证即可防止恶意代码的插入
如果当前浏览器支持 Symbol 则 REACT_ELEMENT_TYPE 为 Symbol 类型的变量，否则为 16 进制的数字

### React className
是原生写法