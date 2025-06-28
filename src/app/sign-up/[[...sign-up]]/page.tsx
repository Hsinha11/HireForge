import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Join HireForge</h1>
            <p className="text-gray-600">Create your account to get started</p>
          </div>
          <SignUp />
        </div>
      </div>
    </div>
  );
}