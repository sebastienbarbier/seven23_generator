const webpack = require("webpack");
const path = require("path");
const buildPath = path.resolve(__dirname, "build");
const nodeModulesPath = path.resolve(__dirname, "node_modules");
const TransferWebpackPlugin = require("transfer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
  mode: "development",
  // Entry points to the project
  entry: ["./src/app/app.js"],
  // Server Configuration options
  devServer: {
    contentBase: "src/www/html", // Relative directory for base of server
    hot: true, // Live-reload
    inline: true,
    port: 3000, // Port Number
    host: "0.0.0.0", // Change to '0.0.0.0' for external facing server
    historyApiFallback: true,
    disableHostCheck: true
  },
  devtool: "eval",
  output: {
    path: buildPath, // Path of output file
    filename: "app.js",
    globalObject: "this"
  },
  plugins: [
    new CleanWebpackPlugin(),
    // Enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
    // Allows error warnings but does not stop compiling.
    new webpack.NoEmitOnErrorsPlugin(),
    // Moves files
    new TransferWebpackPlugin(
      [{ from: "www/html" }, { from: "www/images", to: "images" }],
      path.resolve(__dirname, "src")
    )
    // new WorkboxPlugin.GenerateSW({
    //   // these options encourage the ServiceWorkers to get in there fast
    //   // and not allow any straggling 'old' SWs to hang around
    //   clientsClaim: false,
    //   skipWaiting: false
    // })
  ],
  module: {
    rules: [
      {
        // React-hot loader and
        test: /\.js$/, // All .js files
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  edge: "17",
                  firefox: "60",
                  chrome: "67",
                  safari: "11.1"
                }
              }
            ],
            "@babel/preset-react"
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-runtime"
          ]
        },
        exclude: [nodeModulesPath]
      },
      {
        test: /\.worker.js$/,
        loader: "worker-loader",
        options: { inline: true, fallback: false }
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff|ttf|svg|woff2)$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  }
};

module.exports = config;
