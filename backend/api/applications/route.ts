import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function applicationRoutes(app: FastifyInstance) {
  app.post('/applications', async (request, reply) => {
    const { name, email, message, jobId } = request.body as {
      name: string
      email: string
      message: string
      jobId: string
    }

    try {
      const appData = await prisma.application.create({
        data: { name, email, message, jobId },
      })
      reply.status(201).send(appData)
    } catch (err) {
      console.error(err)
      reply.status(500).send({ error: 'Failed to apply' })
    }
  })

  app.get('/applications', async (_, reply) => {
    try {
      const apps = await prisma.application.findMany({
        include: { job: { include: { company: true } } },
        orderBy: { createdAt: 'desc' },
      })
      reply.send(apps)
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch applications',err })
    }
  })
}
