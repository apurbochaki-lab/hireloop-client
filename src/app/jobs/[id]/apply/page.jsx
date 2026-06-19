import JobApply from "@/components/Jobs/JobApply";
import { getApplicationsByApplicant } from "@/lib/api/applications";
import { getJobById } from "@/lib/api/jobs";
import { getPlanById } from "@/lib/api/plans";
import { getUserSession } from "@/lib/core/session";

import {
    Button,
    Card,
    ProgressBar,
    Label,
} from "@heroui/react";

import Link from "next/link";
import { redirect } from "next/navigation";

const JobApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();

    // Not logged in
    if (!user) {
        redirect(`/auth/login?redirect=/jobs/${id}/apply`);
    }

    // Not a seeker
    if (user?.role !== "seeker") {
        return (
            <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
                <Card className="max-w-xl">
                    <Card.Content className="p-10 text-center">
                        <h2 className="text-3xl font-bold">
                            Access Restricted
                        </h2>

                        <p className="mt-3 text-default-500">
                            Only job seekers can apply for jobs.
                        </p>
                    </Card.Content>
                </Card>
            </div>
        );
    }

    const plan = await getPlanById(user?.plan || "seeker_free");
    // console.log("plan : ", plan)

    // const plan = {
    //     name: "Free",
    //     maxApplicationLimit: 3,
    // };

    const applications = await getApplicationsByApplicant(user?.id);

    const job = await getJobById(id);

    const usedApplications =
        applications.length;

    const remainingApplications =
        Math.max(
            0,
            plan.maxApplicationLimit -
            usedApplications
        );

    const percentage = Math.min(
        100,
        (usedApplications /
            plan.maxApplicationLimit) *
        100
    );

    return (
        <section className="container mx-auto px-4 py-10">
            {/* Header */}

            <div className="mx-auto mb-10 max-w-3xl text-center">
                <h1 className="text-4xl font-bold md:text-5xl">
                    Apply for this Job
                </h1>

                <p className="mt-3 text-lg text-default-500">
                    Complete your application and
                    take the next step in your
                    career.
                </p>
            </div>

            {/* Plan Usage Card */}

            <Card className="mx-auto mb-10 max-w-4xl border border-default-200 bg-content1">
                <Card.Content className="p-6">
                    <div className="space-y-5">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm text-default-500">
                                    Current Plan
                                </p>

                                <h3 className="text-2xl font-bold">
                                    {plan.name} Plan
                                </h3>
                            </div>

                            <div className="text-left md:text-right">
                                <p className="text-sm text-default-500">
                                    Applications Used
                                </p>

                                <h3 className="text-2xl font-bold">
                                    {usedApplications} /{" "}
                                    {
                                        plan.maxApplicationLimit
                                    }
                                </h3>
                            </div>
                        </div>

                        <ProgressBar
                            value={percentage}
                        >
                            <div className="mb-2 flex items-center justify-between">
                                <Label>
                                    Application Usage
                                </Label>

                                <ProgressBar.Output />
                            </div>

                            <ProgressBar.Track>
                                <ProgressBar.Fill />
                            </ProgressBar.Track>
                        </ProgressBar>

                        <div className="flex items-center justify-between text-sm">
                            <span className="text-default-500">
                                Remaining Applications
                            </span>

                            <span className="font-semibold">
                                {
                                    remainingApplications
                                }
                            </span>
                        </div>
                    </div>
                </Card.Content>
            </Card>

            {/* Conditional Rendering */}

            {usedApplications >=
                plan.maxApplicationLimit ? (
                <Card className="mx-auto max-w-2xl border border-warning/20">
                    <Card.Content className="p-8 text-center">
                        <h2 className="text-3xl font-bold">
                            Application Limit Reached
                        </h2>

                        <p className="mt-4 text-default-500">
                            You've used all
                            available applications
                            included in your current
                            plan.
                        </p>

                        <p className="mt-2 text-default-500">
                            Upgrade your plan to
                            unlock more applications
                            and premium features.
                        </p>

                        <div className="mt-6">
                            <Link href="/pricing-plans">
                                <Button
                                    color="primary"
                                    size="lg"
                                >
                                    Upgrade Plan
                                </Button>
                            </Link>
                        </div>
                    </Card.Content>
                </Card>
            ) : (
                <JobApply
                    applicant={user}
                    job={job}
                />
            )}
        </section>
    );
};

export default JobApplyPage;