const express = require('express');
const bodyParser = require('body-parser');

const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

//Creating the engine for an html page
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

//Body parser middleware (bridge between operating system or data base and applications)
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());
/**
 * All of my HTML pages that it will render
 */

app.get('/', (req, res) => {
    res.render('index.html');
});
app.get('/Contact.html', (req, res) => {
    res.render('Contact.html');
});

app.get('/Projects.html', (req, res) => {
    res.render('Projects.html');
});

app.get('/Gallery.html', (req, res) => {
    res.render('Gallery.html');
});


app.get('/index.html', (req, res) => {
    res.render('index.html');
});


app.get('/LinearAlg.html', (req, res) => {
    res.render('LinearAlg.html');
});


app.get('/games/index.html', (req, res) => {
    res.render('games/index.html');
});


app.get('/games/light.html', (req, res) => {
    res.render('games/light.html');
});

app.get('/games/basic.html', (req, res) => {
    res.render('games/basic.html');
});


app.get('/games/snakers.html', (req, res) => {
    res.render('games/snakers.html');
});


app.get('/games/basic.html', (req, res) => {
    res.render('games/basic.html');
});


app.get('/games/flappy.html', (req, res) => {
    res.render('games/flappy.html');
});


app.get('/altcontact.html', (req, res) => {
    res.render('altcontact.html');
});


app.get('/gallery-people.html', (req, res) => {
    res.render('gallery-people.html');
});

app.get('/gallery-nature.html', (req, res) => {
    res.render('gallery-nature.html');
});



app.post('/send', (req, res) => {
    const output = `
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Subject: ${req.body.subject}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
   `;


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jakearmendariz99@gmail.com',
            pass: '4fastjakers'
        },

    });

    // setup email data with unicode symbols

    var mailOptions = {
        from: 'jakearmendariz99@gmail.com',
        to: 'jakearmendariz99@gmail.com',
        subject: 'Email from Website',
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    res.redirect('back');
});


app.listen(3030, () => {
    console.log("server started..");
});