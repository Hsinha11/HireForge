// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({})

export const config = {
  matcher: [
    "/dashboard/:path*", // protect dashboard
    "/applications",     // protect applications
    "/jobs/:id*",        // protect only job details pages, not the listing
    "/companies/:path*",
    "/companies/create",  // protect all company pages
    "/companies/create-company",
    "/admin",            // protect admin pages
    "/api/:path*",       // protect all API routes
  ],
};
