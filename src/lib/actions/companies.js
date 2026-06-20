'use server';

import { revalidatePath } from "next/cache";
import { serverMutation } from "../core/server";

export const createCompany = async (companyData) => {
    return serverMutation('/api/companies', companyData);
}

export const updateCompany = async (id, data) => {
    revalidatePath("/dashboard/admin/companies");
    return serverMutation(`/api/companies/${id}`, data, 'PATCH');
}

// const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:5000";
// export const createCompany = async (companyData) => {

//     const res = await fetch(`${baseUrl}/api/companies`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(companyData)
//     })

//     return res.json();
// }