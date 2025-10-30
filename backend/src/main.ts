import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(err =>
          err.constraints ? Object.values(err.constraints).join(', ') : 'Error de validación'
        )
        return new BadRequestException(messages)
      }
    }),)
  app.enableCors({
    origin: ['http://localhost:5173', 'https://olaventos.vercel.app'], // React local + deploy
    credentials: true,
  })
  await app.listen(3000)
}
bootstrap();
