// const nodemailer = require('nodemailer');

// module.exports = function(req, res) {
//     console.log('i sendpassword nu, password/mail', req.body.tempPW, req.body.tempEmail);
//     nodemailer.createTestAccount((err, account) => {
//         let transporter = nodemailer.createTransport({
//             host: 'smtp.ethereal.email',    //Using ethereal mailservice because i dont want to show my mail user/pass in plain text
//             //in this exercise. To check mail go to generated mailadress that shows in terminalwindow Copy/paste adress to webbrowser. GL :)
//             port: 587,
//             secure: false, // true for 465, false for other ports 
//             auth: {
//                 user: account.user, // generated ethereal user 
//                 pass: account.pass // generated ethereal password 
//             }
//         });

//         // setup email data with unicode symbols 
//         let mailOptions = {

//             from: '"Tj@ support"<noreply@tjat.net', // sender address 
//             to: `${req.body.tempEmail}`, // list of receivers 
//             subject: 'Tj@ reset password', // Subject line  
//             html: ''
        
//         };

//         let message = {
//             // Comma separated list of recipients
//             to: `${req.body.tempEmail}`,
//             // Subject of the message
//             subject: `Tj@ reset password`,

//             // HTML body
//             html:`
//                 <h2>Your password is resetted</h2>
//                 <P>Your new password is ${req.body.tempPW}</p>
//                 <p>For your safety please take a moment and change this password to something else in your settings!</p>
//                 `,

//             // An array of attachments
//             attachments: [

//                 // File Stream attachment
//                 {
//                     //filename: 'hemlig_fil ✔.gif',
//                     //path: __dirname + '../../www/img/logo.png',   //testpicture to try that paths work
//                     //cid: 'dajmmanslogo@example.com' // should be as unique as possible
//                 }
//             ]
//         };


//         // send mail with defined transport object 
//         transporter.sendMail(message, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Message sent: %s', info.messageId);

//             // Preview only available when sending through an Ethereal account 

//             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com> 
//             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou... 
//         });
//     });
// }