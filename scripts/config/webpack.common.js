/* eslint-disable @typescript-eslint/no-var-requires */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const index = require('postcss-normalize');
const postcss = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { PROJECT_PATH, isDev } = require('../constants');

const getCssLoaders = (importLoaders) => [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            modules: false,
            sourceMap: isDev,
            importLoaders,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                // 修复一些和 flex 布局相关的 bug
                postcssFlexbugsFixes,
                postcss({
                    autoprefixer: {
                        grid: true,
                        flexbox: 'no-2009',
                    },
                    stage: 3,
                }),
                index,
            ],
            sourceMap: isDev,
        },
    },
];

module.exports = {
    entry: {
        mymap: path.resolve(PROJECT_PATH, './src/index.tsx'),
    },
    output: {
        filename: `js/test-[name]${isDev ? '' : '.[hash:8]'}.js`,
        path: path.resolve(PROJECT_PATH, './dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            Src: path.resolve(PROJECT_PATH, './src'),
            Components: path.resolve(PROJECT_PATH, './src/components'),
            Utils: path.resolve(PROJECT_PATH, './src/utils'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(PROJECT_PATH, './demo/pages/index.html'),
            filename: 'index.html',
            cache: false, // ！！！v6版本刷新代码页面因为cache问题页面为空
            minify: isDev
                ? false
                : {
                      removeAttributeQuotes: true,
                      collapseWhitespace: true,
                      removeComments: true,
                      collapseBooleanAttributes: true,
                      collapseInlineTagWhitespace: true,
                      removeRedundantAttributes: true,
                      removeScriptTypeAttributes: true,
                      removeStyleLinkTypeAttributes: true,
                      minifyCSS: true,
                      minifyJS: true,
                      minifyURLs: true,
                      useShortDoctype: true,
                  },
        }),
        new CopyPlugin({
            patterns: [
                {
                    context: path.resolve(PROJECT_PATH, './public'),
                    from: '*',
                    to: path.resolve(PROJECT_PATH, './dist'),
                    toType: 'dir',
                },
            ],
        }),
        new WebpackBar({
            name: isDev ? '正在启动' : '正在打包',
            color: '#7CFC00',
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
            },
        }),
        new HardSourceWebpackPlugin(),
        !isDev &&
            new MiniCssExtractPlugin({
                filename: 'css/test-map-[name].[contenthash:8].css',
                chunkFilename: 'css/test-map-[name].[contenthash:8].css',
                ignoreOrder: false,
            }),
    ],
    optimization: {
        minimize: !isDev,
        minimizer: [
            !isDev &&
                new TerserPlugin(
                    {
                        extractComments: false,
                        terserOptions: {
                            compress: { pure_funcs: ['console.log'] },
                        },
                    },
                    !isDev && new OptimizeCssAssetsPlugin(),
                ),
        ].filter(Boolean),
        splitChunks: {
            chunks: 'all',
            name: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: getCssLoaders(1),
            },
            {
                test: /\.less$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    ...getCssLoaders(2),
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/images',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[contenthash:8].[ext]',
                            outputPath: 'assets/fonts',
                        },
                    },
                ],
            },
            {
                test: /\.(tsx?|js)$/,
                loader: 'babel-loader',
                options: { cacheDirectory: true },
                exclude: /node_modules/,
            },
        ],
    },
};
