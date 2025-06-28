import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
          <div className="text-center mb-6 flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">Welcome Back</h1>
            <p className="text-blue-600">Sign in to your account to continue</p>
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
