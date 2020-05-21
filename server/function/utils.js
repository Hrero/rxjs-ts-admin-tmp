module.exports = {
    searchArrayMax: (arr) => { // 取数组中出现次数最多
        var maxCount = 0,
            maxItem = '',
            obj = {}
        arr.forEach((item) => {
            obj[item] ? (obj[item].count += 1) : obj[item] = {count: 1}
            obj[item].count > maxCount && (maxCount = obj[item].count, maxItem = item)
        })
        return maxItem
    },
    searchArrayList: (result) => { // 取数组中前出现次数20位
        var arr = [];
        result.sort()
        for (var i = 0; i < result.length;) {
            var count = 0;
            for (var j = i; j < result.length; j++) {
                if (result[i] === result[j]) {
                    count++;
                }
            }
            arr.push({
                text: result[i],
                count: count
            })
            i+=count;
        }
        arr.sort(function (x,y) {
            return y.count - x.count
        });
        return arr.slice(0, 20)
    },
    getIsString: async (field, data, Schema, from, type) => { // 插入拼接删除某个表中某个字段
        /**
         * field 字段
         * data 改变的参数
         * Schema 表名
         * from 表查询的id
         * type true插入 false删除
         * 以调用为触发
         */
        return new Promise(async (r, j) => {
            if (!field || !data || !Schema || !from) {
                return
            }
            let schemaData = await Schema.findOne({
                _id: from
            })
            if ((!schemaData[field] || schemaData[field].indexOf(data) === -1) && type) {
                await Schema.update({ _id : from }, { [field]: schemaData[field] + ',' + data })
                r({})
            } else {
                let reg = new RegExp(data, "g");
                let fieldData = schemaData[field].replace(reg, "");
                await Schema.update({ _id : from }, { [field]: fieldData })
                r({})
            }
        })
    },
    getIsStatus: (data, field, str) => { // 判断字符串中是否有str 有1 无0
        /**
         * data item
         * field 字段
         * str 要查找的字符串
         */
        return data[field].indexOf(str) > -1?1:0;
    },
    getArrForStr: async (data) => {
        return new Promise((r, j) => {
            r(JSON.parse(data))
        })
    }
};