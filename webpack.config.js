const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    //可以有多个入口，main是将要打包生成的chunk的名称
    main: "./src/main.js",
  },
  output: {
    //__dirname是node的全局变量，它给出当前执行文件所在的目录的绝对路径
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    open: true, //自动打开浏览器
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/resource",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: "img/[name].[hash:6][ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      chunks: ["main"], //在这配置将哪个chunk引入html
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),

    //可以不用配置optimization，直接在plugins中new也可
    // new TerserWebpackPlugin(),
    // new CssMinimizerWebpackPlugin(),

    // 每次打包前清除dist目录
    new CleanWebpackPlugin(),
  ],
  optimization: {
    // 代码压缩
    minimize: true,
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
    // development mode tree shaking
    usedExports: true,
    // 代码分割
    splitChunks: {
      chunks: "all",
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
