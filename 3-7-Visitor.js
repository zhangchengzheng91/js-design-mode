/*
* 驻华大使 --- 访问者模式（Visitor）：针对于对象结构中的元素，定义在不改变该对象的前提下访问结构中元素的
* 新方法。
*
* 访问者模式的思想就是说我们在不改变操作对象的同时，为它添加新的操作方法，来实现对操作对象的访问。
*
* call 和 apply 能够改变函数执行时的作用域，这正式访问模式的精髓。
*
* 访问者模式解决数据与数据的操作方法之间的耦合，将数据的操作方法独立于数据，使其可以自由演变。
* 因此访问者更适合那些数据稳定，但是数据的操作方法易变的环境下。因此当操作环境改变时，可以自由
* 修改操作方法以适应操作环境，而不用修改愿数据，实现操作方法的扩展。同时对于同一个数据，它可以
* 被多个访问对象所访问，这极大增加了操作数据的灵活性。
* */

function bindEvent(dom, type, fn, data) {
  var data = data || {}
  dom.attachEvent('on' + type, function(e) {
    fn.call(dom, e, data)
  })
}

var Visitor = (function() {
  return {
    splice: function() {
      var args = Array.prototype.splice.call(arguments, 1)
      return Array.prototype.splice.apply(arguments[0], args)
    },
    push: function() {
      var length = arguments[0].length || 0
      var args = this.splice(arguments, 1)
      arguments[0].length = length + arguments.length - 1
      return Array.prototype.push.apply(arguments[0], args)
    },
    pop: function() {
      return Array.prototype.pop.apply(arguments[0])
    },
    prop: [0, 1, 2, 3]
  }
})()

var a = new Object()
console.log(a.length)
Visitor.push(a, 1, 2, 3, 4)
console.log(a.length)
Visitor.push(a, 4, 5, 6)
console.log(a)
