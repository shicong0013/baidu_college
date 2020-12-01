# 2020/11/30 Day36-Day37 我是精明的小卖家(三)  T_T ORZ
* `localStorage`数据写入 `localStorage.setItem("key", value)`,读取`localStorage.getItem("key")`
  * `localStorage`保存的数据为字符串类型，无法保存数组与对象
  * 如果需要保存对象类型数据时，需要先通过JSON.stringify(data)方法，转换为字符串保存
  * 读取时再通过JSON.parse(data)转换为对象
