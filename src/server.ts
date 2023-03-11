import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


import { PrismaClient } from '@prisma/client';

const app = express();
app.use(bodyParser.json());
app.use(cors());


const prisma = new PrismaClient();

app.get('/schedule', async (_req, res) => {
  try {
    const data = await prisma.workSchedule.findMany({
      include: {
        days: {
          select: {
            day: true,
          },
        },
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch work schedules.' });
  }
});


app.put('/schedule/:id', async (req, res) => {
  const { id } = req.params;
  const { startTime, endTime, days } = req.body;
  
  try {
    const data = await prisma.workSchedule.update({
      where: { id },
      data: {
        startTime,
        endTime,
        days: {
          set: days,
        },
      },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update work schedule.' });
  }
});





app.listen(3333, () => {
  console.log('Server started on port 3333!');
});