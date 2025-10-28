import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS для твоего фронтенда
  app.enableCors({
    origin: 'http://localhost:5173', // фронтенд, которому разрешен доступ
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // если нужны куки
  });

  const config = new DocumentBuilder()
    .setTitle('Family Tree API')
    .setDescription('API для управления пользователями, деревьями и персонами')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
