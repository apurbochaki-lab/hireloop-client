"use client";

import { Table } from "@heroui/react";
import { Person, Briefcase, Shield } from "@gravity-ui/icons";
import { setUserRole } from "@/lib/actions/users";

export default function UsersTable({ users }) {


    // Safe date formatter
    const formatDate = (dateObj) => {
        if (!dateObj) return "N/A";
        let dateVal = typeof dateObj === "object" ? (dateObj.$date || dateObj.value || dateObj) : dateObj;
        const date = new Date(dateVal);
        if (isNaN(date.getTime())) return "N/A";

        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }).format(date);
    };

    // Pure Tailwind CSS Generator for the Roles (No HeroUI component dependency)
    const renderRoleBadge = (role) => {
        const cleanRole = role?.toLowerCase() || "seeker";

        switch (cleanRole) {
            case "admin":
                return (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/30 text-purple-400 font-medium text-xs capitalize">
                        <Shield width={13} height={13} />
                        <span>admin</span>
                    </div>
                );
            case "recruiter":
                return (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-zinc-950 font-semibold text-xs capitalize">
                        <Briefcase width={13} height={13} />
                        <span>recruiter</span>
                    </div>
                );
            case "seeker":
            default:
                return (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700/50 text-zinc-300 font-medium text-xs capitalize">
                        <Person width={13} height={13} />
                        <span>seeker</span>
                    </div>
                );
        }
    };

    // User Actions Buttons
    const handleRoleChange = async (userId, role) => {
        console.log("Clicked", userId, role)
        const data = await setUserRole(userId, role);
    }

    return (
        <Table
            classNames={{
                base: "bg-[#18181b] border border-white/5 rounded-xl overflow-hidden shadow-md",
                th: "bg-[#27272a] text-default-400 border-b border-white/5 font-medium py-3 px-4 text-sm",
                td: "border-b border-white/5 py-4 px-4 text-sm vertical-align-middle",
            }}
        >
            <Table.ScrollContainer>
                <Table.Content aria-label="User Management Table">
                    <Table.Header>
                        <Table.Column>User Name</Table.Column>
                        <Table.Column>Email Address</Table.Column>
                        <Table.Column>Role</Table.Column>
                        <Table.Column>Join Date</Table.Column>
                        <Table.Column>Status</Table.Column>
                        <Table.Column align="end">Actions</Table.Column>
                    </Table.Header>

                    <Table.Body>
                        {users.map((user) => {
                            const role = user.role?.toLowerCase() || "seeker";
                            const status = user.status || "Active";
                            const userId = user?.id;

                            // Simple avatar initial generator
                            const initial = user.name ? user.name.charAt(0).toUpperCase() : "?";

                            return (
                                <Table.Row key={user._id?.$oid || user.email}>

                                    {/* User Name & Custom Avatar */}
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300 font-bold text-xs tracking-wider shrink-0">
                                                {initial}
                                            </div>
                                            <span className="text-white font-medium whitespace-nowrap">{user.name}</span>
                                        </div>
                                    </Table.Cell>

                                    {/* Email Address */}
                                    <Table.Cell>
                                        <span className="text-zinc-400">{user.email}</span>
                                    </Table.Cell>

                                    {/* Pure Tailwind Role Badge */}
                                    <Table.Cell>
                                        {renderRoleBadge(role)}
                                    </Table.Cell>

                                    {/* Join Date */}
                                    <Table.Cell>
                                        <span className="text-zinc-400 whitespace-nowrap">
                                            {formatDate(user.createdAt)}
                                        </span>
                                    </Table.Cell>

                                    {/* Status Badge */}
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${status.toLowerCase() === "active" ? "bg-emerald-500" : "bg-rose-500"}`} />
                                            <span className={`text-xs border px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap ${status.toLowerCase() === "active"
                                                ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5"
                                                : "text-rose-500 border-rose-500/20 bg-rose-500/5"
                                                }`}>
                                                {status}
                                            </span>
                                        </div>
                                    </Table.Cell>

                                    {/* Action Options */}
                                    <Table.Cell>
                                        <div className="flex items-center justify-end gap-4 text-xs font-medium whitespace-nowrap">
                                            {role !== "admin" && (
                                                <button onClick={() => handleRoleChange(userId, "admin")}
                                                    className="text-zinc-400 hover:text-white transition-colors">
                                                    Make Admin
                                                </button>
                                            )}
                                            {role !== "recruiter" && (
                                                <button onClick={() => handleRoleChange(userId, "recruiter")}
                                                    className="text-zinc-400 hover:text-white transition-colors">
                                                    Make Recruiter
                                                </button>
                                            )}
                                            {role !== "seeker" && (
                                                <button onClick={() => handleRoleChange(userId, "seeker")}
                                                    className="text-zinc-400 hover:text-white transition-colors">
                                                    Make Seeker
                                                </button>
                                            )}

                                            {status.toLowerCase() === "active" ? (
                                                <button className="text-rose-500 hover:text-rose-400 transition-colors font-semibold">
                                                    Suspend
                                                </button>
                                            ) : (
                                                <>
                                                    <button className="text-emerald-500 hover:text-emerald-400 transition-colors font-semibold">
                                                        Activate
                                                    </button>
                                                    <button className="text-zinc-400 hover:text-white transition-colors">
                                                        Delete
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </Table.Cell>

                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
}