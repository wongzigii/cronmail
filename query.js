'use strict';

const fs = require('fs');
const mysql = require('mysql');
const config = require('./config.json');
const moment = require('moment');

let conn = mysql.createConnection({
	host: config.sqlserver.host,
	user: config.sqlserver.user,
	password: config.sqlserver.password
});

exports.startQuery = function (callback) {
	
	let yesterday = moment().subtract(1, "days");

	let start = moment(yesterday).startOf('day').format("YYYY-MM-DD HH:mm:ss");
	
	let end = moment(yesterday).endOf('day').format("YYYY-MM-DD HH:mm:ss");
	
	console.log(start);
	
	let queryStr =
		'USE qu_duobao; SELECT user.tdSPREADURL , sum(recharge.total_fee) as totalFee ,\
		count(user.objectId) as UserCount,\
		sum(case when user.payIdMatch = 1 then 1 else 0 end) as FirstPayUserCount,\
		sum(case when user.payIdMatch = 1 then recharge.total_fee else 0 end) as FirstPayUserTotalFee\
		FROM qu_duobao.xhtuser as user\
		left join xhtuseraccountrechargeorder as recharge on recharge.ownerBy = user.objectId\
		where user.type = 2 and user.createdAt between ' + "\"" + start + "\"" + ' and ' + "\"" + end + "\"" + ' and recharge.updatedAt between ' + "\"" + start + "\""
		+ ' and ' + "\"" + end + "\""  +
		'and recharge.status = 1 and registerMarket = "AppStore"\
		group by user.tdSPREADURL';
	
	queryDBData(queryStr, callback);
};

function queryDBData(str, cb) {
	conn.query(str, function (err, results, fields) {
		if (err) throw cb(err);
		
		let resultJSON = results[1];
		
		return cb(null, resultJSON);
	});
}



