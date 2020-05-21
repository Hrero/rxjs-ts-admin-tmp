"use strict node请求中间件第一关，qiniu文件上传";
const proxy = require('./proxy');
const qiniu = require('qiniu');
const uuid = require('node-uuid');
const path = require('path');
const fs = require('fs');
const cObj = require('../config/cookieSet');
// 直传七牛
function upLoad(localFile, key) {
    const accessKey = '_ioX8mMk5AKI62zE9iw2fxF1tuzg87UDI5D6Ldf0';
    const secretKey = '6MD06XdPEb9Iw-vd8GORZhpTcsiNmStAWOHNLOiI';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
        scope: 'zgl20181208',
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    let qiniuConfig = new qiniu.conf.Config();
    qiniuConfig.zone = qiniu.zone.Zone_z0;
    qiniuConfig.useHttpsDomain = true;
    qiniuConfig.useCdnDomain = true;
    return formUploaderTo(uploadToken, key, localFile, qiniuConfig).then(function (res) {
        return res;
    }).catch(function (err) {
        return err;
    });
}

function formUploaderTo(uploadToken, key, localFile, qiniuConfig) {
    return new Promise((resolve, reject) => {
        const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
        const putExtra = new qiniu.form_up.PutExtra();
        formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
            if (respErr) {
                reject(respErr);
            } else {
                resolve(respInfo)
            }
        });
    })
}

const postHeaders = (ctx) => {
    return {
        'X-Auth-Token': ctx.request.header['X-Auth-Token'] || ctx.request.header['x-auth-token'] || ctx.cookies.get('token') || '',
        'X-Request-Source': ctx.request.header['X-Request-Source'] || ctx.request.header['x-request-source'] || '',
        'X-Request-Version': ctx.request.header['X-Request-Version'] || ctx.request.header['x-request-version'] || 'v3'
    }
};

module.exports = {
    getAjax: async (ctx, next) => {
        let data = await proxy(ctx, 'GET', postHeaders(ctx));
        if (data.code === 40004) await ctx.cookies.set('token', '', cObj.over);
        ctx.body = data;
    },
    postAjax: async (ctx, next) => {
        let data = await proxy(ctx, 'POST', postHeaders(ctx));
        if (data.code === 40004) await ctx.cookies.set('token', '', cObj.over);
        ctx.body = data;
    },
    fileAjax: async (ctx, next) => {
        const files = ctx.request.files;
        let list = [];
        let code = 0;
        let msg = 'ok';
        for (let img in files) {
            let fileObj = files[img];
            let retPath = path.join('lease/img', uuid.v1() + path.extname(fileObj.name));
            let imgTmpPath = fileObj.path;
            let fileRes = await upLoad(imgTmpPath, retPath);
            fs.unlink(fileObj.path, function () {});
            if (fileRes.statusCode === 200) {
                list.push(fileRes.data.key);
            } else {
                code = 50017;
                msg = JSON.stringify(fileRes);
            }
        }
        ctx.body = {
            code: code,
            success: msg,
            data: {
                img: 'https://static2.zugeliang01.com/' + list[0],
                files: files
            }
        };
    }
};
