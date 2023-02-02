export const imageerror = {
  // 指令对象 会在当前dom元素插入到节点之后执行
  inserted(dom, options) {
    dom.src = dom.src || options.value
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
