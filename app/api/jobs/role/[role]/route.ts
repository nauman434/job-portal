import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {role: string}}) {
  try {
    const decodedRole = decodeURIComponent(params.role.trim());
    console.log(`Decoded Role: '${decodedRole}'`);  // Ensure it matches expected format

    const jobs = await db.job.findMany({
      where: {
        Type: {
          equals: decodedRole  
        }
      }
    });

    if (jobs.length === 0) {
      return new NextResponse("Job not found", { status: 404 });
    }

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('[JOBS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
