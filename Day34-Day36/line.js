function createLine(data) {
    // while(chartsBox.hasChildNodes()) {
    //     chartsBox.removeChild(tableBox.firstChild);
    // }
    //let chartsBox = document.getElementById('charts');
    //console.log(data);
    let x = 520,
        y = 350,
        canvas = document.createElement('canvas');
    canvas.setAttribute('width', '650');
    canvas.setAttribute('height', '400');
    chartsBox.appendChild(canvas);
    //canvas.getContext('2d');
    //canvas.fillStyle = 'black';
    
    let radius = 2.5; //数据点的半径 
    let spacing = 43;
    let max = getMax(data);
    let ration = 300/max;

    if(canvas.getContext) {
        let ctx = canvas.getContext('2d');
        let beforeX,
            beforeY;
        ctx.lineWidth = 2;
        //ctx.fillStyle = 'blue';
        
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(20, 20+y);
        ctx.lineTo(20+x, 20+y);
        ctx.stroke();

        ctx.lineWidth = 1;
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
