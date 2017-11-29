var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');
const path = require('path');

module.exports = {
	entry: {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'app': './src/main.ts',
		'background': './src/app/background/background.ts'
	},

	resolve: {
		extensions: ['.ts', '.js']
	},

	module: {
		rules: [{
				test: /\.ts$/,
				loaders: [{
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: helpers.root('src', 'tsconfig.json')
						}
					}, 'angular2-template-loader'
				]
			}, {
				test: /\.html$/,
				loader: 'html-loader'
			}, {
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader?name=assets/[name].[hash].[ext]'
			}, {
				test: /\.css$/,
				exclude: helpers.root('src', 'app'),
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					loader: 'css-loader?sourceMap'
				})
			}, {
				test: /\.css$/,
				include: helpers.root('src', 'app'),
				loader: 'raw-loader'
			}
		]
	},

	plugins: [
		// Workaround for angular/angular#11580
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)@angular/,
			helpers.root('./src'), // location of your src
		{}
			// a map of your routes
		),

		/*

		Below plugin has been added to suppress this warning at build

		WARNING in ./~/@angular/core/esm5/core.js
		6438:15-36 Critical dependency: the request of a dependency is an expression

		WARNING in ./~/@angular/core/esm5/core.js
		6458:15-102 Critical dependency: the request of a dependency is an expression

		 */
		new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, './client')),

		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'background', 'vendor', 'polyfills']
		}),

		new HtmlWebpackPlugin({
			template: 'src/app/option/option.html',
			filename: 'option.html',
			chunks: [   // chunks which to have entry in option.html
				'polyfills',
				'vendor',
				'app',
			],
			chunksSortMode: 'manual' // to get the chunks ordered as how it should be injected into html.
		}),
		new CopyWebpackPlugin(
			[{
					from: 'src/app/manifest.json',
					to: ''
				}, {
					from: 'src/app/ic_all_inclusive_black_18dp.png',
					to: ''
				}, {
					from: 'src/app/ic_all_inclusive_black_24dp.png',
					to: ''
				}, {
					from: 'src/app/ic_all_inclusive_black_36dp.png',
					to: ''
				}, {
					from: 'src/app/ic_all_inclusive_black_48dp.png',
					to: ''
				}
			], {
			copyUnmodified: true
		})
	]
};
