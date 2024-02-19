import { registerAs } from '@nestjs/config';

export const paymentsConfiguration = registerAs('payments', () => ({
  mongoUri: process.env.MONGODB_URI,
  httpPort: Number(process.env.HTTP_PORT),
  rabbitmqUri: process.env.RABBITMQ_URI,
}));
