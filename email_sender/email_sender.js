'use strict';

var fs = require('fs');
var optionsBrowser16 = require('../test/itg/1.6/common.webdriverio');
var optionsBrowser17 = require('../test/itg/1.7/common.webdriverio');

// create reusable transporter object using the default SMTP transport
var nodeMailer = require('nodemailer');
var dateFormat = require('dateformat');

// get travis env variable
var senderEmail = process.env.SENDER_EMAIL;
var senderPassword = process.env.SENDER_PASSWORD;
var recipientEmail = process.env.RECIPIENT_EMAIL;

var prestaVersion = new Array();
prestaVersion = [1.6, 1.7];

var transporter = nodeMailer.createTransport({
    service: 'Gmail',
    auth: {
        user: senderEmail,
        pass: senderPassword
    }
});

console.log('Sending Email .....');
var day = dateFormat("yyyy-mm-dd h:MM:ss");

if ((fs.existsSync("email_sender/report_test_" + prestaVersion[0] + ".html")) && (fs.existsSync("email_sender/report_test_" + prestaVersion[1] + ".html"))) {
    transporter.sendMail({
        from: senderEmail, // sender address
        to: recipientEmail, // list of receivers
        subject: '[PrestaShop][Test] Bilan des tests - ' + day + ' ]', // Subject line
        html: 'Bonjour,</br>' +
        "<br>Les résultats de l'exécution des tests automatisés (Node.js) sur le(s) navigateur(s) " + optionsBrowser16.browser() + " et " + optionsBrowser17.browser() + " sont en pièce jointe.</br> " +
        '<br>Bien à vous,</br>' +
        '<br>Equipe QA</br>', // html body
        attachments: [
            {
                path: "email_sender/report_test_" + prestaVersion[0] + ".html" // stream this file,
            }, {
                filename: "report_test_" + prestaVersion[1] + ".html",
                path: "email_sender/report_test_" + prestaVersion[1] + ".html"
            }
        ]
    });
} else if (fs.existsSync("email_sender/report_test_" + prestaVersion[0] + ".html")) {
    transporter.sendMail({
        from: senderEmail, // sender address
        to: recipientEmail, // list of receivers
        subject: '[PrestaShop][Test] Bilan de tests - ' + day + ' ]', // Subject line
        html: 'Bonjour,</br>' +
        "<br>Les résultats de l'exécution des tests automatisés (Node.js) sur le navigateur " + optionsBrowser16.browser() + " sont en pièce jointe.</br> " +
        '<br>Bien à vous,</br>' +
        '<br>Equipe QA</br>', // html body
        attachments: [
            {
                path: "email_sender/report_test_" + prestaVersion[0] + ".html" // stream this file,
            }
        ]
    });
} else {
    transporter.sendMail({
        from: senderEmail, // sender address
        to: recipientEmail, // list of receivers
        subject: '[PrestaShop][Test] Bilan de tests - ' + day + ' ]', // Subject line
        html: 'Bonjour,</br>' +
        "<br>Les résultats de l'exécution des tests automatisés (Node.js) sur le navigateur " + optionsBrowser17.browser() + " sont en pièce jointe.</br> " +
        '<br>Bien à vous,</br>' +
        '<br>Equipe QA</br>', // html body
        attachments: [
            {
                path: "email_sender/report_test_" + prestaVersion[1] + ".html" // stream this file,
            }
        ]
    });
}
console.log("Email successfully sent!")

