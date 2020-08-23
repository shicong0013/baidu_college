let drawCharts = {
    xAix : 520,
    yAix : 350,
    ration : function(data) {
        //比例
        let max = this.getMax(data);
        let ratio = 300/max;
        return ratio;
    },
    drawAix : function() {
        this.drawBarAix();
        this.drawLineAix();
    },
    drawNewLine : function(data) {
        let radius = 2.5;//原点半径
        let spacing = 43;//间隔
        let beforeX;
        let beforeY;
        let ration = this.ration(data);//比例
        let c = document.querySelector('canvas');
        this.drawLineAix();
        let ctx = c.getContext('2d');
        ctx.strokeStyle = '#000000';
        ctx.setLineDash([15,0]);
        for(let i in data) {
            let arcY = 370 - data[i]*ration;
            let arcX = 50 + spacing*i;
            ctx.beginPath();
            ctx.arc(arcX, arcY, radius, 0, Math.PI*2);
            ctx.fill();
            //ctx.moveTo(arcX, arcY);
            if(i != 0) {
                ctx.beginPath();
                ctx.moveTo(arcX, arcY);
                ctx.lineTo(beforeX, beforeY);
                ctx.stroke();
            }
            beforeX = arcX;
            beforeY = arcY;
        }
    },
    drawNewBar : function(data) {
        let xmlns = 'http://www.w3.org/2000/svg';
        let axisWidth = 21.5;
        let ration = this.ration(data);
        let spacing = 20;
        document.querySelector('svg').innerHTML = " ";
        let svgDoc = document.querySelector('svg');
        this.drawBarAix();
        for(let i in data) {
            let rectH = 370 - data[i]*ration;
            let rectW = spacing * i + axisWidth * i +20 +spacing;
            let rect = document.createElementNS(xmlns, 'rect');
                rect.setAttribute('x', rectW);
                rect.setAttribute('y', rectH);
                rect.setAttribute('width', axisWidth);
                rect.setAttribute('height', 370-rectH);
                rect.setAttribute('style','fill:blue');
                svgDoc.appendChild(rect);
        }
    },
    //绘制图表的轴
    drawLineAix : function() {
        //创建折线图的轴
        let spacing = 43;//间隔
        let canvas = document.querySelector('canvas');
        if(canvas == null) {
            canvas = document.createElement('canvas');
        }
        canvas.setAttribute('width', '650');
        canvas.setAttribute('height', '400');
        chartsBox.appendChild(canvas);
        let ctx = canvas.getContext('2d');
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(20, 20+this.yAix);
        ctx.lineTo(20+this.xAix, 20+this.yAix);
        ctx.stroke();
        //绘制月份和辅助线
        ctx.font = " 10px sans-serif"
        for(let i = 0; i < 12; i++) {
            let textX = 40 + i * spacing;
            let textY = 30 + this.yAix;
            ctx.fillText((i+1)+'月', textX, textY);
        };
        // for(let i = 1; i <=6; i++) {
        //     let x = 125 * i;
        //     ctx.fillText(x, )
        // }
        ctx.setLineDash([15,5]);
        ctx.strokeStyle = '#b3b3b3';
        for(let i = 1; i <= 6; i++) {
            let y = this.yAix - i * 50 + 20;
            // let x = 120 * i;
            // ctx.fillText(x, 0, y + 3);
            ctx.beginPath();
            ctx.moveTo(21, y);
            ctx.lineTo(21+this.xAix, y);
            ctx.stroke();
        }
    },
    drawBarAix : function() {
        let xmlns = 'http://www.w3.org/2000/svg';
        //创建柱壮图的轴
        let svgDoc = document.querySelector('svg');
        if(svgDoc == null) {
            svgDoc = document.createElementNS(xmlns, 'svg');
        }
        
        svgDoc.setAttribute('width','650');
        svgDoc.setAttribute('height', '400');
        chartsBox.appendChild(svgDoc);
        let yLine = document.createElementNS(xmlns,'line');
        yLine.setAttribute('x1', '20');
        yLine.setAttribute('y1', '20');
        yLine.setAttribute('x2', '20');
        yLine.setAttribute('y2', 20+this.yAix);
        yLine.setAttribute('style', 'stroke:black;stroke-width:2');
        let xLine = document.createElementNS(xmlns, 'line');
        xLine.setAttribute('x1', '20');
        xLine.setAttribute('y1', 20+this.yAix);
        xLine.setAttribute('x2', 20+this.xAix);
        xLine.setAttribute('y2', 20+this.yAix);
        xLine.setAttribute('style', 'stroke:black;stroke-width:2')
        svgDoc.appendChild(yLine);
        svgDoc.appendChild(xLine);
    },
    drawAllLine : function(data) {
        let allData = this.getAllData(data);
        let radius = 2.5;//原点半径
        let spacing = 43;//间隔
        let beforeX;
        let beforeY
        let ration = this.ration(allData);//比例
        this.drawLineAix();
        let c = document.querySelector('canvas');
        let ctx = c.getContext('2d');
        for(let i in allData) {
            ctx.beginPath();
            ctx.setLineDash([15,0]);
            ctx.strokeStyle = 'rgb('+ (255-28*i) +','+ (255-15*i) +',88)';
            for(let j in allData[i]) {
                let arcY = 370 - allData[i][j]*ration;
                let arcX = 50 + spacing*j;
                ctx.beginPath();
                ctx.arc(arcX, arcY, radius, 0, Math.PI*2);
                ctx.fill();
                //ctx.moveTo(arcX, arcY);
                if(j != 0) {
                    ctx.beginPath();
                    ctx.moveTo(arcX, arcY);
                    ctx.lineTo(beforeX, beforeY);
                    ctx.stroke();
                }
                beforeX = arcX;
                beforeY = arcY;
            }
        }
    },
    getMax : function(data) {
        // let max = data[0];
        // for(let i in data) {
        //     if(max < data[i]) {
        //         max = data[i];
        //     }
        // }
        let max;
        if(data.length != 12) {
            max = data[0][0];
            for(let i in data) {
                for(let j in data[i]) {
                    if(max < data[i][j]) {
                        max = data[i][j];
                    }
                }
            }
        } else {
            max = data[0];
            for(let i in data) {
                if(max < data[i]) {
                    max = data[i];
                }   
            }
        }
        return max;
    },
    getAllData : function(data) {
        let allData = [];
        for(let i in data) {
            allData.push(data[i].sale);
        }
        return allData;
    }
}
