const path = require("path");
const resolve = dir => path.join(__dirname, dir);

const BASE_URL = process.env.NOOE_ENV === "procution" ? "/my-blog/" : "./";

const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("_c", resolve("src/components"));
    // set svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      iview: "ViewUI"
    }
  },
  // configureWebpack: config => {
  //   config.plugins.push(new CompressionPlugin({
  //         filename: '[path].gz[query]',
  //         algorithm: 'gzip',
  //         test:/\.js$|\.html$|.\css/, // 匹配文件名
  //         threshold: 10240, // 对超过10k的数据压缩
  //         minRatio: 0.8,	// 只有压缩好这个比率的资产才能被处理
  //         deleteOriginalAssets: true // 删除源文件
  //      }));
  // },
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    host: "0.0.0.0",
    port: 9098,
    compress: true,
    disableHostCheck: true,
    proxy: {
      "/api": {
        // target: "http://www.xxxiwnig.com",
        // target: "http://192.168.3.37/my-blog",
        // target: "http://192.168.0.102/my-blog",
        target: "http://192.168.3.200:8085/my-blog",
        // target: "http://192.168.3.125:8085/my-blog",
        changeOrigin: true,
        pathRewrite: {
          // "^/api": "" // 重写接口
        }
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px",
            viewportWidth: 750,
            unitPrecision: 3,
            propList: ["*"],
            viewportUnit: "vw",
            fontViewportUnit: "vw",
            selectorBlackList: [".ignore"],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: /(\/|\\)(node_modules)(\/|\\)/
          })
        ]
      }
    }
  }
};
