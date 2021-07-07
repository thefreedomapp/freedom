import crypto from 'crypto';

export default function hash(password: string, salt: string = getSalt()) {
  return crypto.createHmac('sha512', salt).update(password).digest('hex');
}

export function getSalt(rounds = 10): string {
  return crypto
    .randomBytes(Math.ceil(rounds / 2))
    .toString('hex')
    .slice(0, rounds);
}
