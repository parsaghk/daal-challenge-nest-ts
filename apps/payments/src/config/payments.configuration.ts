import { registerAs } from '@nestjs/config';

export const paymentsConfiguration = registerAs('payments', () => ({
  mongoUri: process.env.MONGODB_URI,
  httpPort: Number(process.env.HTTP_PORT),
  tcpPort: Number(process.env.TCP_PORT),
  tcpHost: process.env.TCP_HOST,
  identityHost: process.env.IDENTITY_HOST,
  identityPort: process.env.IDENTITY_PORT,
}));
