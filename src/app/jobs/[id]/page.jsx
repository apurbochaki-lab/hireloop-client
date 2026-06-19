import Image from "next/image";
import Link from "next/link";

import {
    Card,
    Chip,
    Button,
} from "@heroui/react";

import {
    Briefcase,
    MapPin,
    CircleDollar,
    Calendar,
    Factory
} from "@gravity-ui/icons";

import { getJobById } from "@/lib/api/jobs";

const JobDetailPage = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);

    // Date Formater :
    const formatDate = (date) => {
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    return (
        <section className="container mx-auto px-4 py-10">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Side */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Hero Card */}

                    <Card className="border border-white/10 bg-zinc-950">
                        <Card.Content className="p-8">
                            <div className="flex flex-col gap-6 md:flex-row md:items-start">
                                <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-white p-3">
                                    <Image
                                        src={job.companyLogo}
                                        alt={job.companyName}
                                        fill
                                        className="object-contain p-3"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-white">
                                        {job.jobTitle}
                                    </h1>

                                    <div className="mt-2 flex items-center gap-2 text-zinc-400">
                                        <Factory size={16} />
                                        <span>{job.companyName}</span>
                                    </div>

                                    <div className="mt-5 flex flex-wrap gap-2">
                                        <Chip variant="flat">
                                            {job.jobType}
                                        </Chip>

                                        <Chip variant="flat">
                                            {job.jobCategory}
                                        </Chip>

                                        <Chip variant="flat">
                                            {job.isRemote
                                                ? "Remote"
                                                : "On Site"}
                                        </Chip>

                                        <Chip variant="flat">
                                            {job.status}
                                        </Chip>
                                    </div>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>

                    {/* Overview */}

                    <Card className="border border-white/10 bg-zinc-950">
                        <Card.Header>
                            <Card.Title>Job Overview</Card.Title>
                        </Card.Header>

                        <Card.Content className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="flex items-center gap-3">
                                    <CircleDollar />
                                    <div>
                                        <p className="text-sm text-zinc-400">
                                            Salary
                                        </p>

                                        <p>
                                            {job.currency} {job.minSalary} -
                                            {job.maxSalary}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar />
                                    <div>
                                        <p className="text-sm text-zinc-400">
                                            Deadline
                                        </p>

                                        <p>{formatDate(job.deadline)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Briefcase />
                                    <div>
                                        <p className="text-sm text-zinc-400">
                                            Job Type
                                        </p>

                                        <p>{job.jobType}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin />
                                    <div>
                                        <p className="text-sm text-zinc-400">
                                            Work Mode
                                        </p>

                                        <p>
                                            {job.isRemote
                                                ? "Remote"
                                                : "On Site"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>

                    {/* Responsibilities */}

                    <Card className="border border-white/10 bg-zinc-950">
                        <Card.Header>
                            <Card.Title>
                                Responsibilities
                            </Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <p className="leading-8 text-zinc-300">
                                {job.responsibilities}
                            </p>
                        </Card.Content>
                    </Card>

                    {/* Requirements */}

                    <Card className="border border-white/10 bg-zinc-950">
                        <Card.Header>
                            <Card.Title>Requirements</Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <p className="leading-8 text-zinc-300">
                                {job.requirements}
                            </p>
                        </Card.Content>
                    </Card>

                    {/* Benefits */}

                    <Card className="border border-white/10 bg-zinc-950">
                        <Card.Header>
                            <Card.Title>Benefits</Card.Title>
                        </Card.Header>

                        <Card.Content>
                            <p className="leading-8 text-zinc-300">
                                {job.benefits}
                            </p>
                        </Card.Content>
                    </Card>
                </div>

                {/* Right Side */}

                <div className="space-y-6">
                    {/* Apply Card */}

                    <Card className="sticky top-24 border border-violet-500/20 bg-zinc-950">
                        <Card.Content className="p-6">
                            <h3 className="text-xl font-semibold">
                                Apply for this job
                            </h3>

                            <p className="mt-2 text-sm text-zinc-400">
                                Submit your application before the
                                deadline.
                            </p>

                            <Link href={`/jobs/${id}/apply`}>
                                <Button
                                    className="mt-6 w-full"
                                    color="primary"
                                    size="lg"
                                >
                                    Apply Now
                                </Button>
                            </Link>
                        </Card.Content>
                    </Card>

                    {/* Company Card */}

                    <Card className="border border-white/10 bg-zinc-950">
                        <Card.Content className="p-6">
                            <h3 className="mb-4 text-lg font-semibold">
                                Company Information
                            </h3>

                            <div className="flex items-center gap-4">
                                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white p-2">
                                    <Image
                                        src={job.companyLogo}
                                        alt={job.companyName}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>

                                <div>
                                    <p className="font-medium">
                                        {job.companyName}
                                    </p>

                                    <p className="text-sm text-zinc-400">
                                        Company ID: {job.companyId}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-zinc-400">
                                        Category
                                    </span>

                                    <span>{job.jobCategory}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-zinc-400">
                                        Visibility
                                    </span>

                                    <span>
                                        {job.isPubliclyVisible
                                            ? "Public"
                                            : "Private"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-zinc-400">
                                        Status
                                    </span>

                                    <span>{job.status}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-zinc-400">
                                        Posted
                                    </span>

                                    <span>
                                        {formatDate(job.createdAt)}
                                    </span>
                                </div>
                            </div>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default JobDetailPage;