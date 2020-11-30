var eCN = document.getElementById(regionCheckboxData[0].value);
var sCN = document.getElementById(regionCheckboxData[1].value);
var nCN = document.getElementById(regionCheckboxData[2].value);

var phone = document.getElementById(productCheckboxData[0].value);
var notebook = document.getElementById(productCheckboxData[1].value);
var googleHome = document.getElementById(productCheckboxData[2].value);

var regionArr = [eCN, sCN, nCN];
var productArr = [phone, notebook, googleHome];

//获得选框的值
function getCheck(check) {
    let checkArr = [];
    for(let i = 0; i < check.length; i++) {
        if(check[i].checked == true) {
            checkArr.push(check[i]);
        }
    }
    return checkArr;
}
//根据选框的值获得数据
function getData(sourceData) {
    let storage = window.localStorage;
    let regionCheck = getCheck(regionArr);
    let productCheck = getCheck(productArr);//productBox.children 会把文字节点也算上
    let saleData = [];
    let newSourceData;
    for(let i = 0; i < sourceData.length; i++) {
        for(let x = 0; x < regionCheck.length; x++) {
            for(let y = 0; y <productCheck.length; y++) {
                if(sourceData[i].region == regionCheck[x].value && sourceData[i].product == productCheck[y].value) {
                    saleData.push(sourceData[i]);
                }
            }
        }
    }
    //如果本地有数据的话，替换为本地数据
    if(storage.getItem("newSourceData")) {
        let json = storage.getItem("newSourceData");
        newSourceData = JSON.parse(json);
        for(let i = 0; i < saleData.length; i++) {
            for(let j = 0; j < newSourceData.length; j++) {
                if(saleData[i].region == newSourceData[j].region && saleData[i].product == newSourceData[j].product) {
                    saleData[i] = newSourceData[j];
                }
            }
        }
    }
    return saleData;
}