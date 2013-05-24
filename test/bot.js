var mocha = require('mocha');
var should = require('should');
var assert = require('assert');
var adapter = {};

describe('Bot', function () {
	beforeEach(function () {
		this.bot = new Bot(adapter);
	});
	
	describe('when a bot moves', function () {
		beforeEach(function () {
			this.bot.do([{move: {direction: 45, distance: 10}}]);
		});

		it('should decrease in energy', function () {
			this.bot.energy.should.equal(this.energy - 100);
		});
	});
});