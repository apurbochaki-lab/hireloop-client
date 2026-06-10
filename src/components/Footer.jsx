import Link from 'next/link'
import {
    ArrowUpRight,
    LogoFacebook,
    LogoLinkedin,
    LogoGithub,
} from '@gravity-ui/icons'

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-white/10 bg-[#050507]">

            {/* Background Glow */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600 blur-[180px]" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">

                {/* Top Footer */}
                <div className="grid gap-14 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">

                    {/* Brand Info */}
                    <div className="flex flex-col items-center space-y-6 md:items-start">
                        <Link href="/" className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                                <ArrowUpRight className="h-5 w-5 text-white" />
                            </div>

                            <div className="leading-none text-left">
                                <h2 className="text-xl font-bold text-white">
                                    Hire Loop
                                </h2>

                                <p className="text-xs text-white/50">
                                    Smart Hiring Platform
                                </p>
                            </div>
                        </Link>

                        <p className="max-w-xs text-sm leading-7 text-white/45">
                            The AI-native career platform. Built for people who take their work seriously.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 pt-2">

                            <Link
                                href="#"
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/70 transition hover:bg-violet-600 hover:text-white"
                            >
                                <LogoFacebook className="h-5 w-5" />
                            </Link>

                            <Link
                                href="#"
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:scale-105"
                            >
                                <LogoGithub className="h-5 w-5" />
                            </Link>

                            <Link
                                href="#"
                                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-white/70 transition hover:bg-violet-600 hover:text-white"
                            >
                                <LogoLinkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Product */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="mb-6 text-lg font-semibold text-violet-400">
                            Product
                        </h3>

                        <div className="flex flex-col gap-4">
                            <Link
                                href="#"
                                className="text-sm text-white/50 transition hover:text-white"
                            >
                                Job Discovery
                            </Link>

                            <Link
                                href="#"
                                className="text-sm text-white/50 transition hover:text-white"
                            >
                                Worker AI
                            </Link>

                            <Link
                                href="#"
                                className="text-sm text-white/50 transition hover:text-white"
                            >
                                Companies
                            </Link>

                            <Link
                                href="#"
                                className="text-sm text-white/50 transition hover:text-white"
                            >
                                Salary Data
                            </Link>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="mb-6 text-lg font-semibold text-violet-400">
                            Navigations
                        </h3>

                        <div className="flex flex-col gap-4">
                            <Link
                                href="#"
                                className="text-sm text-white/50 transition hover:text-white"
                            >
                                Help Center
                            </Link>

                            <Link
                                href="#"
                                className="text-sm text-white/50 transition hover:text-white"
                            >
                                Career Library
                            </Link>

                            <Link
                                href="#"
                                className="text-sm text-white/50 transition hover:text-white"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col items-center md:items-start">
                        <h3 className="mb-6 text-lg font-semibold text-violet-400">
                            Resources
                        </h3>

                        <div className="flex flex-col gap-4">
                            <Link
                                href="#"
                                className="text-sm text-white/50 transition hover:text-white"
                            >
                                Brand Guideline
                            </Link>

                            <Link
                                href="#"
                                className="text-sm text-white/50 transition hover:text-white"
                            >
                                Newsroom
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">

                    <p className="text-sm text-white/40">
                        Copyright 2026 — Hire Loop
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-5">
                        <Link
                            href="#"
                            className="text-sm text-white/40 transition hover:text-white"
                        >
                            Terms & Policy
                        </Link>

                        <Link
                            href="#"
                            className="text-sm text-white/40 transition hover:text-white"
                        >
                            Privacy Guideline
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer