'use client'

import {
    BriefcaseBusiness,
    Building2,
    Search,
    Star,
} from 'lucide-react'

const stats = [
    {
        id: 1,
        icon: BriefcaseBusiness,
        value: '50K',
        label: 'Active Jobs',
    },
    {
        id: 2,
        icon: Building2,
        value: '12K',
        label: 'Companies',
    },
    {
        id: 3,
        icon: Search,
        value: '2M',
        label: 'Job Seekers',
    },
    {
        id: 4,
        icon: Star,
        value: '97%',
        label: 'Satisfaction Rate',
    },
]

export default function GlobalStatsSection() {
    return (
        <section className="relative overflow-hidden bg-black py-28">
            {/* Main Background */}
            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-90"
                style={{
                    backgroundImage: "url('/globe.png')",
                }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/45" />

            {/* Purple Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.35),transparent_65%)]" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-5">
                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-white text-3xl md:text-5xl font-semibold leading-snug">
                        Assisting over 15,000 job seekers
                        <br />
                        find their dream positions.
                    </h2>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((item) => {
                        const Icon = item.icon

                        return (
                            <div
                                key={item.id}
                                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 min-h-[200px]"
                            >
                                {/* Card Glow */}
                                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent" />

                                {/* Icon */}
                                <div className="relative z-10 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center bg-white/[0.03] mb-14">
                                    <Icon className="w-4 h-4 text-white" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-white text-5xl font-bold mb-2">
                                        {item.value}
                                    </h3>

                                    <p className="text-white/70 text-sm">
                                        {item.label}
                                    </p>
                                </div>

                                {/* Bottom Blur */}
                                <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-violet-500/10 to-transparent blur-2xl" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}