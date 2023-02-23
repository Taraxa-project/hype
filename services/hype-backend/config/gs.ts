import { registerAs } from '@nestjs/config';

export default registerAs('gs', () => ({
  secret: process.env.GS_SECRET,
}));
