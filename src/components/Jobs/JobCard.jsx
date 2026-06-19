"use client";

import Image from "next/image";
import Link from "next/link";

import { Card, Chip, Button } from "@heroui/react";

import {
    MapPin,
    Briefcase,
    CircleDollar,
    ArrowRight,
} from "@gravity-ui/icons";

export default function JobCard({ job }) {
    const {
        _id,
        jobTitle,
        jobType,
        minSalary,
        maxSalary,
        currency,
        deadline,
        isRemote,
        companyName,
        companyLogo,
    } = job;

    const salary = `${currency} ${minSalary} - ${maxSalary}`;

    return (
        <Card className="h-full border border-white/5 bg-zinc-950 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10">
            <Card.Header className="flex items-start gap-4 p-6">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white p-2">
                    <Image
                        src={companyLogo}
                        alt={companyName}
                        fill
                        className="object-contain p-2"
                    />
                </div>

                <div className="flex-1">
                    <Card.Title className="text-lg font-semibold text-white">
                        {jobTitle}
                    </Card.Title>

                    <Card.Description className="mt-1 text-sm text-zinc-400">
                        {companyName}
                    </Card.Description>
                </div>
            </Card.Header>

            <Card.Content className="px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                    <Chip
                        size="sm"
                        variant="flat"
                        startcontent={<MapPin className="h-4 w-4" />}
                    >
                        {isRemote ? "Remote" : "On Site"}
                    </Chip>

                    <Chip
                        size="sm"
                        variant="flat"
                        startcontent={<Briefcase className="h-4 w-4" />}
                    >
                        {jobType}
                    </Chip>

                    <Chip
                        size="sm"
                        variant="flat"
                        startcontent={<CircleDollar className="h-4 w-4" />}
                    >
                        {salary}
                    </Chip>
                </div>

                <div className="mt-5">
                    <p className="text-xs uppercase tracking-wide text-zinc-500">
                        Application Deadline
                    </p>

                    <p className="mt-1 text-sm text-zinc-300">
                        {new Date(deadline).toLocaleDateString()}
                    </p>
                </div>
            </Card.Content>

            <Card.Footer className="p-6 pt-0">
                <Link
                    href={`/jobs/${_id}`}
                    variant="light"
                    className="flex items-center gap-2 text-base font-semibold text-xl text-green-500 "
                >
                    Apply Now <ArrowRight />
                </Link>
            </Card.Footer>
        </Card>
    );
}