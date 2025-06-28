/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// backend/server.ts
import Fastify from 'fastify'
import cors from '@fastify/cors'
import { companiesRoute, companyByIdRoute, companyDetailRoute} from './api/companies/route'
import { jobsRoute , jobDetailRoute ,jobCreateRoute } from './api/jobs/route'
import { applicationRoutes } from './api/applications/route'

const app = Fastify()

await app.register(cors, { origin: true })
await app.register(companiesRoute)
await app.register(companyByIdRoute)
await app.register(companyDetailRoute)
await app.register(jobsRoute)
await app.register(jobDetailRoute)
await app.register(jobCreateRoute)
await app.register(applicationRoutes)
// await app.register(companyJobsRoute)
app.listen({ port: 4000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`🚀 Backend ready at ${address}`)
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