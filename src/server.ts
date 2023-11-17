import express from 'express';
import usersRouter from './users/users.routes';
import transactionsRoutes from "./transactions/transations.routes";

const PORT = 3000
const app = express()

app.use(
    express.json(),
    usersRouter,
    transactionsRoutes
);



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

export default app