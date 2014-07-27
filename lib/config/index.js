var config = {
	development: {
		mode: 'development',

		host: 'localhost',
		nick: 'bestofbot',
		channels: [
			'#foo'
		],

		joinMessage: 'I\'m a bot',

		filter: {
			command: '!b +',
			data: '(\\w+)+'
		}
	}
};

module.exports = function(mode) {
	var ret = config[mode || process.argv[2] || 'development'] || config.development;
	return JSON.parse(JSON.stringify(ret));
};