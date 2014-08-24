var util         = require('util')
,	EventEmitter = require('events').EventEmitter

,	irc = require('irc')

,	utils = require('./utils')
,	configs = require('./config')
,	Filter = require('./filter')
;

var BestOfBot = function(options) {
	if (options) {
		this.config = configs(options.mode || null);
		utils.extend(this.config, options);
	}
	else {
		this.config = configs(null);
	}
};

util.inherits(BestOfBot, EventEmitter);

BestOfBot.prototype.connect = function() {
	var channelsClone = this.config.channels.clone();

	this.client = new irc.Client(
		this.config.host,
		this.config.nick,
		{
			channels: channelsClone
		}
	);

	this.client.addListener('error', this.handleError.bind(this));
	this.client.addListener('join', this.handleJoin.bind(this));
	this.client.addListener('part', this.handlePart.bind(this));
	this.client.addListener('message', this.handleMessage.bind(this));
	this.addListener('raw-message', this.filterMessage.bind(this));
};

BestOfBot.prototype.join = function() {
	if ( ! this.client) {
		this.connect();
	}
	else {
		var self = this
		,	channelsClone = this.config.channels.clone()
		;

		channelsClone.forEach(function(ch) {
			self.client.join(ch);
		});
	}
};

BestOfBot.prototype.part = function(channel) {
	var self = this;

	if (channel) {
		this.client.part(channel);
	}
	else {
		this.config.channels.forEach(function(ch) {
			self.client.part(ch);
		});
	}
};

BestOfBot.prototype.send = function(message, channel) {
	var self = this;

	if (channel) {
		// Test if client is connected to custom channel
		if (this.client.opt.channels.indexOf(channel) === -1) {
			// Join custom channel and send message
			this.client.join(channel, function() {
				self.client.say(channel, message);
			});
		}
		// Send to specific channel
		else {
			self.client.say(channel, message);
		}
	}
	else {
		// Send to all connected channels
		this.client.opt.channels.forEach(function(channel) {
			self.client.say(channel, message);
		});
	}

};

BestOfBot.prototype.handleError = function(err) {
	this.emit('error', new Error(err));
};

BestOfBot.prototype.handleJoin = function(channel, nick, message) {
	this.emit('join', channel, nick, message);

	if (this.config.joinMessage)
		this.client.say(channel, this.config.joinMessage);
};

BestOfBot.prototype.handlePart = function(channel, nick, reason, message) {
	this.emit('part', channel, nick, reason, message);
};

BestOfBot.prototype.handleMessage = function(from, to, message) {
	this.emit('raw-message', message, from, to);
};

BestOfBot.prototype.filterMessage = function(message, from, to) {
	var filter = new Filter(this.config);

	var filtered = filter.test(message);
	if (filtered)
		this.emit('message', filtered, from, to);
};

module.exports = BestOfBot;