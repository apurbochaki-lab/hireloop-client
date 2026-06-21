'use client'

import Link from 'next/link'
import { ShieldX } from 'lucide-react'

export default function ForbiddenPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-6">
            <div className="max-w-md text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                    <ShieldX className="h-10 w-10 text-red-600" />
                </div>

                <h1 className="mb-2 text-6xl font-bold text-foreground">403</h1>

                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                    Access Forbidden
                </h2>

                <p className="mb-8 text-muted-foreground">
                    You are authenticated, but you don't have permission to access this
                    resource. Please contact an administrator if you believe this is a
                    mistake.
                </p>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="rounded-lg bg-primary px-5 py-2.5 text-primary-foreground transition hover:opacity-90"
                    >
                        Go Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="rounded-lg border px-5 py-2.5 transition hover:bg-accent"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    )
}