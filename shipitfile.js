
var copyObject = require('copy-object');

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);

  var
    config = {
      servers: 'deploy@142.4.202.189:22022',
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

  shipit.blTask('deploy', [
    'deploy:init',
    'deploy:fetch',
    'deploy:update'
  ]);

  shipit.on('updated', function() {
    var path = shipit.releasePath;

    shipit.remote('cd ' + path + ' && bundle install --path=vendor').then(function() {
      return shipit.remote('cd ' + path + ' && bundle exec middleman build');

    }).then(function() {
      shipit.start(['deploy:publish', 'deploy:clean']);
    });
  });
};
