/**
 * Mail settings
 * 
 * For more information on how to configure this, please see https://github.com/andris9/Nodemailer
 */

module.exports.mailer = {
  transport: process.env.NODE_ENV == 'test' ? 'nodemailer-stub-transport' : 'nodemailer-smpt-transport',
  service: undefined,
  identity: '',
  host: '',
  port: '',
  secureConnection: true,
  auth: {
	  user: '',
	  pass: ''
  },
  headers: {}
};