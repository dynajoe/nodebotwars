var restify = require('restify');

var server = restify.createServer({
  name: 'MyApp',
});

server.post('/tick', function (req, res, next) {
   console.log(JSON.stringify(req));
});

server.listen(process.argv[2] || 8080);