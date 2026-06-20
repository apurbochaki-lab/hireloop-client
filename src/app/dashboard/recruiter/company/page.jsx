import { getUserSession } from '@/lib/core/session';
import CompanyProfile from './CompanyProfile';
import { getRecruiterCompany } from '@/lib/api/companies';

const CompanyPage = async () => {

    const sessionUser = await getUserSession()
    const company = await getRecruiterCompany(sessionUser?.id);
    console.log("Company Data:", company)

    return (
        <div>
            <CompanyProfile recruiter={sessionUser} recruiterCompany={company} />
        </div>
    );
};

export default CompanyPage;