# 2020/8/2 Day31-Day33 我是精明的小卖家(一) 历时: ？？？
* 把不同的功能封装到不同的函数真的很重要，不然就是在写BUG！
* 流程图很重要可以理清思路
* 引用外部JS文件是从上至下加载，调用要最后添加
* `childNodes`会返回所有节点包括文本节点，`children`则只会返回元素节点(推荐使用)
* 删除全部子节点可以用while循环`node.removeChild(node.firstChild)`,条件为`node.hasChildNodes()`如果存在子节点会返回true，否则false
