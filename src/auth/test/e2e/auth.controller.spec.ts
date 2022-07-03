import { INestApplication } from '@nestjs/common'

import * as request from 'supertest'
import { setupTestSuite } from 'src/test/setupTest'
import { userStub } from '../stubs/user.stub'
import { AuthResponseDto } from 'src/auth/types'

describe('AuthController (e2e)', () => {
  let app: INestApplication
  let authResponse: AuthResponseDto

  beforeAll(async () => {
    const [moduleRef] = await setupTestSuite()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  describe('/register (POST)', () => {
    it('should register user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(userStub())
        .expect(201)
      expect(response.body).toEqual(
        expect.objectContaining({
          userId: expect.any(String),
          nickname: userStub().nickname,
          access_token: expect.any(String),
          refresh_token: expect.any(String),
        })
      )
    })
    it('should return error on already existing user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(userStub())
        .expect(409)
        .expect({
          statusCode: 409,
          message: 'User already exist',
          error: 'Conflict',
        })
    })

    it('should forbid short and long nicknames', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ nickname: 'sht', password: 'pass' })
        .expect(400)
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ nickname: 'longlonglonglong', password: 'pass' })
        .expect(400)
    })
  })

  describe('/login (POST)', () => {
    it('should login existing user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(userStub())
        .expect(200)
      expect(response.body).toEqual(
        expect.objectContaining({
          userId: expect.any(String),
          nickname: userStub().nickname,
          access_token: expect.any(String),
          refresh_token: expect.any(String),
        })
      )
      authResponse = response.body
    })

    it('should return error on wrong credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ ...userStub(), password: 'wrong-pass' })
        .expect(403)
        .expect({ statusCode: 403, message: 'Wrong credentials', error: 'Forbidden' })
    })
  })

  describe('/logout (POST)', () => {
    it('should logout user using access token', () => {
      return request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', 'Bearer ' + authResponse.access_token)
        .expect(200)
    })
    it("shouldn't logout unauthorized user", () => {
      return request(app.getHttpServer())
        .post('/auth/logout')
        .expect(401)
        .expect({ statusCode: 401, message: 'Unauthorized' })
    })
  })

  describe('/refresh (POST)', () => {
    beforeAll(async () => {
      const response = await request(app.getHttpServer()).post('/auth/login').send(userStub())
      authResponse = response.body
    })
    it('should refresh tokens with refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Authorization', 'Bearer ' + authResponse.refresh_token)
        .expect(200)
      expect(response.body).toEqual(
        expect.objectContaining({
          access_token: expect.any(String),
          refresh_token: expect.any(String),
        })
      )
    })
    it("shouldn't refresh for unauthorized user", () => {
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .expect(401)
        .expect({ message: 'Unauthorized', statusCode: 401 })
    })

    it("should't refresh for logged out user", async () => {
      await request(app.getHttpServer())
        .post('/auth/logout')
        .set('Authorization', 'Bearer ' + authResponse.access_token)
      return request(app.getHttpServer())
        .post('/auth/refresh')
        .set('Authorization', 'Bearer ' + authResponse.refresh_token)
        .expect(403)
        .expect({ error: 'Forbidden', statusCode: 403, message: 'Access Denied' })
    })
  })
})
