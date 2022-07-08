import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const QueryPagination = createParamDecorator((_: never, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return {
    page: parseInt(request.query.page) || undefined,
    limit: parseInt(request.query.limit) || 10,
  }
})
