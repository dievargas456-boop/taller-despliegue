import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);  //Esto crea tu aplicación completa: toma el AppModule (que ya trae adentro UsersModule, DatabaseModule, etc.) y arranca todo el servidor de NestJS.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //Esto hace que las reglas del DTO (@IsEmail(), @MinLength(6), etc.) realmente se apliquen.

  const config = new DocumentBuilder() //sto arma la "portada" de tu documentación: el título, la descripción y la versión que aparecen arriba de todo cuando abres /api en el navegador.
    .setTitle('API auth9')
    .setDescription('Documentación de los endpoints de usuarios')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); //sta es la línea que publica ese documento como una página web navegable, en la ruta /api. 
  //Es la que hace posible que entres a http://localhost:3000/api y veas la interfaz visual con todos tus endpoints
  await app.listen(process.env.PORT ?? 3000); //Finalmente, esto pone tu servidor a escuchar peticiones en el puerto 3000
}
bootstrap();