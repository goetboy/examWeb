
module.exports = {

    devServer: {
      host: '0.0.0.0',
      port: 8081,
        proxy: {
            '/api': {
                //target: 'http://132.232.2.225:8805/',
                target:'http:localhost:80',
                //ws: true,
                changeOrigin: true,
                secure:false
            }
        }
    }
  }
  