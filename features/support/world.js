/*

var config = require('./app/config');
var harvesterApp = require('./app/api')(config);

module.exports = harvesterApp;
 */
function World() {
	const 
		cfg = require('../../app/config'),
		Promise = require('bluebird');
	
    this.server = require('../../app/api')(cfg);

    
	this.doHttpRequest = function (endpoint, verb, payload) {
		return this.server.then(function (s) {
			const 
				$http = require('http-as-promised'),
				headers = {},
				url = s.info.uri + "/" + endpoint;
			
			return $http[verb.toLowerCase()](url, {
				json: payload,
				headers: headers
			})
			.spread((response) => response );
		});
	};
}

module.exports = function() {
  this.World = World;
};