import {
    Table,
    Chip,
    Button
} from '@heroui/react';

import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import { BriefcaseIcon, EyeIcon } from 'lucide-react';

// Helper function to format the "Applied" column to a human-readable relative time
const formatTimeAgo = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
};

// Helper function to dynamically map status configurations matching the layout
const getStatusConfig = (status) => {
    const configs = {
        applied: { color: "default", variant: "bordered", label: "Applied" },
        review: { color: "warning", variant: "bordered", label: "Review" },
        shortlisted: { color: "success", variant: "bordered", label: "Shortlisted" },
        rejected: { color: "danger", variant: "bordered", label: "Rejected" },
        offered: { color: "secondary", variant: "bordered", label: "Offered" },
    };
    return configs[status?.toLowerCase()] || configs.applied;
};

const ApplicationPage = async () => {
    const user = await getUserSession();
    const jobs = await getApplicationsByApplicant(user?.id);

    return (
        <div className="space-y-6 max-w-7xl mx-auto p-6">
            <div>
                <h1 className="text-3xl font-bold text-white">
                    My Applications
                </h1>
                <p className="mt-2 text-white/60">
                    Total applications: {jobs?.length || 0}
                </p>
            </div>

            <Table
                aria-label="Job applications table"
                className="bg-[#121212] border border-white/10 rounded-xl"
                removeWrapper
            >
                <Table.ScrollContainer>
                    <Table.Content>
                        <Table.Header>
                            <Table.Column className="bg-transparent text-white/50 text-sm font-medium py-4">
                                Job Title
                            </Table.Column>
                            <Table.Column className="bg-transparent text-white/50 text-sm font-medium py-4">
                                Company
                            </Table.Column>
                            <Table.Column className="bg-transparent text-white/50 text-sm font-medium py-4">
                                Applied
                            </Table.Column>
                            <Table.Column className="bg-transparent text-white/50 text-sm font-medium py-4">
                                Status
                            </Table.Column>
                            <Table.Column className="bg-transparent text-white/50 text-sm font-medium py-4 text-right">
                                Action
                            </Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No applications found."}>
                            {jobs?.map((item) => {
                                // Fallbacks/Mocks for values missing from the base database object
                                const jobType = item.jobType || "Full-time";
                                const locationType = item.locationType || "Remote";
                                const status = item.status || "Applied";
                                const statusConfig = getStatusConfig(status);

                                return (
                                    <Table.Row key={item._id?.$oid || item.jobId} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                        {/* JOB TITLE COLUMN */}
                                        <Table.Cell className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 text-white/70">
                                                    <BriefcaseIcon className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-white text-base">
                                                        {item.jobTitle}
                                                    </span>
                                                    <span className="text-xs text-white/40 mt-0.5">
                                                        {jobType} • {locationType}
                                                    </span>
                                                </div>
                                            </div>
                                        </Table.Cell>

                                        {/* COMPANY COLUMN */}
                                        <Table.Cell className="text-white/80 text-sm py-4">
                                            {item.companyName}
                                        </Table.Cell>

                                        {/* APPLIED DATE COLUMN */}
                                        <Table.Cell className="text-white/60 text-sm py-4">
                                            {formatTimeAgo(item.createdAt?.$date)}
                                        </Table.Cell>

                                        {/* STATUS COLUMN */}
                                        <Table.Cell className="py-4">
                                            <Chip
                                                variant={statusConfig.variant}
                                                color={statusConfig.color}
                                                className="capitalize font-medium text-xs px-2.5 h-6"
                                            >
                                                {statusConfig.label}
                                            </Chip>
                                        </Table.Cell>

                                        {/* ACTION COLUMN */}
                                        <Table.Cell className="py-4 text-right">
                                            <Button
                                                size="sm"
                                                variant="light"
                                                className="text-white/80 hover:text-white font-medium hover:bg-white/10"
                                                endContent={<EyeIcon className="w-4 h-4" />}
                                            >
                                                Details
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default ApplicationPage;