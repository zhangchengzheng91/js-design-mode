/*
* 技巧型设计模式
* 入场仪式 --- 等待者模式（waiter）：通过对多个异步进程监听，未触发未来发生的动作。
*
* 等待者模式意在处理耗时比较长的操作，比如canvas 中遍历并操作一张大图中的每一个像
* 素点、定时器操作、异步请求等。等待者模式为我们提供了一个抽象的非阻塞的解决方案，
* 通过创建 Promise 对象，对耗时逻辑的未来变化返回一个响应，通过在等待者对象内部捕
* 获这些响应信息，为耗时较长的操作提供了回调方案，使我们可以捕获耗时操作完成时或中
* 断时的状态并执行相应的回调方案。
* */

// 等待对象
var Waiter = function() {
  // 注册等待对象容器
  var dfd = []
  // 成功回调方法容器
  var doneArr = []
  // 失败回调方法容器
  var failArr = []
  // 缓存 Array 方法 slice
  var slice = Array.prototype.slice
  // 保存当前等待者对象
  var that = this

  // 监控对象类
  var Promise = function() {
    // 监控对象是否解决成功状态
    this.resolved = false
    // 监控对象是否解决失败状态
    this.rejected = false
  }

  // 监控对象类原型方法
  Promise.prototype = {
    resolve: function() {
      // 设置当前监控对象解决成功
      this.resolved = true
      // 如果没有监控对象则取消执行
      if (!dfd.length) {
        return
      }
      // 遍历所有的监控对象
      for (var i = dfd.length - 1; i >= 0; i--) {
        if (dfd[i] && !dfd[i].resolved || dfd[i].rejected) {
          return
        }
        // 清除监控对象
        dfd.splice(i, 1)
      }
      // 执行解决成功回调方法
      _exec(doneArr)
    },
    reject: function() {
      // 设置当前监控对象解决失败
      this.rejected = true
      // 如果没有监控对象则取消执行
      if (!dfd.length) {
        return
      }
      // 清除所有监控对象
      dfd.splice(0)
      // 执行解决成功回调方法
      _exec(failArr)
    }
  }

  // 创建监控对象
  that.Deferred = function() {
    return new Promise()
  }

  // 回调执行方法
  function _exec(arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
      try {
        // 执行回调函数
        arr[i] && arr[i]()
      }catch (e){

      }
    }
  }

  // 监控异步方法，参数：监控对象
  that.when = function() {
    // 设置监控对象
    console.log('slice=', slice)
    console.log('arguments=', arguments)
    dfd = slice(arguments)
    // 获取监控对象数组长度
    var i = dfd.length
    // 向前遍历监控对象，最有一个监控对象的索引值为 length - 1
    for (i--; i >= 0; i--) {
      // 如果不存在监控对象，或者监控对象已经解决，或者不是监控对象
      if (!dfd[i] || dfd[i].resolved || dfd[i].rejected || !dfd[i] instanceof Promise) {
        // 清理内存 清除当前监控对象
        dfd.splice(i, 1)
      }
    }
    // 返回等待者对象
    return that
  }

  // 解决成功回调函数添加方法
  that.done = function() {
    // 向成功回调函数容器中添加回调方法
    doneArr = doneArr.concat(slice.call(arguments))
    // 返回等待者对象
    return that
  }

  // 解决失败回调函数添加方法
  that.fail = function() {
    // 向失败回调函数容器中添加回调方法
    failArr = failArr.concat(slice(arguments))
    // 返回等待者对象
    return that
  }
}

var waiter = new Waiter()
// 第一个彩蛋，5秒后停止
var first = function() {
  // 创建监听对象
  var dtd = waiter.Deferred
  setTimeout(() => {
    console.log('first finish')
    // 发布解决成功的消息
    dtd.resolve()
  }, 5000)
  return dtd
}()

// 第二个彩蛋，10秒后停止
var second = function() {
  // 创建监听对象
  var dtd = waiter.Deferred()
  console.log('dtd=', dtd)
  setTimeout(() => {
    console.log('second finish')
    // 发布解决成功消息
    dtd.resolve()
  }, 10000)
  return dtd
}()

waiter
  // 监听两个彩蛋
.when(first, second)
  // 添加成功回调函数
.done(() => {
  console.log('success')
}, () => {
  console.log('success again')
})
  // 添加失败回调函数
.fail(() => {
  console.log('fail')
})
