import JobsContainer from "@/components/Jobs/JobsContainer";
import { getJobs } from "@/lib/api/jobs";

export default async function JobsPage() {
    const jobs = await getJobs();

    return (
        <section className="container mx-auto py-20">
            <JobsContainer jobs={jobs} />
        </section>
    );
}