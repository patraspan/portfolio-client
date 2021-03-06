const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	sgMail = require('@sendgrid/mail')


// port
const PORT = process.env.PORT || 5000,
	IP = process.env.IP;

require('dotenv').config();
//settings

app.use(bodyParser.urlencoded({
	extended: true
}));
app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
// app.set("view engine", 'ejs');
app.set("view engine", 'html');
app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
	res.render("index")
});

app.post('/sendMail', (req, res) => {
	// console.log('the body of form:', req.body)
	const output = `
	<h3>You have new message from Your Portfolio site</h3>
	<p>Contact details:</p>
	<ul>
	<li>Name: ${req.body.name}</li>
	<li>Email: ${req.body.email}</li>
	</ul>
	<h4>Message</h4>
	<p>Message: ${req.body.message}</p>
	`
	// sendGRID
sgMail.setApiKey(process.env.SENDGRID_API);
const msg = {
  to: 'patrick.kurzeja@gmail.com',
  from: 'PORTFOLIO SITE <noreply@portfoliopk.com>',
  subject: 'Sent by SendGrid',
  text: 'Message genarated with Your portfolio form',
	html: output,
	proxy: false,
};
sgMail.send(msg, function (err) {
	if (err) {
				res.status(500).send('Something went wrong');
			}
			res.status(200).send('<i class="far fa-check-circle"></i>');
		});

});


app.listen(PORT, IP, () => {
	console.log(`Server runs smoothly at ${PORT}`);
});


