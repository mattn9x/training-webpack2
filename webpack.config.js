let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');
let optimize = require('webpack').optimize;
let webpack = require('webpack');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		app: './src/app.js',
		vendors: [
			'jquery',
			'bootstrap',
			'angular',
			'angular-ui-router'
		]
		// contact: './src/contact.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash].min.js'
	},
	module: {
		//css- loader
		rules: [
			//babel compile es6 => es5
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [
					'ng-annotate-loader?single_quotes',
					'babel-loader?presets[]=es2015',
					'strip-loader?strip[]=debug,strip[]=console.log'
				]
				/*query: {presets: ['es2015']}*/
			},
			//css-loader and style-loader
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.(woff|woff2|ttf|eot)$/,
				loader: 'file-loader',
				query: {
					name: 'assets/font/[name]-[hash].[ext]'
				}
			},
			//load image
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'file-loader',
				query: {
					name: 'assets/images/[name]-[hash].[ext]'
				}
			},
			//allow load html => javascript (must html to js)
			{
				test: /\.html$/,
				loaders: [
					'html-loader'
				]
			}
		]
	},
	//config dev-server
	devServer: {
		//enable gzip
		contentBase: path.join(__dirname, "dist"),
		compress: true,
		port: 8888,
		open: true, //open website with port default or set
		// stats: 'errors-only'
	},
	// devtool: 'source-map', //config source map
	plugins: [
		//https://www.npmjs.com/package/uglifyjs-webpack-plugin
		new UglifyJSPlugin({
			compress: true,
			comments: false,
			beautify:true
		}),
		new HtmlWebpackPlugin({
			title: "Custom template ManhHip",
			//using html-minify: https://github.com/kangax/html-minifier#options-quick-reference
			minify: {
				collapseWhitespace: true, //minify html
				removeComments: true
			},
			hash: true, //add hash key in link or src css, js
			// excludeChunks: ['contact'], //<=> exclude file
			filename: 'index.html', // file output
			template: './src/index.html', //file parse
		}),
		/*new HtmlWebpackPlugin({
		 title: "Custom contact template",
		 minify: {
		 collapseWhitespace: true
		 },
		 hash: true,
		 chunks: ['contact'],// <-> includ
		 filename: 'contact.html',
		 template: './src/contact.html'
		 }),*/
		new ExtractTextPlugin({
			filename: "app.[hash].css",
			disable: false,
			allChunks: false
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jquery: 'jquery',
			'window.jQuery': 'jquery',
			jQuery: 'jquery'
		})
	]
};