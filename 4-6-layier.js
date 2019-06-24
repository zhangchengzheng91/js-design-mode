/*
* 技巧型设计模式
* 机器学习 --- 惰性模式（layier）：减少每次代码执行时的重复性的分支判断，通过对对象
* 重定义来屏蔽原对象中的分支判断。
*
* 惰性模式是一种拖延模式，由于对象的创建或者数据的计算会花费高昂的代价（如页面刚加
* 载时无法辨认是该浏览器支持某个功能，此时创建对象不够安全），因此页面之处会延迟对
* 这一类对象的创建。
* 惰性模式又分为两种：
* 1、文件加载后立即执行对象对象方法来重新定义对象。由于文件加载时执行，会占用一些资源。
* 2、到那个第一次使用方法时重定义对象。由于在第一次使用时会重定义对象，以致第一次执行
* 事件增加。
* 有时候两种方式对资源的开销都是可接受的，因此到底使用哪种方式，要看具体需求而定。
* */

// 对事件的思考
// 每次调用事件绑定的方法，都要经过分支判断
var A = {}
A.on = function(dom, type, fn) {
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on' + type] = fn
  }
}


// 加载即执行
// 首先对 document 做能力检测，通过闭包在页面加载时执行它，达到重写 A.on 的目的
// 页面加载的时候就要去执行，可能需要消耗一些资源
A.on = function(dom, type, fn) {
  if (document.addEventListener) {
    return function(dom, type, fn) {
      dom.addEventListener(type, fn, false)
    }
  } else if (document.attachEvent) {
    return function(dom, type, fn) {
      dom.attachEvent('on' + type, fn)
    }
  } else {
    return function(dom, type, fn) {
      dom['on' + type] = fn
    }
  }
}()

// 惰性执行
// 首先对元素 dom 执行能力检测并显示重写；其次，原始函数在函数的最末尾重新执行一遍
// 来绑定事件。
// 不过在文件加载后A.on方法还没能重新被定义。所以我们还需等到某一元素绑定事件时，A.on
// 才能被重定义
A.on = function(dom, type, fn) {
  if (dom.addEventListener) {
    A.on = function(dom, type, fn) {
      dom.addEventListener(type, fn, false)
    }
  } else if (dom.attachEvent) {
    A.on = function(dom, type, fn) {
      dom.attachEvent('on' + type, fn)
    }
  } else {
    A.on = function(dom, type, fn) {
      dom['on' + type] = fn
    }
  }
  // 执行重新定义 on 方法
  A.on(dom, type, fn)
}

// 创建 XHR 对象
function createXHR() {
  // 标准浏览器
  if (typeof XMLHttpRequest != 'undefined') {
    return new XMLHttpRequest()
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = [
        '6.0',
        '3.0',
        '2.XMLHttp'
      ]
      for (i = 0, len = versions.length; i < len; i++) {
        try {
          new ActiveXObject(versions[i])
          arguments.callee.acticeXString = versions[i]
        } catch (e){

        }
      }
    }
    return new ActiveXObject(arguments.callee.activeXString)
  } else {
    throw new Error('您的浏览器不支持 Ajax ')
  }
}

// 加载即执行
// 加载时损失性能，但是第一次调用时不损失性能
var createXHR = (function() {
  if (typeof XMLHttpRequest != 'undefined') {
    return function() {
      new XMLHttpRequest()
    }
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = [
        '6.0',
        '3.0',
        '2.XMLHttp'
      ]
      for (i = 0, len = versions.length; i < len; i++) {
        try {
          new ActiveXObject(versions[i])
          arguments.callee.acticeXString = versions[i]
        } catch (e){

        }
      }
    }
    return function() {
      return new ActiveXObject(arguments.callee.activeXString)
    }
  } else {
    return function() {
      throw new Error('您的浏览器不支持 Ajax ')
    }
  }
})()

// 惰性执行
// 第一次调用是损失性能
function createXHR() {
  if (typeof XMLHttpRequest != 'undefined') {
    createXHR =  function() {
      return new XMLHttpRequest()
    }
  } else if (typeof ActiveXObject != 'undefined') {
    if (typeof arguments.callee.activeXString != 'string') {
      var versions = [
        '6.0',
        '3.0',
        '2.XMLHttp'
      ]
      for (i = 0, len = versions.length; i < len; i++) {
        try {
          new ActiveXObject(versions[i])
          arguments.callee.acticeXString = versions[i]
        } catch (e){

        }
      }
    }
    createXHR = function() {
      return new ActiveXObject(arguments.callee.activeXString)
    }
  } else {
    createXHR = function() {
      throw new Error('您的浏览器不支持 Ajax ')
    }
  }
  return createXHR()
}
