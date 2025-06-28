// backend/api/companies/route.ts
import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function companiesRoute(app: FastifyInstance) {
  app.get('/companies', async (_, reply) => {
    try {
      const companies = await prisma.company.findMany(
        {
          include: { jobs: true },
        }
      )
      reply.send(companies)
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch companies' ,err})
    }
  })
}

export async function companyByIdRoute(app: FastifyInstance) {
  app.get('/companies/id/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    try {
      const company = await prisma.company.findUnique({
        where: { id },
        include: { jobs: true },
      })
      if (!company) {
        return reply.status(404).send({ error: 'Company not found' })
      }
      reply.send(company)
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch company details' ,err})
    }
  })
}

export async function companyDetailRoute(app: FastifyInstance) {
  app.get('/companies/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string }
    try {
      const company = await prisma.company.findUnique({
        where: { slug },
        include: { jobs: true },
      })
      if (!company) {
        return reply.status(404).send({ error: 'Company not found' })
      }
      reply.send(company)
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch company details' ,err})
    }
  })
}