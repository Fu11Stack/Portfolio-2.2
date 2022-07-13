const express = require('express');
const dotenv = require('doteven');
const mg = require('mailgun-js');

dotenv.config();

const mailgun = () =>
  mg({
     apiKey: process.env.MAILGUN_API_KEY,
     domain: process.env.MAILGUN_DOMAIN,
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true});

app.post('/api/email' , (req, res) => {
  const {name, email, subject, message} = req.body;
  mailgun().messages().send({
    from: 'Justin Subocz <jus10lopez@yahoo.com>',
    to: `${email}`,
    subject: `${subject}`,
    html: `<p>{message}</p>`,
  },
  (error, body) => {
     if (error) {
      console.log(error);
      res.status(500).send({ message: 'Error in sending email' });
     } else {
      console.log(body);
      res.send({ message: 'Email send successfully'});
     }
   }
  );
});

const port = process.env.PORT || 4000;
app.listen(port, () =>{
  console.log(`server athttp:/localhost: {$port}`);
});