// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
        const events = await prisma.event.findMany();
        res.status(200).json({ events });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      }
      break;
    case "POST":
      try {
        const event = await prisma.event.create({
          data: {
            name: req.body.name,
            date: req.body.date,
            location: req.body.location,
            attendees: req.body.attendees,
          },
        });

        res.status(200).json({ event });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      }

      break;
  }
}
