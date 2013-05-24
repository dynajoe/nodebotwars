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
			this.distance = Math.sqrt(8);
			this.direction = -45;
			this.bot.do([{ name: 'move', direction: this.direction, distance: this.distance }]);
		});

		it('should decrease in energy', function () {
			this.bot.energy.should.equal(this.startEnergy - (this.distance / botConfiguration.energyPerDistance));
		});

		it('should move to the appropriate x location', function () {
			this.bot.x.should.be.approximately(2, 1e-3);
		});

		it('should move to the appropriate y location', function () {
			this.bot.y.should.be.approximately(2, 1e-3);
		});
	});
});