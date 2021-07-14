import crypto from 'crypto';

export default function hash(password: string) {
  return crypto.createHmac('sha512', password).digest('hex');
}
