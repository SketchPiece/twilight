import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AsyncApiDocumentBuilder, AsyncApiModule, AsyncServerObject } from 'nestjs-asyncapi'
import { AuthIoAdapter } from './adapters/AuthIoAdapter'
import { AppModule } from './app.module'

async function bootstrap() {
  const PORT = process.env.PORT || 4000
  const DOMAIN = process.env.DOMAIN || `localhost:${PORT}`
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Twilight Api')
    .setDescription('Twilight App Api Documentation')
    .addBasicAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const asyncApiServer: AsyncServerObject = {
    url: `ws://${DOMAIN}`,
    protocol: 'socket.io',
    description: 'Allows you to connect using the websocket protocol to our Socket.io server.',
  }

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('Twilight WebSockets')
    .setDescription('Twilight App WebSockets Documentation')
    .setDefaultContentType('application/json')
    .addServer('twilight', asyncApiServer)
    .build()

  const asyncApiDocument = await AsyncApiModule.createDocument(app, asyncApiOptions)
  await AsyncApiModule.setup('async-api', app, asyncApiDocument)

  app.useWebSocketAdapter(new AuthIoAdapter(app))

  await app.listen(PORT)
}
bootstrap()
