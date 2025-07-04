// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({})

export const config = {
  matcher: [
    "/dashboard/:path*", // protect dashboard
    "/applications",     // protect applications
    "/jobs/:path*",      // protect all job pages
    "/companies/:path*",
    "/companies/create",  // protect all company pages
    "/companies/create-company",
  ],
};
