/** @type import('@vue/cli-service').ProjectOptions */
module.exports = {
    chainWebpack(config) {
        config.devtool('source-map')
    },
    css: {
        sourceMap : true,
    }
}