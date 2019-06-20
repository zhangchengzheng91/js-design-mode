/*
* 技巧型设计模式
* 数据管理器 --- 数据访问对象模式（Data access Object - DAO）:抽象和封装对数据源的
* 访问和存储，DAO 通过对数据链接的管理方便对数据的访问和储存。
*
* 新功能用户引导，管理本地数据
*
*
* 数据访问对象（DAO）模式即是对数据库的操作（如简单的 CRUD 创建、读取、更新、删除）进
* 行封装，用户不必为操作数据库而烦恼，DAO已经为我们提供了简单而统一的操作接口。并且对于
* 使用者来说，不必了解 DAO 内部的操作是如何实现的，又是甚至不必了解数据库是如何操作的。
* 对于后端数据库来说（如MoongoDB),DAO 对象甚至会保留对数据库的链接，这样我们每次操作
* 数据库时不必一次次地向数据库发送链接请求。
*
* DAO 是一个对象，因此它封装了属性和方法，并通过这些属性和方法管理着数据库。因此有时
* 为了实现需求我们还可以对 DAO 对象进行扩展。但是更佳实践是对 DAO 做一层适用于你自己
* 的封装，这样在团队中不会影响到他人的使用。
* */

/*
* 本地存储类
* 参数 preId ： 本地存储数据库前缀
* 参数 timeSign ： 时间戳与存储数据之间的拼接符
*
* */

var BaseLocalStorage = function(preId, timeSign) {
  // 定义本地存储数据库前缀
  this.preId = preId
  // 定义时间戳与存储数据之间的拼接符
  this.timeSpin = timeSign || '|-|'
}

// 本地存储类原型方法
BaseLocalStorage.prototype = {
  // 操作状态
  status: {
    success: 0, // 成功
    failure: 1, // 失败
    overflow: 2, // 溢出
    timeout: 3  // 过期
  },
  // 保存本地存储链接
  storage: localStorage || window.localStorage,
  // 获取本地存储数据库数据真是字段
  getKey: function(key) {
    return this.preId + key
  },
  // 添加（修改）数据
  set: function(key, value, callback, time) {
    // 默认操作状态是成功
    var status = this.status.success
    // 获取真实字段
    var key = this.getKey(key)
    try {
      // 参数时间参数时获取时间戳
      time = new Date(time).getTime() || time.getTime()
    } catch(e) {
      // 为传入时间参数或者时间参数有误获取默认时间：一个月
      time = new Date().getTime() + 1000 * 60 * 60 * 24 * 31
    }
    try {
      // 向数据库中添加数据
      this.storage.setItem(key, time + this.timeSpin + value)
    } catch (e){
      // 移除失败，返回移除状态
      status = this.status.overflow
    }
    // 有回调函数则执行回调函数并传入参数操作状态，真实数据字段标识以及存储数据值
    callback && callback(this, status, key, value)
  },
  // 获取数据
  get: function(key, callback) {
    // 默认操作状态是成功
    var status = this.status.success
    // 获取真实字段
    var key = this.getKey(key)
    // 默认值为空
    var value = null
    // 时间戳与存储数据之间的拼接符长度
    var timeSignLen = this.timeSpin.length
    // 缓存当前对象
    var that = this
    // 时间戳与存储数据之间拼接符的起始位置
    var index
    // 时间戳
    var time
    // 最终获取的数据
    var result
    try {
      // 获取字段对应的数据字符串
      value = that.storage.getItem(key)
    }catch (e){
      // 获取失败则返回失败状态，数据结果为 null
      result = {
        status: that.status.failure,
        value: null,
      }
      // 执行回调并返回
      callback && callback(this, result.status, result.value)
      return result
    }
    // 如果成功获取数据字符串
    if (value) {
      // 获取时间戳与存储数据之间的拼接符起始位置
      index = value.indexOf(that.timeSpin)
      // 获取时间戳
      time = +value.slice(0, index)
      // 如果时间未过期
      if (new Date(time).getTime() > new Date().getTime() || time == 0) {
        // 获取数据结果（拼接符后面的字符串）
        value = value.slice(index + timeSignLen)
      } else {
        // 过期则结果为 null
        value = null
        // 设置状态未过期状态
        status = that.status.timeout
        // 删除该字段
        that.remove(key)
      }
    } else {
      status = that.status.failure
    }
    // 设置结果
    result = {
      status,
      value,
    }
    // 执行回调函数
    callback && callback(this, result.status, result.value)
    // 返回结果
    return result
  },
  // 删除数据
  remove: function(key, callback) {
    // 设置默认操作状态
    var status = this.status.failure
    // 获取实际数据字段名称
    var key = this.getKey(key)
    // 设置默认数据为空
    var value = null
    try {
      // 获取对应字段的数据
      value = this.storage.getItem(key)
    } catch (e){}
    // 如果数据存在
    if (value) {
      try{
        //删除数据
        this.storage.removeItem(key)
        // 设置操作成功
        status = this.status.success
      } catch (e){}
      // 执行回调，注意传入回调函数中的数据值：如果操作操作状态成功则返回真实的数据结果，否则返回空
      callback && callback(this, status, status > 0 ? null : value.slice(value.indexOf(this.timeSpin) + this.timeSpin.length))
    }
  }
}

var LS = new BaseLocalStorage('LS__')

LS.set('a', 'xiaoming', function() {
  console.log('set=', arguments)
})

LS.get('a', function() {
  console.log('get=', arguments)
})

LS.remove('a', function() {
  console.log('remove1-', arguments)
})

LS.remove('a', function() {
  console.log('remove2-', arguments)
})

LS.get('a', function() {
  console.log('get=', arguments)
})
