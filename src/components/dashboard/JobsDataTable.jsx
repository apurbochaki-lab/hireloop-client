"use client";

import { Button, Chip, Table, Tooltip } from "@heroui/react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const JobsDataTable = ({ jobs }) => {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "success";
            case "inactive":
                return "danger";
            case "pending":
                return "warning";
            default:
                return "default";
        }
    };

    const handleView = (job) => {
        console.log("View:", job);
    };

    const handleEdit = (job) => {
        console.log("Edit:", job);
    };

    const handleDelete = (job) => {
        console.log("Delete:", job);
    };

    return (
        <div className="rounded-2xl border border-default-200 bg-content1 shadow-sm overflow-hidden">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="Company Jobs Table"
                        className="min-w-[900px]"
                    >
                        <Table.Header>
                            <Table.Column isRowHeader>Job Title</Table.Column>
                            <Table.Column>Category</Table.Column>
                            <Table.Column>Location</Table.Column>
                            <Table.Column>Salary</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column align="center">Actions</Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No jobs found."}>
                            {jobs?.map((job) => (
                                <Table.Row key={job._id}>
                                    <Table.Cell>
                                        <div>
                                            <p className="font-semibold">{job.jobTitle}</p>
                                            <p className="text-xs text-default-500">
                                                Deadline: {job.deadline}
                                            </p>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell className="capitalize">
                                        {job.jobCategory}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {job.isRemote ? (
                                            <span className="font-medium text-success">
                                                Remote
                                            </span>
                                        ) : (
                                            job.location || (
                                                <span className="text-default-400">
                                                    Not specified
                                                </span>
                                            )
                                        )}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {job.currency} {job.minSalary} - {job.maxSalary}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            color={getStatusColor(job.status)}
                                            variant="flat"
                                            className="capitalize"
                                        >
                                            {job.status}
                                        </Chip>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <div className="flex items-center justify-center gap-2">
                                            <Tooltip content="View Details">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="flat"
                                                    color="primary"
                                                    onPress={() => handleView(job)}
                                                >
                                                    <Eye size={16} />
                                                </Button>
                                            </Tooltip>

                                            <Tooltip content="Edit Job">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="flat"
                                                    color="warning"
                                                    onPress={() => handleEdit(job)}
                                                >
                                                    <Pencil size={16} />
                                                </Button>
                                            </Tooltip>

                                            <Tooltip content="Delete Job">
                                                <Button
                                                    isIconOnly
                                                    size="sm"
                                                    variant="flat"
                                                    color="danger"
                                                    onPress={() => handleDelete(job)}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default JobsDataTable;