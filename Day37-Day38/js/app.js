//初始状态
//var data1 = getData(sourceData)
//console.log(getData(sourceData));
createTable(getData(sourceData));//创建表格
drawCharts.drawGraph(getData(sourceData));//根据选框画图
drawCharts.setData();//表格监听画图事件

//事件委托：复选框绑定点击事件
checkWrapper.onclick = function() {
    //var data = getData(sourceData);
    createTable(getData(sourceData));
    drawCharts.drawGraph(getData(sourceData));//根据选框画图
    tableDisplay();//点击后合并单元格
}
//表格鼠标滑动效果
tableWrapper.onmouseout = function() {
    drawCharts.drawGraph(getData(sourceData));//根据选框画图
}
