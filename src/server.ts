import express from 'express';
import usersRouters from './users/routes/users.routes';
import operationsRoutes from "./operations/routes/transations.routes";
import swaggerUi from 'swagger-ui-express';
import jsonRefs from "json-refs";
import openapiDocument from './swagger/config.json'


const options = {
    swaggerOptions: {
        supportedSubmitMethods: [""],
        operationsSorter: "method",
    },
};


const PORT = 3001
const app = express()

app.use(
    express.json(),
    usersRouters,
    operationsRoutes,
);
jsonRefs
    .resolveRefs(openapiDocument, { location: "./docs/swagger/openapi.json" })
    .then((openapiObj) => {
        app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(openapiObj.resolved, options)
        );
    });

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

export default app