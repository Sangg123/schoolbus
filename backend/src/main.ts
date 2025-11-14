import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import morgan from 'morgan';
import { join } from 'path';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './configs/PrismaExceptionFilter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const loggerHttp = new Logger('HTTP');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    morgan('dev', {
      stream: {
        write: (message) => loggerHttp.log(message.trim()),
      },
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter());

  // Serve static files from public directory
  const staticPath = join(__dirname, '../..', 'public');
  logger.log(`Serving static files from: ${staticPath}`);
  app.useStaticAssets(staticPath);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('School Bus Management API')
    .setDescription('The school bus management system API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  logger.log('Application is running on: http://localhost:3000');
  logger.log('Swagger UI: http://localhost:3000/api');
  logger.log('Login page: http://localhost:3000/login.html');
}
bootstrap();
