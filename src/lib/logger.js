const winston = require('winston');

const logLevel = () => {
    let debug = (process.env.LT_SDK_DEBUG === 'true') ? 'debug' : undefined;
    return debug || process.env.LT_SDK_LOG_LEVEL || 'info';
};

module.exports = (logContext) => {
    return winston.createLogger({
        level: logLevel(),
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ message, level }) => {
                if (typeof message === 'object') {
                    message = JSON.stringify(message);
                }
                return `[${logContext}] ${message}`;
            })
        ),
        transports: [new winston.transports.Console()]
    });
};
