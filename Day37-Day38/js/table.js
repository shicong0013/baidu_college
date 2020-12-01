let tableWrapper = document.getElementById("table-wrapper");
//渲染表格
function createTable (data) {
  // while(tableBox.hasChildNodes()) {
  //     tableBox.removeChild(tableBox.firstChild);
  // }
  tableWrapper.innerHTML = ""; //清空
  let table = document.createElement("table");
  table.setAttribute("id", "myTable");
  let thead = document.createElement("thead");
  //生成表头
  thead.appendChild(createThead());
  table.appendChild(thead);
  let tbody = document.createElement("tbody");
  tbody.setAttribute('id', 'tbody');
  //生成表格主体
  table.appendChild(tbody);
  for (let i = 0; i < data.length; i++) {//根据长度生成行数
    let tBodyTr = document.createElement("tr");
    tbody.appendChild(tBodyTr);
    for (let x in data[i]) {//依次生成商品地区和销售数量
      if (x == "product" || x == "region") {
        let tBodyTd = document.createElement("td");
        tBodyTd.innerText = data[i][x];
        tBodyTr.appendChild(tBodyTd);
      } else {//为销售数据添加事件
        for (let y = 0; y < data[i][x].length; y++) {
          let tBodyTd = document.createElement("td");
          let inputData = document.createElement("input");//修改时显示的数据
          let inputConfirm = document.createElement("input");//确认按钮
          let inputCancel = document.createElement("input");//取消按钮
          let img = document.createElement("img");
          let textCont = document.createTextNode(data[i][x][y]);//无焦点时显示内容

          img.setAttribute("src", "img/edit.png");
          img.setAttribute("alt", "编辑");
          img.setAttribute("width", "15px");
          img.setAttribute("height", "15px");
          inputConfirm.setAttribute("type", "button");
          inputConfirm.setAttribute("value", "确定");
          inputConfirm.setAttribute("class", "confirm");
          inputCancel.setAttribute("type", "button");
          inputCancel.setAttribute("value", "取消");
          inputCancel.setAttribute("class", "cancel");
          inputData.setAttribute("type", "text");
          inputData.setAttribute("value", data[i][x][y]);
          inputData.setAttribute("class", "inputData");
          tBodyTd.appendChild(inputConfirm);
          tBodyTd.appendChild(inputCancel);
          tBodyTd.appendChild(inputData);
          tBodyTd.appendChild(img);
          tBodyTd.appendChild(textCont);

          tBodyTr.appendChild(tBodyTd);

          //点击图片后显示输入框和按钮
          img.onclick = function (e) {
            let target = e.target;
            //显示确认按钮
            target.parentElement.children[0].setAttribute("style", "display:block");
            //显示取消按钮
            target.parentElement.children[1].setAttribute("style", "display:block");
            //显示输入框、获得输入框焦点、选中输入框内容
            target.parentElement.children[2].setAttribute("style", "display:block");
            target.parentElement.children[2].focus();
            target.parentElement.children[2].select();
            //隐藏图片
            target.parentElement.children[3].setAttribute("style", "display:none");
          }
          //点击确认
          inputConfirm.onclick = function (e) {
            let target = e.target;
            //暂存表格数据
            let temp = target.parentElement.textContent;
            if (HtmlUtil.isNumber(target.parentElement.children[2].value)) {
              target.parentElement.children[0].setAttribute("style", "display:none");
              target.parentElement.children[1].setAttribute("style", "display:none");
              target.parentElement.children[2].setAttribute("style", "display:none");
              target.parentElement.children[3].setAttribute("style", "display:block");

              let newData = {};
              let sale = [];
              let tr = target.parentElement.parentElement;
              let inputData = tr.getElementsByClassName("inputData");
              if (table.rows[0].cells[0].innerText == "商品") {
                newData.product = tr.cells[0].innerText;
                newData.region = tr.cells[1].innerText;
                for (let i = 0; i < inputData.length; i++) {
                  //输入值为字符串需转换
                  sale.push(Number(inputData[i].value));
                }
                newData.sale = sale;
              }
              //保存新数据至本地
              storageNewData(newData); //localStorage.js
            } else {
              alert("请输入数字");
              target.parentElement.children[2].value = temp;
            }
            //重新渲染表格
            createTable(getData(sourceData)); //getData.js
            tableDisplay();
          }
          //点击取消
          inputCancel.onclick = function (e) {
            let target = e.target;
            let temp = target.parentElement.textContent;
            target.parentElement.children[0].setAttribute("style", "display:none");
            target.parentElement.children[1].setAttribute("style", "display:none");
            target.parentElement.children[2].setAttribute("style", "display:none");
            target.parentElement.children[3].setAttribute("style", "display:block");
            target.parentElement.children[2].value = temp;
          }
          //输入框监听按键
          inputData.onkeydown = function (e) {
            if (e.keyCode == "27") { // esc
              this.parentElement.children[0].setAttribute("style", "display:none");
              this.parentElement.children[1].setAttribute("style", "display:none");
              this.parentElement.children[2].setAttribute("style", "display:none");
              this.parentElement.children[3].setAttribute("style", "display:block");
            }
            if (e.keyCode == "13") { //enter
              if (!HtmlUtil.isNumber(e.parentElement.children[2].value)) {
                alert("请输入数字");
                this.parentElement.children[2].focus();//获得输入框焦点
                this.parentElement.children[2].select();//选中输入框内容
              } else {
                this.parentElement.children[0].setAttribute("style", "display:none");
                this.parentElement.children[1].setAttribute("style", "display:none");
                this.parentElement.children[2].setAttribute("style", "display:none");
                this.parentElement.children[3].setAttribute("style", "display:block");

                let newData = {};
                let sale = [];

                let tr = e.target.parentElement.parentElement;
                let inputData = tr.getElementsByClassName("inputData");
                if (table.rows[0].cells[0].innerHTML == "商品") {
                  newData.product = tr.cells[0].innerText;
                  newData.region = tr.cells[1].innerText;
                } else {
                  newData.product = tr.cells[1].innerText;
                  newData.region = tr.cells[0].innerText;
                }
                for (let i = 0; i < inputData.length; i++) {
                  sale.push(Number(inputData[i].value))
                }
                newData.sale = sale;
                storageNewData(newData);
              }
              //重新渲染表格
              createTable(getData(sourceData)); //getData.js
              tableDisplay();
            }
          }
          //失去焦点，隐藏输入框和按钮
          inputData.onblur = function (e) {
            let target = e.target;
            let temp = target.parentElement.textContent;
            setTimeout(function () { 
              //不加延迟触发不到，按钮就隐藏了
              target.parentElement.children[0].setAttribute("style", "display:none");
              target.parentElement.children[1].setAttribute("style", "display:none");
              target.parentElement.children[2].setAttribute("style", "display:none");
              target.parentElement.children[3].setAttribute("style", "display:block");
              target.parentElement.children[2].value = temp;
            }, 200)
          }
        }
      }
    }
  }
  tableWrapper.appendChild(table);
}
//生成表头
function createThead () {
  let tHeadTr = document.createElement("tr");
  let tProTd = document.createElement("td");
  tProTd.innerText = "商品";
  tHeadTr.appendChild(tProTd);
  let tRegTd = document.createElement("td");
  tRegTd.innerText = "地区";
  tHeadTr.appendChild(tRegTd);
  //加载月份
  for (let i = 1; i <= 12; i++) {
    let tHeadMonth = document.createElement("td");
    tHeadMonth.innerText = i + "月";
    tHeadTr.appendChild(tHeadMonth);
  }
  return tHeadTr;
}
//生成表格主体
// function createTbody(tBodyTr,saleData) {
//     let productTd = document.createElement("td");
//     productTd.innerText = saleData.product;
//     let regionTd = document.createElement("td");
//     regionTd.innerText = saleData.region;
//     if(saleFlag == 1) {
//         tBodyTr.appendChild(regionTd);
//     } else if(saleFlag == 2) {
//         tBodyTr.appendChild(productTd);
//     } else {
//         tBodyTr.appendChild(productTd);
//         tBodyTr.appendChild(regionTd);
//     }
//     for(let i in saleData.sale) {
//         let saleTd = document.createElement("td");
//         //saleTd.setAttribute('dataType', 'sale');
//         let inputTd = document.createElement("input");
//         inputTd.setAttribute('type', 'text');
//         inputTd.setAttribute('value', saleData.sale[i]);
//         //saleTd.innerText = saleData.sale[i];
//         saleTd.appendChild(inputTd);
//         tBodyTr.appendChild(saleTd);
//     }
//     return tBodyTr;
// }
//调整表格，合并单元格
function tableDisplay () {
  let table = document.getElementById("myTable");
  let regionNum = getCheck(regionArr).length;//getData.js
  let productNum = getCheck(productArr).length;
  //alert(1);
  //商品一个，地区多个，商品第一列且合并
  if (productNum == 1 && regionNum > 1) {
    for (let i = 1; i <= regionNum; i++) { //i=1是为了跳过表头
      if (i == 1) {
        table.rows[i].cells[0].setAttribute("rowspan", regionNum);
      } else {
        table.rows[i].cells[0].setAttribute("style", "display:none");
      }
    }
  }
  //地区一个，商品多个，地区第一列且合并
  if (productNum > 1 && regionNum == 1) {
    //交换第一列和第二列数据
    for (let i = 0; i < table.rows, length; i++) { //i=0是为了连表头也交换
      let temp;
      temp = table.rows[i].cells[0].innerHTML;
      table.rows[i].cells[0].innerHTML = table.rows[i].cells[1].innerHTML;
      table.rows[i].cells[1].innerHTML = temp;
    }
    //再进行合并
    for (let i = 1; i <= productNum; i++) {
      if (i == 1) {
        table.rows[i].cells[0].setAttribute("rowspan", productNum);
      } else {
        table.rows[i].cells[0].setAttribute("style", "display:none");
      }
    }
  }
  //商品和地区都多个，商品第一列且合并
  if (productNum > 1 && regionNum > 1) {
    for (let j = 0; j < table.rows.length; j++) { //j=1 的话else条件要为 余数!=1
      if (j % regionNum == 1) {
        table.rows[j].cells[0].setAttribute("rowspan", regionNum);
      } else if (j != 0) { //跳过表头且其他行隐藏
        table.rows[j].cells[0].setAttribute("style", "display:none");
      }
    }
  }
}
