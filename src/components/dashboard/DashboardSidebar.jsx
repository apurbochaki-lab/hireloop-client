import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, Bell, Briefcase, Envelope, Gear, House, Magnifier, Person, PersonMagnifier, LayoutSideContent, Bookmark, FileText, CreditCard, LayoutColumns, Persons, Bulb } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {

    const user = await getUserSession();

    const recruiterNavLinks = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Briefcase, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
        { icon: PersonMagnifier, href: "/dashboard/recruiter/company", label: "Company Profile" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];

    const seekerNavLinks = [
        {
            icon: LayoutSideContent,
            href: "/dashboard/seeker",
            label: "Dashboard",
        },
        {
            icon: Magnifier,
            href: "/dashboard/seeker/jobs",
            label: "Jobs",
        },
        {
            icon: Bookmark,
            href: "/dashboard/seeker/saved-jobs",
            label: "Saved Jobs",
        },
        {
            icon: FileText,
            href: "/dashboard/seeker/applications",
            label: "Applications",
        },
        {
            icon: CreditCard,
            href: "/dashboard/seeker/billing",
            label: "Billing",
        },
        {
            icon: Gear,
            href: "/dashboard/seeker/settings",
            label: "Settings",
        },
    ];

    const adminNavLinks = [
        {
            icon: LayoutColumns,
            href: "/dashboard/admin",
            label: "Dashboard",
        },
        {
            icon: Briefcase,
            href: "/dashboard/admin/jobs",
            label: "Manage Jobs",
        },
        {
            icon: Persons,
            href: "/dashboard/admin/applicants",
            label: "Applicants",
        },
        {
            icon: Bulb,
            href: "/dashboard/admin/companies",
            label: "Companies",
        },
        {
            icon: CreditCard,
            href: "/dashboard/admin/billing",
            label: "Billing",
        },
        {
            icon: Gear,
            href: "/dashboard/admin/settings",
            label: "Settings",
        },
    ];

    const navLinksMap = {
        seeker: seekerNavLinks,
        recruiter: recruiterNavLinks,
        admin: adminNavLinks
    };

    const navItems = navLinksMap[user?.role || 'seeker']

    // Sidebar Links
    const navLinks = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>
    console.log("Sidebar rendered");

    return (
        <>
            <aside className="hidden lg:block shrink-0 border-r border-default w-48 p-4 ">{navLinks}</aside>
            <div className="lg:hidden">
                <Drawer>
                    <Button variant="secondary">
                        <LayoutSideContentLeft />
                        Sidebar
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left">
                            <Drawer.Dialog>
                                <Drawer.CloseTrigger />
                                <Drawer.Header>
                                    <Drawer.Heading>Navigation</Drawer.Heading>
                                </Drawer.Header>
                                <Drawer.Body>
                                    {navLinks}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
}