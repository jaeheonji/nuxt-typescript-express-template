const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function() {
  // Add .ts extension for store, middleware and more
  this.nuxt.options.extensions.push('ts');

  // Extend build
  this.extendBuild(config => {
    const tsLoader = {
      loader: 'ts-loader',
      options: { appendTsSuffixTo: [/\.vue$/], transpileOnly: true },
      exclude: [/vendor/, /\.nuxt/],
    };
    config.module.rules.push({
      test: /((client|server)\.js)|(\.tsx?)$/,
      ...tsLoader,
    });
    config.resolve.extensions.push('.ts');
    config.module.rules.map(rule => {
      if (rule.loader === 'vue-loader') {
        rule.options.loaders = { ts: tsLoader };
      }
      return rule;
    });

    // Fork-Ts-Checker
    if (config.name === 'client') {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          workers: ForkTsCheckerWebpackPlugin.ONE_CPU,
          tslint: true,
          vue: true,
        }),
      );
    }
  });
};
