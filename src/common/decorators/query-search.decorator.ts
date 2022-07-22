import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const QuerySearch = createParamDecorator((_: string | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const search = request.query.search || undefined
  return search
})
