/* jshint expr: true */
var expect = require('chai').expect
,	Filter = require('../lib/filter')
;

describe('Filter', function() {
	describe('test', function() {
		var filter = new Filter({
			filter: {
				command: '!b ',
				data: '(\\w+)+'
			}
		});

		it('correctly finds messages that match the config', function() {
			expect(filter.test('!b now')).to.be.ok;
		});
	});
});