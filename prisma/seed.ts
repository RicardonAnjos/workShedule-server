const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const workSchedule = await prisma.workSchedule.create({
    data: {
      startTime: '08:00',
      endTime: '17:00',
      days: {
        create: [
          { day: 1 },
          { day: 3 },
          { day: 5 },
        ]
      }
    },
    include: { days: true }
  })

  console.log(`Created work schedule with ID: ${workSchedule.id}`)
  console.log(`Created work days:`)
  console.log(workSchedule.days)
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
