//schedule
const schedule = require('node-schedule');
const fs = require('fs');
const path = require('path');

module.exports = {
    clearLogs: () => {
        schedule.scheduleJob('30 1 1 * * 1', () => {
            const logsPath = path.resolve(__dirname, '../logs');
            const errorPAth = logsPath + '/errors'
            const responsesPAth = logsPath + '/responses'
            if (fs.existsSync(logsPath)) {
                fs.readdir(errorPAth, (err, files) => {
                    files.forEach(element => {
                        let filePath = errorPAth + '/' + element;
                        if (fs.statSync(filePath).isFile()) {
                            fs.unlink(filePath, () => {})
                        }
                    });
                })
                fs.readdir(responsesPAth, (err, files) => {
                    files.forEach(element => {
                        let filePath = responsesPAth + '/' + element;
                        if (fs.statSync(filePath).isFile()) {
                            fs.unlink(filePath, () => {})
                        }
                    });
                })
            }
        });
    }
}