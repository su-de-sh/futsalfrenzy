// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  const method = req.method;

  switch (method) {
    case "GET":
      try {
        const users = await prisma.user.findMany();
        res.status(200).json({ users });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      }
      break;
    case "POST":
      try {
        const user = await prisma.user.create({
          data: {
            name: req.body.name,
            email: req.body.email,
            profilePic: req.body.profilePic,
          },
        });

        res.status(200).json({ user });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      }
  }
}
