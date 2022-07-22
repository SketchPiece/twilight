import { INestApplication } from '@nestjs/common'
import { setupTestSuite } from 'src/test/setupTest'
import * as request from 'supertest'
import { registerTestUser } from 'src/test/registerTestUser'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthResponseDto } from 'src/auth/dto'

describe('DirectsController (e2e)', () => {
  let app: INestApplication
  let users: [AuthResponseDto, AuthResponseDto]
  let prisma: PrismaService
  const message = 'test message'

  beforeAll(async () => {
    const [moduleRef, prismaDB] = await setupTestSuite()
    prisma = prismaDB

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it('should create direct for both users', async () => {
    users = await Promise.all([registerTestUser(app, 'test1'), registerTestUser(app, 'test2')])
    const response = await request(app.getHttpServer())
      .post('/directs')
      .set('Authorization', `Bearer ${users[0].access_token}`)
      .send({ recipientId: users[1].user.userId, firstMessage: message })
      .expect(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        userId: users[0].user.userId,
        senderId: users[1].user.userId,
        unseenNumber: 0,
        lastMessage: message,
        hash: expect.any(String),
        updated: expect.any(String),
      })
    )
    const directs = await prisma.direct.findMany()
    expect(directs).toHaveLength(2)
    expect(directs[0].hash).toEqual(directs[1].hash)
  })

  it("shouldn't create direct for non-existing user", () => {
    return request(app.getHttpServer())
      .post('/directs')
      .set('Authorization', `Bearer ${users[0].access_token}`)
      .send({ recipientId: 'non-existing-user', firstMessage: message })
      .expect(400)
  })

  it('should return directs for user', async () => {
    return request(app.getHttpServer())
      .get('/directs')
      .set('Authorization', `Bearer ${users[0].access_token}`)
      .expect(200)
  })

  it("shouldn't create direct that already exists", async () => {
    prisma.cleanDatabase()
    users = await Promise.all([registerTestUser(app, 'test1'), registerTestUser(app, 'test2')])
    await Promise.all([
      request(app.getHttpServer())
        .post('/directs')
        .set('Authorization', `Bearer ${users[0].access_token}`)
        .send({ recipientId: users[1].user.userId, firstMessage: 'test-message-1' }),
      request(app.getHttpServer())
        .post('/directs')
        .set('Authorization', `Bearer ${users[0].access_token}`)
        .send({ recipientId: users[1].user.userId, firstMessage: 'test-message-2' }),
    ])
    const directs = await prisma.direct.findMany()
    expect(directs).toHaveLength(2)
  })
})
