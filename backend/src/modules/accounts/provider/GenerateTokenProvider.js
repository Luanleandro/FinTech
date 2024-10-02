import jwt from 'jsonwebtoken';

export class GenerateTokenProvider {
  constructor(signFunction = jwt.sign) {
    this.sign = signFunction;
  }
  async execute(payload, secret_password = process.env.SECRET_PASSWORD) {
    return this.sign(payload, secret_password, {
      expiresIn: '1d',
    });
  }
}
