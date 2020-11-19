/* eslint-disable */
const path = require('path');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = (env, options) => {
    const isProduction = options.mode === 'production'
    const config = {
        mode: isProduction ? 'production' : 'development',
        entry: ['./src/style.css', './src/index.js'],
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './dist'),
            publicPath: ASSET_PATH
        },
        devServer: {
            overlay: true,
            port: 8080,
        },
        devtool: isProduction ? 'none' : 'source-map',
        watch: !isProduction,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader, 'sass-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|svg|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                        },

                    ],
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader',
                },
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                    options: {
                        fix: true,
                    }
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }

            ]
        },
        plugins: [
            //new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: 'index.html'
            }
            ),
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new CopyWebpackPlugin({
                patterns:
                    [{ from: './src/assets', to: './assets' }]
            })
        ]
    }
    return config;
};