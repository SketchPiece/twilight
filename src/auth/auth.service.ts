import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthDto, AuthResponseDto } from './dto'
import { JwtService } from '@nestjs/jwt'
import { Tokens } from './types'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from 'src/env'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { hashData, PrismaErrorCode } from 'src/common/utils'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService<EnvironmentVariables>
  ) {}

  async register(dto: AuthDto): Promise<AuthResponseDto> {
    const passwordHash = await hashData(dto.password)
    const newUser = await this.prisma.user
      .create({
        data: {
          nickname: dto.nickname,
          passwordHash,
        },
      })
      .catch(error => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === PrismaErrorCode.DUPLICATE)
            throw new ConflictException('User already exist')
        }
        throw error
      })

    const tokens = await this.getTokens(newUser.id, newUser.nickname)
    await this.updateRefreshTokenHash(newUser.id, tokens.refresh_token)
    return {
      user: {
        userId: newUser.id,
        nickname: newUser.nickname,
        avatarUrl: newUser.avatarUrl,
        publicKey: newUser.publicKey,
      },
      ...tokens,
    }
  }

  async login(dto: AuthDto): Promise<AuthResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        nickname: dto.nickname,
      },
    })

    if (!user) throw new ForbiddenException('Wrong credentials')

    const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash)
    if (!passwordMatches) throw new ForbiddenException('Wrong credentials')

    const tokens = await this.getTokens(user.id, user.nickname)
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)
    return {
      user: {
        userId: user.id,
        nickname: user.nickname,
        avatarUrl: user.avatarUrl,
        publicKey: user.publicKey,
      },
      ...tokens,
    }
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshTokenHash: {
          not: null,
        },
      },
      data: {
        refreshTokenHash: null,
      },
    })
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user || !user.refreshTokenHash) throw new ForbiddenException('Access Denied')

    const rtMatches = await bcrypt.compare(refreshToken, user.refreshTokenHash)
    if (!rtMatches) throw new ForbiddenException('Access Denied')

    const tokens = await this.getTokens(user.id, user.nickname)
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token)
    return tokens
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const refreshTokenHash = await hashData(refreshToken)
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash,
      },
    })
  }

  async getTokens(userId: string, nickname: string): Promise<Tokens> {
    const [access, refresh] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          nickname,
        },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION'),
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          nickname,
        },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION'),
        }
      ),
    ])
    return {
      access_token: access,
      refresh_token: refresh,
    }
  }
}
