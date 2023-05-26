import path from "path";
import { merge } from "webpack-merge";
import common, { __dirname } from "./webpack.common.js";
import webpack from "webpack";

export default merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "src/dist"),
    },
    hot: true,
    port: 3000,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: "inline-source-map",
});
