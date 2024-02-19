import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PaymentsConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const paymentsConfigService = app.get(PaymentsConfigService);
  const config = new DocumentBuilder()
    .setTitle('Payments service')
    .setDescription('The payments service API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(paymentsConfigService.httpPort);
}

bootstrap();
