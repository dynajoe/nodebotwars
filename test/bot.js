var should = require('should');
var assert = require('assert');
var adapter = {};
var Bot = require('../bot');
var botConfiguration = {
	energyPerDistance: 5
};

describe('Bot', function () {
	beforeEach(function () {
		this.bot = new Bot(adapter, botConfiguration);
	});
	
	describe('when a bot moves', function () {
		beforeEach(function () {
			this.startEnergy = this.bot.energy;
			this.distance = 10;
			this.bot.do([{ name: 'move', direction: 45, distance: this.distance }]);
		});

		it('should decrease in energy', function () {
			this.bot.energy.should.equal(this.startEnergy - (this.distance / botConfiguration.energyPerDistance));
		});
	});
});