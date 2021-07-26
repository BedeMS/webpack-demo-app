const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  // this output depends on the entry points set. In this case
  // in the common.config file.
  output: {
    // [name] refers to the name in the entry point.
    filename: "[name].bundle.js",
    // Where we want our files to go to. dist folder
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    // HTMLWEBPACKPLUGIN allows us to create new html file based on our
    // template and allows for renaming as well.
    new HtmlWebpackPlugin({
      template: "./src/template.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", //3. Inject styles into DOM
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});
