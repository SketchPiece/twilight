import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { GetCurrentUserId } from 'src/common/decorators'
import { QueryPagination } from 'src/common/decorators/query-pagination.decorator'
import { QuerySearch } from 'src/common/decorators/query-search.decorator'
import { PaginationObject } from 'src/common/types'
import { PublicKeyDto } from './dto/public.key.dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  @ApiForbiddenResponse()
  findAll(@QueryPagination() pagination: PaginationObject, @QuerySearch() nickname?: string) {
    return this.usersService.findAll(pagination, nickname)
  }

  @Post('/public-key')
  updatePublicKey(@GetCurrentUserId() userId: string, @Body() dto: PublicKeyDto) {
    return this.usersService.updatePublicKey(userId, dto.publicKey)
  }
}
