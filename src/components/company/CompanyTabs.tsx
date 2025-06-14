"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { allJobs } from "@/mock/jobs";
import JobCard from "../JobCard";

type Props = {
    companyName: string;
    description: string;
};

export default function CompanyTabs({ companyName, description }: Props) {
    const [activeTab, setActiveTab] = useState("Overview");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("all");

    const filteredJobs = allJobs.filter(
        (job) =>
            job.title.toLowerCase().includes(title.toLowerCase()) &&
            (type != "all"
                ? job.type.toLowerCase() === type.toLowerCase()
                : true) && (job.company === companyName)

    );

    return (
        <div className="w-full">
            {/* Tabs */}
            <div className="flex border-b mb-4">
                {["Overview", "Jobs"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-sm font-medium border-b-2 ${
                            activeTab === tab
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === "Overview" && (
                <div className="space-y-4 text-gray-700 leading-relaxed">

                    <h2 className="text-xl font-semibold">{companyName}</h2>
                    <p>{description}</p>
                </div>
            )}

            {activeTab === "Jobs" && (
                <>
                    <div className="flex gap-4">
                        <Input
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-white pl-3 p-3 text-black placeholder-black border-none focus:outline-none focus:ring-0 focus:border-none shadow-[0_2px_10px] shadow-black/10"
                        />

                        <Select onValueChange={(val) => setType(val)}>
                            <SelectTrigger className="w-40 bg-white text-black border-none focus:outline-none focus:ring-0 shadow-[0_2px_10px] shadow-black/10">
                                <SelectValue placeholder="Filter by type" />
                            </SelectTrigger>
                            <SelectContent className="bg-white text-black border border-black">
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="full-time">
                                    Full-Time
                                </SelectItem>
                                <SelectItem value="part-time">
                                    Part-Time
                                </SelectItem>
                                <SelectItem value="internship">
                                    Internship
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4">
                        {filteredJobs.map((job, idx) => (
                            <JobCard key={idx} {...job} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
