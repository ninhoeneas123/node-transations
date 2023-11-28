import prisma from '../prisma/prisma';
import UserController from '../users/user.controller'
import UserWithStatement from '../users/interfaces/user-statement.interface';
import { Exception } from '../utils/exceptions';

export class OperationsController {

    async deposit(to: number, value: number): Promise<object> {
        if (!to || !value) {
            throw new Exception("Please provide from, to and amount.", 400, 'Bad Request.');
        }

        const toUser = await UserController.findOne(to)

        if (!toUser) {
            throw new Exception('Target user not found', 400, 'Bad Request.')

        }

        const userId: number = toUser.id

        await prisma.$transaction(async (trx) => {

            await trx.deposit.create({
                data: {
                    user: userId,
                    value
                }
            })

            await trx.user.update({
                where: { id: toUser.id },
                data: {
                    balance: toUser.balance + value
                }
            })

        })

        return { status: "Success", message: "Deposit made successfully." }

    }

    private async validateValue(sourceId: number, value: number): Promise<undefined> {
        if (value <= 0) {
            throw new Exception('The transaction amount cannot be less than or equal to zero', 400, 'Bad Request.')
        }
        const sourceUser = await prisma.user.findUnique({
            where: {
                id: sourceId,
            },
        });
        if (!sourceUser) {
            throw new Exception('Source user not found.')
        }
        const sourceUserBalance = sourceUser.balance

        if (sourceUserBalance < value) {
            throw new Exception('insufficient funds')
        }
    }

    async transfer(senderUserId: number, receiverUserId: number, value: number): Promise<object> {

        if (!senderUserId || !receiverUserId) {
            throw new Exception('Please enter the source user and destination user Source user not found.', 400, 'Bad Request.')
        }

        const senderUser = await UserController.findOne(senderUserId);

        await this.validateValue(senderUserId, value)

        const receiveUser = await UserController.findOne(receiverUserId);
        if (!senderUser || !receiveUser) {
            throw new Exception('Sender user or received user is not found.', 400, 'Bad Request.')
        }

        let newSenderBalance = senderUser.balance - value;
        let newDestinationBalance = receiveUser.balance + value;

        await prisma.$transaction(async (trx) => {

            await trx.transfer.create({
                data: {
                    senderUserId,
                    receiverUserId,
                    value,
                },
            });

            await trx.user.update({
                where: { id: senderUserId },
                data: { balance: newSenderBalance },
            })

            await trx.user.update({
                where: { id: receiverUserId },
                data: { balance: newDestinationBalance },
            })
        })

        return { status: "Success", message: "Transfer successful." }
    }

    async statement(userId: number): Promise<UserWithStatement | null> {

        return await UserController.findOneWithStatement(userId)

    }
}
