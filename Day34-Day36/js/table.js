//渲染表格
function createTable() {
    while(tableBox.hasChildNodes()) {
        tableBox.removeChild(tableBox.firstChild);
    }
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    //生成表头
    thead.appendChild(createThead());
    table.appendChild(thead);
    let tbody = document.createElement("tbody");
    tbody.setAttribute('id', 'tbody');
    //生成表格主体
    table.appendChild(tbody);
    
    for(let i in saleData) {
        let tBodyTr = document.createElement("tr");
        if(i == 0 && saleFlag == 2) {
            let regionTd = document.createElement("td");
            regionTd.innerText = saleData[i].region;
            regionTd.setAttribute("rowspan", productData.length);
            tBodyTr.appendChild(regionTd);
        } else if(i % regionData.length == 0 && saleFlag == 1) {
            let productTd = document.createElement("td");
            productTd.innerText = saleData[i].product;
            productTd.setAttribute("rowspan", regionData.length);
            tBodyTr.appendChild(productTd);
        }
        tBodyTr = createTbody(tBodyTr,saleData[i]);
        tBodyTr.onmouseover = function(e) {
            let tr = e.target.parentNode;
            let tds = tr.children;
            let chartsData = new Array;
            for(let i = 2; i < tds.length; i++){
                chartsData.push(parseInt(tds[i].innerText));
            }
            drawCharts.drawNewBar(chartsData);
            drawCharts.drawNewLine(chartsData);
        }
        tbody.appendChild(tBodyTr);
    }
    tableBox.appendChild(table);
}
//生成表头
function createThead() {
    let tHeadTr = document.createElement("tr");
    let tProTd = document.createElement("td");
    tProTd.innerText = "产品";
    let tRegTd = document.createElement("td");
    tRegTd.innerText = "地区";
    //判断地区和产品的前后顺序
    if(saleFlag == 2) {
        tHeadTr.appendChild(tRegTd);
        tHeadTr.appendChild(tProTd);
    } else {
        tHeadTr.appendChild(tProTd);
        tHeadTr.appendChild(tRegTd);
    }
    //加载月份
    for(let i = 1; i <= 12; i++) {
        let tHeadMonth = document.createElement("td");
        tHeadMonth.innerText = i + "月";
        tHeadTr.appendChild(tHeadMonth);
    }
    return tHeadTr;
}
//生成表格主体
function createTbody(tBodyTr,saleData) {
    let productTd = document.createElement("td");
    productTd.innerText = saleData.product;
    let regionTd = document.createElement("td");
    regionTd.innerText = saleData.region;
    if(saleFlag == 1) {
        tBodyTr.appendChild(regionTd);
    } else if(saleFlag == 2) {
        tBodyTr.appendChild(productTd);
    } else {
        tBodyTr.appendChild(productTd);
        tBodyTr.appendChild(regionTd);
    }
    for(let i in saleData.sale) {
        let saleTd = document.createElement("td");
        //saleTd.setAttribute('dataType', 'sale');
        saleTd.innerText = saleData.sale[i];
        tBodyTr.appendChild(saleTd);
    }
    return tBodyTr;
}
