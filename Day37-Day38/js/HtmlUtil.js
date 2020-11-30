let HtmlUtil = {
    //判断是否为数字
    isNumber: function(n) {
        return !isNaN(Number(n));
    },
    //获取最大值
    maxValue: function(arr) {
        let max = Number(arr[0]);
        for(let i = 0; i < arr.length; i++) {
            max = Number(arr[i]) <= max ? max : Number(arr[i]);
        }
        return max;
    }
}