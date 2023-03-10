import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(bodyParser.json());

const prisma = new PrismaClient();

app.get('/', (_req, res) => {
  return res.json({ message: 'Hello World' });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});