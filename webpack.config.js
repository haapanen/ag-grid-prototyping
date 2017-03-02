var path = require("path");

module.exports = {
    entry: {
        app: path.resolve(__dirname, "./app/entry.tsx")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, "./app"),
                use: ["ts-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload,
        port: 8080
        // ...
    },
};
