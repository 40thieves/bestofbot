/* jshint expr: true */
var expect = require('chai').expect
,	BestOfBot = require('../lib/bestofbot')
;

describe('BestOfBot', function() {
	describe('joining', function() {
		this.timeout(10000);

		var bsb = new BestOfBot({ joinMessage: false });

		afterEach(function(done) {
			bsb.on('part', function() {
				bsb.removeAllListeners();

				done();
			});

			setTimeout(function() {
				bsb.part();
			}, 500);
		});

		it('joins default channel with default config', function(done) {
			bsb.on('join', function(from, to, message) {
				expect(from).to.exist;
				expect(to).to.exist;
				expect(message).to.exist;

				expect(from).to.equal('#foo');

				expect(to).to.equal('bestofbot');
				expect(message).to.have.property('nick').that.equals('bestofbot');

				done();
			});

			bsb.join();
		});
	});

	describe('parting', function() {
		this.timeout(10000);

		var bsb = new BestOfBot();

		it('parts from channels', function(done) {
			bsb.on('join', function() {
				setTimeout(function() {
					bsb.part();
				}, 500);
			});

			bsb.on('part', function(channel, nick, reason, message) {
				expect(channel).to.exist;
				expect(nick).to.exist;
				expect(reason).to.exist;
				expect(message).to.exist;

				done();
			});

			bsb.join();
		});
	});

	describe('messages', function() {
		this.timeout(10000);

		var bsb = new BestOfBot({ joinMessage: false }) // Create listener bot
		,	messagebot
		;

		// Have to do some jumping around to set up both bots
		// The module doesn't like spinning up two connections at once
		before(function(done) {
			bsb.join();

			bsb.on('join', function() {
				// Cache messagebot obj until connected
				var mb = new BestOfBot({
					nick: 'messagebot',
					joinMessage: false
				});

				mb.on('join', function() {
					messagebot = mb; // Connect cache to actual var
					mb.removeAllListeners();
					done();
				});

				mb.join();
			});
		});

		it('sends messages', function(done) {
			bsb.on('message', function(message) {
				expect(message).to.exist;
				expect(message).to.equal('hello world');

				done();
			});

			messagebot.send('hello world');
		});

		after(function() {
			bsb.removeAllListeners();
			messagebot.removeAllListeners();
		});

		
	});
});