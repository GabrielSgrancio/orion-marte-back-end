import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerConfig: swaggerJSDoc.OAS3Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Orion API',
      description: 'Documentação da API do projeto Orion.',
      version: '1.0.0'
    },
    host: 'localhost:4444',
    // Não obrigatório, serve apenas para definir a ordem das categorias
    tags: [],
    externalDocs: {
      description: 'View swagger.json',
      url: '../swagger.json'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          in: 'header',
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['src/controller/*.ts', 'controller/*.js']
};
