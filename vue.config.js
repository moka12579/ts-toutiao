const { defineConfig } = require('@vue/cli-service')

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
})
