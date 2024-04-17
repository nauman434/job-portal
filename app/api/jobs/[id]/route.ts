import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}:{params: {id: string}}) {
  try {

    const jobs = await db.job.findUnique({
        where:{
            id: params.id
        }
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.log('[JOBS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
