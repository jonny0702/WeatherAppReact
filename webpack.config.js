const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
    entry: path.join(__dirname, 'src/index.js'),

    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js',
    },

    mode: 'development',

    resolve:{
        extensions: ['.js', '.jsx'],

    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use:['babel-loader'],
            },
            {
                test: /\.html$/,
                use: [
                    {loader: 'html-loader'},
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                use:[{loader:'file-loader'}]
            },
        ],
    },
    devServer:{
        static:path.join(__dirname, 'dist'),
        port: 5000,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            minify: false
        }),
        new Dotenv
    ]

}