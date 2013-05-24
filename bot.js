var Bot = function (adapter, config) {
   this.config = config;
   this.adapter = adapter;
   this.level = 1;
   this.x = 0;
   this.y = 0;
   this.radius = 20;
   this.energy = 100;
};

Bot.prototype.do = function (actions) {
   actions.forEach((function (a) {

      if (a.name === 'move') {
         this.energy = this.energy - (a.distance / this.config.energyPerDistance);
      }
      
   }).bind(this));
};

Bot.prototype.tick = function (state, cb) {
   this.adapter.send('tick', { bot: this.serialize(), state: state }, function (err, actions) {
      cb(!!err ? actions : []);
   });
};

Bot.prototype.serialize = function () {
   return {
      level: this.level,
      energy: this.energy,
      x: this.x,
      y: this.y
   };
};

module.exports = Bot;
