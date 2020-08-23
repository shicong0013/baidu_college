function CheckBox(boxName,data,source) {
    let radioBox = createCheckBox(boxName,data);
    let childBox = radioBox.children;
    let flag = 0;
    boxName.onchange = function(event) {
        let e = event || window.event;
        let target = e.target || e.srcElement;
        let source_1 = target.getAttribute("source");
        if(target.getAttribute("type") == "checkbox") {
            let childLength = radioBox.children.length;
            let type = target.getAttribute("checkbox-type");
            if(type == "all") {
                for(let i = 0; i < childLength; i++) {
                    radioBox.children[i].checked = true;
                }
                flag = 3;
            } else if(type == "child") {
                if(target.checked == true) {
                    flag++;
                }
                if(target.checked == false) {
                    flag--;
                }
                if(flag == 0) {
                    target.checked = true;
                    flag = 1;
                }
                if(flag == 3) {
                    radioBox.children[0].checked = true;
                } else {
                    radioBox.children[0].checked = false;
                }
            }
        }
        createTable(getSaleData());
        drawCharts.drawBarAix();
        drawCharts.drawAllLine(getSaleData());
    }
}
function createCheckBox(boxName,data,source) {
    //生成全选checkbox的html，给一个自定义属性表示为全选checkbox,比如 checkbox-type="all"
    let allBox = document.createElement("input");
    allBox.setAttribute("type", "checkbox");
    allBox.setAttribute("value", "0");
    allBox.setAttribute("checkbox-type", "all");
    let allText = document.createTextNode("全选");
    boxName.appendChild(allBox);
    boxName.appendChild(allText);

    //生成各个子选项checkbox的html,给一个自定义属性表示为子选项
    for(let i = 0; i < data.length; i++) {
        let childData = document.createElement("input");
        childData.setAttribute("type", "checkbox");
        childData.setAttribute("value", data[i]);
        childData.setAttribute("checkbox-type", "child");
        //childData.setAttribute("source", data[i]);
        let childText = document.createTextNode(data[i]);
        boxName.appendChild(childData);
        boxName.appendChild(childText);
    }
    return boxName;
}
