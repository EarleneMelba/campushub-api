const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 8081;

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'CampusHub API',
    version: '1.0.0',
    description:
      'API documentation for CampusHub backend services, including authentication, role-based access control (RBAC), and user management.\n\n### How to Test Protected Routes:\n1. Use **POST /api/auth/login** (or create a user with **POST /api/auth/signup**) to obtain a JWT token.\n2. Click the **Authorize 🔓** button at the top right of this page.\n3. Paste your JWT token into the `Value` field (Swagger UI automatically adds the `Bearer ` prefix) and click **Authorize**.\n4. You can now execute protected endpoints like **GET /api/auth/me** and **GET /api/auth/super-admin-only**.\n5. To test RBAC (403 Forbidden vs 200 OK), try logging in with a regular user account vs a super admin account (seeded via `seed.js`).',
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token obtained from POST /api/auth/login (without "Bearer " prefix).',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'c2e8a1d5-7834-4b51-9e76-0bf8426f8d19',
          },
          first_name: {
            type: 'string',
            example: 'John',
          },
          last_name: {
            type: 'string',
            example: 'Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john.doe@example.com',
          },
          role: {
            type: 'string',
            enum: ['user', 'admin', 'super_admin'],
            example: 'user',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-10-24T12:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-10-24T12:00:00.000Z',
          },
        },
      },
      TokenUserPayload: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'c2e8a1d5-7834-4b51-9e76-0bf8426f8d19',
          },
          role: {
            type: 'string',
            enum: ['user', 'admin', 'super_admin'],
            example: 'super_admin',
          },
          iat: {
            type: 'integer',
            description: 'Issued at timestamp',
            example: 1729760000,
          },
          exp: {
            type: 'integer',
            description: 'Expiration timestamp',
            example: 1729846400,
          },
        },
      },
      SignupInput: {
        type: 'object',
        required: ['first_name', 'last_name', 'email', 'password'],
        properties: {
          first_name: {
            type: 'string',
            example: 'John',
          },
          last_name: {
            type: 'string',
            example: 'Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'john.doe@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'Password@123',
          },
        },
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'john.doe@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'Password@123',
          },
        },
      },
      LoginSuccessResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Login Successful',
          },
          token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMyZThhMWQ1LTc4MzQtNGI1MS05ZTc2LTBiZjg0MjZmOGQxOSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI5NzYwMDAwLCJleHAiOjE3Mjk4NDY0MDB9.signature...',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Invalid credentials',
          },
        },
      },
      Institution: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '8a9f3b12-4c5d-6e7f-8a9b-0c1d2e3f4a5b',
          },
          name: {
            type: 'string',
            example: 'National Institute of Technology',
          },
          code: {
            type: 'string',
            example: 'NIT001',
          },
          address: {
            type: 'string',
            example: '123 Campus Avenue, Education City',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-10-19T10:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-10-19T10:00:00.000Z',
          },
        },
      },
      Branch: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: '4e5f6a7b-8c9d-0e1f-2a3b-4c5d6e7f8a9b',
          },
          name: {
            type: 'string',
            example: 'Main Campus',
          },
          code: {
            type: 'string',
            example: 'MC-01',
          },
          address: {
            type: 'string',
            example: 'North Wing, Building A',
          },
          institution_id: {
            type: 'string',
            format: 'uuid',
            example: '8a9f3b12-4c5d-6e7f-8a9b-0c1d2e3f4a5b',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-10-19T10:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2026-10-19T10:00:00.000Z',
          },
        },
      },
    },
  },
  paths: {
    '/api/auth/signup': {
      post: {
        summary: 'Register a new user',
        description: 'Creates a new user account with default role `user` and returns the newly created user record.',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/SignupInput',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'User registered successfully',
                    },
                    user: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
          400: {
            description: 'Bad request (missing fields or duplicate email)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                examples: {
                  missingFields: {
                    summary: 'Missing required fields',
                    value: {
                      message: 'All fields are required',
                    },
                  },
                  emailExists: {
                    summary: 'Email already registered',
                    value: {
                      message: 'Email already registered',
                    },
                  },
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  message: 'Something went wrong',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        summary: 'User login',
        description: 'Authenticates a user with email and password and returns a signed JWT token.',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginInput',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful, JWT token returned',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/LoginSuccessResponse',
                },
              },
            },
          },
          400: {
            description: 'Missing email or password',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  message: 'Email and password are required',
                },
              },
            },
          },
          401: {
            description: 'Invalid credentials (user not found or password incorrect)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  message: 'Invalid credentials',
                },
              },
            },
          },
          500: {
            description: 'Internal server error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  message: 'Something went wrong',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/me': {
      get: {
        summary: 'Get current user session (Protected)',
        description: 'Tests authentication middleware (`authMiddleware`). Accessible by **any authenticated user** (`user`, `admin`, `super_admin`). Returns the decoded JWT payload stored in `req.user`.',
        tags: ['Auth'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'User is authenticated',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'You are authenticated',
                    },
                    user: {
                      $ref: '#/components/schemas/TokenUserPayload',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized (missing, invalid, or expired Bearer token)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                examples: {
                  noToken: {
                    summary: 'No token provided',
                    value: {
                      message: 'unauthorized: no token provided',
                    },
                  },
                  invalidToken: {
                    summary: 'Invalid or expired token',
                    value: {
                      message: 'Invalid or expired token',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/super-admin-only': {
      get: {
        summary: 'Super Admin only access (RBAC Protected)',
        description: 'Tests role-based access control (`requireRole("super_admin")`) alongside `authMiddleware`. Only users with the `super_admin` role can access this endpoint.\n\n**Test scenarios:**\n- **No token or invalid token** -> `401 Unauthorized`\n- **Token with role "user" or "admin"** -> `403 Forbidden`\n- **Token with role "super_admin"** -> `200 OK`',
        tags: ['Auth'],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: 'Authorized - User is a super admin',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Welcome, super admin',
                    },
                    user: {
                      $ref: '#/components/schemas/TokenUserPayload',
                    },
                  },
                },
              },
            },
          },
          401: {
            description: 'Unauthorized (no token provided or invalid/expired token)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                examples: {
                  noToken: {
                    summary: 'No token provided',
                    value: {
                      message: 'unauthorized: no token provided',
                    },
                  },
                  invalidToken: {
                    summary: 'Invalid or expired token',
                    value: {
                      message: 'Invalid or expired token',
                    },
                  },
                },
              },
            },
          },
          403: {
            description: 'Forbidden (insufficient permissions / user is not super_admin)',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
                example: {
                  message: 'Forbidden: insufficient permissions',
                },
              },
            },
          },
        },
      },
    },
  },
};

const routesPath = path.join(__dirname, '../routes/*.js').replace(/\\/g, '/');

const options = {
  swaggerDefinition,
  apis: [routesPath],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions = {
  swaggerOptions: {
    persistAuthorization: true,
  },
};

module.exports = {
  swaggerUi,
  swaggerSpec,
  swaggerUiOptions,
};
