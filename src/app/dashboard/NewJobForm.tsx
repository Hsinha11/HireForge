// "use client";

// import { useState } from "react";
// // import Navbar from "@/components/Navbar"

// export default function NewJobForm({ companyId }: { companyId: string }) {
//     const [form, setForm] = useState({
//         title: "",
//         type: "full-time",
//         location: "",
//         description: "",
//         salary: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [success, setSuccess] = useState(false);

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         const res = await fetch("http://localhost:4000/jobs", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 ...form,
//                 salary: parseInt(form.salary),
//                 companyId,
//             }),
//         });

//         if (res.ok) {
//             setSuccess(true);
//             setForm({
//                 title: "",
//                 type: "full-time",
//                 location: "",
//                 description: "",
//                 salary: "",
//             });
//         }

//         setLoading(false);
//     };

//     return ( 
//         <main className="p-10 max-w-4xl mx-auto mt-10 mb-10 bg-gray-100 rounded-lg">
//             <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
//                 Post Job
//             </h1>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <input
//                     name="title"
//                     value={form.title}
//                     onChange={handleChange}
//                     placeholder="Job Title"
//                     className="w-full p-2 pl-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder:text-gray-600"
//                     required
//                 />
//                 <input
//                     name="location"
//                     value={form.location}
//                     onChange={handleChange}
//                     placeholder="Location"
//                     className="w-full p-2 pl-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder:text-gray-600"
//                     required
//                 />
//                 <input
//                     name="salary"
//                     value={form.salary}
//                     onChange={handleChange}
//                     placeholder="Salary"
//                     type="number"
//                     className="w-full p-2 pl-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder:text-gray-600"
//                     required
//                 />
//                 <textarea
//                     name="description"
//                     value={form.description}
//                     onChange={handleChange}
//                     placeholder="Job Description"
//                     rows={4}
//                     className="w-full p-2 pl-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder:text-gray-600"
//                     required
//                 />
//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                     {loading ? "Posting..." : "Post Job"}
//                 </button>

//                 {success && <p className="text-green-600">✅ Job posted!</p>}
//             </form>
//         </main>
//     );
// }


"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function NewJobForm({ companyId }: { companyId: string }) {
    const [form, setForm] = useState({
        title: "",
        type: "full-time",
        location: "",
        description: "",
        salary: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('jobs')
                .insert({
                    title: form.title,
                    type: form.type,
                    location: form.location,
                    description: form.description,
                    salary: parseInt(form.salary),
                    company_id: companyId,
                })
                .select()
                .single();

            if (error) {
                console.error("Error creating job:", error);
                alert("Failed to create job");
            } else {
                setSuccess(true);
                setForm({
                    title: "",
                    type: "full-time",
                    location: "",
                    description: "",
                    salary: "",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create job");
        }

        setLoading(false);
    };

    return ( 
        <main className="p-10 max-w-4xl mx-auto mt-10 mb-10 bg-gray-100 rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
                Post Job
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="w-full p-2 pl-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder:text-gray-600"
                    required
                />
                <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Location"
                    className="w-full p-2 pl-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder:text-gray-600"
                    required
                />
                <input
                    name="salary"
                    value={form.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    type="number"
                    className="w-full p-2 pl-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder:text-gray-600"
                    required
                />
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Job Description"
                    rows={4}
                    className="w-full p-2 pl-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder:text-gray-600"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    {loading ? "Posting..." : "Post Job"}
                </button>

                {success && <p className="text-green-600">✅ Job posted!</p>}
            </form>
        </main>
    );
}