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

		var transportOptions = {
			auth: sails.config.mailer.auth
		};
		
		if(sails.config.mailer.service) {
			transportOptions.service = sails.config.mailer.service;
		} else {
			transportOptions.host = sails.config.mailer.host;
			transportOptions.port= sails.config.mailer.port;
			transportOptions.secureConnection = sails.config.mailer.secureConnection;
		}

		return Nodemailer.createTransport(sails.config.mailer.transport, transportOptions);
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
