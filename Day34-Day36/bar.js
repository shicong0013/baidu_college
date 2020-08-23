function createBar(data) {
    //let data = getSaleData();
    //let chartsBox = document.getElementById('charts');
    console.log(typeof(data[2]));
    const xmlns = 'http://www.w3.org/2000/svg';
    let svgDoc = document.createElementNS(xmlns, 'svg');
    svgDoc.setAttribute('width','650');
    svgDoc.setAttribute('height', '400');
    chartsBox.appendChild(svgDoc);
    //定义柱状图绘制区域的高度宽度，轴的高度，宽度
    let x = 520,
        y = 350,
        spacing = 20, //间距
        max = getMax(data), //获得最大值
        ratio = 300/max, // 比率
        axisWidth = 21.5;

    let yLine = document.createElementNS(xmlns,'line');
        yLine.setAttribute('x1', '20');
        yLine.setAttribute('y1', '20');
        yLine.setAttribute('x2', '20');
        yLine.setAttribute('y2', 20+y);
        yLine.setAttribute('style', 'stroke:black;stroke-width:1');
    let xLine = document.createElementNS(xmlns, 'line');
        xLine.setAttribute('x1', '20');
        xLine.setAttribute('y1', 20+y);
        xLine.setAttribute('x2', 20+x);
        xLine.setAttribute('y2', 20+y);
        xLine.setAttribute('style', 'stroke:black;stroke-width:1')
        svgDoc.appendChild(yLine);
        svgDoc.appendChild(xLine);
    //遍历数据绘制柱子
    for(let i in data) {
        let rectH = 370 - data[i]*ratio,
            rectW = spacing * i + axisWidth * i +20 +spacing;
        let rect = document.createElementNS(xmlns, 'rect');
            rect.setAttribute('x', rectW);
            rect.setAttribute('y', rectH);
            rect.setAttribute('width', axisWidth);
            rect.setAttribute('height', 370-rectH);
            rect.setAttribute('style','fill:blue');
            svgDoc.appendChild(rect);
    }
}
function getMax(data) {
    let max = data[0];
    for(let i in data) {
        if(max < data[i]) {
            max = data[i];
        }
    }
    return max;
}
