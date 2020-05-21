const path = require('path')

module.exports = {
    appid: 'wx9ba2105f9a09cbec', 
    secret: 'e64d3c6f0f9630f2e631baae706c7c3b',
    EncodingAESKey: 'qAhbkTfPOv0wAASDsGjKrGWGTdwb0wheixJIvFFWwg5',
    token: 'haohao',
    accessTokenPath: path.resolve(__dirname, './accessToken.json'), 
    jsapiTicketPath: path.resolve(__dirname, './jsapiTicket.json') 
}