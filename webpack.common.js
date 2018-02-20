const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const extractSass = new ExtractTextPlugin({
    filename: '[name].[chunkhash].css',
    allChunks: true
    // disable: process.env.NODE_ENV === 'development'
});

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist')
};

module.exports = {

    // Where to look for files
    context: PATHS.src,

    // TODO: Should sourcemaps be removed from production?
    devtool: 'source-map',

    entry: {
        main: './main.js',
        style: './style.scss'
    },

    output: {
        filename: '[name].[chunkhash].js',
        path: PATHS.dist
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                }
            },
            {
                test: /\.html$/,
                loader: 'vue-template-loader',

                // We don't want to pass `src/index.html` file to this loader.
                // https://github.com/ktsn/vue-template-loader/issues/5
                exclude: /index.html/,
                options: {
                    transformToRequire: {
                        // The key should be an element name
                        // The value should be an attribute name or an array of attribute names
                        img: 'src'
                    }
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader',
                        options: {
                            // https://github.com/material-components/material-components-web/issues/351
                            includePaths: glob.sync('node_modules').map((d) => path.join(__dirname, d))
                        }
                    }]
                })
            },
            {
                test: /\.png$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // publicPath is reserved for CDN path
                        // publicPath: '<CDN PATH WILL GO HERE IN FUTURE>',
                        outputPath: 'assets/'
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            excludeAssets: [/style.*.js/]
        }),

        // https://github.com/jamesjieye/html-webpack-exclude-assets-plugin
        new HtmlWebpackExcludeAssetsPlugin(),

        extractSass,

        // Since these micro apps are self contained we strip dependencies from package.json
        // So it won't install anything else when pulled by node-js server
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './package.json'),
                to: '.',
                transform (content) {
                    const { name, version, description } = JSON.parse(content.toString());

                    return JSON.stringify({ name, version, description }, null, 4);
                }
            }
        ]),

        // Code splitting

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.includes('node_modules');
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        })
    ],

    resolve: {
        extensions: ['.jsx', '.vue', '.js', '.json', '.html'],

        mainFields: ['module', 'main'],

        alias: {

            vue$: 'vue/dist/vue.runtime.esm.js'

            // This alias is required during development only version
            // vue$: 'vue/dist/vue.esm.js'
        }
    }

};
