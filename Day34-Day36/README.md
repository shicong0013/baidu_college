# 2020/8/23 Day34-Day36 我是精明的小卖家(二)  ORZ
* `svg`元素
  * js动态创建`svg`元素时不能用HTML方法，还需要而外传入svg dom命名空间
  * `let svgDoc = docemnet.createElementNS("http://www.w3.org/2000/svg", "svg");`
  * `"http://www.w3.org/2000/svg"`是svg dom的命名空间，`"svg"`是元素名称
  * 同一个`svg`元素下的子元素使用相同的命名空间
  * 清空`svg`元素画布可以使用`document.querySelector('svg').innerHTML = " ";`
* `canvas`元素
  * 没有设置高宽属性时会有默认大小，在css中设定高宽时只说按比例放大
  * `canvas`元素使用前必须先使用的方法`getContext()`
    * 此方法是用来渲染上下文(或者说是设置语境)对于2D图像来说参数为`2d`
    * `if(canvas.getContext) {let ctx = canvas.getContext('2D');}` 可以判断浏览器是否支持`canvas`
  * 绘制新路径时第一命令都是`beginPath()`,新建路径的起始点由`moveTo(x,x)`设定
  * 绘制图形时使用`fill()`方法会自动与起始点闭合，而绘制轮廓时需要手动使用`lineTo(x,x)`闭合路径
  * `canvas`元素从新设定高或宽就可以清空画布 
* `svg`或者`canvas`上绘制1px的横竖线条不清晰时左边便宜+-0.5
