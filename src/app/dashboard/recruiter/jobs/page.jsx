import JobsDataTable from "@/components/dashboard/JobsDataTable";
import { getCompanyJobs } from "@/lib/api/jobs";

const JobsPage = async () => {
    const companyId = "company_123"; // TODO

    const jobsData = await getCompanyJobs(companyId);

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-default-200 bg-content1 shadow-sm">
                <h2 className="text-2xl font-bold mb-2">All Jobs</h2>
                <p className="text-default-500">
                    List of jobs you have posted will appear here.
                </p>
            </div>

            {/* Jobs Table */}
            <JobsDataTable jobs={jobsData || []} />
        </div>
    );
};

export default JobsPage;