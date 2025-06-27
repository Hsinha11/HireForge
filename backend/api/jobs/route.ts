// backend/api/jobs/route.ts
import { FastifyInstance } from 'fastify'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function jobsRoute(app: FastifyInstance) {
  app.get('/jobs', async (request, reply) => {
    const { type, title, location } = request.query as {
      type?: string;
      title?: string;
      location?: string;
    };
  
    try {
      const jobs = await prisma.job.findMany({
        where: {
          ...(type ? { type: { equals: type, mode: 'insensitive' } } : {}),
          ...(title ? { title: { contains: title, mode: 'insensitive' } } : {}),
          ...(location ? { location: { contains: location, mode: 'insensitive' } } : {}),
        },
        include: { company: true },
      });
  
      reply.send(jobs);
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch jobs', err });
    }
  });
  
}

export async function jobDetailRoute(app: FastifyInstance) {
  app.get('/jobs/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    try {
      const job = await prisma.job.findUnique({
        where: { id },
        include: {company:true}
      })
      if (!job) {
        return reply.status(404).send({ error: 'Job not found' })
      }
      reply.send(job)
    } catch (err) {
      reply.status(500).send({ error: 'Failed to fetch job details' ,err})
    }
  })
}


export async function jobCreateRoute(app: FastifyInstance){
  app.post('/jobs', async (request, reply) => {
  const body = request.body as {
    title: string;
    type: string;
    location: string;
    description: string;              // Rename to 'description' or map it
    tag: string[];          // Optional if removed from schema
    salary: number;
    companyId: string;
  };

  try {
    const newJob = await prisma.job.create({
      data: {
        title: body.title,
        type: body.type,
        location: body.location,
        description: body.description, // ✅ Map 'jd' to schema's 'description'
        salary: body.salary,
        companyId: body.companyId,
      },
    });

    return reply.status(201).send(newJob);
  } catch (err) {
    console.error("Error creating job:", err);
    return reply.status(500).send({ error: "Failed to create job", err });
  }
});

}