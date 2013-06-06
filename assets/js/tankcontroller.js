var Game = Game || {};

Game.Controller = function () { }

Game.Controller.prototype.constructor = function (gameboard) {
   this.gameboard = gameboard;
   this.world = {};
   this.world.width = gameboard.width;
   this.world.height = gameboard.height;
   this.context = gameboard.getContext("2d");
   this.entities = [];
};

Game.Controller.prototype.update = function (time) {

   var context = this.context;
   
   //There's no way to set the zindex of an item on the HTML5 Canvas
   //We'll batch the rendering so that the z order of each item can be determined before drawing.
   var batch = [];
   
   this.entities.forEach(function (e) {
      e.update.call(e, time.elapsed);

      if (!batch[e.zindex]) {
         batch[e.zindex] = [e];
      } else {
         batch[e.zindex].push(e);         
      }
   });

   context.clearRect(0, 0, this.gameboard.width, this.gameboard.height);
   
   batch.forEach(function (b) {
      b.forEach(function (e) {
         e.render.call(e, context);
      });
   });
};