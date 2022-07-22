import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger'

import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators'
import { RefreshTokenGuard } from 'src/common/guards'
import { AuthService } from './auth.service'
import { AuthDto, TokensDto, AuthResponseDto } from './dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The user has been successfully registered',
    type: AuthResponseDto,
  })
  @ApiConflictResponse({
    description: 'The user with this nickname already exist',
  })
  @ApiBadRequestResponse({
    description: 'Some fields have an error',
  })
  register(@Body() dto: AuthDto): Promise<AuthResponseDto> {
    return this.authService.register(dto)
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The user has been successfully logged in',
    type: AuthResponseDto,
  })
  login(@Body() dto: AuthDto): Promise<AuthResponseDto> {
    return this.authService.login(dto)
  }

  @Post('logout')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'The user logged out successfully' })
  @ApiForbiddenResponse()
  logout(@GetCurrentUserId() userId: string) {
    return this.authService.logout(userId)
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @ApiBearerAuth()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: TokensDto,
  })
  @ApiForbiddenResponse()
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string
  ) {
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
