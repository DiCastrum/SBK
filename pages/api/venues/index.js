import { PrismaClient } from "@prisma/client";

//POST API for fetch all Venues data

export default async function (req, res) {
  const prisma = new PrismaClient();

  try {
    const venues = await prisma.venue.findMany({include: { location: true }});
    res.status(200);
    res.json({ venues });
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to load Venues" });
  } 
}