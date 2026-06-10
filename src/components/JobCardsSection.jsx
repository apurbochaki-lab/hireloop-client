"use client";

import { Button, Card, CardBody, CardFooter, Chip } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { Location, BriefcaseBusiness } from "@gravity-ui/icons";

const jobCards = [
    {
        id: 1,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        workType: "Hybrid",
        salaryRange: "€25–€40/hour",
    },
    {
        id: 2,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        workType: "Hybrid",
        salaryRange: "€25–€40/hour",
    },
    {
        id: 3,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        workType: "Hybrid",
        salaryRange: "€25–€40/hour",
    },
    {
        id: 4,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        workType: "Hybrid",
        salaryRange: "€25–€40/hour",
    },
    {
        id: 5,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        workType: "Hybrid",
        salaryRange: "€25–€40/hour",
    },
    {
        id: 6,
        title: "Frontend Developer",
        description:
            "Showcase your commitment to diversity and inclusion by highlighting initiatives",
        location: "New York, USA",
        workType: "Hybrid",
        salaryRange: "€25–€40/hour",
    },
];

function JobCard({ title, description, location, workType, salaryRange }) {
    return (
        <Card
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl hover:border-[#3a3a3a] transition-all duration-200"
            shadow="none"
        >
            <CardBody className="p-6 pb-4 gap-3">
                <h3 className="text-white text-xl font-bold">{title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{description}</p>

                <div className="flex flex-wrap gap-2 mt-1">
                    {/* Location Chip */}
                    <Chip
                        startContent={
                            <Location
                                width={12}
                                height={12}
                                className="text-[#a855f7] ml-1"
                            />
                        }
                        variant="flat"
                        classNames={{
                            base: "bg-[#252525] border border-[#333] h-7 px-1",
                            content: "text-[#ccc] text-xs px-1",
                        }}
                    >
                        {location}
                    </Chip>

                    {/* Work Type Chip */}
                    <Chip
                        startContent={
                            <BriefcaseBusiness
                                width={12}
                                height={12}
                                className="text-[#a855f7] ml-1"
                            />
                        }
                        variant="flat"
                        classNames={{
                            base: "bg-[#252525] border border-[#333] h-7 px-1",
                            content: "text-[#ccc] text-xs px-1",
                        }}
                    >
                        {workType}
                    </Chip>

                    {/* Salary Chip */}
                    <Chip
                        startContent={
                            <span className="text-[#a855f7] text-xs ml-1 font-bold">€</span>
                        }
                        variant="flat"
                        classNames={{
                            base: "bg-[#252525] border border-[#333] h-7 px-1",
                            content: "text-[#ccc] text-xs px-1",
                        }}
                    >
                        {salaryRange}
                    </Chip>
                </div>
            </CardBody>

            <CardFooter className="px-6 pb-6 pt-2">
                <Button
                    variant="bordered"
                    endContent={<ArrowRight size={14} />}
                    className="text-white border-[#333] bg-transparent hover:bg-[#252525] text-sm h-9 px-4 rounded-xl"
                    size="sm"
                >
                    Apply Now
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function JobCardsSection() {
    return (
        <section className="bg-[#0d0d0d] min-h-screen py-20 px-6">
            {/* Header */}
            <div className="text-center mb-14 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-sm bg-[#a855f7]" />
                    <span className="text-[#a855f7] text-xs tracking-widest uppercase font-medium">
                        Smart Job Discovery
                    </span>
                    <span className="w-2 h-2 rounded-sm bg-[#a855f7]" />
                </div>
                <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                    The roles you&apos;d never
                    <br />
                    find by searching
                </h2>
            </div>

            {/* Cards Grid */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobCards.map((job) => (
                    <JobCard
                        key={job.id}
                        title={job.title}
                        description={job.description}
                        location={job.location}
                        workType={job.workType}
                        salaryRange={job.salaryRange}
                    />
                ))}
            </div>

            {/* View All Button */}
            <div className="flex justify-center mt-12">
                <Button
                    variant="bordered"
                    className="text-[#111] bg-white border-white hover:bg-gray-100 text-sm h-10 px-6 rounded-xl font-medium"
                >
                    View all job open
                </Button>
            </div>
        </section>
    );
}