import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS for all routes
// Middleware to parse JSON request bodies
app.use(express.json());
const port = 8080;
const prisma = new PrismaClient();

app.get('/visitation', async (req, res) => {
  const visitations = await prisma.visitation.findMany();
  res.status(200).json(visitations);
});

app.get('/visitation/:id', async (req, res) => {
  const visitation = await prisma.visitation.findUnique({
    where: { id: Number(req.params.id) },
  });

  if (!visitation) {
    return res.status(404).json({ error: "Visitation not found" });
  }

  res.status(200).json(visitation);
});

app.post('/visitation', async (req, res) => {
  const { name, address, hour, date, description, evaluation } = req.body;
  const visitations = await prisma.visitation.create({ data: { name, address, hour, date, description, evaluation } });
  res.status(201).json(visitations);
});

app.put('/visitation/:id', async (req, res) => {
  const { name, address, hour, date, description, evaluation } = req.body;
  if (!req.params.id) {
    return res.status(400).json({ error: "Visitation ID is required" });
  }
  const visitation = await prisma.visitation.update({
    where: { id: Number(req.params.id) },
    data: {
      name,
      address,
      hour,
      date,
      description,
      evaluation
    }
  });

  if (!visitation) {
    return res.status(404).json({ error: "Visitation not found" });
  }

  res.json({
    message: "Visitation updated successfully",
    visitation,
  });
});

app.delete('/visitation/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Visitation ID is required" });
  }
  const visitation = await prisma.visitation.delete({
    where: { id: Number(req.params.id) },
  });

  if (!visitation) {
    return res.status(404).json({ error: "Visitation not found" });
  }

  res.status(204).json({
    message: "Visitation deleted successfully",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
