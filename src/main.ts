import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create();
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe()
  );
  await app.listen(3000);
}
bootstrap();
