const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const webpack = require("webpack");
module.exports = {
	entry: {
		options: "./src/Page/Options/index.js",
		popup: "./src/Page/Popup/index.js",
		background: "./src/Script/Background/index.js",
		content: "./src/Script/Content/index.js",
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
				{ from: "manifest.json", to: path.join(__dirname, "dist") },
				{
					from: "public",
					to: path.join(__dirname, "dist"),
					globOptions: {
						ignore: ["**/options.html", "**/popup.html"],
					},
				},
			],
			options: {
				concurrency: 100,
			},
		}),
		...["options", "popup"].map(name => {
			return new HTMLPlugin({
				title: `${name} page`,
				filename: `${name}.html`,
				chunks: [name],
				template: `public/${name}.html`,
				minify: true,
				templateParameters: {
					PUBLIC_URL: process.env.PUBLIC_URL || "",
				},
			});
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
		path: path.join(__dirname, "dist"),
		// include full folder path
		filename: pathData => {
			if (["background", "content"].includes(pathData.chunk.name)) {
				return `bundle/script/${pathData.chunk.name}.js`;
			} else {
				return `bundle/page/${pathData.chunk.name}.js`;
			}
		},
	},
};
