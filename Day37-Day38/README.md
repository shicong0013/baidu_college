# 2020/11/30 Day36-Day37 我是精明的小卖家(三)  T_T ORZ
* `localStorage`数据写入 `localStorage.setItem("key", value)`,读取`localStorage.getItem("key")`
  * `localStorage`保存的数据为字符串类型，无法保存数组与对象
  * 如果需要保存对象类型数据时，需要先通过JSON.stringify(data)方法，转换为字符串保存
  * 读取时再通过JSON.parse(data)转换为对象
* `select()`方法可以自动选中输入框的内容
* `focus()`方法可以获得文本框的焦点(焦点在文本框起始位置)
* `onblur()`方法可以在离开文本框时触发
* `canvas.save()`方法是保存当前画布的样式，没有参数
* `canvas.restore()`方法是返回上次save()时的状态，没有参数
* `save()`与`restor()`是成对出现的，执行多次restore()和执行一次没有区别
