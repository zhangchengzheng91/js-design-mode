/*
* 技巧型设计模式
* 异国战场 --- 参与者模式（participator）:在特定的作用域中执行给定的函数，并将参数
* 原封不动地传递。
*
* 参与者模式实质上是两种技术的结晶，函数绑定和函数柯里化。早期浏览器中并未提供bind
* 方法，因此聪明的工程师们为了使添加的事件能够移除，事件回调函数中能够访问到事件源，
* 并且可以向事件回调函数中传入自定义数据，才发明了函数绑定与柯里化的技术。
* 对于函数绑定，它将函数以函数指针（函数名）的形式传递，使函数在被绑定的对象作用域
* 中执行，因此执行中可以顺利地访问到对象内部的数据，由于函数绑定构造复杂，执行时需
* 要消耗更多的内存，因此执行速度上要稍慢一些。不过相对于解决的问题来说这种消耗还是
* 值得的，因此它常用于事件，setTimeout 或 setInterval 等一步逻辑的回调函数。
*
* 对于函数柯里化即是将受多个参数的函数转化为接受一部分参数的新函数，余下的参数保存
* 下来，当函数调用时，返回传入的参数与保存的参数共同执行的结果。通常保存下来的参数
* 保存于闭包内，因此函数柯里化的实现要消耗一定的资源。函数的柯里化有点类似函数的重
* 载，不同点是类的重载是同一个类对象，函数的柯里化是两个不同的函数。随着函数柯里化
* 的发展，现在又衍生出一种反柯里化的函数，其目的是方便我们对方法的调用，它的实现如
* 下：
* */
// 反柯里化
Function.prototype.uncurry = function() {
  // 保存当前对象
  var that = this
  return function() {
    return Function.prototype.call.apply(that, arguments)
  }
}

// 当用 Object.prototype.toString 校验对象类型时：
var toString = Object.prototype.toString.uncurry()
console.log(toString(function() {}))
console.log(toString([]))

// 用数组的 push 方法为对象添加数据成员：
// 保存数据 push 方法
var push = [].push.uncurry()
// 创建一个对象
var demoArr = {}
push(demoArr, '第一个成员', '第二个成员')
console.log('demoArr=', demoArr)

// 事件绑定方法
A.event.on = function(dom, type, fn, data) {
  if (dom.addEventListener) {
    dom.addEventListener(type, function(e) {
      fn.call(dom, e, data)
    }, false)
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type. fn)
  } else {
    dom['on' + type] = fn
  }
}

// 函数绑定 bind
function bind(fn, context) {
  return function() {
    return fn.apply(context, arguments)
  }
}

// 测试对象
var demoObj = {
  title: '这是一个例子'
}
// 测试方法
function demoFn() {
  console.log(this.title)
}

var bindFn = bind(demoFn, demoObj)

demoFn()
bindFn()

/*
* 函数的柯里化思想是对函数的参数分割，有点像其他面向语言中的类的多态，就是根据传递的
* 参数不同，可以让一个函数存在多种状态，只不过函数柯里化处理的是函数，因此要实现函数
* 的柯里化是要以函数为基础的，借助柯里化器伪造其他函数，让这些伪造的函数在执行时调用
* 这个基函数完成不同的功能。
* */
// 函数柯里化
function curry(fn) {
  // 缓存数组 Slice 方法
  var Slice = [].slice
  // 从第二个参数开始截取函数
  var args = Slice.call(arguments, 1)
  // 闭包返回新函数
  return function() {
    // 将参数（类数组）转化为数组
    var addArgs = Slice.call(arguments)
    // 拼接参数
    var allArgs = args.concat(addArgs)
    // 返回新函数c,
    return fn.apply(null, allArgs)
  }
}

function add(num1, num2) {
  return num1 + num2
}

function add5(num) {
  return 5 + num
}

console.log(add(1, 2))
console.log(add5(6))

var add5 = curry(add, 5)
console.log(add5(7))

var add7and8 = curry(add, 7, 8)
console.log(add7and8)

// 重写 bind
function bind(fn, context) {
  var Slice = Array.prototype.slice
  var args = Slice.call(arguments, 2)
  return function() {
    var addArgs = Slice.call(arguments)
    var allArgs = addArgs.concat(args)
    return fn.apply(context, allArgs)
  }
}

var demoData1 = {
  text: '这是第一组数据'
}
var demoData2 = {
  text: '这是第二组数据'
}
