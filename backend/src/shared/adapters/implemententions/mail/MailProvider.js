import fs from 'fs';
import Handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import path from 'path';

class MailProvider {
  constructor() {
    this.client = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(data, pathname) {
    const templateContent = fs.readFileSync(path.join(pathname), 'utf-8');
    const template = Handlebars.compile(templateContent);
    const message = template(data);

    const res = await this.client.sendMail({
      from: process.env.EMAIL_FROM,
      to: data.email,
      subject: 'Cadastro de senha para ativação da conta ',
      html: message,
    });

    return res;
  }
}

export { MailProvider };
