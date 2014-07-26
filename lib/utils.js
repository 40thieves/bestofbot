var utils = {
	extend: function(orig, extra) {
		return Object.keys(extra).forEach(function(key) {
			orig[key] = extra[key];
		});
	}
};

Array.prototype.clone = function() {
	return this.slice(0);
};

module.exports = utils;
