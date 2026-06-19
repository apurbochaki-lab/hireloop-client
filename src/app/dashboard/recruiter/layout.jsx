import { requireRole } from "@/lib/core/session";

const recruiterLayout = async({ children }) => {
    await requireRole('recruiter');
    return children;
};

export default recruiterLayout;