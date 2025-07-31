import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove propriedades que não estão no DTO
    forbidNonWhitelisted: true, // rejeita propriedades não definidas no DTO
    transform: true, // transforma payload em instância do DTO
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
