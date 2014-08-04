bulkhead-mailer
===============

A Bulkhead service that allows SailsJS projects to easily use NodeMailer.

Quick Start
-----------

```npm install bulkhead-mailer```

Then we have to setup the configuration by creating a file called ```config/mailer.js``` in your project root folder.   It must look like this:

```javascript
module.exports = require('bulkhead-mailer').config;
```

This will automatically use STMP with no authentication credentials.  To change your email server settings, change the ```config/mailer.js``` file to this:

```javascript
var config = require('bulkhead-mailer').config;
config.auth.user = 'Your STMP user name';
config.auth.pass = 'Your STMP password';
module.exports = config;
```

For more configurating settings, please read up on how to user [Nodemailer](https://github.com/andris9/Nodemailer).

To utilize the mailing service, do the following in a controller:

```javascript
// SomeController.js
var mailer = require('bulkhead-mailer');

module.exports = {
	someAction() {
		mailer.service.dispatch(
			'from@email.com',
			'to@email.com',
			'subject',
			'body text',
			'body html', 
			{ someHeader: 1 },
			function(err, result) {
		   		/* ... */
			}
		);
	}
}
```