const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const webpack = require("webpack");

const isDev = () =>
{
    return typeof process.env.NODE_ENV === "undefined"
        || process.env.NODE_ENV !== "netlify";
};

let extractSass = new ExtractTextPlugin({
    filename: "style.css",
    disable: !isDev()
});

// This is the main configuration object.
const config = {
    // The start point to compile from is at this file.
    // All of our other source code is included from this point.
    entry: "./src/index.tsx",

    // This is where the resulting JS bundle is placed.
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    mode: "none",
    module: {
        rules: [
            // This rule compiles our TypeScript into JavaScript
            {
                test: /.tsx?$/,
                use: "ts-loader"
            },

            // This rule compiles our Sass into CSS
            {
                test: /.(scss|css)$/,
                use: extractSass.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                importLoaders: 2
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true,
                                plugins: [
                                    autoprefixer({ grid: true })
                                ]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                                outputStyle: "compressed"
                            }
                        }
                    ],
                    fallback: "style-loader" // if we're in development mode, just load into a <style> element
                })
            }
        ]
    },
    plugins: [
        extractSass,
        isDev() ? new webpack.NamedModulesPlugin() : undefined
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".scss", ".css", ".js"]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: true,
        inline: true,
        port: 8000,
        overlay: true
    },
    devtool: isDev() ? "eval-source-map" : false
};

module.exports = config;
