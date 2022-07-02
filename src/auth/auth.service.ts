import { ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto } from './dto'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { Tokens } from './types'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password)
    const newUser = await this.prisma.user.create({
      data: {
        nickname: dto.nickname,
        hash,
      },
    })

    const tokens = await this.getTokens(newUser.id, newUser.nickname)
    await this.updateRtHash(newUser.id, tokens.refresh_token)
    return tokens
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        nickname: dto.nickname,
      },
    })

    if (!user) throw new ForbiddenException('Access Denied')

    const passwordMatches = await bcrypt.compare(dto.password, user.hash)
    if (!passwordMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(user.id, user.nickname)
    await this.updateRtHash(user.id, tokens.refresh_token)
    return tokens
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    })
    return
  }

  async refreshTokens(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied')

    const rtMatches = await bcrypt.compare(rt, user.hashedRt)
    if (!rtMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(user.id, user.nickname)
    await this.updateRtHash(user.id, tokens.refresh_token)
    return tokens
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await this.hashData(rt)
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    })
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10)
  }

  async getTokens(userId: number, nickname: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          nickname,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          nickname,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        }
      ),
    ])
    return {
      access_token: at,
      refresh_token: rt,
    }
  }
}
