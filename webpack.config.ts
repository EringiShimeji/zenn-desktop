import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import TsconfigPathsImportPlugin from 'tsconfig-paths-webpack-plugin';

const isDev = process.env.NODE_ENV === 'development';

// 共通の設定
const common: Configuration = {
  mode: isDev ? 'development' : 'production',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    plugins: [
      new TsconfigPathsImportPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.main.json'),
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.(ico|png|jpe?g|svg|eot|woff?2?)$/,
        type: 'asset/resource',
      },
    ],
  },
  watch: isDev,
  stats: 'errors-only',
  performance: { hints: false },
  devtool: isDev ? 'inline-source-map' : undefined,
};

// メインプロセス用の設定
const main: Configuration = {
  ...common,
  target: 'electron-main',
  entry: { main: './src/main.ts' },
};

// プリロード用の設定
const preload: Configuration = {
  ...common,
  target: 'electron-preload',
  entry: { preload: './src/preload.ts' },
};

// レンダラープロセス用の設定
const renderer: Configuration = {
  ...common,
  target: 'web',
  entry: { renderer: './src/renderer.tsx' },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      minify: !isDev,
      inject: 'body',
      filename: 'index.html',
      template: './src/index.html',
    }),
  ],
};

const config = isDev ? [renderer] : [main, preload, renderer];

export default config;
