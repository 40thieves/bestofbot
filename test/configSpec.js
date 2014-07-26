var expect = require('chai').expect
,	config = require('../lib/config')
;

describe('Config', function() {
	describe('setup', function() {
		it('loads development config by default', function() {
			var expected = {
				mode: 'development',
				host: 'localhost',
				nick: 'bestofbot',
				channels: ['#foo'],
				joinMessage: 'I\'m a bot'
			};

			expect(config()).to.deep.equal(expected);
		});
	});
});