'use server';

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createJob = async (jobData) => {
    return serverMutation('/api/jobs', jobData);
}

export const refreshJobApplyPage = async(jobId) => {
    revalidatePath(`/jobs/${jobId}/apply`);
}

// const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:5000";

// export const createJob = async (jobData) => {
//     const res = await fetch(`${baseUrl}/api/jobs`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(jobData),
//     });

//     return res.json();
// }