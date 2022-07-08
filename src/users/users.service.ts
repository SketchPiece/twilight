import { Injectable } from '@nestjs/common'
import { PaginationObject } from 'src/common/types'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination: PaginationObject) {
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
    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany(options),
      this.prisma.user.count(),
    ])
    return { users, count }
  }
}
