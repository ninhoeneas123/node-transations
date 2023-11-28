import { Router, Request, Response } from 'express'
import prisma from '../../prisma/prisma';
import UserController from '../user.controller';
import UserInterface from '../interfaces/user.interface';


let usersRouters = Router()
usersRouters.post("/user/create", async (req: Request, res: Response) => {
    try {
        const { userName } = req.body
        const returnCreateUser = await UserController.create(userName)

        res.status(200).json(returnCreateUser)

    } catch (error: any) {

        res.status(error.statusCode || 500).json({ status: "Error", message: error.message })

    }

});
usersRouters.get("/user/find-all", async (req: Request, res: Response) => {
    try {
        const returnAllUsers = await UserController.findAll()

        res.status(200).json(returnAllUsers)

    } catch (error: any) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message })
    }

})

export default usersRouters