import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


import { PrismaClient } from '@prisma/client';

const app = express();
app.use(bodyParser.json());
app.use(cors());


const prisma = new PrismaClient();

app.post('/schedule', async (req, res) => {
  const body: any = req.body;

  const schedule = await prisma.workSchedule.create({
    data: {
      startTime: body.startTime,
      endTime: body.endTime,
      day: body.day
    },
  });

  res.json(schedule);
});

app.get('/schedule', async (_req, res) => {
  const schedules = await prisma.workSchedule.findMany();
  res.json(schedules);
});

app.get('/schedule/:id', async (req, res) => {
  const sId = req.params.id;
  const schedule = await prisma.workSchedule.findUnique({
    where: {
      id: sId,
    },
  });

  res.json(schedule);
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
    },
  });

  res.send(updatedSchedule);
});


app.listen(5555, () => {
  console.log('Server started on port 5555!');
});