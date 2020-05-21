//引入redis
var redis = require("redis");
var Redis = {};

Redis.set = (key, value, time) => {
    /**
     * redis验证 （如果redis没有开启验证，此配置可以不写）
     * client.auth("123456");
     * 查找
     */
    var client = redis.createClient("6379", "127.0.0.1"); // 创建redis客户端
    client.on("error", error => { // 连接错误处理
        console.log(error);
    });
    client.select("15", error => {
        if (error) {
            console.log(error);
        } else {
            client.set(key, value, (error, res) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(res + 'sfsdfa');
                };
                if(time){ // 判断是否设置过期时间
                    client.expire(key, time);
                }
                client.end(true); // 操作完成，关闭redis连接

            });
        };
    });
};
Redis.get = key => {
    var client = redis.createClient("6379", "127.0.0.1"); // 创建redis客户端
    client.on("error", error => { // 连接错误处理
        console.log(error);
    });
    client.select("15", error => {
        if (error) {
            console.log(error);
        } else {
            client.get(key, (error, res) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(res);
                };
                client.end(true); // 操作完成，关闭redis连接
            });
        };
    });
}

module.exports = Redis;