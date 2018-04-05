const path = require('path');

module.exports = {
	entry: "./app/app.jsx",
	output: {
		path: path.resolve(__dirname, './public'),
		publicPath: '/public/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
					// Поменял порядок включение пресетов, включилась поддержка стрелочных функций
          presets: ["env", "stage-2", "react"]
        }
      }
		]
	}
}
