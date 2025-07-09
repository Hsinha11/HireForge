"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminJobPosting() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    externalUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          salary: parseInt(formData.salary) || 0,
          isExternal: true,
          postedBy: "admin",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          title: "",
          company: "",
          location: "",
          type: "",
          salary: "",
          description: "",
          externalUrl: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-blue-600">
        <ExternalLink className="w-5 h-5" />
        <span className="font-medium">Post External Job</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Company *</label>
            <Input
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="e.g., Google, Microsoft"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location *</label>
            <Input
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., San Francisco, CA"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Job Type *</label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-Time</SelectItem>
                <SelectItem value="part-time">Part-Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Salary (INR) *</label>
            <Input
              type="number"
              value={formData.salary}
              onChange={(e) => handleInputChange("salary", e.target.value)}
              placeholder="e.g., 120000"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">External URL *</label>
            <Input
              type="url"
              value={formData.externalUrl}
              onChange={(e) => handleInputChange("externalUrl", e.target.value)}
              placeholder="https://company.com/careers/job-id"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Job Description *</label>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Enter detailed job description..."
            rows={6}
            required
          />
        </div>

        {submitStatus === "success" && (
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-md">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Job posted successfully!</span>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">Error posting job. Please try again.</span>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? "Posting..." : "Post External Job"}
        </Button>
      </form>
    </div>
  );
} 