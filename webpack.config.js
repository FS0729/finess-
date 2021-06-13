/**
 * webpack 配置文件
 * author：fengsen   2021-06-12
 * */
const path = require('path')
// 引入  html-webpack-plugin
const HtmlWebpackPlugin = require("html-webpack-plugin")
//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//将css文件及代码进行极致压缩s
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    // 入口
    entry: {
        // 公用css
        commonCSS: './src/js/commonCSS.js',
        index: './src/js/index.js',
        login: './src/js/login.js',
        advertisement: './src/js/advertisement.js',
        register: './src/js/register.js'
    },
    // 出口
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: './'
    },
    // 解释器loader
    module: {
        rules: [
            {
                test: /\.css$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader']
            },
            {
                test: /\.less$/, use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '../'
                    }
                }, 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    name: '[hash].[ext]',
                    limit: 15 * 1024,
                    esModule: false,
                    outputPath: 'img'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'fonts'
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',    // loader 编译es6为es5
                exclude: /node_modules/  // 排除
            },
        ]
    },
    plugins: [
        //主页 index.js
        new HtmlWebpackPlugin({
            template: './src/page/index.html',
            filename: 'index.html',
            chunks: ['index', 'commonCSS']
        }),
        // 登录页login.html
        new HtmlWebpackPlugin({
            template: './src/page/login.html',
            filename: 'login.html',
            chunks: ['login', 'commonCSS']
        }),
        // 广告页 advertisement.html
        new HtmlWebpackPlugin({
            template: './src/page/advertisement.html',
            filename: 'advertisement.html',
            chunks: ['advertisement', 'commonCSS']
        }),
        // 注册页 register
        new HtmlWebpackPlugin({
            template: './src/page/register.html',
            filename: 'register.html',
            chunks: ['register', 'commonCSS']
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css' // 输出到css文件夹里
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new CleanWebpackPlugin()
    ],
    // mode环境
    mode: 'development',


    // 开发服务器 配置【】
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 启动服务器目录
        compress: true, // 启动gzip
        port: 666,  // 端口  8080 80  8081 8082
        open: true, // 自动打开服务
        publicPath: '/', // 静态资源查找路径
        openPage: 'login.html', // 打开的页面
    },
    target: 'web', // 目标是浏览器
}
