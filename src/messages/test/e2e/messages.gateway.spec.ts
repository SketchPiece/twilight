import { INestApplication } from '@nestjs/common'
import { Socket } from 'socket.io-client'
import { AuthIoAdapter } from 'src/adapters/AuthIoAdapter'
import { AuthResponseDto } from 'src/auth/dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { registerTestUser } from 'src/test/registerTestUser'
import { setupTestSuite } from 'src/test/setupTest'
import * as request from 'supertest'
import { setupConnectedClient } from '../utils/setupConnectedClient'

describe('MessagesGateway (e2e)', () => {
  const PORT = 4000
  const GATEWAY_URL = `ws://localhost:${PORT}`
  let app: INestApplication
  let users: [AuthResponseDto, AuthResponseDto]
  let user1Client: Socket
  let user2Client: Socket
  let directHash: string

  beforeAll(async () => {
    const [moduleRef] = await setupTestSuite()

    app = moduleRef.createNestApplication()
    app.useWebSocketAdapter(new AuthIoAdapter(app))

    await app.listen(PORT)

    users = await Promise.all([registerTestUser(app, 'user1'), registerTestUser(app, 'user2')])
    user1Client = await setupConnectedClient(GATEWAY_URL, users[0].access_token)
    user2Client = await setupConnectedClient(GATEWAY_URL, users[1].access_token)
  })

  afterEach(() => {
    user1Client && user1Client.offAny()
    user2Client && user2Client.offAny()
  })

  afterAll(async () => {
    await app.close()
    user1Client.close()
    user2Client.close()
  })

  it('should send message and direct to user after direct creation', async done => {
    const message = 'test message'

    user2Client.on('message', data => {
      directHash = data.direct.hash
      expect(data).toEqual({
        direct: expect.objectContaining({
          id: expect.any(String),
          userId: users[1].user.userId,
          senderId: users[0].user.userId,
          hash: expect.any(String),
          unseenNumber: 1,
          lastMessage: message,
          updated: expect.any(String),
          created: expect.any(String),
        }),
        message: expect.objectContaining({
          id: expect.any(String),
          senderId: users[0].user.userId,
          text: message,
          directHash: expect.any(String),
          updated: expect.any(String),
          created: expect.any(String),
        }),
      })
      done()
    })

    await request(app.getHttpServer())
      .post('/directs')
      .set('Authorization', `Bearer ${users[0].access_token}`)
      .send({ recipientId: users[1].user.userId, firstMessage: message })
  })

  it("should send user's message with updated direct", async done => {
    const message = 'second test message'

    user1Client.on('message', data => {
      expect(data).toEqual({
        direct: expect.objectContaining({
          id: expect.any(String),
          userId: users[0].user.userId,
          senderId: users[1].user.userId,
          hash: expect.any(String),
          unseenNumber: 1,
          lastMessage: message,
          updated: expect.any(String),
          created: expect.any(String),
        }),
        message: expect.objectContaining({
          id: expect.any(String),
          senderId: users[1].user.userId,
          text: message,
          directHash: expect.any(String),
          updated: expect.any(String),
          created: expect.any(String),
        }),
      })
      done()
    })

    user2Client.emit('message', {
      message,
      directHash,
    })
  })

  it('should clear unseen number', async done => {
    const response = await request(app.getHttpServer())
      .get('/directs')
      .set('Authorization', `Bearer ${users[0].access_token}`)
      .expect(200)
    expect(response.body.directs[0].unseenNumber).toBe(1)
    user1Client.emit('clearUnseen', async () => {
      const response = await request(app.getHttpServer())
        .get('/directs')
        .set('Authorization', `Bearer ${users[0].access_token}`)
      expect(response.body.directs[0].unseenNumber).toBe(0)
      done()
    })
  })
})
