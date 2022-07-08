import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { QueryPagination } from 'src/common/decorators/query-pagination.decorator'
import { PaginationObject } from 'src/common/types'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@QueryPagination() pagination: PaginationObject) {
    return this.usersService.findAll(pagination)
  }
}
