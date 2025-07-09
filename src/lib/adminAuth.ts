import { currentUser } from "@clerk/nextjs/server";

// List of admin email addresses
const ADMIN_EMAILS = [
  "your-email@example.com", // Replace with your email
  "friend1@example.com",    // Replace with your friends' emails
  "friend2@example.com",
];

export async function isAdmin() {
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

export function getAdminEmails() {
  return ADMIN_EMAILS;
}

export function addAdminEmail(email: string) {
  if (!ADMIN_EMAILS.includes(email)) {
    ADMIN_EMAILS.push(email);
  }
} 