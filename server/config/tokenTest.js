'use strict';
const sha1 = require("sha1");
const wechatConfig = require("./wechat");
var config = {
    wechat:{
        appID: wechatConfig.appid,
        appSecret: wechatConfig.secret,
        token: wechatConfig.token
    }
}
module.exports = (app) => {
    app.use( async (ctx, next) => {
        const token = config.wechat.token
        const signature = ctx.request.query.signature
        const nonce = ctx.request.query.nonce
        const timestamp = ctx.request.query.timestamp
        const echostr = ctx.request.query.echostr
        let str = [token, timestamp, nonce].sort().join('')
        const sha = sha1(str)
        ctx.body = sha === signature ? echostr + '' : 'failed'
    });
};
