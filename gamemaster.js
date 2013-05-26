var Utils = require('./utils');
var EventEmitter = require('events').EventEmitter;

var GameMaster = function (server) {
   this.server = server;
   this.players = {};
   this.world = { width: 900, height: 600 };
   this.playerHeight = 75;
   this.playerWidth = 68;

   server.on('player-connected', (function (playerId) {
      if (!this.players[playerId]) {
         this.players[playerId] = new Player();
      }
   }).bind(this));

   server.on('player-disconnected', (function (playerId) {
      delete this.players[playerId];
   }).bind(this));

   server.on('input', this.processInput.bind(this));
};

GameMaster.prototype = Object.create(EventEmitter.prototype);

GameMaster.prototype.processInput = function (data) {
   console.log(data);
};

GameMaster.prototype.update = function (time) {
   if (!time.elapsed) {
      return;
   }

   var elapsed = time.elapsed;

   for (id in this.players) {
      var p = this.players[id];
   
      p.heading = p.heading % 360;

      var radians = Utils.degrees2radians(p.heading);
      var dx = Math.cos(radians) * p.speed * elapsed;
      var dy = Math.sin(radians) * p.speed * elapsed;

      //moving upward
      if (p.heading > 270 && p.heading <= 90) {
         p.y -= dy;
      } else {
         p.y += dy;
      }

      //moving leftward
      if (p.heading > 0 && p.heading <= 180) {
         p.x -= dx;
      } else {
         p.x += dx;
      }

      p.wallCollision = false;

      //Did the player collide with the edge of the map? If so, stop it from moving.
      if ((p.x + p.halfSize) >= this.world.width || (p.x - p.halfSize) <= 0) {
         p.speed.x = 0;
         p.speed.y = 0;
         p.wallCollision = true;
      }

      if ((p.y + p.halfSize) >= this.world.height || (p.y - p.halfSize) <= 0) {
         p.speed.x = 0;
         p.speed.y = 0;
         p.wallCollision = true;
      }
   }

   this.updatePlayers();
   this.emit('update', this.players);
};

GameMaster.prototype.updatePlayers = function () {
   for (id in this.players) {
      this.server.send(id, 'update', this.players[id]);
   }
};

module.exports = GameMaster;