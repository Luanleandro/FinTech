import express from 'express';
import { router } from '@shared/infra/http/api/v1';

const swaggerJSdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 5454;
app.use(express.json());

app.use('/v1', router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

const swaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'FinTech',
    version: '1.0.0',
  },
};

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(
    swaggerJSdoc({
      swaggerDefinition,
      apis: ['./src/modules/*/infra/http/routes/*.js'],
    }),
  ),
);
