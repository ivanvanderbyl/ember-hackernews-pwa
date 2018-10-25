/* eslint-env node */
'use strict'

const EmberApp = require('ember-cli/lib/broccoli/ember-app')

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sourcemaps: {
      enabled: false,
    },
    autoprefixer: {
      cascade: false,
      map: false,
    },
    minifyJS: {
      enabled: false
    },
    'ember-cli-babel': {
      includePolyfill: false,
    },
    'asset-cache': {
      version: '7',

      include: [
        '/',
        'assets/hn*.js',
        'assets/**/**/*',
      ],
      exclude: [
        'assets/**/*.map',
        'assets/vendor*.css',
      ],

      lenientErrors: false,
    },

    'ember-service-worker': {
      // registrationStrategy: 'async',
      registrationStrategy: 'inline',
      versionStrategy: 'every-build',
    },

    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      replaceExtensions: ['html', 'css', 'js', 'hbs'],
    },

    minifyHTML: {
      enabled: false,
      htmlFiles: ['index.html'],
      minifierOptions: {
        useShortDoctype: true,
        sortClassName: true,
        sortAttributes: true,
        removeRedundantAttributes: true,
        // removeOptionalTags: true,
        removeAttributeQuotes: true,
        maxLineLength: 80,
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: false,
      },
    },

    vendorFiles: {
      'vendor.css': null,
      'app-shims.js': null,
    },

    emberCliConcat: {
      enabled: true,
      outputDir: 'assets',
      outputFileName: 'hn',
      useSelfClosingTags: false,
      wrapScriptsInFunction: false,
      treeTypes: ['all'],

      js: {
        useAsync: true,
        concat: true,
        contentFor: 'concat-js',
        preserveOriginal: true,
      },

      css: {
        concat: false,
      },
    }
  })

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // app.import('app/styles/loader.scss', { outputFile: 'loader.css' })

  return app.toTree()
}
