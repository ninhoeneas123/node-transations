import prisma from "../prisma/prisma"
import { Exception } from "../utils/exceptions";
import UserWithStatement from "./interfaces/user-statement.interface";
import UserInterface from "./interfaces/user.interface";

class UserController {

    async create(userName: string): Promise<UserInterface> {

        if (!userName) {
            throw new Exception("Plase insert User name", 400, 'Bad Request.')
        }

        const balance = 0 as number
        const user = await prisma.user.create({
            data: { userName, balance },
        });

        return user
    }

    async findOne(id: number): Promise<UserInterface | null> {
        return await prisma.user.findUnique({
            where: {
                id
            },
        })
    }

    async findOneWithStatement(userId: number): Promise<UserWithStatement | null> {
        const userWithStatement = await prisma.user.findUnique({
            where: { id: userId },
            include: { sentTransfers: true, receivedTransfers: true, deposits: true },
        });
        if (!userWithStatement) {
            throw new Exception('User not found.', 400, 'Bad Request.')
        }
        return userWithStatement
    }

    async findAll(): Promise<Array<UserInterface | []>> {

        return await prisma.user.findMany()
    }

}

export default new UserController()