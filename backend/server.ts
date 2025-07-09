/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// backend/server.ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { companiesRoute, companyDetailRoute, companyApplicationsRoute, companyCreateRoute , companyDeleteRoute, companyEditRoute} from './api/companies/route'
import { jobsRoute, jobDetailRoute, jobCreateRoute , jobDeleteRoute, jobEditRoute} from './api/jobs/route'
import { applicationRoutes } from './api/applications/route'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = Fastify({
  logger: {
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
  }
})

// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'http://localhost:3000'] 
    : true,
  credentials: true
}

await app.register(cors, corsOptions)

// Register all routes
await app.register(companiesRoute)
await app.register(companyDetailRoute)
await app.register(companyApplicationsRoute)
await app.register(companyCreateRoute)
await app.register(companyDeleteRoute)
await app.register(companyEditRoute)
await app.register(jobsRoute)
await app.register(jobDetailRoute)
await app.register(jobCreateRoute)
await app.register(applicationRoutes)
await app.register(jobDeleteRoute)
await app.register(jobEditRoute)

// Global error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error)
  
  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production') {
    reply.status(500).send({ error: 'Internal server error' })
  } else {
    reply.status(500).send({ error: error.message })
  }
})

const port = parseInt(process.env.PORT || '4000')
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'

app.listen({ port, host }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`🚀 Backend ready at ${address}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

app.addHook('onRequest', async (request, reply) => {
  // Record start time at beginning of the request
  (request as any).startTime = process.hrtime()
})

app.addHook('onResponse', async (request, reply) => {
  const [seconds, nanoseconds] = process.hrtime((request as any).startTime)
  const durationInMs = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2)
  
  console.log(`⏱️  ${request.method} ${request.url} - ${durationInMs} ms`)
})

// This code sets up a Fastify server with CORS enabled and registers routes for companies and jobs.
// It listens on port 4000 and logs the server address when ready.