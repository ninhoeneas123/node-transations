import { Router } from 'express'
import prisma from '../prisma/prisma';
import { BadRequestException } from '../utils/exceptions'

const transactionsRoutes = Router()


transactionsRoutes.post("/operations/deposit", async (req: any, res: any) => {
    const to = req.body.to
    const amount = req.body.amount

    if (!to || !amount) {
        return res.status(400).json({ status: "Error", message: "Please provide from, to and amount." });
    }

    const toUser = await prisma.user.findUnique({ where: { id: to } })

    if (!toUser) {
        return res.status(400).json({ status: "Error", message: "User not found." });
    }

    await prisma.transfer.create({
        data: {
            amount,
            userId: toUser.id
        }
    })

    await prisma.user.update({
        where: { id: toUser.id },
        data: {
            balance: toUser.balance + amount
        }
    })

    res.json({ to, amount })
})

async function validateValue(sourceId: number, value: number) {
    if (value <= 0) {
        throw new BadRequestException('The transaction amount cannot be less than or equal to zero')
    }
    const sourceUser = await prisma.user.findUnique({
        where: {
            id: sourceId,
        },
    });
    if (!sourceUser) {
        throw new BadRequestException('Source user not found.')
    }
    const sourceUserBalance = sourceUser.balance

    if (sourceUserBalance < value) {
        throw new BadRequestException('insufficient funds')
    }
}

async function findUser(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    if (!user) {
        throw new BadRequestException('insufficient funds')
    }
    return user
}

async function updateBalance(id: number, value: number) {
    await prisma.user.update({
        where: { id: id },
        data: { balance: value },
    })
}

async function createOperations(byId: number, toId: number, amount: number) {

    await prisma.transfer.create({
        data: {
            amount,
            byUserId: {
                connect: { id: byId },
            },
            ToUserId: toId,
            date: new Date(),

        }
    })
}

transactionsRoutes.post("/operations/transfer", async (req: any, res: any) => {
    try {
        const { by, to, value } = req.body
        if (!by || !to) {
            throw new BadRequestException('Please enter the source user and destination user Source user not found.')
        }

        await validateValue(by, value)

        const sourceUser = await findUser(by);
        const destinationUser = await findUser(to);

        const newSourceBalance = sourceUser.balance - value;
        const newDestinationBalance = destinationUser.balance + value;

        await updateBalance(by, newSourceBalance);
        await updateBalance(to, newDestinationBalance);

        await
            res.status(200).json({ status: "Success", message: "Transfer successful." });

    } catch (error: any) {
        res.status(error.statusCode).json({ status: error.name, message: error.message })

    }
})



transactionsRoutes.get("/operations/find-all", async (req: any, res: any) => {
    const transactions = await prisma.transfer.findMany()
    res.json(transactions)
})

export default transactionsRoutes