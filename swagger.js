const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course API',
      description: 'CRUD API for Course',
      version: '1.0.0',
      contact: {
        name: 'Linh',
        url: 'https://github.com/linhtruongg',
        email: 'nhoxfuu8@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3636',
        description: 'Local Server',
      },
    ]
  },
  // looks for configuration in specified directories
  apis: ['./controllers/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

module.exports = swaggerDocs