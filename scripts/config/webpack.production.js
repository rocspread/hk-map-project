// import merge from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { merge } = require('webpack-merge');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'none',
    plugins: [new CleanWebpackPlugin()],
});
