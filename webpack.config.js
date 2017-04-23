var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash:20].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(process.cwd(), "dist"),
        filename: 'bundle.[chunkhash:20].js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    "sass-loader"
                ],
                // use style-loader in development
                fallback: "style-loader"
            })
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&mimetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            "template": "./src\\index.html",
            "filename": "./index.html",
            "favicon": "src/favicon.ico"
        }),
        extractSass,
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new WebpackCleanupPlugin(),
        new CopyWebpackPlugin([
            // {output}/file.txt
            { from: 'web.config' }
        ])
    ]
};
