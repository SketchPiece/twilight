import { INestApplication } from '@nestjs/common'
import { AuthResponseDto } from 'src/auth/types'
import * as request from 'supertest'

export const registerTestUser = async (app: INestApplication): Promise<AuthResponseDto> => {
  const response = await request(app.getHttpServer())
    .post('/auth/register')
    .send({ nickname: 'test', password: '12345678', publicKey: 'pub' })
  return response.body
}
