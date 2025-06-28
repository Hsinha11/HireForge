# Authentication Protection Guide

This guide shows you how to protect pages and components in your Next.js job board application using Clerk authentication.

## 🔒 Methods for Page Protection

### Method 1: Server-Side Protection (Recommended for Pages)

Use this for pages that should redirect unauthenticated users to the sign-in page.

```typescript
// src/app/dashboard/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  return (
    <div>
      <h1>Welcome, {user?.firstName}!</h1>
      {/* Protected content */}
    </div>
  );
}
```

**When to use:** Pages that should be completely inaccessible to unauthenticated users.

### Method 2: Client-Side Conditional Rendering

Use this for components that show different content based on authentication state.

```typescript
// src/components/ProtectedComponent.tsx
'use client'

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

export default function ProtectedComponent() {
  const { user } = useUser();

  return (
    <div>
      <SignedIn>
        <div>Welcome back, {user?.firstName}!</div>
        {/* Protected content */}
      </SignedIn>
      
      <SignedOut>
        <div>Please sign in to access this content.</div>
        {/* Sign-in prompts */}
      </SignedOut>
    </div>
  );
}
```

**When to use:** Components that should show different UI based on auth state.

### Method 3: Higher-Order Component

Use this for reusable protection logic.

```typescript
// src/components/ProtectedRoute.tsx
'use client'

import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function ProtectedRoute({ children, fallback }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>{fallback}</SignedOut>
    </>
  );
}

// Usage:
<ProtectedRoute fallback={<SignInPrompt />}>
  <ProtectedContent />
</ProtectedRoute>
```

**When to use:** When you want reusable protection logic across multiple components.

## 🛡️ Middleware Protection

Your middleware is already configured to protect certain routes:

```typescript
// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({})

export const config = {
  matcher: [
    "/dashboard/:path*", // protect dashboard
    "/applications",     // protect applications
  ],
};
```

## 📁 Protected Pages in Your App

### 1. Dashboard (`/dashboard`)
- **Protection:** Server-side with redirect
- **Access:** Only authenticated users
- **Features:** User profile, personalized content

### 2. Applications (`/applications`)
- **Protection:** Server-side with redirect
- **Access:** Only authenticated users
- **Features:** View job applications

### 3. Home Page Protected Section
- **Protection:** Client-side conditional rendering
- **Access:** Different content for signed-in vs signed-out users
- **Features:** Personalized welcome message, quick actions

## 🔧 Clerk Components Used

### Server-Side
- `auth()` - Get current user session
- `currentUser()` - Get detailed user information
- `redirect()` - Redirect unauthenticated users

### Client-Side
- `<SignedIn>` - Render content only when authenticated
- `<SignedOut>` - Render content only when not authenticated
- `useUser()` - Hook to access user data
- `<UserButton>` - User profile dropdown

## 🎯 Best Practices

1. **Use server-side protection for pages** that should be completely inaccessible
2. **Use client-side protection for components** that should show different UI
3. **Always provide fallback content** for unauthenticated users
4. **Use TypeScript interfaces** for better type safety
5. **Handle loading states** appropriately

## 🚀 Example Usage

### Protecting a Job Application Form

```typescript
// src/app/jobs/[id]/apply/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ApplyPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div>
      <h1>Apply for Job</h1>
      <ApplicationForm jobId={params.id} />
    </div>
  );
}
```

### Conditional Navigation

```typescript
// In your navbar or navigation component
<SignedIn>
  <Link href="/dashboard">Dashboard</Link>
  <Link href="/applications">Applications</Link>
</SignedIn>

<SignedOut>
  <Link href="/sign-in">Sign In</Link>
  <Link href="/sign-up">Sign Up</Link>
</SignedOut>
```

## 🔍 Testing Authentication

1. **Test signed-out state:** Open incognito window
2. **Test signed-in state:** Sign in and verify protected content appears
3. **Test redirects:** Try accessing protected pages while signed out
4. **Test user data:** Verify user information displays correctly

## 📝 Next Steps

1. Add more protected routes as needed
2. Implement role-based access control if required
3. Add loading states for better UX
4. Consider adding email verification requirements
5. Implement user profile management pages 