module.exports = {
	globDirectory: 'js/',
	globPatterns: [
		'**/*.js'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};