# 2021/06/08 Day39-Day41 我是精明的小卖家（四） ORZ ORZ ORZ
* `Location`返回当前URL的信息
  * `Location.hash`返回当前网页从#开始的URL
  * `#`代表网页中的一个位置，后面的字符串为位置标识符
  * 改变`#`后面的字符不会触发网页重载，只会移动到相应位置
  * `window.location.hash`这个属性可读可写，读取时可以用来判断网页的状态是否改变，写入时会在不重载网页的前提下创造一条访问历史记录
  * `onhashchange`事件在hash值发生变化时触发
* `getElementsByTagName()`返回的时指定标签的集合，如果标签只有一个需要加上[0]调用这个标签
* `URLSearchParams`接口定义了一些实用的方法来处理URL的字符串查询
  * `URLSearchParams.get()`获取指定搜索参数的第一个值  
  const params = new URLSearchParams("#reg=0100&pro=0110")  
  params.get('pro'); // 返回0110  
  prarms.get('reg'); // 返回null  
  prarms.get('#reg'); // 返回0100  
* `history`
  * `history.pushState(state,title,URL)`替换当前URL，且向浏览器历史添加一个状态  
  `state`可以为空({},null)，`title`通常忽略(null),`URL`新的历史记录地址，可以是相对地址
  * `history.replaceState(state,title,URL)`替换当前URL，且不会在history中留下记录
* `popstate`
  * 在点击前进或者后退时触发，且在`history.pushState`或者`history.replaceState`形成的历史节点中前进后退
  * 使用`history.pushState`或者`history.replaceState`不会触发`popstate`事件
  * 用法举例  
  ```
  window.addEventListener("popstate", function() {
    var currentState = history.state;
    
  });
  ```
  ```
  window.onpopstate = function(event) {
    console.log(event.state);
    console.log(window.history.state);
  };
  ```
    
