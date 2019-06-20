/*
* 技巧型设计模式
*
* 永无尽头 -- 链模式(Opeate Of Responsibility):通过在对象方法中将当前对
* 象返回，实现对同一个对象多个方法的链式调用。从而简化对该对象的多个方法的多
* 次调用时，对该对象的多次引用。
*
* new 关键字执行的实质是对构造函数属性的一次复制。
*
* 链模式可以提高功能的开发效率，降低开发成本，其简洁明了的风格深受开发者喜爱。
* 事件绑定在 Web 编程中是很重要的一部分，它是实现页面交互的纽带，然后很多开发
* 者为实现某些功能，肆无忌惮地绑定事件也会为页面造成很多负面作用。通过下章我们
* 将学习如何更好地解决这类问题。
*
* JavaScript 中的链模式的核心思想就是通过在对象中的每个方法调用执行完毕后返回
* 当前对象 this 来实现的。由于链模式是的代码紧凑简洁而高效，在工作中已经得到很
* 广泛的应用。当然当前主流代码库都以该模式作为自己的一种风格。例如 jQuery 等等。
* 所以熟知链模式的工作原理，在我们实际工作中是很有帮助的。
* */

var A = function() {

}

A.prototype = {
  length: 2,
  size: function() {
    return this.length
  }
}

var a = new A()
console.log(a.size()) // 2

console.log(A.size()) // error  A.size undefined
console.log(A().size()) // error  A() undefined


var A = function() {
  return B
}

var B = A.prototype = {
  length: 2,
  size: function() {
    return this.length
  }
}

// jQuery
var A = function() {
  return A.fn
}

A.fn = A.prototype = function() {}

// 返回的是一个对象，而非一个数组，所以提供一个init 方法
// 获取元素
var A = function(selector) {
  return A.fn.init(selector)
}

A.fn = A.prototype = {
  init: function(selector) {
    // 不能调用 A.prototype 中的其他方法
    //return document.getElementById(selector)
    this[0] = document.getElementById(selector)
    this.length = 1
    console.log('this === A.fn', this === A.fn) // new false | true
    console.log('this === A.prototype', this === A.prototype) // new false | false
    console.log('this = ', this) // new init{} | { init: {}, size, length}
    //return this
  },
  length: 2,
  size: function() {
    return this.length
  },
}

A.fn.init.prototype = A.fn

// 一个大问题
// 覆盖获取
var A = function(selector) {
  //return A.fn.init(selector)
  return new A.fn.init(selector)
}
// 方法丢失
