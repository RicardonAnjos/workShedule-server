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
  const sId = req.params.id;
  const body: any = req.body;

  const updatedSchedule = await prisma.workSchedule.update({
    where: {
      id: sId,
    },
    data: {
      startTime: body.startTime,
      endTime: body.endTime,
      days: body.days.join(','),
    },
  });

  res.json(updatedSchedule);
});


app.listen(5555, () => {
  console.log('Server started on port 5555!');
});