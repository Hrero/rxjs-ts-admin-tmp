// const Remarks = require('../model/remarks');
const jwt = require('jsonwebtoken');

module.exports = async (ws, req) => {
    console.log('连接成功');
    const token = req.headers['authorization'];
    const secret = 'token';
    let userId = '';
    if (token) {
        let data = await jwt.verify(token, secret);
        if (data) {
            userId = data.id;
        } else {
            console.log('无效的token')
        }
    } else {
        console.log('请先登录')
    }
    ws.on('error', message => {
        console.log('error: %s', message);
    });
    ws.on('close', message => {
        console.log('close: %s', message);
    });
    ws.on("upgrade", response => {
        console.log(response, '!!!====')
    });
    ws.on('message', async message => {
        if (userId) {
            // const data = await Remarks.find({status: 0, toUid: userId});
            const length = data.length;
            ws.send(JSON.stringify({
                code: 0,
                data: {
                    length: length
                },
                msg: 'success'
            }));
        }
    });
}