'use client'

import Link from 'next/link'
import { Lock, ArrowRight } from '@gravity-ui/icons'
import { Button } from '@heroui/react'

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0B0F] px-6">
            <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center backdrop-blur-xl">

                {/* Icon */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                    <Lock className="h-10 w-10 text-white" />
                </div>

                {/* Status */}
                <p className="mb-2 text-sm font-medium uppercase tracking-widest text-violet-400">
                    Error 401
                </p>

                {/* Heading */}
                <h1 className="mb-4 text-4xl font-bold text-white">
                    Unauthorized Access
                </h1>

                {/* Description */}
                <p className="mb-8 text-white/60">
                    You don't have permission to access this page.
                    Please sign in with an authorized account or return to the homepage.
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Link href="/">
                        <Button
                            variant="outline"
                            className="border-white/10 text-white"
                        >
                            Go Home
                        </Button>
                    </Link>

                    <Link href="/auth/login">
                        <Button
                            className="bg-violet-600 font-semibold text-white hover:bg-violet-500"
                            endContent={<ArrowRight className="h-4 w-4" />}
                        >
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}