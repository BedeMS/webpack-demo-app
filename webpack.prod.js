const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    // unlike the  development mode,  we are using hashing to generate our file name.
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    // The bottom three plugins optimize our different file types. JS/CSS/HTML
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        // this plugin gives us options on how to edit our HTML file.
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
  plugins: [
    // This plugin is used to extract our css into a seperate file and pump
    // the link into our head element.
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    // This plugin removes any duplicate files when same files are generated again.
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // this is what we're using here instead of "style-loader" because
          // we want to extract and include the file directly into our HTML.
          //  Where as style loader would have used JS to load css in the DOM,
          // which lead to FOUC and poor user experience. We have to make sure to 
          // use the plugin above first and include the loader.
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader", //1. Turns sass into css
        ],
      },
    ],
  },
});
