// List of admin email addresses
const ADMIN_EMAILS = [
  "couchpotato6909@gmail.com", // Replace with your email
];

// Client-side admin check
export function isAdminClient(userEmail?: string) {
  if (!userEmail) return false;
  return ADMIN_EMAILS.includes(userEmail);
}

export function getAdminEmails() {
  return ADMIN_EMAILS;
}

export function addAdminEmail(email: string) {
  if (!ADMIN_EMAILS.includes(email)) {
    ADMIN_EMAILS.push(email);
  }
} 