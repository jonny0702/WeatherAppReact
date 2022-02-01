const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CompressionWebpackPlugin = resolve('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

require('dotenv').config();

const isDev = process.env.ENV === 'development';
const entry = ['./src/Frontend/index.js'];

if(isDev){
    entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true')
}

module.exports = {
    entry,
    mode: process.env.ENV,

    output:{
        path: path.resolve(__dirname, 'src/Server/public'),
        filename: 'assets/app.js',
        publicPath: '/',
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

    plugins: [
        new Dotenv,
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            minify: false
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? 'assets/app.css' : 'assets/app-[contenthash].css'
        }),
        // isDev ? ()=>{} : new CompressionWebpackPlugin({
        //     test: /\.(js|css)$/,
        //     filename: '[path][base].gz',
        // }),
        isDev ? new webpack.HotModuleReplacementPlugin() : ()=>{},
    ]

}