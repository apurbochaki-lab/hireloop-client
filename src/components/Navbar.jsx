'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Bars, Xmark } from '@gravity-ui/icons'
import { signOut, useSession } from '@/lib/auth-client'
import { Button, Spinner } from '@heroui/react'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  // Better auth session
  const { data: session, isPending } = useSession()
  const user = session?.user

  const navLinks = [
    {
      label: 'Browse Jobs',
      href: '/jobs',
    },
    {
      label: 'Company',
      href: '/companies',
    },
    {
      label: 'Pricing',
      href: '/pricing-plans',
    }
  ];

  const dashboardLinks = {
    seeker: '/dashboard/seeker',
    recruiter: '/dashboard/recruiter',
    admin: '/dashboard/admin'
  }

  if (user?.email) {
    navLinks.push({
      label: 'Dashboard',
      href: dashboardLinks[user?.role || 'seeker']
    })
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B0B0F]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <ArrowUpRight className="h-5 w-5 text-white" />
          </div>

          <div className="leading-none">
            <h1 className="text-xl font-bold tracking-tight text-white">
              Hire Loop
            </h1>

            <p className="text-xs text-white/50">
              Smart Hiring Platform
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3 backdrop-blur-xl lg:flex">
          {/* Menu Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-white/10" />

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {isPending ? (
              <Spinner color="current" />
            ) : user ? (
              <>
                <p>Hi, {user.name}!</p>

                <Button
                  onClick={async () => await signOut()}
                  variant="outline"
                  className="bg-purple-500/60 font-bold"
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/register"
                  className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white lg:hidden"
        >
          <Bars className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all duration-300 ${menuOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
          }`}
      >
        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 flex h-screen w-[280px] flex-col border-r border-white/10 bg-[#111116] p-6 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          {/* Sidebar Header */}
          <div className="mb-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>

              <div className="leading-none">
                <h1 className="text-lg font-bold text-white">
                  Hire Loop
                </h1>

                <p className="text-xs text-white/50">
                  Smart Hiring
                </p>
              </div>
            </Link>

            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white"
            >
              <Xmark className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 h-px w-full bg-white/10" />

          {/* Bottom Buttons */}
          <div className="flex flex-col gap-4">
            <Link
              href="/auth/login"
              className="rounded-xl border border-white/10 px-5 py-3 text-center text-sm font-medium text-violet-400 transition hover:bg-white/5"
            >
              Sign In
            </Link>

            <Link
              href="/auth/register"
              className="rounded-xl bg-white px-5 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Get Started Mobile
            </Link>
          </div>
        </div>

        {/* Click Outside Close */}
        <div
          className="h-full w-full"
          onClick={() => setMenuOpen(false)}
        />
      </div>
    </header>
  )
}

export default Navbar