(function () {

  var GameLoop = function (controller) {
   this.controller = controller;
 };

 GameLoop.prototype.run = function () {

   window.requestAnimFrame = (function () {
     return  window.requestAnimationFrame       ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame    ||
     window.oRequestAnimationFrame      ||
     window.msRequestAnimationFrame     ||
     function (callback) {
      window.setTimeout(function () { callback(new Date().getTime()); }, 1000 / 60);
    };
  })();

  var loop = this;

  (function animloop (now) {

    requestAnimFrame(animloop);

    if (!loop.controller) {
      return;
    }

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

   loop.controller.update.call(loop.controller, timeInfo);

 })(new Date().getTime());
};

window.onload = function () {
  var socket = io.connect();

  socket.on('update', function (data) {
    GameLoop.controller.data = data;
  });
  
  window.GameLoop = new GameLoop(new TankController());
  window.GameLoop.run();
};
})();
