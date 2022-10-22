const { defineConfig } = require('@vue/cli-service')
const tsImportPluginFactory = require('ts-import-plugin')
const {merge} = require('webpack-merge')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      "/dev-api":{
        target: 'https://d33a5037-6c63-4e92-8bb1-30018ab701ea.bspapp.com/http/',
        //ws: true,
        changeOrigin: true,
        pathRewrite:{
          "/dev-api":""
        }
      }
    }
  },
  chainWebpack: config => {
    config.module
        .rule('ts')
        .use('ts-loader')
        .tap(options => {
          options = merge(options, {
            transpileOnly: true,
            getCustomTransformers: () => ({
              before: [
                tsImportPluginFactory({
                  libraryName: 'vant',
                  libraryDirectory: 'es',
                  style: true
                })
              ]
            }),
            compilerOptions: {
              module: 'es2015'
            }
          });
          return options;
        });
  }
})
