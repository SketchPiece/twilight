import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { GetCurrentUserId } from 'src/common/decorators'
import { QueryPagination } from 'src/common/decorators/query-pagination.decorator'
import { QuerySearch } from 'src/common/decorators/query-search.decorator'
import { PaginationObject } from 'src/common/types'
import { UsersResponseDto } from './dto'
import { PublicKeyDto } from './dto/public.key.dto'
import { UsersService } from './users.service'

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UsersResponseDto })
  @ApiForbiddenResponse()
  findAll(@QueryPagination() pagination: PaginationObject, @QuerySearch() nickname?: string) {
    return this.usersService.findAll(pagination, nickname)
  }

  @Post('/public-key')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  updatePublicKey(@GetCurrentUserId() userId: string, @Body() dto: PublicKeyDto) {
    return this.usersService.updatePublicKey(userId, dto.publicKey)
  }
}
