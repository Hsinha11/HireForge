"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, ExternalLink, Building, Users } from "lucide-react";
import AdminJobPosting from "@/components/admin/AdminJobPosting";
import AdminJobList from "@/components/admin/AdminJobList";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("post-job");
  const [adminJobCount, setAdminJobCount] = useState<number>(0);

  useEffect(() => {
    async function fetchAdminJobCount() {
      try {
        const res = await fetch("/api/admin/jobs");
        if (res.ok) {
          const jobs = await res.json();
          setAdminJobCount(jobs.length);
        }
      } catch {
        setAdminJobCount(0);
      }
    }
    fetchAdminJobCount();
  }, []);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="post-job" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Post Job
          </TabsTrigger>
          <TabsTrigger value="manage-jobs" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Manage Jobs
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="post-job" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Post External Job</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminJobPosting />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage-jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Manage Admin Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <AdminJobList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Admin Jobs</CardTitle>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminJobCount}</div>
                <p className="text-xs text-muted-foreground">
                  External job postings
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Registered companies
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Job applications
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 