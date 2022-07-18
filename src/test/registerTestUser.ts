import { INestApplication } from '@nestjs/common'
import { AuthResponseDto } from 'src/auth/dto'
import * as request from 'supertest'

export const registerTestUser = async (
  app: INestApplication,
  nickname = 'test'
): Promise<AuthResponseDto> => {
  const response = await request(app.getHttpServer())
    .post('/auth/register')
    .send({ nickname, password: '12345678' })
  return response.body
}
