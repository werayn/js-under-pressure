import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
    entry: path.join(__dirname,'src','index.js'),
    output: {
        path: path.join(__dirname,'build'),
        filename: 'index.bundle.js',
        libraryTarget: 'umd',
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    devServer: {
        contentBase: path.join(__dirname,'src'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                loaders: ['file-loader'],
            },
            {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'public','index.html'),
            filename: 'index.html',
            favicon: path.join(__dirname,'public','favicon.png'),
        }),
    ],
    node: {
        fs: 'empty',
    },
};
