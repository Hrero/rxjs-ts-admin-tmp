const jwt = require('jsonwebtoken');
const secret = 'token';
const debug = require('debug')('app');

module.exports = {
    encrypt: (payload, time) => {
        return jwt.sign(payload, secret, { expiresIn: time });
    },
    decrypt: (token) => {
        try {
            let data = jwt.verify(token, secret);
            return {
                token: true,
                id: data.id
            };
        } catch (err) {
            return {
                token: false,
                data: err
            }
        }
    },
    auth: async (ctx, next) => {
        let token = ctx.header['authorization']
        if (token) {
            try { // 解析token
                let data = await jwt.verify(token, secret);
                if (data) {
                    ctx.state.userId = data.id;
                    await next();
                }
            } catch (err) {
                ctx.body = {
                    code: 0,
                    data: {},
                    msg: err
                }
                return
            }
        } else {
            ctx.body = {
                code: 0,
                data: {},
                msg: '请先登录'
            }
            return
        }
    }
};