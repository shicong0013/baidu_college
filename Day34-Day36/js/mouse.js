function mouseCharts() {
    let body = document.body;   
    body.onmouseover = function(e) {
        if(e.target.nodeName !== 'TD') {
            //drawCharts.drawBarAix();
            drawCharts.drawAllLine(getSaleData());
            //drawCharts.drawBarAix();
        }
    }   
}
