import { Injectable } from '@nestjs/common'
import { ConnectionService } from 'src/connection/connection.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { directSelect } from '../common'
import { PubMessageDto } from '../dto/pub.message.dto'

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly connectionService: ConnectionService
  ) {}

  async createMessage(userId: string, dto: PubMessageDto) {
    const direct = await this.prisma.direct.findFirst({
      where: {
        userId,
        hash: dto.directHash,
      },
      select: directSelect,
    })
    if (!direct) throw new Error('Direct not found')
    const [message] = await this.prisma.$transaction([
      this.prisma.message.create({
        data: {
          directHash: dto.directHash,
          senderId: userId,
          text: dto.message,
        },
      }),
      this.prisma.direct.updateMany({
        where: {
          hash: dto.directHash,
          userId,
        },
        data: {
          unseenNumber: 0,
          lastMessage: dto.message,
        },
      }),
      this.prisma.direct.updateMany({
        where: {
          hash: dto.directHash,
          userId: direct.senderId,
        },
        data: {
          lastMessage: dto.message,
          unseenNumber: {
            increment: 1,
          },
        },
      }),
    ])

    const updatedDirect = await this.prisma.direct.findFirst({
      where: {
        hash: dto.directHash,
        userId: direct.senderId,
      },
      select: directSelect,
    })

    this.connectionService.server.to(direct.senderId).emit('message', {
      direct: updatedDirect,
      message,
    })
  }

  async clearUnseenNumber(userId: string, directHash: string) {
    const direct = await this.prisma.direct.findFirst({
      where: {
        userId,
        hash: directHash,
      },
      select: directSelect,
    })
    if (!direct) throw new Error('Direct not found')
    await this.prisma.direct.updateMany({
      where: {
        hash: directHash,
        userId,
      },
      data: {
        unseenNumber: 0,
      },
    })
  }
}
