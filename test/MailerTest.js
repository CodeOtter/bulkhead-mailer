var suite = require('bulkhead-test'),
	assert = require('assert'),
	mailer = require('../index');

describe('MailerService', function() {
	suite.lift();
	describe('Base Class', function() {
		it('should mail', function(done) {
			// Inject the mailer service and configuration
			var mailer = require('../index');
			sails.config.mailer = mailer.config;
			mailer.service.dispatch('test@test.com', 'test@test.com', 'Test', 'Body', null , null, function(err, result) {
				done();
			});
		});
	});
});