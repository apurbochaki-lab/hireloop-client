import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_API_SERVER_URL || "http://localhost:5000";

export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}

export const getJobs = async () => {
    return serverFetch('/api/jobs');
}

export const getJobById = async (jobId) => {
    return serverFetch(`/api/jobs/${jobId}`);
}