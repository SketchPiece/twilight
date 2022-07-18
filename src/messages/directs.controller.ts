import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GetCurrentUserId } from 'src/common/decorators'
import { CreateDirectDto } from './dto/create.direct.dto'
import { DirectsService } from './services/directs.service'

@ApiTags('Directs')
@Controller('directs')
export class DirectsController {
  constructor(private readonly directsService: DirectsService) {}

  @Get()
  findUserDirects(@GetCurrentUserId() userId) {
    return this.directsService.findUserDirects(userId)
  }

  @Post()
  @HttpCode(201)
  create(@GetCurrentUserId() userId, @Body() dto: CreateDirectDto) {
    return this.directsService.create(userId, dto.recipientId, dto.firstMessage)
  }
}
