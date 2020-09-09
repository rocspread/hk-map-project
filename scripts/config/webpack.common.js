// eslint-disable-next-line @typescript-eslint/no-var-requires
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const index = require('postcss-normalize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const postcss = require('postcss-preset-env');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebpackBar = require('webpackbar');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PROJECT_PATH, isDev } = require('../constants');

const getCssLoaders = (importLoaders) => [
    'style-loader',
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
        app: path.resolve(PROJECT_PATH, './src/index.tsx'),
    },
    output: {
        filename: `js/[name]${isDev ? '' : '.[hash:8]'}.js`,
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
    ],
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
