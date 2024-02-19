import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PaymentsConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const paymentsConfigService = app.get(PaymentsConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: paymentsConfigService.tcpHost,
      port: paymentsConfigService.tcpPort,
    },
  });
  const config = new DocumentBuilder()
    .setTitle('Payments service')
    .setDescription('The payments service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.startAllMicroservices();
  await app.listen(paymentsConfigService.httpPort);
}

bootstrap();
