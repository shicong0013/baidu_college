let checkWrapper = document.getElementById("checkbox-wrapper");
let regionBox = document.getElementById("region-wrapper");
let productBox = document.getElementById("product-wrapper");
let regionCheckboxData = [{
    value: "华东",
    text: "华东"
}, {
    value: "华南",
    text: "华南"
}, {
    value: "华北",
    text: "华北"
}]

let productCheckboxData = [{
    value: "手机",
    text: "手机"
}, {
    value: "笔记本",
    text: "笔记本"
}, {
    value: "智能音箱",
    text: "智能音箱"
}]

createCheckBox(regionBox, regionCheckboxData);
createCheckBox(productBox, productCheckboxData);

function createCheckBox(checkbox,checkData) {
    //生成全选框
    let allCheckLabel = document.createElement('label');
    let id = checkbox.id + "all";
    allCheckLabel.setAttribute("for", id);
    allCheckLabel.innerText = "全选";
    checkbox.appendChild(allCheckLabel);
    let checkAll = document.createElement("input");
    checkAll.setAttribute("type", "checkbox");
    checkAll.setAttribute("id", id);
    checkAll.setAttribute("checkbox-type", "all");
    checkbox.appendChild(checkAll);
    
    //生成子选项
    let checks = [];
    for(let i = 0; i < checkData.length; i++) {
        let checkLabel = document.createElement("label");
        checkLabel.setAttribute("for", checkData[i].value);
        checkLabel.innerText = checkData[i].text;
        checkbox.appendChild(checkLabel);
        let childCheck = document.createElement("input");
        childCheck.setAttribute("id", checkData[i].value);
        childCheck.setAttribute("type", "checkbox");
        childCheck.setAttribute("checkbox-type", "child");
        childCheck.setAttribute("value", checkData[i].value);
        checkbox.appendChild(childCheck);
        checks.push(childCheck);
    }
    checks[0].checked = true; //默认选中第一项

    //添加点击事件
    checkbox.onclick = function(e) {
        let target = e.target;
        let flag = 0;
        if(target.type == "checkbox") {
            let attribute = target.getAttribute("checkbox-type");
            if(attribute == "all") { //点击全选时
                if(target.checked == true) {
                    for(let i = 0; i < checks.length; i++) {
                        checks[i].checked = true;
                    }
                } else { //取消全选框时无效
                    target.checked == true;
                }
            }
            for(let i = 0; i < checks.length; i++) {
                if(checks[i].checked == true) {
                    flag++
                }
            }
            if(attribute == "child") {
                if(flag == 3) {
                    checkAll.checked = true;
                }
                if(flag < 3) {
                    checkAll.checked = false;
                }
                if(flag == 0) {
                    target.checked = true;
                    flag = 1;
                    //当点击后没有选框true时从新选上次框
                }
            } 
        } 
    }
}