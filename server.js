var EventEmitter = require('events').EventEmitter;
var net = require('net');

var handleMessage = function (id, data) {
  try {
    data = JSON.parse(data.toString());
  } catch (e){ 
    return; 
  }

  if (!data.event || (typeof data.args) != 'object') {
    return;
  }

  this.emit('input', { id: id, event: data.event, args: data.args });
};

var Server = function () {
  this.clients = {};
   
  this.server = net.createServer((function (socket) {
    socket.id = new Date().getTime();
    this.clients[socket.id] = socket;
    this.emit('player-connected', socket.id);

    socket.on('end', (function () {
      delete this.clients[socket.id];
      this.emit('player-disconnected', socket.id);
    }).bind(this));

    socket.on('data', (function (data) {
      this.handleMessage.bind(this)(socket.id, data);
    }).bind(this));

  }).bind(this));
};

Server.prototype = Object.create(EventEmitter.prototype);

Server.prototype.listen = function (port) {
  this.server.listen(port);
  console.log('Game server listening on port: ' + port);
};

Server.prototype.send = function (id, event, data) {
  if (clients[id]) {
    clients[id].write(JSON.stringify({ event: event, args: data }));
  }
};

module.exports = Server;