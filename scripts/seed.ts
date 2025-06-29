// scripts/seed-supabase.ts
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Make sure you have NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
    },
    {
      name: 'Stripe',
      slug: 'stripe',
      website: 'https://stripe.com',
      location: 'San Francisco, CA',
      employees: '1000-5000',
      tags: ['Fintech', 'Payments', 'APIs'],
      description: 'Online payment processing for internet businesses.',
    },
    {
      name: 'Figma',
      slug: 'figma',
      website: 'https://figma.com',
      location: 'Remote',
      employees: '500-1000',
      tags: ['Design', 'Collaboration', 'Software'],
      description: 'Collaborative interface design tool.',
    },
  ];

  console.log('🌱 Starting Supabase seeding...');

  // Insert companies
  for (const company of companies) {
    console.log(`Creating company: ${company.name}`);
    
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert(company)
      .select()
      .single();

    if (companyError) {
      console.error(`Error creating company ${company.name}:`, companyError);
      continue;
    }

    console.log(`✅ Created company: ${company.name} with ID: ${companyData.id}`);

    // Add jobs for each company
    const jobs = getJobsForCompany(company.slug);
    
    for (const job of jobs) {
      console.log(`Creating job: ${job.title} for ${company.name}`);
      
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .insert({
          ...job,
          company_id: companyData.id,
        })
        .select()
        .single();

      if (jobError) {
        console.error(`Error creating job ${job.title}:`, jobError);
      } else {
        console.log(`✅ Created job: ${job.title} with ID: ${jobData.id}`);
      }
    }
  }

  console.log('🎉 Seeding complete!');
}

function getJobsForCompany(companySlug: string) {
  const jobsByCompany: { [key: string]: any[] } = {
    openai: [
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
    stripe: [
      {
        title: 'Backend Engineer',
        type: 'Full-time',
        description: 'Design scalable backend systems for global payments.',
        location: 'Seattle, WA',
        salary: 160000,
      },
    ],
    figma: [
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
  };

  return jobsByCompany[companySlug] || [];
}

main()
  .then(() => {
    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });