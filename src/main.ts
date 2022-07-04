import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AuthIoAdapter } from './adapters/AuthIoAdapter'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Twilight Api')
    .setDescription('Twilight App Api Documentation')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  app.useWebSocketAdapter(new AuthIoAdapter(app))

  const PORT = process.env.PORT || 4000

  await app.listen(PORT)
}
bootstrap()
