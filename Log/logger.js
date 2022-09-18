const winston = require('winston');
const winstonDB= require('winston-mongodb');
const dotenv = require('dotenv');
dotenv.config();


const logConfiguration = {
    transports: [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            level: 'info',
            filename: 'Log/log.log'
        }),
        new winston.transports.File({
            level: 'error',
            filename: 'Log/log.log'
        }),
        new winston.transports.MongoDB({
            level:'error',
            db:process.env.CONNECTION_STRING,
            options: {
                useUnifiedTopology: true
            },
            collection: 'server_logs'
            
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'MM-DD-YYYY HH:mm:ss.SSS'
        }),
        winston.format.printf(info => `${info.level}: ${info.timestamp}: ${info.message} `)
    )

}
const logger = winston.createLogger(logConfiguration);
module.exports = logger;
// 'mongodb://srv1:27017/323812081yehudit&chani'
