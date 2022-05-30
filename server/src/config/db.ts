import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  name: process.env.DB_BASE,
}));

export const generalConfig = registerAs('general', () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3006,
}));
