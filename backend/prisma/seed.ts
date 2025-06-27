import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const companies = [
    {
      name: 'OpenAI',
      slug: 'openai',
      website: 'https://openai.com',
      location: 'San Francisco, CA',
      employees: '500-1000',
      tags: ['AI', 'Research', 'Technology'],
      description: 'Artificial intelligence research and deployment company.',
      jobs: {
        create: [
          {
            title: 'Machine Learning Engineer',
            type: 'Full-time',
            description: 'Work on state-of-the-art AI models.',
            location: 'Remote',
            salary: 180000,
          },
          {
            title: 'Product Manager',
            type: 'Full-time',
            description: 'Lead cross-functional teams building AI-powered products.',
            location: 'San Francisco, CA',
            salary: 150000,
          },
        ],
      },
    },
    {
      name: 'Stripe',
      slug: 'stripe',
      website: 'https://stripe.com',
      location: 'San Francisco, CA',
      employees: '1000-5000',
      tags: ['Fintech', 'Payments', 'APIs'],
      description: 'Online payment processing for internet businesses.',
      jobs: {
        create: [
          {
            title: 'Backend Engineer',
            type: 'Full-time',
            description: 'Design scalable backend systems for global payments.',
            location: 'Seattle, WA',
            salary: 160000,
          },
        ],
      },
    },
    {
      name: 'Figma',
      slug: 'figma',
      website: 'https://figma.com',
      location: 'Remote',
      employees: '500-1000',
      tags: ['Design', 'Collaboration', 'Software'],
      description: 'Collaborative interface design tool.',
      jobs: {
        create: [
          {
            title: 'Frontend Developer',
            type: 'Full-time',
            description: 'Build performant UI components in a real-time collaboration environment.',
            location: 'Remote',
            salary: 140000,
          },
          {
            title: 'UX Designer',
            type: 'Contract',
            description: 'Craft beautiful and intuitive user experiences.',
            location: 'New York, NY',
            salary: 120000,
          },
        ],
      },
    },
  ];

  for (const company of companies) {
    await prisma.company.create({
      data: company,
    });
  }
}

main()

  .then(() => {
    console.log('Seeding complete! Companies and jobs created successfully.');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
