import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function seed() {
  await prisma.workSchedule.create({
    data: {
      startTime: '08:00:00',
      endTime: '17:00:00',
      days: {
        create: [
          { day: 'Monday' },
          { day: 'Tuesday' },
          { day: 'Wednesday' },
        ]
      }
    },
    include: { days: true }
  })
}

seed()
  .catch((error) => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
