const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack= require('webpack');


let setupAPI = function () {
    const hosts = {
        development: "http://localhost:5000",
        production: ""
    }
    return hosts[process.env.NODE_ENV];
}

const apiHost = setupAPI();
console.log(apiHost);

module.exports = {
    entry: './src/js/index.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/about.html',
            inject: 'body',
            filename: 'about.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/contact.html',
            inject: 'body',
            filename: 'contact.html'
        }),
        new webpack.DefinePlugin({
            __API__: JSON.stringify(apiHost)
        })
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../server/dist'),
    },
    devServer: {
        contentBase: path.join(__dirname, '../server/dist'),
        port: 8000,
        open: true,
    }
};