/*
* 命令模式（Command）:将请求与实现解耦并封装成独立对象，从而使不同的请求对客户端实现参数化。
*
* 命令模式是将创建模块的逻辑封装在一个对象里，这个对象提供一个参数化的请求接口，通过这个接口
* 并传递一些参数实现调用命令对象内部中的一些方法。
*
* 命令模式是将执行的命令封装，解决命令的发起者与命令的执行者之间的耦合。每一条命令实质上是一
* 个操作。命令的使用者不必要了解命令的执行者（命令对象）的命令接口是如何实现的、命令是如何接
* 受的、命令是如何执行的。所有的命令都被存储在命令对象中。
*
* 命令模式的优点自然是解决命令使用者之间的耦合。新的命令很容易加入到命令系统中，供使用者使用。
* 命令的使用具有一致性，多数的命令在一定程度上是简化操作方法的的使用的。
*
* 命令模式是对一些操作的封装，这就造成每执行一次操作都要调用一次命令对象，增加了系统的复杂度。
* */

var viewCommand = (function() {
  var template = {
    product: [
      '<div>',
        '<img src="{#src#}" />',
        '<p>{#text#}</p>',
      '</div>'
    ].join(''),
    title: [
      '<div class="title">',
        '<div class="main">',
            '<h2>{#title#}</h2>',
            '<p>{#tips#}</p>',
        '</div>',
      '</div>'
    ].join('')
  }
  var html = ''
  function formatString(str, obj) {
    return str.replace(/\{#(\w+)#\}/g, function(match, key) {
      return obj[key]
    })
  }
  var Action = {
    create: function(data, view) {
      var length = data.length
      if (length) {
        for (var i = 0; i < length; i++) {
          html += formatString(template[view], data[i])
        }
      } else {
        html += formatString(template[view], data)
      }
    },
    display: function(container, data, view) {
      if (data) {
        this.create(data, view)
      }
      document.getElementById(container).innerHTML = html
      html = ''
    }
  }
  return function excute(msg){
    msg.param = Object.prototype.toString.call(msg.param) === '[object Array]' ? msg.param : [msg.param]
    Action[msg.command].apply(Action, msg.param)
  }
})()

var productData = [
  {
    src: 'command/02.jpg',
    text: 'flower'
  }, {
    src: 'command/03.jpg',
    text: 'sun'
  }, {
    src: 'command/04.jpg',
    text: 'green tree'
  }
]

var titleData = {
  title: 'sun title',
  tips: 'warm'
}

var container = document.createElement('div')
container.id = 'title'
document.body.appendChild(container)

var containerProduct = document.createElement('div')
containerProduct.id = 'product'
document.body.appendChild(containerProduct)

viewCommand({
  command: 'display',
  param: ['title', titleData, 'title']
})

viewCommand({
  command: 'display',
  param: ['product', [{
    src: 'command/q.jpg',
    text: 'sunflower'
  }], 'product']
})

viewCommand({
  command: 'display',
  param: ['product', productData, 'product']
})

var CanvasCommand = (function() {
  var canvas = document.getElementById('canvas')
  var ctx = canvas.getContext('2d')
  var Action = {}
  return function excute(msg) {
    if (!msg) {
      return
    }
    Action[msg.command].apply(Action, msg.param)
  }
})()

