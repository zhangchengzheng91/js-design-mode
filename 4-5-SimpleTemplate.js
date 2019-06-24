/*
* 技巧型设计模式
* 卡片拼图 --- 简单模版模式（Simple Template）：通过格式化字符串拼凑出视图避免创建视图
* 时大量节点操作。优化内存开销
*
* 简单模版模式意在解决运用DOM 操作创建视图时造成资源消耗大、性能低下、操作复杂等问
* 题。用正则匹配方式去格式化字符串的执行的性能要远高于DOM操作拼接视图的执行性能，因
* 此这种方式常被用于大型框架（如MVC等）创建视图操作中。
* 简单模版模式主要包含三部分：字符串模版库、格式化字符串的方法、字符串拼接操作。然
* 而前者，在不同需求的实现中，视图往往是不一致的，因此字符串模版常常是多变的，如何
* 更好地创建模版，给了我们极大的灵活性，对于字符串格式化方法在一个项目中通常是不变
* 的，团队中所有成员都应该以同种方式去格式化模版才能使模版更易读。对于字符串拼接操
* 作，常常是随需求中的视图变化而变化，这里对拼接的灵活的运用可以使你的操作视图过程
* 更高效，模板服用率更高。
* */

// 命名空间 单体对象
var A = A || {}
// 主题展示区容器
A.root = document.getElementById('contaier')

// 模版渲染方法
A.formatString = function(str, data) {
  return str.replace(/\{#(\w)#\}/g, function(match, key) {
    return typeof data[key] === 'undefined' ? '' : data[key]
  })
}

// 模板生成器 name:标识
A.view = function(name) {
  // 模板库
  var v = {
    code: '<pre><code>{#code#}</code></pre>',
    img: '<img src="{#src#}" alt="{#alt#}" title="{#title}"/>',
    part: '<div id="{#id#}" class="{#class#}">{#part#}</div>',
    theme: [
      '<div>',
      '<h1>{#title}</h1>',
      '{#content#}',
      '</div>'
    ].join('')
  }
  // 如果一个参数是数组，则返回多行模板
  if (Object.prototype.toString.call(name) === '[object Array]') {
    // 模板缓存器
    var tpl = ''
    // 遍历标识
    for (var i = 0, len = name.length; i < len; i ++) {
      // 模板缓存器追加模板
      tpl += arguments.callee(name[i])
    }
    return tpl
  } else {
    return v[name] ? v[name] : `<${name}>{#name#}</${name}>`
  }
}


// 创建视图方法集合
A.strategy = {
  // 文字列表展示
  listPart: function(data) {
    var s = document.createElement('div') // 模块容器
    var ul = ''                           // 列表字符串
    var ldata = data.data.li              // 列表数据
    //var tpl = [                           // 模块模板
    //  '<h2>{#h2#}</h2>',
    //  '<p>{#p#}</p>',
    //  '<ul>{#ul#}</ul>'
    //].join('')
    var tpl = A.view(['h2', 'p', 'ul'])
    var liTpl = [                          // 列表模板
      '<li>',
      '<strong>{#strong#}</strong>',
      '<strong>{#strong#}</strong>',
      '</li>'
    ].join('')
    data.id && (s.id = data.id)            // 有 id 设置模块 id
    // 遍历列表数据
    for (var i = 0, len = ldata.length; i < len; i++) {
      // 如果有列表数据
      if (ldata[i].em || ldata[i].span) {
        // 列表字符串追加一项列表项
        ul += A.formatString(liTpl, ldata[i])
      }
    }
    // 装饰列表数据
    data.data.ul = ul
    // 渲染模板并插入模块当中
    s.innerHTML = A.formatString(tpl, data.data)
    // 渲染模块
    A.root.appendChild(s)
  },

  codePart: function() {},
  onlyTitle: function() {},
  guide: function() {},
  // .....
}
// 创建视图入口
A.init = function(data) {
  // 根据传输的视图类型创建视图
  this.strategy[data.type](data)
}
