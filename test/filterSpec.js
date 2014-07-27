/* jshint expr: true */
var expect = require('chai').expect
,	Filter = require('../lib/filter')
;

describe('Filter', function() {
	var filter = new Filter({
		filter: {
			command: '!b( )+',
			data: '(\\w+)+'
		}
	});

	describe('test', function() {
		it('returns truthy for messages that match the filter', function() {
			expect(filter.test('!b now')).to.be.ok;
			expect(filter.test('!b  now')).to.be.ok;
		});

		it('returns false for messages that do not match the filter', function() {
			expect(filter.test('foo')).to.be.false;
			expect(filter.test('!s foo')).to.be.false;
			expect(filter.test('!bfoo')).to.be.false;
		});
	});
});