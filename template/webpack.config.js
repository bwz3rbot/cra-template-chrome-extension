const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ExtReloader = require("webpack-ext-reloader");

const webpack = require("webpack");

const port = process.env.PORT || 3000;
module.exports = {
	entry: {
		options: "./src/Page/Options/index.js",
		popup: "./src/Page/Popup/index.js",
		background: "./src/Script/Background/index.js",
		content: "./src/Script/Content/index.js",
	},
	mode: "development", // this is overriden by the --mode flag in the npm build script
	devtool: "source-map", // this is required to run the extension in dev mode, if removed it uses eval() which is not allowed by the chrome extension manifest
	devServer: {
		port,
		open: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
				runtimeErrors: true,
			},
		},
	},
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
		new ExtReloader({
			port,
			entries: {
				contentScript: "content",
				background: "background",
				extensionPage: ["options", "popup"],
			},
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		alias: {
			"@": path.resolve(__dirname, "src/"),
			"@PopupPage": path.resolve(__dirname, "src/Page/Popup/"),
			"@OptionsPage": path.resolve(__dirname, "src/Page/Options/"),
			"@BackgroundScript": path.resolve(
				__dirname,
				"src/Script/Background/"
			),
			"@ContentScript": path.resolve(__dirname, "src/Script/Content/"),
			"@Component": path.resolve(__dirname, "src/Component/"),
			"@Hook": path.resolve(__dirname, "src/Hook/"),
			"@Util": path.resolve(__dirname, "src/Util/"),
			"@Context": path.resolve(__dirname, "src/Context/"),
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
