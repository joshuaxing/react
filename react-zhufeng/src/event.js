import { updateQueue } from './Component'
export function addEvent(dom, eventType, listener) {
  let store = dom.store || (dom.store = {})
  store[eventType] = listener
  if (!document[eventType]) {
    document[eventType] = dispatchEvent;
  }
}

// 原生dom
function dispatchEvent(event) {
  let { target, type } = event;
  let eventType = `on${type}`
  updateQueue.isBatchingUpdate = true;
  let syntheticEvent
  syntheticEvent = createSyntheticEvent(event)
  while (target) {
    // 事件的冒泡
    let { store } = target;
    let listener = store && store[eventType]
    listener && listener.call(target, syntheticEvent)
    if (syntheticEvent.$cancelBubble) {
      break;
    }
    target = target.parentNode
  }

  // 清掉
  // for (let key in syntheticEvent) {
  //   syntheticEvent[key] = null
  // }
  
  updateQueue.batchUpdate()
}

function createSyntheticEvent(nativeEvent) {
  let syntheticEvent = {}
  let cancelBubble = () => syntheticEvent.$cancelBubble = true
  syntheticEvent.nativeEvent = nativeEvent
  for (let key in nativeEvent) {
    if (typeof nativeEvent[key] !== 'function') {
      syntheticEvent[key] = nativeEvent[key]
    } else if (key === 'stopPropagation' || key === 'stopImmediatePropagation') {
      syntheticEvent[key] = cancelBubble
    } else {
      syntheticEvent[key] = nativeEvent[key].bind(nativeEvent)
    }
  }
  return syntheticEvent;
}