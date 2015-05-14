
var copyObject = require('copy-object');

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  var
    config = {
      servers: '142.4.202.189',
      workspace: '/tmp/jspreadsheets.com',
      repositoryUrl: 'https://github.com/krzysztofspilka/staticgen.git',
      ignores: ['.git', 'node_modules'],
      rsync: ['--force', '--delete', '--delete-excluded', '-I', '--stats', '--chmod=ug=rwX'],
      keepReleases: 3,
      shallowClone: false
    };

  shipit.initConfig({
    production: (function() {
      config = copyObject(config);
      config.deployTo = '/home/httpd/jspreadsheets.com';

      return config;
    }()),
    development: (function() {
      config = copyObject(config);
      config.deployTo = '/home/httpd/dev.jspreadsheets.com';

      return config;
    }())
  });

  shipit.task('test', function() {
    shipit.remote('pwd');
  });

  shipit.on('published', function() {
    var current = shipit.config.deployTo + '/current';

    shipit.remote('cd ' + current + ' && bundle install --path=vendor').then(function() {
      return shipit.remote('cd ' + current + ' && bundle exec middleman build');

    });
  });
};
