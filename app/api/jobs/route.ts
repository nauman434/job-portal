import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {

    const jobs = await db.job.findMany();

    return NextResponse.json(jobs);
  } catch (error) {
    console.log('[JOBS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

