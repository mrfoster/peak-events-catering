var path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CommonsChunkPlugin, UglifyJsPlugin } = require('webpack').optimize;
const { LoaderOptionsPlugin } = require('webpack');
const cssnano = require('cssnano');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(process.cwd(), "dist"),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            "template": "./src\\index.html",
            "filename": "./index.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": false,
            "cache": true,
            "showErrors": true,
            "chunks": "all",
            "excludeChunks": [],
            "title": "Webpack App",
            "xhtml": true,
            "chunksSortMode": function sort(left, right) {
                let leftIndex = entryPoints.indexOf(left.names[0]);
                let rightindex = entryPoints.indexOf(right.names[0]);
                if (leftIndex > rightindex) {
                    return 1;
                }
                else if (leftIndex < rightindex) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        })
        // ,
        // new UglifyJsPlugin({
        //   "mangle": {
        //     "screw_ie8": true
        //   },
        //   "compress": {
        //     "screw_ie8": true,
        //     "warnings": false
        //   },
        //   "sourceMap": false
        // }),
        ,
        new LoaderOptionsPlugin({
            "sourceMap": false,
            "options": {
                "postcss": [
                    autoprefixer(),
                    cssnano({ safe: true, autoprefixer: false })
                ],
                "sassLoader": {
                    "sourceMap": false,
                    "includePaths": []
                },
                "lessLoader": {
                    "sourceMap": false
                },
                "context": ""
            }
        })
    ]
}