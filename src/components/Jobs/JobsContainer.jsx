"use client";

import { useMemo, useState } from "react";

import JobFilters from "./JobFilters";
import JobCard from "./JobCard";

export default function JobsContainer({ jobs }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedJobType, setSelectedJobType] = useState("");
    const [selectedWorkMode, setSelectedWorkMode] = useState("");

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            const matchesSearch =
                job.jobTitle
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                job.companyName
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const matchesCategory =
                !selectedCategory ||
                job.jobCategory === selectedCategory;

            const matchesJobType =
                !selectedJobType ||
                job.jobType === selectedJobType;

            const matchesWorkMode =
                !selectedWorkMode ||
                (selectedWorkMode === "remote"
                    ? job.isRemote
                    : !job.isRemote);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesJobType &&
                matchesWorkMode
            );
        });
    }, [
        jobs,
        searchTerm,
        selectedCategory,
        selectedJobType,
        selectedWorkMode,
    ]);

    return (
        <div className="space-y-8">
            <JobFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedJobType={selectedJobType}
                setSelectedJobType={setSelectedJobType}
                selectedWorkMode={selectedWorkMode}
                setSelectedWorkMode={setSelectedWorkMode}
            />

            {filteredJobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {filteredJobs.map((job) => (
                        <JobCard
                            key={job._id}
                            job={job}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-default-200 p-10 text-center">
                    <h3 className="text-xl font-semibold">
                        No jobs found
                    </h3>

                    <p className="mt-2 text-default-500">
                        Try changing your filters.
                    </p>
                </div>
            )}
        </div>
    );
}