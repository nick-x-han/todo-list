 const { merge } = require('webpack-merge');
 const common = require('./webpack.common.js');

 module.exports = merge(common, {
   mode: 'development',
//    devtool: 'inline-source-map', production's recommendation
    devtool: 'eval-source-map', //odin's recommendation
   devServer: {
     static: './dist', //from the production website. for finding static assets, apparently
    watchFiles: ["./src/template.html"], //from odin
   },
 });