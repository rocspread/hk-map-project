// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';
const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;

const SERVER_HOST = '127.0.0.1'; // 默认本地ip
const SERVER_PORT = 9000; // 默认本地端口号

module.exports = {
    SERVER_HOST,
    SERVER_PORT,
    isDev: isDevelopment,
    PROJECT_PATH,
    PROJECT_NAME,
};
