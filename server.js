var async = require('async');
var _ = require('underscore');
var maxWait = 5000;

var doActions = function (actions) {
   //do you have enough energy to do that?
   //Ensure bots are performing legal actions
   //Do all the things each bot asked / Update the world.
   //also subtract a default amount of energy
}

var tick = function (world, bots, round, totalTime, elapsedTime, done) {

   var state = {
      time: totalTime,
      elapsed: elapsedTime,
      round: round,
      world: world,
      bots: bots.slice(0)
   };

   async.map(bots, function (bot, cb) { 
      var boundTick = bot.tick.bind(bot);
      var timedOut = false;

      boundTick(state, function (actions) {
         if (!timedOut) cb(null,  { bot: bot, actions: actions });
      });

      setTimeout((function (b) {
         timedOut = true;
         cb('timeout', { bot: b, actions: [] });
      }).bind(this, bot), maxWait);
   }
   , function (err, results) { 

      var bots = doActions(results); 
      var groups = _.groupBy(bots, function (b) { return (b.energy > 0) ? 'alive' : 'dead'; });
      var deadBots = groups['dead'] || [];
      var livingBots = groups['alive'] || [];

      var endGameFor = function (bots, reason) {
         bots.forEach(function (b) {
            b.notify('gameover', reason);
         });         
      }

      if (livingBots.length == 0) { //Everyone died this round, LOL!
         endGameFor(deadBots, 'draw');
      } 
      else {
         if (livingBots.length == 1) { // WE HAVE A  WINNER!
            endGameFor(livingBots, 'win');
         }

         endGameFor(deadBots, 'dead'); //SUCK IT LOSERS!
      }

      done(livingBots);
   });
}