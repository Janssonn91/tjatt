const nodemailer = require('nodemailer');
const hasha = require('hasha');
//const ThisUser = require('./classes/User.class');

module.exports = function(req, res) {
    const password = (Math.random() +1).toString(36).substr(0, 9)
    console.log('pw = ', password);
    const hash = hasha(
    password + global.passwordSalt,
        { encoding: 'base64', algorithm: 'sha512' }
    );
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',    //Using ethereal mailservice because i dont want to show my mail user/pass in plain text
            //in this exercise. To check mail go to generated mailadress that shows in terminalwindow Copy/paste adress to webbrowser. GL :)
            port: 587,
            secure: false, // true for 465, false for other ports 
            auth: {
                user: account.user, // generated ethereal user 
                pass: account.pass // generated ethereal password 
            },
            tls:{
              rejectUnauthorized: false
            }
        });

        // setup email data with unicode symbols 
        let mailOptions = {

            from: '"Tj@ support"<noreply@tjat.net', // sender address 
            to: `${req.body.email}`, // list of receivers 
            subject: 'Tj@ reset password', // Subject line  
            html: ''
        
        };

        let message = {
            // Comma separated list of recipients
            to: `${req.body.email}`,
            // Subject of the message
            subject: `Tj@ reset password`,

            // HTML body
            html:`
                <h2>Your password is resetted</h2>
                <P>Your new password is ${password}</p>
                <p>For your safety please take a moment and change this password to something else in your settings!</p>
                `,

            // An array of attachments
            attachments: [

                // File Stream attachment
                {
                    //filename: 'hemlig_fil ✔.gif',
                    //path: __dirname + '../../www/img/logo.png',   //testpicture to try that paths work
                    //cid: 'dajmmanslogo@example.com' // should be as unique as possible
                }
            ]
        };


        // send mail with defined transport object 
        transporter.sendMail(message, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

            // Preview only available when sending through an Ethereal account 

            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com> 
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou... 
        });
    });
}