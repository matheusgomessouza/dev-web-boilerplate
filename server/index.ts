import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON request bodies
app.use(express.json());
const port = 8080;
const prisma = new PrismaClient();

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({ data: { name, email } });
  res.json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
