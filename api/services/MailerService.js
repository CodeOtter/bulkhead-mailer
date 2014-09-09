var Bulkhead = require('bulkhead'),
	async = require('async'),
	Nodemailer = require('nodemailer'),
	_ = require('underscore');

/**
 * 
 */
module.exports = new function(){

	var self = this;

	Bulkhead.service.call(this);

	/**
	 * 
	 */
	self.getTransport = function() {

		if(self.transport) {
			return self.transport;
		}

		var options = {
			auth: self.plugin.config.mailer.auth
		};
		

		if(self.plugin.config.mailer.service) {
			options.service = self.plugin.config.mailer.service;
		} else {
			options.host = self.plugin.config.mailer.host;
			options.port = self.plugin.config.mailer.port;
			options.secureConnection = self.plugin.config.mailer.secureConnection;
		}

		var transport = require(self.plugin.config.mailer.transport)(options);
		return Nodemailer.createTransport(transport);
	};

	/**
	 * 
	 */
	self.dispatch = function(from, to, subject, text, html, headers, done) {
		this.getTransport().sendMail(_.extend({
			from: from,
			to: to || self.plugin.config.mailer.identity,
			subject: subject,
			text: text,
			html: html || text
		}, headers || {}), done);
	};
	
	/**
	 * 
	 */
	self.close = function() {
		this.getTransport().close();
	};
};
