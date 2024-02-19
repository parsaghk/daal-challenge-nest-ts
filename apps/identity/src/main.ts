import { NestFactory } from '@nestjs/core';
import { IdentityModule } from './identity.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IdentityConfigService } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(IdentityModule);
  const identityConfigService = app.get(IdentityConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: identityConfigService.tcpHost,
      port: identityConfigService.tcpPort,
    },
  });
  const config = new DocumentBuilder()
    .setTitle('Identity service')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.startAllMicroservices();
  await app.listen(identityConfigService.httpPort);
}

bootstrap();
