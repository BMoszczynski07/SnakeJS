import HtmlWebpackPlugin from "html-webpack-plugin";

import { fileURLToPath } from "url";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  entry: "./src/script.js",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./src/style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
};
