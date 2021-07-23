const webpack = require('webpack');
const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const constants = require('./constants');
const { resolve } = require('./utils');

const baseConfig = {
    target: 'web',
    stats: 'minimal',  //用于控制构建时显示哪些包信息[link:https://webpack.js.org/configuration/stats/#root],选项值minimal表示仅在错误或新编译时输出
    entry: path.resolve(__dirname, '../src/index.tsx'),
    resolve: {
        extensions: constants.FILE_EXTENSIONS,
        plugins: [
            new TsconfigPathsPlugin({
                configFile: resolve('./tsconfig.json'),
                extensions: constants.FILE_EXTENSIONS,  //处理解析器插件无法获取resolve.extensions的情况
            })
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __PRO__: constants.IS_PRO,
            __DEMO__: constants.IS_DEV
        })
    ]
}

module.exports = baseConfig;