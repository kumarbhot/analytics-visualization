// This is webpack development configuration

const commonConfig = require('./webpack.common');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

commonConfig.plugins.push(
    new BundleAnalyzerPlugin()
);

module.exports = commonConfig;
