# 2019/10/13 Day16 感受JS的乐趣 历时2天
1 JS脚本加载
  * `async` 外部脚本属性，脚本无需等待页面解析且无依赖独立运行时使用，不会因为加载脚本而组织页面的加载，但是当有多个外部脚本时无法控制脚本的加载顺序
  * `defer` 外部脚本属性，需要依赖解析且依赖于其他脚本时使用，加载时按照从上到下的顺序依次加载
  * 浏览器会按照从上到下的顺序执行JS代码，要注意书写顺序，内部脚本时建议吧脚本置于'<body>'底部可以让页面更快显示
  
2 多单词名称
  * 连字符: `first-name`
  * 下划线: `first_name`
  * 小写驼峰法: `firstName` 首单词小写后面单词的第一个字母大写
  
3 声明变量
  * `var` 最初创建JavaScript时设计的关键字字，多次声明相同名称的变量是不会报错，这样会让代码看起来困惑
  * `let` 现代版JavaSript新创建的关键字，第二次声明相同名称变量时会报错，推荐使用
  * `const` 声明常量时推荐使用
