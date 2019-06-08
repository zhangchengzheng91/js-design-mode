/*
* 观察者模式最主要的作用是解决类或对象之间的耦合，解耦两个相互以来的对象，使其依赖与观察者的
* 消息机制。这样对于任意一个订阅者对象来说，其他订阅者对象的改变不会影响到自身。对于每一个订
* 阅者来说，其自身即可以是消息的发出者也可以是消息的执行者，这都依赖于调用观察者对象的三种方
* 法（订阅消息、发布消息、注销消息）中的哪一种。
* 团队开发中，尤其是大型项目的模块化开发中，以为工程师很难做到熟知项目中的每个模块，此时为完
* 成一个涉及多模块调用的需求，观察者的优势就显而易见了，模块间的信息传递不必要相互引用其他模
* 块，只需要通过观察者模式注册或者发布消息即可。通过观察者模式工程师对功能的开发只需要按照给
* 定的消息格式开发各自的功能即可，而不必担忧其他人的模块。
* */


var Observer = (function () {
  var _message = {}
  return {
    get_message: function() {
      return _message
    },
    register: function(type, fn) {
      if (typeof _message[type] === 'undefined') {
        _message[type] = [fn]
      } else {
        _message[type].push(fn)
      }
    },
    fire: function(type, args = {}) {
      if (!_message[type]) {
        return
      }
      var events = {
        type,
        args
      }
      const length = _message[type].length
      for (let i = 0; i < length; i++) {
        _message[type][i].call(this, events)
      }
    },
    remove: function(type, fn) {
      const message = _message[type]
      if (Array.isArray(message)) {
        const length = message.length
        for (let i = 0; i < length; i++) {
          if (message[i] === fn) {
            message.splice(i, 1)
          }
        }
      }
    }
  }
})()

// 对象间解耦
function Student(result) {
  var that = this
  that.result = result
  that.say = function() {
    console.log(that.result)
  }
}

Student.prototype.answer = function(question) {
  Observer.register(question, this.say)
}

Student.prototype.sleep = function(question) {
  console.log(this.result + ' ' + question)
  Observer.remove(question, this.say)
}

function Teacher() {

}

Teacher.prototype.ask = function(qusetion) {
  console.log('the qusetion is', qusetion)
  Observer.fire(qusetion)
}

const student1 = new Student('student1 answer')
const student2 = new Student('student2 answer')
const student3 = new Student('student3 answer')

student1.answer('question 1-1')
student1.answer('question 1-2')
student2.answer('question 2-1')
student2.answer('question 2-2')
student3.answer('question 3-1')
student3.answer('question 3-2')

const teacher = new Teacher()

teacher.ask('question 1-1')
// the qusetion is question 1-1
// student1 answer
teacher.ask('question 3-1')
// the qusetion is question 3-1
// student3 answer


