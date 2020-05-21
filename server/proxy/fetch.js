const rp = require('request-promise');
const fs = require('fs');

/* 参数
 * 请求终端
 * url: 完整的http请求链接 类型: 字符串
 * conf: {
 *     method: 请求方式 （GET, POST, FORMS） 类型： 字符串
 *     header: 必填 类型：对象
 *     params: 请求参数 类型: 对象
 * }
 * */
module.exports = function (url, conf) {
    let options = {
        method: conf.method === 'GET' ? 'GET' : 'POST',
        uri: url,
        json: true,
        headers: conf.headers
    };
    if (conf.method === 'GET') {
        options.qs = conf.params;
    } else if (conf.method === 'POST') {
        options.body = conf.params;
    } else {
        throw new Error('must have a request method!');
    }
    return rp(options).then((body) => {
        if (body.code !== 0 && body.code && body.code !== 40004) {
            console.log('错误时间---》', JSON.stringify(new Date()));
            console.log('接口错误---》', JSON.stringify(options));
            console.log('错误返回内容---》', JSON.stringify(body));
        }
        return body;
    }).catch((err) => {
        console.log("***************[请求出错了]*****************");
        console.log(JSON.stringify(err));
        console.log(err.message);
        console.log('实际请求参数--->', options);
        console.log("***************[出错信息]*****************");
        return err;
    });
};
