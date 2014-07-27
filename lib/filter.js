var Filter = function(options) {
	this.config = options;
};

// Test against regex
Filter.prototype.test = function(message) {
	var regex = new RegExp(this.config.filter.command + '' + this.config.filter.data);

	if (regex.test(message))
		return this.filter(message);

	return false;
};

// Filter out command
Filter.prototype.filter = function(message) {
	var regex = new RegExp(this.config.filter.command);
	return message.replace(regex, '');
};

module.exports = Filter;