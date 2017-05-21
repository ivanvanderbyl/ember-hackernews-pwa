/* eslint-env node */

module.exports = function(deployTarget) {
  let ENV = {
    verbose: true,

    build: {
      environment: 'production'
    }
    // include other plugin configuration that applies to all deploy targets here
  };

  ENV.s3 = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'hackernews-io',
    region: 'us-west-2',
    filePattern: '**/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,html,json}',
    allowOverwrite: true
  };

  ENV['s3-index'] = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    bucket: 'hackernews-io',
    region: 'us-west-2',
    allowOverwrite: true,
    cacheControl: 'max-age=0, no-cache'
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
