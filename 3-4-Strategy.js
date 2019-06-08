/*
* 行为型设计模式
*
* 活诸葛 --- 策略模式（Strategy）：将定义的一组算法封装起来，使其相互之间可以替换。封装的算法
* 具有一定的独立性，不会随客户端变化而变化。
* 策略模式与状态模式很像，它也是在内部封装一个对象，然后通过返回的接口对象实现对内部对象的调用，
* 不同点是，策略模式不需要管理状态，状态间没有任何依赖，策略之间可以互相替换，在策略对象内部保存
* 的是一些算法。
*
* 策略模式最主要的特色是创建一系列策略算法，每组算法处理的业务都是相同的，只是处理的过程或者处理
* 的结果不一样，所以他们又是可以相互替换的，这样就解决了算法与使用者之间的耦合。在测试层面上讲，
* 由于每组算法相互之间的独立性，该模式更方便于对每组算法进行单元测试，保证算法质量。
* 对策略模式的优点可以归纳为3点：
* 1、策略模式封装了一组代码簇，并且封装的代码之间相互独立，便于对算法的重复利用，提高了算法的复用率
* 2、策略模式与继承相比，在类的继承中继承的方法是封装在类中，因此在需求很多算法时，就不得不创建出多
* 余类，这样会导致算法与算法的使用者耦合在一起，不利于算法的独立演化，并且在类的外部改变类的算法难度
* 也是极大的
* 3、同状态模式一样，策略模式也是一种优化分支判断语句模式，采用策略模式对算法封装使得算法更有利于维护。
*
* 当然策略模式也有其自身的缺点。由于选择哪种算法的决定权在用户，所以对用户来说就必须了解每种算法的实现。
* 这就增加了用户对策略对象的使用成本。其次，由于每种算法间相互独立。这样对于一些复杂的算法处理相同逻辑
* 的部分无法实现共享，这就会造成一些资源的浪费。可以通过享元模式来解决。
*
* 对于分支语句的优化，目前为止我们已经学习了3中模式，分别为工厂方法模式、状态模式、策略模式。
* 对于工厂方法模式来说，它是一种创建型模式，他的最终目标是创建对象。
* 状态模式和策略模式都是行为性模式，不过在状态模式中，其核心是对状态的控制来决定表现行为，所以状态之间
* 通常是不能相互替代的。负责将产生不同的行为结果。
* 而策略模式的核心是算法，由于每种算法要处理的业务逻辑相同，因此他们可以相互替换，当然策略模式并不关心
* 使用者环境，应为同一种策略模式最终产出的结果是一定的。
* */

// 价格对象策略
var PriceStrategy = (function() {
  var strategy = {
    return30: function(price) {
      price = parseInt(price)
      return price + parseInt(price / 100) * 30
    },
    return50: function(price) {
      price = parseInt(price)
      return price + parseInt(price / 100) * 50
    },
    percent90: function(price) {
      price = parseInt(price)
      return price * 100 * 90 / 10000
    },
    percent80: function(price) {
      price = parseInt(price)
      return price * 100 * 80 / 10000
    },
    percent50:  function(price) {
      price = parseInt(price)
      return price * 100 * 50 / 10000
    }
  }
  return function(algorithm, price) {
    return strategy[algorithm] && strategy[algorithm](price)
  }
})()

var price = PriceStrategy('percent50', 500)
console.log(price)
