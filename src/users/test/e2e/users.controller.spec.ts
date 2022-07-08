import { INestApplication } from '@nestjs/common'
import { setupTestSuite } from 'src/test/setupTest'
import { usersStubGenerator } from '../helpers/users.stub'
import * as request from 'supertest'
import { AuthResponseDto } from 'src/auth/types'
import { registerTestUser } from 'src/test/registerTestUser'
import { PrismaService } from 'src/prisma/prisma.service'

describe('UsersController (e2e)', () => {
  let app: INestApplication
  let authResponse: AuthResponseDto
  let prisma: PrismaService

  beforeAll(async () => {
    const [moduleRef, prismaDB] = await setupTestSuite()
    prisma = prismaDB

    app = moduleRef.createNestApplication()
    await app.init()

    await prisma.user.createMany({
      data: usersStubGenerator(30),
    })

    authResponse = await registerTestUser(app)
  })

  it('should return all users', async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nickname: true,
        publicKey: true,
        avatarUrl: true,
      },
    })
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer ' + authResponse.access_token)
      .expect(200)
    expect(response.body).toEqual({
      users: users.map(user => JSON.parse(JSON.stringify(user))),
      count: users.length,
    })
  })

  it('should return paginated users', async () => {
    const users = await prisma.user.findMany({
      take: 10,
      select: {
        id: true,
        nickname: true,
        publicKey: true,
        avatarUrl: true,
      },
    })
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', 'Bearer ' + authResponse.access_token)
      .query({ limit: 10, page: 1 })
      .expect(200)
    expect(response.body).toEqual({
      users: users.map(user => JSON.parse(JSON.stringify(user))),
      count: await prisma.user.count(),
    })
  })

  // it.todo('should return user')
})
