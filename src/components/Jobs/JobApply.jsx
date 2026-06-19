"use client";

import { useState } from "react";
import Image from "next/image";

import {
    Card,
    Chip,
    Button,
    TextField,
    TextArea,
    InputGroup,
    Label,
} from "@heroui/react";

import {
    Briefcase,
    MapPin,
    CircleDollar,
} from "@gravity-ui/icons";
import { submitApplication } from "@/lib/actions/applications";
import toast from "react-hot-toast";
import { refreshJobApplyPage } from "@/lib/actions/jobs";

export default function JobApply({ job, applicant, }) {
    const [resumeUrl, setResumeUrl] = useState("");
    const [portfolioUrl, setPortfolioUrl] = useState("");
    const [whyHireYou, setWhyHireYou] = useState("");

    const handleSubmitApplication = async (e) => {
        e.preventDefault();

        const applicationData = {
            jobId: job?._id,
            jobTitle: job?.jobTitle,
            companyId: job?.companyId,
            companyName: job?.companyName,

            applicantId: applicant?.id,
            applicantName: applicant?.name,
            applicantEmail: applicant?.email,

            resumeUrl,
            portfolioUrl,
            whyHireYou,
        };

        // console.log(applicationData);

        // TODO: Post application data in database
        const res = await submitApplication(applicationData);
        if (res.insertedId) {
            toast.success(`${applicationData?.jobTitle} Job Applied!`)
            setResumeUrl("");
            setPortfolioUrl("");
            setWhyHireYou("");
            await refreshJobApplyPage(job?._id)
        }
    };

    const handleClearForm = () => {
        setResumeUrl("");
        setPortfolioUrl("");
        setWhyHireYou("");
    };

    return (
        <section className="container mx-auto py-10">
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Job Summary Card */}

                <div>
                    <Card className="sticky top-24 overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900 to-black">
                        <Card.Content className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-xl bg-white">
                                    <Image
                                        src={job.companyLogo}
                                        alt={job.companyName}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-white">
                                        {job.jobTitle}
                                    </h2>

                                    <p className="text-zinc-400">
                                        {job.companyName}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
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
                            </div>

                            <div className="mt-6 rounded-xl border border-primary/20 bg-primary/10 p-4">
                                <p className="text-sm text-zinc-400">
                                    Salary Range
                                </p>

                                <p className="mt-1 text-2xl font-bold text-primary">
                                    {job.currency} {job.minSalary} -{" "}
                                    {job.maxSalary}
                                </p>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <CircleDollar />
                                    <span>
                                        {job.currency} {job.minSalary} -{" "}
                                        {job.maxSalary}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Briefcase />
                                    <span>{job.jobType}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin />
                                    <span>
                                        {job.isRemote
                                            ? "Remote"
                                            : "On Site"}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-8 border-t border-white/10 pt-6">
                                <h3 className="mb-3 font-medium">
                                    Requirements
                                </h3>

                                <p className="text-sm leading-7 text-zinc-400">
                                    {job.requirements}
                                </p>
                            </div>
                        </Card.Content>
                    </Card>
                </div>

                {/* Application Form */}

                <div className="lg:col-span-2">
                    <Card className="border border-white/10 bg-zinc-950">
                        <Card.Header className="border-b border-white/10 p-8">
                            <div>
                                <Card.Title className="text-2xl">
                                    Apply for {job.jobTitle}
                                </Card.Title>

                                <Card.Description className="mt-2">
                                    Submit your application and
                                    showcase why you're the perfect
                                    candidate for this role.
                                </Card.Description>
                            </div>
                        </Card.Header>

                        <Card.Content className="p-8">
                            <form
                                onSubmit={handleSubmitApplication}
                                className="space-y-6"
                            >
                                {/* Resume & Portfolio */}

                                <div className="grid gap-6 md:grid-cols-2">
                                    <TextField>
                                        <Label className="text-lg">Resume URL</Label>

                                        <InputGroup>
                                            <InputGroup.Input
                                                placeholder="Google Drive / Dropbox Resume Link"
                                                value={resumeUrl}
                                                onChange={(e) =>
                                                    setResumeUrl(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </InputGroup>
                                    </TextField>

                                    <TextField>
                                        <Label className="text-lg">Portfolio Website</Label>

                                        <InputGroup>
                                            <InputGroup.Input
                                                placeholder="https://yourportfolio.com"
                                                value={portfolioUrl}
                                                onChange={(e) =>
                                                    setPortfolioUrl(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </InputGroup>
                                    </TextField>
                                </div>

                                {/* Why Hire You */}
                                <div>
                                    <Label
                                        htmlFor="textarea-rows-3"
                                        className="text-lg block text-left">
                                        Why Should We Hire You?
                                    </Label>
                                    <TextArea
                                        className="w-full h-20 mt-2"

                                        placeholder="Tell us about your experience, achievements, skills, projects and why you're a strong fit for this role..."
                                        minrows={8}
                                        value={whyHireYou}
                                        onChange={(e) =>
                                            setWhyHireYou(e.target.value)
                                        }
                                    />
                                </div>

                                {/* Buttons */}

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        size="lg"
                                        className="flex-1"
                                    >
                                        Submit Application
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="lg"
                                        className="sm:w-40"
                                        onPress={handleClearForm}
                                    >
                                        Clear Form
                                    </Button>
                                </div>
                            </form>
                        </Card.Content>
                    </Card>
                </div>
            </div>
        </section>
    );
}