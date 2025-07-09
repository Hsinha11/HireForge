// backend/api/companies/route.ts
import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET METHODS
// get all companies
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

// get company by slug
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

// get company applications by slug
export async function companyApplicationsRoute(app: FastifyInstance) {
  app.get('/companies/:slug/applications', async (request, reply) => {
  const { slug } = request.params as { slug: string }

  try {
    const company = await prisma.company.findUnique({
      where: { slug },
      include: {
        jobs: {
          include: {
            applications: true,
          },
        },
      },
    })

    if (!company) return reply.status(404).send({ error: 'Company not found' })

    // Flatten applications with job title
    const applications = company.jobs.flatMap((job) =>
      job.applications.map((app) => ({
        id: app.id,
        jobTitle: job.title,
        name: app.name,
        email: app.email,
        message: app.message,
        createdAt: app.createdAt,
      }))
    )

    reply.send(applications)
  } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch applications', err })
    }
  })
}

// POST METHODS
// create company route
export async function companyCreateRoute(app: FastifyInstance) {
  app.post('/companies', async (request, reply) => {
    const body = request.body as {
      name: string
      slug: string
      website: string
      location: string
      employees: string
      tags: string[]
      description: string
      userId?: string
    }

    // Input validation
    if (!body.name || !body.slug || !body.website || !body.location || !body.employees || !body.description) {
      return reply.status(400).send({ error: 'All required fields must be provided' })
    }

    // Validate slug format (alphanumeric and hyphens only)
    const slugRegex = /^[a-z0-9-]+$/
    if (!slugRegex.test(body.slug)) {
      return reply.status(400).send({ error: 'Slug must contain only lowercase letters, numbers, and hyphens' })
    }

    // Validate website URL
    try {
      new URL(body.website.startsWith('http') ? body.website : `https://${body.website}`)
    } catch {
      return reply.status(400).send({ error: 'Invalid website URL' })
    }

    // Sanitize inputs
    const sanitizedData = {
      name: body.name.trim().slice(0, 100), // Limit length
      slug: body.slug.trim().toLowerCase(),
      website: body.website.trim(),
      location: body.location.trim().slice(0, 100),
      employees: body.employees.trim().slice(0, 50),
      tags: Array.isArray(body.tags) ? body.tags.slice(0, 10).map(tag => tag.trim().slice(0, 30)) : [], // Limit tags
      description: body.description.trim().slice(0, 1000), // Limit description
    }

    try {
      // Check if company with this slug already exists
      const existingCompany = await prisma.company.findUnique({
        where: { slug: sanitizedData.slug }
      })

      if (existingCompany) {
        return reply.status(400).send({ error: 'Company with this slug already exists' })
      }

      const company = await prisma.company.create({
        data: sanitizedData,
      })

      reply.status(201).send(company)
    } catch (err) {
      console.error('Error creating company:', err)
      reply.status(500).send({ error: 'Failed to create company' })
    }
  })
}

export async function companyDeleteRoute(app: FastifyInstance) {
  app.delete('/companies/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    try {
      const deletedCompany = await prisma.company.delete({ where: { slug } });
      reply.send(deletedCompany);
    } catch (err) {
      reply.status(500).send({ error: 'Failed to delete company', err });
    }
  });
}

export async function companyEditRoute(app: FastifyInstance) {
  app.put('/companies/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const body = request.body as Partial<{
      name: string;
      website: string;
      location: string;
      employees: string;
      tags: string[];
      description: string;
    }>;
    try {
      const updatedCompany = await prisma.company.update({
        where: { slug },
        data: body,
      });
      reply.send(updatedCompany);
    } catch (err) {
      reply.status(500).send({ error: 'Failed to update company', err });
    }
  });
}