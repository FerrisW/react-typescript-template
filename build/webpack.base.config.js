const webpack = require('webpack');
const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

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
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: resolve('.cache-loader')
                        }
                    },
                    'thread-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            happyPackMode: true
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'cache-loader',
                        options: {
                            cacheDirectory: resolve('.cache-loader')
                        }
                    },
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            preset: [
                                '@babel/preset-env',
                                '@babel/preset-typescript',
                                '@babel/preset-react',
                            ],
                            plugins: [
                                ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-syntax-dynamic-import',
                                '@babel/plugin-proposal-optional-chaining',
                            ]
                        }
                    }
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/inline',
                exclude: /node_modules/
            },
            {
                test: /\.(eot|ttf|woff|woff2)/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[name].[contenthash:8].[ext]'
                },
                exclude: /node_modules/
            },
            {
                test: /\.(mp4|ogg|mp3|wav)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/audio/[name].[contenthash:8].[ext]'
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __PRO__: constants.IS_PRO,
            __DEMO__: constants.IS_DEV
        }),
        new ForkTsCheckerPlugin({   //加速ts类型检查或eslint linting，支持ts新特性如增量模式等
            typescript: {
                configFile: resolve('./tsconfig.json'),
            },
            eslint: {
                enabled: true,
                files: resolve('src/**/*.{ts,tsx}')
            }
        }),
        new CleanWebpackPlugin(),
        new WebpackManifestPlugin()
    ]
}

module.exports = baseConfig;