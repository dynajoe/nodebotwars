var Game = Game || {};

Game.Sprite = function Sprite (config) {

   this.x = config.x || 0;
   this.y = config.y || 0;
   this.width = config.width || 0;
   this.height = config.height || 0;
   this.zindex = config.zindex || 0;
   this.speed = config.speed || {x: 0, y: 0};
   this.acceleration = config.acceleration || 0;
   this.image = new Image();
   this.xoffset = config.xoffset || 0;
   this.yoffset = config.yoffset || 0;
   this.image.src = config.image;
   this.image.onload = (function () {
      this.loaded = true;
   }).bind(this);
};
   
Sprite.prototype.update = function (elapsed) {
   if (!this.loaded) {
      return;
   }

   this.speed.y = this.speed.y + this.acceleration * elapsed;
   
   this.x = this.x + (this.speed.x * elapsed);
   this.y = this.y + (this.speed.y * elapsed);

   Sprite._super.update.call(this, elapsed);
};

Sprite.prototype.render = function (context) {
   if (!this.loaded) {
      return;
   }
   
   context.drawImage(
      this.image, 
      this.xoffset, this.yoffset,
      this.width, this.height,
      this.x, this.y, 
      this.width, this.height);
};

Sprite.prototype.set = function (config) {
   this.speed = config.speed;
   this.direction = config.direction;
   this.acceleration = config.acceleration;
   this.x = config.x;
   this.y = config.y; 
};
