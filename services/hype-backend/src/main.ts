import 'reflect-metadata';
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

export function getPort(): number {
  return parseInt(process.env.PORT || process.env.SERVER_PORT || '3000', 10);
}

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const PORT = getPort();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();
  app.enableCors({
    origin: '*',
    exposedHeaders: ['Content-Type', 'Content-Range'],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const options = new DocumentBuilder()
    .setTitle('Taraxa Hype Pool API')
    .setDescription('Swagger documentation for Taraxa Hype Pool API')
    .setVersion('0.1')
    .addBearerAuth(
      {
        name: 'Authorization',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Bearer',
        in: 'Header',
      },
      'authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apidocs', app, document);

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
