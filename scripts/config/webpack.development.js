/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const { SERVER_HOST, SERVER_PORT } = require('../constants');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        host: SERVER_HOST, // 指定web服务器host,不设置默认为localhost
        port: SERVER_PORT, // 指定当前端口号，不设置默认为8080
        stats: 'errors-only', // 终端仅打印报错信息 error
        clientLogLevel: 'silent', // 日志等级
        compress: true, // 是否启用gzip压缩
        open: true, // 打开默认浏览器
        hot: true, // 热更新
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
