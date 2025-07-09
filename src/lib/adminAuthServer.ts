import { currentUser } from "@clerk/nextjs/server";

// List of admin email addresses (same as client version)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(",").map(email => email.trim())
  : [];

// Server-side admin check for API routes and server components
export async function isAdminServer() {
  try {
    const user = await currentUser();
    if (!user) return false;
    
    const userEmail = user.emailAddresses[0]?.emailAddress;
    if (!userEmail) return false;
    
    return ADMIN_EMAILS.includes(userEmail);
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

export function getAdminEmailsServer() {
  return ADMIN_EMAILS;
} 