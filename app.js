// Email Reminder for Webpages

var fs = require('fs');
var nodemailer = require('nodemailer');
var request = require('request');
var exec = require("child_process").exec;
var found = false;
var url = '';
var email = '';
var pw = '';
var mailProvider = 'gmail';

setInterval(playGame, 1000*60*1);

function playGame() {
	request(url, function (error, response, body) {
	
		var searchterm = "searchterm";
		var n = body.search(searchterm);
	
		if ( n != -1 && found == false) {
		
			var transporter = nodemailer.createTransport({
				service: mailProvider,
				auth: {
				user: email,
				pass: pw
				}
			});

			var mailOptions = {
				from: email,
				to: 'example@example.com',
				subject: 'Subject',
				text: 'Test text'
			};
			
			exec("volumio play", function() { console.log("works"); })
		
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
					found = true;
				}
			});
		
		} else {
			console.log('Nothing found.');
		}
	});
}
