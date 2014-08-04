/**
 * Mail settings
 * 
 * For more information on how to configure this, please see https://github.com/andris9/Nodemailer
 */

module.exports = {
  transport: process.env.NODE_ENV == 'test' ? 'Stub' : 'SMTP',
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