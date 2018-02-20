const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const commonConfig = require('./webpack.common');

// Add uglification and compression plugin
commonConfig.plugins.push(
    new UglifyJsPlugin(),
    new CompressionPlugin()
);

module.exports = commonConfig;
