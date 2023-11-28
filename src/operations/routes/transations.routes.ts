import { Router, Request, Response } from 'express'
import { OperationsController } from '../transactions.controller';
import { validatePrismaConnction } from '../../prisma/validate-prisma-connect';

const operationsRoutes = Router()
const operationsController = new OperationsController()

operationsRoutes.post("/operations/deposit", async (req: Request, res: Response) => {
    try {
        const { to, value } = req.body
        const returnDeposit = await operationsController.deposit(to, value)

        res.status(200).json(returnDeposit)
    } catch (error: any) {

        res.status(error.statusCode || 500).json({ status: "Error", message: error.message })

    }
})

operationsRoutes.post("/operations/transfer", async (req: Request, res: Response) => {
    try {
        const { senderUserId, receiverUserId, value } = req.body
        const returnTranfer = await operationsController.transfer(senderUserId, receiverUserId, value)

        res.status(200).json(returnTranfer)

    } catch (error: any) {
        res.status(error.statusCode || 500).json({ status: "Error", message: error.message })

    }
})

operationsRoutes.get("/operations/statement/:userId", async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);

        const statement = await operationsController.statement(userId)
        res.status(200).json(statement)

    } catch (error: any) {
        console.log(error)
        res.status(error.statusCode).json({ status: "Error", message: error.message })
    }
})


export default operationsRoutes