import { Injectable } from '@nestjs/common'
import { PaginationObject } from 'src/common/types'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination: PaginationObject, nickname?: string) {
    let options: any = {
      select: {
        id: true,
        nickname: true,
        publicKey: true,
        avatarUrl: true,
      },
    }
    if (pagination.page)
      options = {
        ...options,
        take: pagination.limit,
        skip: pagination.limit * (pagination.page - 1),
      }
    if (nickname) options = { ...options, where: { nickname: { contains: nickname } } }
    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany(options),
      this.prisma.user.count({
        where: options.where,
      }),
    ])
    return { users, count }
  }

  async updatePublicKey(userId: string, publicKey: string) {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        publicKey,
      },
    })
  }
}
