import { registerAs } from '@nestjs/config';

export const identityConfiguration = registerAs('identity', () => ({
  mongoUri: process.env.MONGODB_URI,
  httpPort: Number(process.env.HTTP_PORT),
  tcpPort: Number(process.env.TCP_PORT),
  tcpHost: process.env.TCP_HOST,
}));
