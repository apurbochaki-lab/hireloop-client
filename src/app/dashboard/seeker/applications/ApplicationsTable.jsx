'use client'

import Link from 'next/link'
import { Chip, Table } from '@heroui/react'

function formatDate(dateString) {
    const now = new Date()
    const date = new Date(dateString)

    const diffMs = now - date
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 24) {
        return `${diffHours || 1} hour${diffHours > 1 ? 's' : ''} ago`
    }

    if (diffDays < 7) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    }

    const weeks = Math.floor(diffDays / 7)

    return `${weeks} week${weeks > 1 ? 's' : ''} ago`
}

export default function ApplicationsTable({ jobs }) {
    console.log(jobs)
    return (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content
                        aria-label="My Applications Table"
                        classNames={{
                            table: 'min-w-full',
                        }}
                    >
                        <Table.Header>
                            <Table.Column>
                                Job Title
                            </Table.Column>

                            <Table.Column>
                                Company
                            </Table.Column>

                            <Table.Column>
                                Applied
                            </Table.Column>

                            <Table.Column>
                                Status
                            </Table.Column>

                            <Table.Column>
                                Action
                            </Table.Column>
                        </Table.Header>

                        <Table.Body
                            // items={jobs}
                            emptyContent="No applications found."
                        >
                            {(job) => (
                                <Table.Row key={job._id}>
                                    <Table.Cell>
                                        <div>
                                            <p className="font-semibold text-white">
                                                {job.jobTitle}
                                            </p>

                                            <p className="text-sm text-white/50">
                                                {job.applicantEmail}
                                            </p>
                                        </div>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="text-white/80">
                                            {job.companyName}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span className="text-white/60">
                                            {formatDate(job.createdAt)}
                                        </span>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Chip
                                            size="sm"
                                            variant="bordered"
                                            color="primary"
                                        >
                                            Applied
                                        </Chip>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Link
                                            href={`/jobs/${job.jobId}`}
                                            className="font-medium text-white/80 transition hover:text-violet-400"
                                        >
                                            Details
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    )
}