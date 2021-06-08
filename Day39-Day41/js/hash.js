//hash模块
//分享或再次打开某个URL，需要从URL中读取到数据状态，并且进行页面呈现的还原
//需要记录的状态包括：产品的选择以及地域的选择
function getStatus () {
  //次函数用于获得当前选框的状态
  let box = document.querySelectorAll("input[type=checkbox]");
  let str = "";
  for (let i = 0; i < box.length; i++) {
    if (box[i].checked === true) {
      str += "1";
    } else {
      str += "0";
    }
  }
  return str;
}

function setCheckStatus () {
  //根据hash设置选框状态
  //默认选中第商品和地区第一个

  // if (location.hash === "") {
  //   location.hash = "reg=0100&pro=0100";
  // }
  let box = document.querySelectorAll("input[type=checkbox]");
  let str = location.search.slice(1);

  const params = new URLSearchParams(str);
  let s;
  s = params.get('reg');
  s = s + params.get('pro');
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      box[i].checked = true;
    } else if (s[i] === "0") {
      box[i].checked = false;
    }
  }

}
//设置哈希值
function setHash () {
  //设置hash
  let str = getStatus();
  //把地区和商品传入
  let reg = "reg=";
  reg += str.slice(0, 4);
  let pro = "pro=";
  pro += str.slice(4);
  //合并后设置hash
  str = reg + "&" + pro;
  //location.hash = str;
  return str;
}
//通过history保持浏览记录
function sethistory () {
  let str = "?" + setHash();

  //return location.href + str;

  history.pushState(null, null, str);

}

function hashchange () {
  //console.log(sethistory());
  //sethistory();
  setCheckStatus();
  createTable(getData(sourceData));
  drawCharts.drawGraph(getData(sourceData));//根据选框画图
  tableDisplay();//点击后合并单元格
}
checkWrapper.addEventListener("click", sethistory);
//window.addEventListener("hashchange", hashchange);

//触发前进或者后退时
window.addEventListener("popstate", function () {
  setCheckStatus();
  createTable(getData(sourceData));
  drawCharts.drawGraph(getData(sourceData));//根据选框画图
  tableDisplay();//点击后合并单元格
});

