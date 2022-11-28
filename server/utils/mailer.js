const nodemailer = require('nodemailer');

class Mailer {
  #testAccount = {};
  #transporter = {};
  constructor() {
    nodemailer.createTestAccount().then((account) => {
      this.#testAccount = account;
      this.#transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user:
            process.env.SMTP_HOST === 'smtp.ethereal.email'
              ? this.#testAccount.user
              : process.env.SMTP_USER,
          pass:
            process.env.SMTP_HOST === 'smtp.ethereal.email'
              ? this.#testAccount.pass
              : process.env.SMTP_PASS,
        },
      });
    });
  }

  sendMail = async ({ from, to, subject, text, html }) => {
    const info = await this.#transporter.sendMail({
      from,
      to,
      subject: subject,
      ...(text ? { text } : {}),
      ...(html ? { html } : {}),
    });

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  };
}

module.exports = new Mailer();
