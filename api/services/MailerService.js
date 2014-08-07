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
			auth: sails.config.mailer.auth
		};

		if(sails.config.mailer.service) {
			options.service = sails.config.mailer.service;
		} else {
			options.host = sails.config.mailer.host;
			options.port= sails.config.mailer.port;
			options.secureConnection = sails.config.mailer.secureConnection;
		}

		var transport = require(sails.config.mailer.transport)(options);
		return Nodemailer.createTransport(transport);
	};

	/**
	 * 
	 */
	self.dispatch = function(from, to, subject, text, html, headers, done) {
		this.getTransport().sendMail(_.extend({
			from: from,
			to: to || sails.config.mailer.identity,
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
