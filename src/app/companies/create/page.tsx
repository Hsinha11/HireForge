import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CreateCompanyForm from "@/components/company/CreateCompanyForm";
import Link from "next/link";
import Footer from "@/components/Footer";

export default async function CreateCompanyPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // const user = await currentUser();
  // const role = user?.unsafeMetadata?.role;

  // if (role !== "company") redirect("/");

  return (
    <>  
    <main className="max-w-3xl mx-auto py-10">
      <Link href="/" className="text-blue-500 underline text-lg mb-4 block hover:text-blue-600">Not a company? Go back to home page</Link>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Create Company Profile</h1>
      <CreateCompanyForm userId={userId} />
    </main>
    <Footer />
    </>
  );
}
