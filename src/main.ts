import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Restaurant manage description')
    .setDescription('The API description')
    .setVersion('3.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs/v1', app, document);
  await app.listen(3000);
}
bootstrap();
