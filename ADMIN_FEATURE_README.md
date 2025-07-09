# Admin Job Posting Feature

This feature allows you and your friends to post external job listings with external application links, while keeping the existing company/user system intact.

## Features

- **Admin Dashboard**: Post external jobs with external application URLs
- **Job Management**: View, edit, and delete admin-posted jobs
- **Mixed Job Listings**: Display both company-posted and admin-posted jobs together
- **External Application**: Direct users to external job application pages
- **Admin Authentication**: Only authorized admins can access admin features

## Setup Instructions

### 1. Database Migration

Run the SQL migration in your Supabase SQL editor:

```sql
-- Copy and paste the contents of scripts/admin-migration.sql
```

### 2. Configure Admin Users

Edit `src/lib/adminAuth.ts` and add your email addresses:

```typescript
const ADMIN_EMAILS = [
  "your-email@example.com",    // Replace with your email
  "friend1@example.com",       // Replace with your friends' emails
  "friend2@example.com",
];
```

### 3. Install Dependencies

Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-tabs
```

## How to Use

### For Admins

1. **Access Admin Dashboard**: 
   - Sign in with an admin email
   - Click the "Admin" button in the navbar
   - Or navigate to `/admin`

2. **Post External Jobs**:
   - Fill out the job posting form
   - Include the external application URL
   - Submit to post the job

3. **Manage Jobs**:
   - View all admin-posted jobs
   - Delete jobs as needed
   - See job statistics

### For Users

1. **Browse Jobs**: 
   - All jobs (company and admin) appear in the main job listings
   - External jobs are marked with an "External" badge

2. **Apply to Jobs**:
   - **Company jobs**: Use the existing application system
   - **External jobs**: Click "Apply Externally" to go to the external application page

## Database Schema Changes

The jobs table now includes these new fields:

- `is_external`: Boolean flag for external jobs
- `external_url`: URL for external application
- `posted_by`: Either 'company' or 'admin'
- `admin_id`: Clerk user ID of the admin who posted
- `company_name`: Company name for admin-posted jobs

## API Endpoints

- `GET /api/admin/jobs` - Fetch admin jobs
- `POST /api/admin/jobs` - Create new admin job
- `DELETE /api/admin/jobs/[id]` - Delete admin job

## Security

- Only users with admin emails can access admin features
- Admin jobs are clearly marked as external
- Proper authentication and authorization checks

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx                 # Admin dashboard page
│   └── api/
│       └── admin/
│           └── jobs/
│               ├── route.ts          # GET/POST admin jobs
│               └── [id]/route.ts     # DELETE admin job
├── components/
│   ├── admin/
│   │   ├── AdminDashboard.tsx        # Main admin dashboard
│   │   ├── AdminJobPosting.tsx       # Job posting form
│   │   └── AdminJobList.tsx          # Job management list
│   ├── JobCard.tsx                   # Updated to handle external jobs
│   └── RoleButtons.tsx               # Updated with admin link
└── lib/
    └── adminAuth.ts                  # Admin authentication logic
```

## Testing

1. Add your email to the admin list
2. Sign in and navigate to `/admin`
3. Try posting an external job
4. Check that it appears in the main job listings
5. Test the external application link

## Future Enhancements

- Job editing functionality
- Admin analytics dashboard
- Bulk job import
- Job approval workflow
- Admin role management 