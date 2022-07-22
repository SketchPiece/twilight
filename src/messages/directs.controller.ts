import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Direct } from '@prisma/client'
import { GetCurrentUserId } from 'src/common/decorators'
import { CreateDirectDto, DirectDto, DirectsResponseDto } from './dto'
import { DirectsService } from './services/directs.service'

@ApiBearerAuth()
@ApiTags('Directs')
@Controller('directs')
export class DirectsController {
  constructor(private readonly directsService: DirectsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: DirectsResponseDto })
  findUserDirects(@GetCurrentUserId() userId) {
    return this.directsService.findUserDirects(userId)
  }

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({ type: DirectDto })
  create(@GetCurrentUserId() userId, @Body() dto: CreateDirectDto) {
    return this.directsService.create(userId, dto.recipientId, dto.firstMessage)
  }
}
