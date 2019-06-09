/*
* 行为型设计模式
* 点钞机 --- 迭代器模式(Iterator):在不暴露对象内部结构的同时，可以顺序地访问聚合对象内部的元素。
*
* 通过迭代器我们可以顺利地访问一个聚合对象中的每一个元素。在开发中，迭代器极大简化了代码中的循环
* 语句，使代码结构清晰紧凑，然而这些简化了的循环语句实质上隐形地移动到了迭代器中。当然用迭代器去
* 处理一个对象使，我们只需提供处理的方法，而不必去关心对象的内部结构，这也解决了对象的使用者与对
* 象内部结构之间的耦合。当然迭代器的存在也为我们提供了操作对象的一个统一接口。
* */

var Iterator = function(items, container) {
  var container = container && document.getElementById(container) || document
  var items = container.getElementsByTagName(items);
  var length = items.length
  var index = 0
  var splice = [].splice()
  return {
    first: function() {
      index = 0
      return items[index]
    },
    second: function() {
      index = length - 1
      return items[index]
    },
    pre: function() {
      if (--index < 0) {
        return items[index]
      }
      index = 0
      return null
    },
    next: function() {
      if (++index < length) {
        return items[index]
      }
      index = length - 1
      return null
    },
    get: function(num) {
      index = num > 0 ? num % length : num % length + length
      return items[index]
    },
    dealEach: function(fn) {
      var args = splice.call(arguments, 1)
      for (var i = 0; i < length; i++) {
        fn.apply(items[i], args)
      }
    },
    dealItem: function(num, fn) {
      fn.apply(this.get(num), splice.call(arguments, 2))
    },
    exclusive: function(num, allFn, numFn) {
      this.dealEach(allfn)
      if (Object.prototype.toString.call(num) === '[object Array]') {
        for (var i = 0, len = num.length; i < len; i++) {
          this.dealItem(num[i], numFn)
        }
      } else {
        this.dealItem(num, numFn)
      }
    },
  }
}

var eachArray = function(arr, fn) {
  var length = arr.length
  for (var i = 0; i < length; i++) {
    if (fn.call(arr[i], i, arr[i]) === false) {
      break
    }
  }
}

var mapArray = function(arr, fn) {
  var result = []
  for (var i = 0; i < arr.length; i++) {
    result[i] = fn.call(arr[i], i, arr[i])
  }
  return result
}

for (var arr = [], i = 0; i < 5; i++) {
  arr[i] = i + 1
}

eachArray(arr, function(i ,data) {
  console.log(i, data)
})

mapArray(arr, function(item) {
  return item + '3'
})

A = {
  common: {},
  client: {
    user: {
      username: 'tom',
      uid: '123'
    }
  },
  server: {}
}

var AGetter = function(key) {
  if (!A) {
    return undefined
  }
  var result = A
  key = key.split('.')
  for (var i = 0; i < key.length; i++) {
    if (result[key[i]] !== undefined) {
      result = result[key[i]]
    } else {
      return undefined
    }
  }
  return result
}

username = AGetter('client.user.username') // tom
local = AGetter('server.lang.local') // undefined

ASetter = function(key, val) {
  if (!A) {
    return
  }
  var result = A
  var key = key.split('.')
  for (var i = 0, length = key.length; i < length - 1; i++) {
    if (result[key[i]] === undefined) {
      result[key[i]] = {}
    }
    if (!(result[key[i]] instanceof Object)) {
      throw Error('Error')
      return
    }
    result = result[key[i]]
  }
  return result[key[i]] = val
}

console.log(ASetter('client.module.news.sport', 'on'))
console.log(AGetter('client.module.news.sport'))
