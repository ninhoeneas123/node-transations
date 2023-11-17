import { Router } from 'express'
import prisma from '../prisma/prisma';

let usersRouter = Router()


usersRouter.post("/create-user", async (req: any, res: any) => {
    console.log(req)
    const { name } = req.body
    const balance = 0 as number
    if (!name) return res.send("Please provide a name");

    const user = await prisma.user.create({
        data: { name, balance },
    });

    res.json(user);
});

usersRouter.get("/find-all", async (req: any, res: any) => {
    const users = await prisma.user.findMany()

    res.json(users)

})

export default usersRouter