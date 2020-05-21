/**
 * 对RabbitMQ的封装
 */
let amqp = require('amqplib');

class RabbitMQ {
    constructor() {
        this.hosts = [];
        this.index = 0;
        this.length = this.hosts.length;
        this.open = amqp.connect(this.hosts[this.index]);
    }
    sendQueueMsg(queueName, msg, errCallBack) {
        this.open
            .then(conn => {
                return conn.createChannel();
            })
            .then(channel => {
                return channel.assertQueue(queueName).then(ok => {
                    return channel.sendToQueue(queueName, new Buffer(msg), {
                        persistent: true
                    });
                })
                    .then(data => {
                        if (data) {
                            errCallBack && errCallBack("success");
                            channel.close();
                        }
                    })
                    .catch(() => {
                        setTimeout(() => {
                            if (channel) {
                                channel.close();
                            }
                        }, 500)
                    });
            })
            .catch(() => {
                let num = this.index++;

                if (num <= this.length - 1) {
                    this.open = amqp.connect(this.hosts[num]);
                } else {
                    this.index == 0;
                }
            });
    }
    receiveQueueMsg(queueName, receiveCallBack, errCallBack) {
        this.open
            .then(conn => {
                return conn.createChannel();
            })
            .then(channel => {
                return channel.assertQueue(queueName)
                    .then(ok => {
                        return channel.consume(queueName, msg => {
                            if (msg !== null) {
                                let data = msg.content.toString();
                                channel.ack(msg);
                                receiveCallBack && receiveCallBack(data);
                            }
                        })
                            .finally(() => {
                                setTimeout(() => {
                                    if (channel) {
                                        channel.close();
                                    }
                                }, 500)
                            });
                    })
            })
            .catch(() => {
                let num = this.index++;
                if (num <= this.length - 1) {
                    this.open = amqp.connect(this.hosts[num]);
                } else {
                    this.index = 0;
                    this.open = amqp.connect(this.hosts[0]);
                }
            });
    }
}
module.exports = RabbitMQ