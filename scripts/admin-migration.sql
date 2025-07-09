-- Migration script to add admin job support
-- Run this in your Supabase SQL editor

-- Add new columns to jobs table
ALTER TABLE jobs 
ADD COLUMN IF NOT EXISTS is_external BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS external_url TEXT,
ADD COLUMN IF NOT EXISTS posted_by TEXT DEFAULT 'company',
ADD COLUMN IF NOT EXISTS admin_id TEXT,
ADD COLUMN IF NOT EXISTS company_name TEXT;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_jobs_posted_by ON jobs(posted_by);
CREATE INDEX IF NOT EXISTS idx_jobs_is_external ON jobs(is_external);

-- Add comment for documentation
COMMENT ON COLUMN jobs.is_external IS 'Whether this job is an external job posted by admin';
COMMENT ON COLUMN jobs.external_url IS 'External URL for admin-posted jobs';
COMMENT ON COLUMN jobs.posted_by IS 'Who posted this job: company or admin';
COMMENT ON COLUMN jobs.admin_id IS 'Clerk user ID of the admin who posted this job';
COMMENT ON COLUMN jobs.company_name IS 'Company name for admin-posted jobs (not linked to companies table)'; 