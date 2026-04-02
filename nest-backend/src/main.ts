import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { swaggerConfig } from './common/config/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/swagger', app, documentFactory);
    app.useGlobalPipes(new ValidationPipe());

    
    app.use(
      session({
          secret: process.env.SESSION_SECRET ?? 'dev-secret-change-me',
          resave: false,
          saveUninitialized: false,
          cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24,
          },
        }),
      );
      
    await app.listen(process.env.PORT ?? 3000);
    
    console.log(`Server is running on port ${process.env.PORT ?? 3000}`);
    console.log(`Swagger is running on port ${process.env.PORT ?? 3000}/api/swagger`);

}
bootstrap();
