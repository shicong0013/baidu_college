//获得数据
function getSaleData() {
    saleData = [];
    regionData = []; //地区
    productData = []; //商品
    saleFlag = 0;
    
    //获取商品和地区信息
    for(let i = 1; i < regionBox.children.length; i++) {
        if(regionBox.children[i].checked) {
            regionData.push(regionBox.children[i].value);
        }
    }
    for(let i = 1; i < productBox.children.length; i++) {
        if(productBox.children[i].checked) {
            productData.push(productBox.children[i].value)
        }
    
    }
    //商品有，地区无
    if(productData.length > 0 && regionData.length == 0) {
        saleFlag = 0;
        for(let i in sourceData) {
            for(let p in productData) {
                if(sourceData[i].product == productData[p]) {
                    saleData.push(sourceData[i]);
                }
            }
        }
    }
    //商品无,地区有
    if(productData.length == 0 && regionData.length > 0) {
        saleFlag = 0;
        for(let i in sourceData) {
            for(let r in regionData) {
                if(sourceData[i].region == regionData[r]) {
                    saleData.push(sourceData[i]);
                }
            }
        }
    }
    //地区一，商品多
    if(productData.length > 1 && regionData.length == 1) {
        saleFlag = 2;
    }
    //商品一，地区多
    if(productData.length == 1 && regionData.length > 1) {
        saleFlag = 1;
    }
    //商品地区都为一
    if(productData.length ==1 && regionData.length == 1) {
        saleFlag = 0;
    }
    //商品地区都多选
    if(productData.length > 1 && regionData.length > 1) {
        saleFlag = 1;
    }
    //商品和地区都有获得数据
    if(productData.length > 0 && regionData.length > 0) {
        for(let i in sourceData) {
            for(let p in productData) {
                for( let r in regionData) {
                    if(sourceData[i].product == productData[p] && sourceData[i].region == regionData[r]) {
                        saleData.push(sourceData[i]);
                    }
                }
            }
        }
    }
    console.log(saleData);
    return saleData;
}
