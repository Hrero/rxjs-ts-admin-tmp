"use strict 请求倒数第二关 去掉api取路径";
const config = require('../config/server');

module.exports = function (ctx, method, header) {

    let subStr = new RegExp('/api');

    let url = ctx.request['url'].replace(subStr,"");

    let requestMethod = method ? method : ctx.request.method;

    const uri = config.apiProxy.javaServer + url;

    const requesOption = {

        method: requestMethod,

        headers: header,

        params: ctx.request.body,

        request: ctx.request

    };
    return ctx.fetch(uri, requesOption);

};
