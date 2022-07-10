import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const QuerySearch = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const search = request.query.search || undefined
    if (!search) return undefined
    const searchStrings = search.split(',') as string[]
    const searchValues = searchStrings.map(str => str.trim().split('='))
    if (data) return searchValues.find(value => value[0] === data)?.[1]
    return searchValues
  }
)
