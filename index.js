var Server = require('./server');
var GameMaster = require('./gamemaster');

var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , path = require('path')
  , framesPerSecond = 20;

var gameServer = new Server();
var gameMaster = new GameMaster(gameServer);

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(require('connect-assets')())
});

gameMaster.on('update', function (data) {
  io.emit('update', data);
});

var scheduleFrame = function (callback) {
  setTimeout(function () { callback(new Date().getTime()); }, 1000 / framesPerSecond);
};

var loop = {};

(function gameLoop (now) {

  scheduleFrame(gameLoop);

  if (!loop.lastTime) {
    loop.lastTime = now;
  } else {
    loop.lastTime = loop.time;
  }

  loop.time = now;

  var timeInfo = { elapsed: loop.time - loop.lastTime, current: loop.time };

  if (!timeInfo.elapsed) {
    return;
  }

  gameMaster.update.call(gameMaster, timeInfo);
})();

require('./routes/index')(app);

gameServer.listen(3000);
server.listen(8000);
