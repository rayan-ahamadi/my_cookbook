const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Documentation de l’API Express avec Swagger',
    },
    servers: [
      {
        url: 'http://localhost:5000/api', // Adapter selon ton environnement
        description: 'Serveur local',
            },
          ],
        },
        apis: ['./src/entities/**/*.routes.js', './src/entities/**/*.protected.routes.js']
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
