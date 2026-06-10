'use client'

import { useSession } from "@/lib/auth-client";
import { Spinner } from "@heroui/react";

import {
    FileText,
    Persons,
    Thunderbolt,
    CircleCheck,
} from "@gravity-ui/icons";
import DashboardStats from "@/components/dashboard/DashboardStats";


const RecruiterPage = () => {

    const { data: session, isPending } = useSession();
    const user = session?.user;

    if (isPending) {
        return <div className="h-10 w-10"><Spinner color="current" /></div>
    }

    const recruiterStats = [
        {
            id: 1,
            title: "Total Job Posts",
            value: 48,
            icon: FileText,
        },
        {
            id: 2,
            title: "Total Applicants",
            value: "1,284",
            icon: Persons,
        },
        {
            id: 3,
            title: "Active Jobs",
            value: 18,
            icon: Thunderbolt,
        },
        {
            id: 4,
            title: "Jobs Closed",
            value: 32,
            icon: CircleCheck,
        },
    ];

    return (
        <div className="m-5">
            <h2 className="font-semibold text-2xl">Welcome back, {user?.name}</h2>

            <div>
                <DashboardStats statsData={recruiterStats} />
            </div>
        </div>
    );
};

export default RecruiterPage;