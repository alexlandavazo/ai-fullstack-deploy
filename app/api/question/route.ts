import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { qa } from '@/utils/ai'
import { NextResponse } from 'next/server'

export const POST = async (request) => {
  const { question } = await request.json()
  const user = getUserFromClerkID()

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  })

  const answer = await qa(question, entries)

  console.log(answer)

  return NextResponse.json({ data: answer })
}
