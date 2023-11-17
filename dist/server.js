"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const PORT = 3000;
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.send({
        status: "OLÁ POW",
        allUsers
    });
});
app.post('post', async (req, res) => {
    const user = await prisma.user.create({
        data: {
            "name": "Andre",
            "email": "andre@gmail.com"
        }
    });
    res.send({
        status: "created",
        body: user
    });
});
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map