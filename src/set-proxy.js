const proxySettings = {
    // 接口代理1
    '/api/': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
    },
    // 接口代理2
    '/api-2/': {
        target: 'http://www.google.com',
        changeOrigin: true,
        pathRewrite: {
            '^/api-2': '',
        },
    },
};

export default proxySettings;
