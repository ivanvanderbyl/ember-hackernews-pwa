/* eslint-env node*/
/* eslint-disable camelcase */

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: 'HackerNews',
    short_name: 'HN',
    description: 'HackerNews Progressive Web App',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#dd6a58',
    icons: [
      {
        src: '/assets/images/ember-hn192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/images/ember-hn512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/assets/images/ember-hn180.png',
        sizes: '180x180',
        type: 'image/png',
        targets: ['apple'],
      },
    ],

    apple: {
      statusBarStyle: 'black-translucent',
    },
  }
}
