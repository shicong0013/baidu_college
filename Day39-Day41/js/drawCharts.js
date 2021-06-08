let drawCharts = {
  colorArr: ["#60acfc", "#32d3eb", "#5bc49f", "#feb64d", "#ff7c7c", "#9287e7"],
  ration: function (data) {
    //比例
    let max = this.getMax(data);
    let ratio = 300 / max;
    return ratio;
  },
  drawGraph: function (data) {
    this.drawNewBar(data);
    this.drawNewLine(data);
  },
  //绘制图表的轴
  drawLineAix: function (maxValue) {
    //创建折线图的轴
    let lineWrapper = document.getElementById("line-wrapper");
    let canvas = document.createElement('canvas');

    canvas.setAttribute("id", "line");
    canvas.setAttribute('width', '650');
    canvas.setAttribute('height', '330');
    lineWrapper.appendChild(canvas);

    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
      //ctx.lineWidth = 2;
      ctx.save();//保存当前canvas状态(style,和画布角度)
      ctx.beginPath();
      ctx.moveTo(30.5, 60);
      ctx.lineTo(30.5, 270.5);
      ctx.lineTo(630.5, 270.5);
      ctx.stroke();
      //Y轴刻度和辅助线
      for (let i = 0; i < 6; i++) {
        ctx.beginPath();
        let y = 60.5 + 35 * i;
        let valueY = maxValue * (6 - i) / 6;
        ctx.moveTo(30.5, y);
        ctx.lineTo(630.5, y);
        ctx.strokeStyle = "#dbdbdb";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(30.5, y);
        ctx.lineTo(25, y);
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.font = "12px 微软雅黑";
        ctx.fillText(Math.round(valueY), 0, y + 5);
      }
      //x轴刻度
      ctx.restore();//还原至上次保存状态 27行
      for (let i = 0; i < 12; i++) {
        ctx.beginPath();
        let x = 30.5 + 50 * i;
        let month = (i + 1) + "月";
        ctx.moveTo(x, 270.6);
        ctx.lineTo(x, 275);
        ctx.stroke();
        ctx.font = "13px 微软雅黑";
        ctx.fillText(month, x - 10, 290);
      }
    }
    return ctx;
  },
  drawBarAix: function (maxValue) {
    let xmlns = 'http://www.w3.org/2000/svg';
    let barWrapper = document.getElementById("bar-wrapper");
    //barWrapper.innerHTML = "";//清空画布
    //创建柱壮图的轴
    let svgDoc = document.createElementNS(xmlns, 'svg');
    svgDoc.setAttribute('width', '650');
    svgDoc.setAttribute('height', '330');
    barWrapper.appendChild(svgDoc);
    //y轴高度210
    let yLine = document.createElementNS(xmlns, 'line');
    yLine.setAttribute('x1', '30.5');
    yLine.setAttribute('y1', '60');
    yLine.setAttribute('x2', '30.5');
    yLine.setAttribute('y2', '270');
    yLine.setAttribute('style', 'stroke:black');
    svgDoc.appendChild(yLine);
    //y轴刻度,间距35px,分度值50
    for (let i = 0; i < 6; i++) {
      let y = 60.5 + 35 * i;
      let valueY = maxValue * (6 - i) / 6;
      let scaleY = document.createElementNS(xmlns, "line");
      scaleY.setAttribute('x1', '30');
      scaleY.setAttribute('y1', y);
      scaleY.setAttribute('x2', '630');
      scaleY.setAttribute('y2', y);
      scaleY.setAttribute('style', 'stroke:#dbdbdb;');
      svgDoc.appendChild(scaleY);
      let scaleY2 = document.createElementNS(xmlns, 'line');
      scaleY2.setAttribute('x1', '30');
      scaleY2.setAttribute('y1', y);
      scaleY2.setAttribute('x2', '25');
      scaleY2.setAttribute('y2', y);
      scaleY2.setAttribute('style', 'stroke:#000;');
      svgDoc.appendChild(scaleY2);
      let textY = document.createElementNS(xmlns, 'text');
      textY.setAttribute('x', 0);
      textY.setAttribute('y', y + 5);
      textY.setAttribute('style', 'font-size:13px;font-family:微软雅黑;');
      textY.innerHTML = Math.round(valueY);
      svgDoc.appendChild(textY);
    }
    //x轴
    let xLine = document.createElementNS(xmlns, 'line');
    xLine.setAttribute('x1', '30');
    xLine.setAttribute('y1', '270.5');
    xLine.setAttribute('x2', '630');
    xLine.setAttribute('y2', '270.5');
    xLine.setAttribute('style', 'stroke:black;');
    svgDoc.appendChild(xLine);
    //x轴刻度
    for (let i = 1; i < 13; i++) {
      let x = 30.5 + 50 * i;
      let month = i + '月';
      let scaleX = document.createElementNS(xmlns, 'line');
      scaleX.setAttribute('x1', x);
      scaleX.setAttribute('y1', '270');
      scaleX.setAttribute('x2', x);
      scaleX.setAttribute('y2', '275');
      scaleX.setAttribute('style', 'stroke:black;');
      svgDoc.appendChild(scaleX);
      let textX = document.createElementNS(xmlns, 'text');
      textX.setAttribute('x', x - 38);
      textX.setAttribute('y', '290');
      textX.setAttribute('style', 'font-size:13px;font-family:微软雅黑;');
      textX.innerHTML = month;
      svgDoc.appendChild(textX);
    }
    return svgDoc;
  },
  drawNewLine: function (data) {
    let lineWrapper = document.getElementById("line-wrapper");
    let newData = [];
    let maxValueArr = []; //存放每组最大值
    lineWrapper.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      maxValueArr.push(HtmlUtil.maxValue(data[i].sale));
      newData.push(data[i].sale);
    }
    let maxY = HtmlUtil.maxValue(maxValueArr);//获取多个数组中的最大值
    let maxValue = Math.floor(maxY * 1.15); //为了图表上放有间隙，增大最大值
    let ctx = this.drawLineAix(maxValue); //画轴

    for (let j = 0; j < newData.length; j++) {
      for (let k = 0; k < 12; k++) {
        //当前点高度
        let heightData_1 = newData[j][k] / maxValue * 210;
        //下一个点高度
        let heightData_2 = newData[j][k + 1] / maxValue * 210;

        let x1 = 30.5 + 50 * k;
        let x2 = 30.5 + 50 * (k + 1);
        let y1 = 270.5 - heightData_1;
        let y2 = 270.5 - heightData_2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        if (newData.length > 1) {
          ctx.strokeStyle = this.colorArr[j % 6];
          ctx.fillStyle = this.colorArr[j % 6];
        } else {
          ctx.strokeStyle = this.colorArr[2];
          ctx.fillStyle = this.colorArr[2];
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x1, y1, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  },
  drawNewBar: function (data) {
    let xmlns = 'http://www.w3.org/2000/svg';
    let newData = [];
    let maxValueArr = [];
    let barWrapper = document.getElementById("bar-wrapper");
    barWrapper.innerHTML = "";//清空画布
    for (let i = 0; i < data.length; i++) {
      //获得每组数据的最大值
      maxValueArr.push(HtmlUtil.maxValue(data[i].sale));
      newData.push(data[i].sale);
    }
    let maxY = HtmlUtil.maxValue(maxValueArr);//从每组的最大值中获取最大值
    let maxValue = Math.floor(maxY * 1.15); //Y轴的最大值
    //画坐标轴
    let svgDoc = this.drawBarAix(maxValue);

    for (let j = 0; j < newData.length; j++) {
      for (let k = 0; k < 12; k++) {
        let heightData = newData[j][k] / maxValue * 210;
        let y = 270 - heightData;
        let x, widthX;
        let rect = document.createElementNS(xmlns, "rect");
        if (newData.length > 1) {
          rect.setAttribute('style', 'fill:' + this.colorArr[j % 6]);
          x = 35 + 50 * k;
          widthX = 40 / newData.length;
        } else {
          rect.setAttribute('style', 'fill:' + this.colorArr[2]);
          x = 40 + 50 * k;//一个和单个数据宽度不一样，可以再修改
          widthX = 30 / newData.length;// 应该可以直接赋值30;
        }
        rect.setAttribute('x', x + j * widthX);
        rect.setAttribute('y', y);
        rect.setAttribute('width', widthX);
        rect.setAttribute('height', heightData);
        svgDoc.appendChild(rect);
      }
    }
  },
  setData: function () {
    // let barWrapper = document.getElementById('bar-wrapper');
    // let lineWrapper = document.getElementById('line-wrapper');
    let table = document.getElementById('table-wrapper');
    table.onmouseover = function (e) {
      let storage = window.localStorage;
      let newSourceData;
      let data = [];
      let target = e.target;
      let tr = target.parentElement;//鼠标当前的父元素
      let tr2 = target.parentElement.parentElement;//鼠标在铅笔图上时的tr
      if (tr.cells || tr2.cells) {
        if (tr2.cells) { //如果tr2.cells为真，则表示tr.cells是假
          tr = tr2;//则把tr2赋值给tr
        }
        for (let i = 0; i < sourceData.length; i++) {
          //根据表格前两列的文本从ife31dta中查找数据
          if (sourceData[i].region == tr.cells[0].innerHTML && sourceData[i].product == tr.cells[1].innerHTML) {
            data.push(sourceData[i]);
          }
          if (sourceData[i].region == tr.cells[1].innerHTML && sourceData[i].product == tr.cells[0].innerHTML) {
            data.push(sourceData[i]);
          }
        }
        //如果本地有数据则替换
        if (storage.getItem('newSourceData')) {
          let json = storage.getItem('newSourceData');
          newSourceData = JSON.parse(json);
          for (let j = 0; j < data.length; j++) {
            for (let k = 0; k < newSourceData.length; k++) {
              if (data[j].region == newSourceData[k].region && data[j].product == newSourceData[k].product) {
                data[j] = newSourceData[k];
              }
            }
          }
        }
        //确保鼠标滑过表头时不会画图
        if (HtmlUtil.isNumber(tr.cells[2].textContent)) {
          drawCharts.drawNewLine(data);
          drawCharts.drawNewBar(data);
        }
      }
    }
  }
}