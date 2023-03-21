import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const apiPath = path.join(__dirname, '..', 'routes', '*.js')
const apiAdmin = path.join(__dirname, '..', 'routes', 'admin', '*.js')

export const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API Documentation',
      description: 'API from tuPedido.ar',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'https://backend-express-production.up.railway.app'
      },
      {
        url: 'http://localhost:3001'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        accountLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  apis: [apiPath, apiAdmin]
}
