import { NestFactory } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

import { APP_PORT, NODE_ENV } from './settings';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformResponse } from './domain/interceptors/response.interceptor';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Ms example')
    .setDescription('The Middleware to ...')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Consults')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-AUTH'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  if (NODE_ENV.trim().toLowerCase() !== 'production') {
    SwaggerModule.setup('api', app, document);
  }
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, disableErrorMessages: false }));
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new TransformResponse());
  await app.listen(APP_PORT);
}
bootstrap();
