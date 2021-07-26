const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    // this object allows us to create multiple entry points.
    // In order for this to work, we have to make sure the names
    // are accounted for in the output filename in the dev/prod config files
    main: "./src/index.js",
    vendor: "./src/vendor.js",
  },
  module: {
    // An array of Rules which are matched to requests when modules
    // are created. These rules can modify how the module is created.
    // They can apply loaders to the module, or modify the parser.
    rules: [
      {
        // if the  file ends with .html
        test: /\.html$/,
        // use "said loader" on the file, this  will look  through the file
        // and require any assets that we would need into our JS. But this isn't
        // enough. We need to add the "file-loader" under b/c webpack doesn't 
        // understand what these files mean.
        use: ["html-loader"],
      },
      {
        // assets.
        // if file  ends with the following
        test: /\.(svg|png|jpg|gif)$/,
        // apply the file-loader
        use: {
          loader: "file-loader",
          // this will create the assets with  the appropriate names and hashs,
          // then output them into imgs folder.
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
};
