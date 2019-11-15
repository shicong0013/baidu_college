# 2019/11/15 Day19 找到那个DOM 历时2天
1 这是使用的方法都是通过`.`操作符访问，`.`左边是范围，`.`右边是属性。
  * `cont section = document.getElementById("sectionId");` //从整个页面范围内获取Id是`sectionId`的元素
  * `cont span = section.getEleamentsByTagName("span");` //从Id为`sectionId`的元素内获取所有标签名为`span`的元素节点  
  
2 函数的名称很直白的显示了作用和返回值
  * `querySelector`返回匹配到的第一个元素，而`querySelectorAll`多了一个'All'所有会返回匹配到的所有元素
  
3 返回值
 * 当返回DOM节点至少有一个时，返回值是一个类数组对象，相比于数组对象类数组对象多了一个`length`的属性，有些对数组使用的方法也无法直接使用
