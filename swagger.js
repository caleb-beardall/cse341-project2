const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'CSE 341 | Project 2',
        description: 'Customers and Products API'
    },
    host: 'localhost:3000',
    schemes: [ 'http', 'https' ]
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);