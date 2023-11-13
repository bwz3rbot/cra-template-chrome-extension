const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");
module.exports = {
	entry: {
		index: "./src/index.js",
	},
	devServer: {
		port: 3000,
		open: true,
		liveReload: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
				runtimeErrors: true,
			},
		},
	},
	mode: "development",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader", // Replace 'babel-loader' with the appropriate loader
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
				exclude: /node_modules/,
				use: ["file-loader?name=[name].[ext]"], // ?name=[name].[ext] is only necessary to preserve the original file name
			},
		],
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "manifest.json", to: "../manifest.json" },
				{
					from: "public/assets",
					to: "../assets",
				},
			],
			options: {
				concurrency: 100,
			},
		}),
		new HTMLPlugin({
			title: "React extension",
			filename: `index.html`,
			chunks: ["index"],
			template: "public/index.html",

			templateParameters: {
				PUBLIC_URL: process.env.PUBLIC_URL || "",
			},
		}),
		new webpack.ProvidePlugin({
			React: "react",
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@": path.resolve(__dirname, "src/"),
		},
	},
	output: {
		path: path.join(__dirname, "dist/js"),
		filename: "[name].js",
	},
};
