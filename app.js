'use strict';

const CronJob = require('cron').CronJob;
const mailer = require('./mail');

/* Everyday 9:50 From Monday to Sunday*/
new CronJob('00 30 09 * * 0-6', function() {
		/*
		 * Runs every weekday (Monday through Friday)
		 * at 11:30:00 AM. It does not run on Saturday
		 * or Sunday.
		 */
		mailer.start();
	}, function () {
		console.log('SendMail is Stop!');
	},
	true /* Start the job right now */
);
