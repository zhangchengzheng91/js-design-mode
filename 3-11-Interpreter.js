/*
* 行为型设计模式
*
* 语言翻译 --- 解释器模式(Interperter):对于一种语言，给出其文法表示形式，并定义一种解释器，通过
* 使用这种解释器来解释语言中定义的句子。
*
* 解释器即是对客户提出的需求，经过解析而形成的一个抽象解释程序。而是否可以应用解释器模式的一条重要
* 准则是能否根据需求解析出一套完整的语法规则，不论该语法规则简单或是复杂都是必须的。因为解释器要按
* 照这套规则才能实现相应的功能。
* */
var str = (
  `<div class="warp">`
    `<div class="link-inner">`
      `<a href='#'`>link</a>`
    `</div>`
    `<div class="button-inner">`
      `<button>text</button>`
    `</div>`
  `</div>`
)

// button XPath=DIV>DIV2>SPAN

var template = (
  `<!DOCTYPE html>`
  `<html lang='en'>`
    `<head>`
      `<meta charset='utf-8'/>`
      `<title>Document</title>`
    `</head>`
    `<body>`
      `<button>text</button>`
    `</body>`
  `</html>`
)

// button Xpath=HTML>BODY|HEAD>BUTTON

// 需求、定义、条件
// 获取兄弟元素名称
function getSublingName(node) {
  // 如果存在兄弟元素
  if (node.previousSibling) {
    var name = '' // 返回的兄弟元素名称字符串
    var count = 1 // 紧邻兄弟元素中相同名称元素个数
    var nodeName = node.nodeName // 原始节点名称
    var sibling = node.previousSibling // 前一个兄弟元素
    if (sibling) {
      // 如果节点为元素，并且节点类型与前一个兄弟元素类型相同，并且前一个兄弟元素名称存在
      if (sibling.nodeType == 1 && sibling.nodeType === node.nodeType && sibling.nodeName) {
        // 如果节点名称和前一个兄弟元素名称相同
        if (nodeName == sibling.nodeName) {
          // 节点名称后面添加计数
          name += ++count
        } else {
          // 重置相同紧邻节点名称节点个数
          count = 1
          name =+ '|' + sibling.nodeName.toUpperCase()
        }
      }
      sibling = sibling.previousSibling
    }
  } else {
    return ''
  }
}

var Interperter = (function() {
  // 获取兄弟元素名称
  var getSublingName = getSublingName
  // node 目标节点
  // wrap 容器节点
  return function(node, wrap) {
    // 路径数组
    var path = []
    var wrap = wrap || document
    // 如果当前目标节点等于容器节点
    if (node === wrap) {
      // 路径数组中输入容器节点名称
      path.push(wrap.nodeName.toUpperCase())
    }
    // 返回最终路径数组结果
    return path
  }
  // 如果当前节点的父节点不等于容器节点
  if (node.parentNode !== wrap) {
    // 当前节点的父节点执行遍历操作
    path = arguments.callee(node.parentNode, wrap)
  } else { // 如果当前节点的父节点不等于容器节点
    // 容器节点为元素
    if (wrap.nodeType == 1) {
      // 路径数组中输入容器节点名称
      path.push(wrap.nodeName.toUpperCase())
    }
  }
  // 获取元素的兄弟元素名称统计
  var sublingsNames = getSublingName(node)
  // 如果节点为元素
  if (node.nodeType == 1) {
    // 输入当前节点元素名称及其前面兄弟元素名称统计
    path.push(node.nodeName.toUpperCase() + sublingsNames)
  }
  // 返回最终路径数据结果
  return path

})()
