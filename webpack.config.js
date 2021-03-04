const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = !isDevelopment;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  };

  if (isProduction) {
    config.minimizer = [new OptimizeCssAssetsWebpackPlugin(), new TerserWebpackPlugin()];
  }

  return config;
};

const fileName = (ext) => (isDevelopment ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: {
    main: ["./index.tsx"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: fileName("js")
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@models": path.resolve(__dirname, "src/models")
    }
  },
  optimization: optimization(),
  devServer: {
    port: 3001,
    proxy: {
      "/api/auth": {
        target: "https://alexlatypov94-reactgame.herokuapp.com/"
        // ws: true
      }
    },
    historyApiFallback: true
  },
  devtool: isDevelopment ? "source-map" : "none",
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      minify: {
        collapseWhitespace: isProduction,
        removeComments: isProduction
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/assets/favicon.ico"),
          to: path.resolve(__dirname, "dist")
        },
        { from: path.resolve(__dirname, "public/assets/img"), to: path.resolve(__dirname, "dist/public/assets/img") },
        {
          from: path.resolve(__dirname, "public/assets/audio"),
          to: path.resolve(__dirname, "dist/public/assets/audio")
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: fileName("css")
    }),
    new ESLintPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader"
        ]
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(jpg|jpeg|svg|gif|png|ico)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ttf|wof|wof2|eot)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: ["file-loader"]
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
