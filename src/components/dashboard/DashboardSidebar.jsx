import { LayoutSideContentLeft, Bell, Briefcase, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
    const navItems = [
        { icon: House, href: "/dashboard/recruiter", label: "Home" },
        { icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs" },
        { icon: Briefcase, href: "/dashboard/recruiter/jobs/new", label: "Post A Job" },
        { icon: Envelope, href: "/messages", label: "Company Profile" },
        { icon: Person, href: "/profile", label: "Profile" },
        { icon: Gear, href: "/settings", label: "Settings" },
    ];

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