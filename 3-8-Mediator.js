/*
* 行为型设计模式
* 媒婆 --- 中介者模式（Mediator）:通过中介者对象封装一些列对象之间的交互，使对象之间不再相互
* 引用，降低他们之间的耦合。有时和中介者对象也看可以改变对象之间的交互。
*
* 观察者模式和中介者模式都是通过消息的收发机制实现的
* 观察者模式是双向通信
* 中介者模式是单向通信
*
* 在观察者模式中，一个对象即可以是消息的发送者也可以是消息的接收者，他们之间信息交流依托于消息
* 系统实现解耦。
* 而中介者模式消息的发送方只有一个，就是中介者对象，而且中介者对象不能订阅消息，只有那些活跃对
* 象（订阅者）才可订阅中介者的消息，当然你也可以看作是将消息系统封装在中介者对象内部，所以中介
* 者对象只能是消息的发送者。
*
* 同观察者模式一样，中介者模式的主要业务也是通过模块间或者对象间的复杂通信，来解决模块间或者对
* 象间的耦合。对于中介者对象的本质是分装多个对象的交互，并且这些对象的交互一般都是在中介者内部
* 实现的。
* 与外观模式的封装特性相比，中介者模式对多个对象交互地封装，且这些对象一般处于同一层面上，并且
* 封装的交互在中介者内部，而外观模式封装的目的是为了提供更简单的易用接口，而不会添加其他功能。
*
* 与观察者模式相比，虽然两种模式都是通过消息传递实现对象间或者模块间的解耦。观察者模式中订阅者
* 是双向的，即可以是消息的发布者，也可以是消息的订阅者。而在中介者模式中，订阅者是单向的，只能
* 是消息的订阅者。而消息统一由中介对象发布。所有的订阅者对象间接地被中介者管理。
* */

var Mediator = (function() {
  var _msg = {}
  return {
    register: function(type, action) {
      console.log(type)
      if (_msg[type]) {
        _msg[type].push(action)
      } else {
        _msg[type] = [action]
      }
      console.log(_msg)
    },
    send: function(type) {
      if (_msg[type]) {
        _msg[type].forEach(item => {
          item && item()
        })
      }
    },
    get: function() {
      return _msg
    }
  }
})()

Mediator.register('demo', function() {
  console.log('first')
})
Mediator.register('demo', function() {
  console.log('second')
})
Mediator.send('demo')

var showHideNavWidget = function(mod, tag, showOrHide) {
  var mod = document.getElementById(mod)
  var tag = document.getElementsByTagName(tag)
  showOrHide = (!showOrHide || showOrHide === 'hide') ? 'hidden' : 'visible'
  tag.forEach(item => {
    item.style.visibility = showOrHide
  })
}

(function() {
  Mediator.register('hideAllNavNum', function() {
    showHideNavWidget('collection_nav', 'b', false)
  })
  Mediator.register('showAllNavNum', function() {
    showHideNavWidget('collection_nav', 'b', true)
  })
  Mediator.register('hideAllNavUrl', function() {
    showHideNavWidget('collection_nav', 'b', false)
  })
  Mediator.register('showAllNavUrl', function() {
    showHideNavWidget('collection_nav', 'b', true)
  })
})

(function() {
  var hideNum = document.getElementById('hide_num')
  var hideUrl = document.getElementById('hide_url')
  hideNum.onchange = function() {
    if (hideNum.checked) {
      Mediator.send('hideAllNavNum')
    } else {
      Mediator.send('showAllNavNum')
    }
  }
  hideUrl.onchange = function() {
    if (hideUrl.checked) {
      Mediator.send('hideAllNavUrl')
    } else {
      Mediator.send('showAllNavUrl')
    }
  }
})
