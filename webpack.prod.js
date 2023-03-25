import path from "path";
import { merge } from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import common, { __dirname } from "./webpack.common.js";

export default merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "src/dist"),
    filename: "bundle.[contenthash].js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  devtool: "source-map",
  plugins: [new CleanWebpackPlugin()],
});
