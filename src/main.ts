import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Firebase Cloud Storage API')
    .setDescription('Firebase Cloud Storage upload a photo API')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
  app.useGlobalPipes(new ValidationPipe()); // ValidationPipe ekleyince düzeldi
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.SERVER_PORT);
  console.log(
    `Server started with succesfuly at ${process.env.SERVER_PORT} port`,
  );
}
bootstrap();
