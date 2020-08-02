let regionBox = document.getElementById("region-radio-wrapper");
let productBox = document.getElementById("product-radio-wrapper");
let tableBox = document.getElementById("table-wrapper");
let regionData =new Array; //存放地区
let productData = new Array;  //产品
let saleData = [];
let saleFlag = 0; //商品与地区顺序

window.onload = function() {
    CheckBox(regionBox, ["华东", "华南", "华北"]);
    CheckBox(productBox, ["手机", "笔记本", "智能音箱"]);
}
