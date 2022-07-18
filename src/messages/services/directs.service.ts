import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { hashData, PrismaErrorCode } from 'src/common/utils'
import { ConnectionService } from 'src/connection/connection.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class DirectsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly connectionService: ConnectionService
  ) {}

  async findUserDirects(userId) {
    const [directs, count] = await this.prisma.$transaction([
      this.prisma.direct.findMany({
        where: {
          userId,
        },
        orderBy: {
          updated: 'desc',
        },
      }),
      this.prisma.direct.count({
        where: {
          userId,
        },
      }),
    ])

    return {
      directs,
      count,
    }
  }

  async create(userId: string, recipientId: string, firstMessage: string) {
    try {
      const hash = await hashData(`${userId}${recipientId}${Date.now()}`)

      const [self, other, recipient] = await this.prisma.$transaction([
        this.prisma.direct.findFirst({
          where: {
            userId,
            senderId: recipientId,
          },
        }),
        this.prisma.direct.findFirst({
          where: {
            userId: recipientId,
            senderId: userId,
          },
        }),
        this.prisma.user.findUnique({
          where: {
            id: recipientId,
          },
        }),
      ])

      if (!recipient) throw new BadRequestException('Recipient not found')
      if (self || other) throw new ConflictException('Direct already exist')

      const [direct, recipientDirect] = await this.prisma.$transaction([
        this.prisma.direct.create({
          data: {
            user_and_sender_id: `${userId}/${recipientId}`,
            userId,
            senderId: recipientId,
            unseenNumber: 0,
            lastMessage: firstMessage,
            hash,
          },
        }),
        this.prisma.direct.create({
          data: {
            user_and_sender_id: `${recipientId}/${userId}`,
            userId: recipientId,
            senderId: userId,
            unseenNumber: 1,
            lastMessage: firstMessage,
            hash,
          },
        }),
      ])

      const message = await this.prisma.message.create({
        data: {
          directHash: hash,
          senderId: userId,
          text: firstMessage,
        },
      })

      this.connectionService.server
        .to(recipientId)
        .emit('message', { direct: recipientDirect, message })

      return direct
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCode.DUPLICATE)
          throw new ConflictException('Direct already exist')
      }
      throw error
    }
  }
}
