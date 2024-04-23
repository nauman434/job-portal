
import { NextResponse } from 'next/server';

const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=aB4CcvbRF3V08fdwOOPIyo9z7rnOCpSgNTrYyIIR_finj8IiNCbTP57F43H_tbtt53ytnr31RMebpd7qihrckCFrfYuITBORm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCZacyH8VWUFIguE0YP6rzf4KbghDEnOwU6XaDns7TB1H9adbaIKRvMZMKd9T3XTJtYBmpyG-UHKlMX0Xtby6zEUdazmcgtN5A&lib=Mkqw7b3y7buH77XAwtMhkAcwdutSGjkjP'

export async function GET(req: Request) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // //console.log(data)

            return NextResponse.json(data);
        } else {
            throw new Error(`HTTP error: ${response.status}`);
        }
    } catch (error) {
        console.error('[JOBS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}







// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   try {

//     const jobs = await db.job.findMany();

//     return NextResponse.json(jobs);
//   } catch (error) {
//     //console.log('[JOBS_GET]', error);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };

