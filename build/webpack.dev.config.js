const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { resolve } = require('./utils');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        path: resolve('./dist'),
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    devServer: {
        port: 80,
        host: '0.0.0.0',
        hot: true,
        disableHostCheck: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './template/index.html',
            filename: 'index.html',
            inject: true,   //可选值：true(默认值) | 'head' | 'body' | false,若为true,则会根据脚本的加载顺序将资源文件加载在template文件的head/body
        }),
        new CaseSensitivePathsPlugin(), //处理不同系统下请求模块资源大小写不兼容的问题
        new ForkTsCheckerPlugin({   //加速ts类型检查或eslint linting，支持ts新特性如增量模式等
            typescript: {
                configFile: resolve('./tsconfig.json'),
            },
            eslint: {
                enabled: true,
                files: resolve('src/**/*.{ts, tsx}')
            }
        }),
        new BundleAnalyzerPlugin({}),   //包大小分析工具
    ]
})