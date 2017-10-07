/* eslint-env node */

module.exports = function(deployTarget) {
  let ENV = {
    verbose: true,

    build: {
      environment: 'production',
    },

    // 'gcloud': {
    //   bucket: 'hackernews-production',
    //   key: 'fastboot-release.json'
    // },
    // 'gcloud-storage': {
    //   bucket: 'hackernews-production'
    // },
    // 'elastic-beanstalk': {
    //   bucket: 'hackernews-io'
    // }

    manifest: {},
  }

  ENV.cloudfront = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    distribution: 'E3517M93Y4GRSE',
    objectPaths: [
      '/index.html',
      '/sw.js',
      '/sw-registration.js',
      '/manifest.*',
    ],
  }

  ENV.s3 = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'hackernews-io',
    region: 'us-east-1',
    filePattern:
      '**/**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,html,json,webmanifest}',
    allowOverwrite: true,
  }

  ENV['s3-index'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'hackernews-io',
    region: 'us-east-1',
    allowOverwrite: true,
  }

  if (deployTarget === 'development') {
    ENV.build.environment = 'development'
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production'

    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production'
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV
}
