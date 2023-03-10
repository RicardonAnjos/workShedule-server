import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(bodyParser.json());

const prisma = new PrismaClient();

app.get('/schedule', async (_req, res) => {
  try {
    const data = await prisma.workSchedule.findMany({
      include: {
        days: true,
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
  const { startTime, endTime } = req.body;

  try {
    await prisma.workSchedule.update({
      where: { id },
      data: { startTime, endTime },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update work schedule.' });
  }
});


app.listen(3333, () => {
  console.log('Server started on port 3333!');
});