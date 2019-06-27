var path = require('path')
var webpack = require('webpack')
var proxy = require('http-proxy-middleware');
module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: 'build.js'
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					'css-loader'
				],
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			},
			
			{
				test: /\.(csv|tsv)$/,
				use: [
					'csv-loader'
				]
			},
			// xml loader
			{
				test: /\.xml$/,
				use: [
					'xml-loader'
				]
			}, 
			{
				test: /\\\\\\\\.css$/,
				loader: "style!css"
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	devServer:{
		port: 8081,//自己项目的端口
	    host: 'localhost',//自己项目的地址（注意：这里不要加http协议）
	    proxy: {
	      '/api/*': {//匹配根路径
	        target: 'http://127.0.0.1:8080',//跨域要访问的地址及端口
	        changeOrigin: true,
	        secure: false,
			pathRewrite:{'^/api':'/'}
	      },
		   '/51job/*': {//匹配根路径
		    target: 'https://search.51job.com/',//跨域要访问的地址及端口
		    changeOrigin: true,
		    secure: false,
		  			pathRewrite:{'^/51job':'/'}
		  },
	    }
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
