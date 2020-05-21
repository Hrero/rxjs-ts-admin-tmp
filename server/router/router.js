const path = require('path');
const fs = require('fs');
const router = require('koa-router')();
const ctrl = require('../proxy/proxyCtrl');
// api路由
const routerWechat = require('./routerWechat');
router.use('', routerWechat.routes(), routerWechat.allowedMethods());

router.post("/api/appInfo", async( ctx, next) => {
    let newAgents = await fn.getBackAgents(ctx);
    ctx.body = {
        code: 0,
        data: encodeURIComponent(JSON.stringify(newAgents)),
        msg: 'success'
    };
});

router.post('/api/image/upload', ctrl.fileAjax);

router.get("*", async(ctx, next) => {
    const url = ctx.request.url, ext = path.extname(url);
    if(!/((\.(js|css|ico|png|jpg))|\/api\/)/g.test(url)){
        ctx.body = fs.readFileSync('./dist/index.html', { encoding: 'utf-8' });
    } else {
        await next();
    }
});

module.exports = router;
