const webpackConfig = require('./webpack.config');

delete webpackConfig.entry;
delete webpackConfig.output;
delete webpackConfig.plugins;

webpackConfig.devtool = 'inline-source-map';
webpackConfig.module.rules.push({
    test: /\.(j|t)s$/,
    enforce: 'post',
    use: {
        loader: 'istanbul-instrumenter-loader',
        options: {
            esModules: true
        }
    },
    exclude: /node_modules/
});

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',

        // Injected into browser
        frameworks: ['mocha'],

        // list of files / patterns to load in the browser
        files: [
            // run all in dev mode
            'test/**/*.ts'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        preprocessors: {
            // 'src/**/*.ts': ['webpack', 'sourcemap'],
            // 'test/jsonapi/*.ts': ['webpack', 'sourcemap']
            // 'test/**/*.js': ['webpack', 'sourcemap'],
            'test/**/*.ts': ['webpack', 'sourcemap'],
        },

        mime: {
            'text/x-typescript': ['ts','tsx']
        },

        // Which webpack config to use
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },

        // reporters: ['progress'],
        reporters: ['progress', 'coverage-istanbul'],

        coverageIstanbulReporter: {
            dir: 'coverage',
            reports: [ 'text-summary', 'html' ],
            fixWebpackSourcePaths: true
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Run all tests on Chrome in headless mode
        browsers: ['ChromeHeadless'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        failOnEmptyTestSuite: false

        // Concurrency level
        // how many browser should be started simultaneous
        // concurrency: Infinity
    })
}
