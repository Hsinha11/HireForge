import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { isAdminServer } from "@/lib/adminAuthServer";
import { supabase } from "@/lib/supabase";

// GET - Fetch admin jobs
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminStatus = await isAdminServer();
    if (!adminStatus) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('posted_by', 'admin')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching admin jobs:", error);
      return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }

    return NextResponse.json(jobs || []);
  } catch (error) {
    console.error("Error in GET /api/admin/jobs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST - Create new admin job
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminStatus = await isAdminServer();
    if (!adminStatus) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      company,
      location,
      type,
      salary,
      description,
      externalUrl,
    } = body;

    // Validate required fields
    if (!title || !company || !location || !type || !salary || !description || !externalUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: job, error } = await supabase
      .from('jobs')
      .insert({
        title,
        company_name: company, // Store company name directly for admin jobs
        location,
        type,
        salary,
        description,
        external_url: externalUrl,
        is_external: true,
        posted_by: 'admin',
        admin_id: userId,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating admin job:", error);
      return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
    }

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/admin/jobs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 