/*
* 超级玛丽 --- 状态模式（State）：当一个对象的内部状态发生改变时，会导致其他行为的改变，
* 这看起来像是改变了对象。
* 对于状态模式，主要目的就是将条件判断的不同结果转化为状态对象内部状态，既然是状态对象的
* 内部状态，所以一般作为状态对象内部的私有变量，然后提供一个能够调用对象内部状态的接口方
* 法对象。这样当我们需要增加、修改、调用、删除某种状态方法是就会很容易，也方便了我们对状
* 态对象中内部状态的管理。
*
* 状态模式既是解决程序中臃肿的分支判断语句问题，将每个分支转化为一种状态独立出来，方便每
* 种状态的管理又不至于每次执行时遍历所有分支。在程序中到底产出那种行为结果，决定于选择那
* 种状态，而选择那种状态又是在程序运行时决定的。当然状态模式最终的目的即是简化分支判断流
* 程。
* */

// 投票结果状态对象
var ResultState = function() {
  var States = {
    state0: function() {
      console.log('state0')
    },
    state1: function() {
      console.log('state1')
    },
    state2: function() {
      console.log('state2')
    },
    state3: function() {
      console.log('state3')
    },
    state4: function() {
      console.log('state4')
    },
    state5: function() {
      console.log('state5')
    },
  }
  function show(result) {
    States['state' + result] && States['state' + result]()
  }
  return {
    show: show
  }
}

ResultState().show(3)

// 创建超级玛丽状态类
var MarryState = function() {
  var _currentState = {}
  // 动作与状态方法映射
  var states = {
    jump: function() {
      console.log('jump')
    },
    move: function() {
      console.log('move')
    },
    shoot: function() {
      console.log('shoot')
    },
    squat: function() {
      console.log('squat')
    }
  }
  // 动作控制类
  var Action = {
    changeState: function() {
      var arg = arguments
      _currentState = {}
      var length = arg.length
      if (length) {
        for (var i = 0; i < length; i++) {
          _currentState[arg[i]] = true
        }
      }
      return this
    },
    goes: function() {
      console.log('触发一次动作')
      const keys = Object.keys(_currentState)
      keys.forEach(item => {
        states[item] && states[item]()
      })
      return this
    }
  }
  return {
    change: Action.changeState,
    goes: Action.goes
  }
}

MarryState()
.change('jump', 'shoot')
.goes()
.goes()
.change('shoot')
.goes()
