/* eslint-disable */
const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const whitelister = require("purgecss-whitelister");
const sane = require("sane");
// const autoprefixer = require("autoprefixer");
// const postcssPresetEnv = require("postcss-preset-env");
// const postcssPurgecss = require("@fullhuman/postcss-purgecss");
// const postcssNested = require("postcss-nested");
// const postcssReporter = require("postcss-reporter");

const isProduction = process.env.NODE_ENV === "production";

require("colors");

const pkg = require("./package.json");

// const isHotReloaded = process.argv.includes("serve");

if (!pkg.kindConfig) {
  console.error("Error: looks like this project hasn't been configured yet".red);
  console.info("run `yarn project:configure` to get started");
  process.exit();
}

const config = {
  https: false,
  host: "0.0.0.0",
  port: pkg.kindConfig.ports.assets,
  // Whitelist selectors to stop purgecss from removing them from your CSS
  // You can pass in whole stylesheets to whitelist everything from thirdparty libs
  // Accepts string paths, array of strings, globby strings, or array of globby strings:
  // ["./node_modules/lib1/*.css", "./node_modules/lib2/*.scss"]
  purgecss: {
    whitelist: [],
    // Whitelist based on a regular expression.
    // Ex: [/red$/] (selectors ending in "red" will remain)
    // https://www.purgecss.com/whitelisting
    whitelistPatterns: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!(|.*?:)cursor-move).+-move$/,
      /^router-link(|-exact)-active$/,
    ],
    cssFileExtensions: ["css", "less", "pcss", "postcss", "sass", "scss", "styl"],
    cssUserFileExtensions: ["html", "twig", "vue", ""],
  },
};

module.exports = {
  runtimeCompiler: false,
  outputDir: "dist",
  filenameHashing: false,
  pages: {
    "shu-design-system-base": {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'shu-design-system']
    }
  },
  // @todo implement asset manifest parsing in WP theme before we can enable this
  // filenameHashing: isProduction,

  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {},
    },
  },

  devServer: {
    // Uncommenting these will lose the "Network" app access
    host: config.host,
    port: config.port,
    https: config.https,
    clientLogLevel: "info",
    headers: { "Access-Control-Allow-Origin": "*" },
    disableHostCheck: true,
  },

  configureWebpack: {
    plugins: [
      new CopyPlugin({ patterns:
        [
          {
            context: "src/images",
            from: "**/*{.gif,.jpg,.jpeg,.png,.svg}",
            to: "img/[path][name].[ext]",
            toType: "template",
          },
        ]
      }),
      new ManifestPlugin({
        publicPath: "/dist/",
        map: (file) => {
          if (isProduction) {
            // Remove hash in manifest key
            file.name = file.name.replace(/(\.[a-f0-9]{8})(\..*)$/, "$2");
          }
          return file;
        },
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
      }),
    ],
  },

  // Disable building a useless index.html file
  chainWebpack: (conf) => {
    conf.plugins.delete("html");
    conf.plugins.delete("preload");
    conf.plugins.delete("prefetch");
    conf.module
      .rule('yml')
      .test(/\.yml$/)
      .use('yml-loader')
        .loader('yml-loader')
        .end()
  },

  publicPath: isProduction
    ? "/"
    : `${config.https ? "https" : "http"}://${config.host}:${config.port}/`,

  productionSourceMap: true,

  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {
      fix: true,
      files: ["src/**/*.{vue,htm,html,css,sss,less,scss,postcss}"],
    },
    svgSprite: {
      loaderOptions: {
        extract: true,
        symbolId: (filePath) => `icon-${path.basename(filePath).replace(".svg", "")}`,
        spriteFilename: isProduction ? "img/icons.[hash:8].svg" : "img/icons.svg",
      },
    },
  },
};
