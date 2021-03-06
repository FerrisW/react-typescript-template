const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
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
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [resolve('node_modules')],
                use: [
                    'style-loader',
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: resolve('.cache-loader')
                        }
                    },
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: resolve('.cache-loader')
                        }
                    },
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './build/template/index.html',
            filename: 'index.html',
            inject: true,   //????????????true(?????????) | 'head' | 'body' | false,??????true,?????????????????????????????????????????????????????????template?????????head/body
        }),
        new CaseSensitivePathsPlugin(), //??????????????????????????????????????????????????????????????????
        new BundleAnalyzerPlugin({}),   //?????????????????????
    ]
})
