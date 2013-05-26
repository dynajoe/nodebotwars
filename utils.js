module.exports = {
   degrees2radians: function (degrees) {
      degrees = degrees % 360;

      return (Math.PI / 180) * degrees;
   }
};