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
      filename: "./bundle.[contenthash].css",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|wav|mp3|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets",
            },
          },
        ],
      },
    ],
  },
};
