'use strict';
const path = require('path');
const os = require('os');
const network = os.networkInterfaces();
const cjson = require('cjson');

const productionList = ['172.17.0.8'];
const root = path.resolve(__dirname, '../..');
const cdnVersion = cjson.load(path.join(root, 'cdn.json')).version;

let evn = process.env.NODE_ENV || 'development';

//判断线上环境
for (let key in network) {
    const ip = network[key];
    for (let i = 0; i < ip.length; i++) {
        if (productionList.indexOf(ip[i].address) > -1) {
            evn = 'production';
        }
    }
}

const config = {
    development: {
        environment: 'development',
        staticPath: {
            cdn: './dist/',
            cdnFile: 'http://127.0.0.1:8000/'
        },
        apiProxy: {
            javaServer: 'localhost',
            mockData: false,
            cache: false,
            cacheTime: 30 * 60 * 1000
        }
    },
    production: {
        environment: 'production',
        staticPath: {
            cdn: 'https://static1.zugeliang01.com/web-zgl/' + cdnVersion,
            cdnFile: 'https://static1.zugeliang01.com/'
        },
        apiProxy: {
            javaServer: '49.234.63.236',
            mockData: false,
            cache: false,
            cacheTime: 30 * 60 * 1000
        }
    }
};

config[evn].evn = evn;
config[evn].root = root;
config[evn].port = 8020;
config[evn].portHttps = 8021;

module.exports = config[evn];
