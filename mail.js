'use strict';
const nodemailer = require('nodemailer');
const config = require('./config.json');
const client = require('./query');
const Table = require('easy-table');

let transporter = nodemailer.createTransport({
	host: config.smtpserver.host,
	port: config.smtpserver.port,
	secure: true,
	auth: {
		user: config.smtpserver.user,
		pass: config.smtpserver.userpass
	}
});

exports.start = function() {
	
	console.log('Start!');
	
	client.startQuery(function (err, result) {
		if (err) {
			console.log(err);
			return;
		}
		
		let t = new Table;
		result.forEach(function (row) {
			t.cell('tdSPREADURL', row.tdSPREADURL);
			t.cell('totalFee', row.totalFee);
			t.cell('UserCount', row.UserCount);
			t.cell('FirstPayUserCount', row.FirstPayUserCount);
			t.cell('FirstPayUserTotalFee', row.FirstPayUserTotalFee);
			t.newRow()
		});
		console.log(JSON.stringify(result));
		console.log(t.toString());
		
		sendMail(t.toString());
	});
};

function sendMail(content) {
	
	let mailOptions = {
		from: config.smtpserver.nickname + '<' + config.smtpserver.user + '>',
		to: config.toUser,
		subject: new Date().toISOString().substr(0, 10) + ' iOS 渠道消费报表',
		text: content,
		html: ''
	};
	
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
	});
}



