import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { PrismaService } from 'src/prisma/prisma.service'

export const setupTestSuite = async (): Promise<[TestingModule, PrismaService]> => {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile()

  const prisma = moduleRef.get(PrismaService)
  await prisma.cleanDatabase()
  return [moduleRef, prisma]
}
