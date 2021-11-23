function createElement(type, props, ...children) {
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

/*
const mockvdom = {
  "type": "div",
  "props": {
    "id": "container",
    "children": [
      {
        "type": "input",
        "props": {
          "value": "foo",
          "type": "text",
          "children": []
        }
      },
      {
        "type": "a",
        "props": {
          "href": "/bar",
          "children": [
            {
              "type": "TEXT",
              "props": {
                "nodeValue": "测试",
                "children": []
              }
            }
          ]
        }
      },
      {
        "type": "span",
        "props": {
          "children": [
            {
              "type": "TEXT",
              "props": {
                "nodeValue": "开课吧",
                "children": []
              }
            }
          ]
        }
      }
    ]
  }
}
*/



function render(vdom, container) {
  // container.innerHTML = `<pre>${JSON.stringify(vdom, null, 2)}</pre>`;
  const dom = vdom.type === 'TEXT' ? document.createTextNode("") : document.createElement(vdom.type)
  Object.keys(vdom.props).forEach(name => {
    if (name !== 'children') {
      dom[name] = vdom.props[name]
    }
  })
  vdom.props.children.forEach((child) => {
    render(child, dom)
  })
  container.appendChild(dom)
}

export default {
  createElement,
  render,
};
