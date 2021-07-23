const { default: HtmlWebpackPlugin } = require('html-webpack-plugin');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TersePlugin = require('terser-webpack-plugin');

const { resolve } = require('./utils');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: resolve('./dist'),
        filename: 'static/js/[name].[contenthash].js',
        chunkFilename: 'tatic/js/chunk/[name].[contenthash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './template/index.html',
            filename: 'index.html',
            inject: true,
            minify: {   //生产环境下会默认设置为true
                removeComments: true,
                collapseWhitespace: true,
            }
        }),
        new MiniCssExtractPlugin({  //抽取css为单独的文件
            filename: 'static/css/[name].[contenthash].css',
            chunkFilename: 'static/css/chunk/[name].[contenthash].css',
            ignoreOrder: true,  //删除order警告
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCssAssetsPlugin({}),    //压缩css
            new TersePlugin({   //压缩js
                parallel: true, //多进程
                terserOptions: {
                    format: {
                        comments: false
                    }
                },
                extractComments: false
            })
        ]
    }
})
