var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var transport = {
	host: 'smtp.gmail.com',
	auth: {
		user:'hayescapers45583@gmail.com',
		pass: 'hambone45583'
	}

}

var transporter  = nodemailer.createTransport(transport)

transporter.verify((error, sucess) => {
	if (error){
		console.log(error);
	}else{
		console.log('server ready')
	}
})
/* GET home page. */
router.get('/', function(req, res, next) {
	var message = ""
	if(req.query.msg !=undefined){
		message = req.query.msg
	}
  res.render('index', { title: 'Express', message: message });
});

router.post('/send', (req, res)=>{
	var email = req.body.email
	var content = req.body.content
	var name = req.body.name
	var phone = req.body.phone
	var finalMessage = `${content} \n\n phone: ${phone} \n email: ${email}`

	var mail = {
		from: email,
		to: 'taylorwhitlatch112@gmail.com',
		subject: 'test',
		text: finalMessage
	}
	transporter.sendMail(mail, (err, data )=>{
		if(err){
			console.log(error)
			res.redirect('/?msg=Fail')
		}else{
			console.log("Sent")
			res.redirect('/?msg=Sent')


		}
	})


})

module.exports = router;
