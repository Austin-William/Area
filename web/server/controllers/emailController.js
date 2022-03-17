const nodemailer = require('nodemailer');

var email = "";

const emailController = async (api, data) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'darkarea78@gmail.com',
            pass: 'area123456789',
        }
    });

    transporter.verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });

    var mailOptions = {
        from: 'darkarea78@gmail.com',
        to: email,
        subject: 'Received data from ' + api,
        html: '<h1>Received data from ' + api + '</h1>' + '<p>' + data + '</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Email error: ' + info);
        } else {
            console.log('Email sent: ' + info);
        }
    });
}

const setEmailController = async(req, res) => {
    try {
        email = req.params.receiver;
        res.json({
            message: "Email is set"
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setEmail = (param) => {
    email = param;
}

const getEmail = async (req, res) => {
    try {
        res.status(200).json({
            email: email
        });
    } catch (error) {
        res.status(400).json({
            email: "Email is not set"
        });
    }
}

module.exports = {
    emailController,
    setEmailController,
    getEmail,
    setEmail
}