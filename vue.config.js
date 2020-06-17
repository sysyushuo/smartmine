//vue.config.js

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/',
    lintOnSave: false,
    configureWebpack: config => {
        //引入earthsdk
        const cwp = new CopyWebpackPlugin([
            {
                from: './node_modules/earthsdk/dist/XbsjCesium',
                to: 'js/earthsdk/XbsjCesium',
                toType: 'dir'
            },
            {
                from: './node_modules/earthsdk/dist/XbsjEarth',
                to: 'js/earthsdk/XbsjEarth',
                toType: 'dir'
            }
        ]);
        config.plugins.push(cwp);
    }
};