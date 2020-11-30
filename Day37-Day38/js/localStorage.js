function storageNewData(newData) {
    if(!window.localStorage) {
        alert("浏览器不支持localStorage");
    } else {
        let storage = window.localStorage;
        if(storage.getItem("newSourceData")) {
            let json = storage.getItem("newSourceData");
            let newSourceData = JSON.parse(json);//把存储的字符串转换为对象
            //有相同数据时替换
            for(let i = 0; i < newSourceData.length; i++) {
                if(newData.product == newSourceData[i].product && newData.region == newSourceData[i].region) {
                    newSourceData[i].sale = newData.sale;//替换重复的销量
                    let string = JSON.stringify(newSourceData);
                    storage.setItem("newSourceData", string);//替换本地数据
                    return true;//结束
                }
            }
            //没有相同数据时则添加
            newSourceData.push(newData);
            let string = JSON.stringify(newSourceData);
            storage.setItem("newSourceData", string);
        } else {
            let newSourceData = [];
            newSourceData.push(newData);
            let string = JSON.stringify(newSourceData);
            storage.setItem("newSourceData", string);
        }
    }
}