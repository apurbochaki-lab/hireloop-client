import { protectedFetch, serverFetch } from "../core/server"
import { getUserSession } from "../core/session";

export const getCompanies = async () => {
    return protectedFetch('/api/companies');
}

// To get companies by recruiter id
export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
}


// To get direct logged-in user companies
export const getLoggedInRecruiterCompany = async () => {
    const user = await getUserSession();
    return getRecruiterCompany(user.id);
}