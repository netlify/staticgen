const static = require('node-static');

const fileServer = new static.Server('./build');

require('http').createServer((request, response) => {
  request.addListener('end', () => {
    fileServer.serve(request, response);
  }).resume();
}).listen(8080);
