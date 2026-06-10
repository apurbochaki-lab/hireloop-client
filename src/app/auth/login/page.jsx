"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CircleCheckFill, Eye, EyeSlash, TriangleExclamation } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

// ============================================================================
// HELPERS
// ============================================================================

const AUTH_ERROR_MAP = {
    INVALID_EMAIL_OR_PASSWORD: "Incorrect email or password. Please try again.",
    USER_NOT_FOUND: "No account found with this email.",
    TOO_MANY_REQUESTS: "Too many attempts. Please wait a moment and try again.",
    DEFAULT: "Something went wrong. Please try again.",
};
const getAuthError = (code) => AUTH_ERROR_MAP[code] ?? AUTH_ERROR_MAP.DEFAULT;

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPassword = (v) => v.length >= 8;

// ============================================================================
// STYLES
// ============================================================================

function GlobalStyles() {
    return (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
            @keyframes floatA {
                0%,100% { transform: translate(0,0) scale(1); }
                33%      { transform: translate(28px,-35px) scale(1.04); }
                66%      { transform: translate(-18px,22px) scale(.97); }
            }
            @keyframes floatB {
                0%,100% { transform: translate(0,0) scale(1); }
                50%      { transform: translate(-30px,-25px) scale(1.06); }
            }
            @keyframes cardIn {
                from { opacity:0; transform:translateY(24px) scale(.98); }
                to   { opacity:1; transform:translateY(0) scale(1); }
            }
            @keyframes slideUp {
                from { opacity:0; transform:translateY(8px); }
                to   { opacity:1; transform:translateY(0); }
            }
        `}</style>
    );
}

// ============================================================================
// BACKGROUND — teal/green orbs instead of purple-only
// ============================================================================

function BackgroundOrbs() {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
            {/* top-left — deep teal */}
            <div className="absolute -top-48 -left-48 h-[540px] w-[540px] rounded-full opacity-25"
                style={{ background: "radial-gradient(circle, #0d9488 0%, transparent 70%)", animation: "floatA 14s ease-in-out infinite" }} />
            {/* bottom-right — purple */}
            <div className="absolute -bottom-36 -right-36 h-[440px] w-[440px] rounded-full opacity-20"
                style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", animation: "floatB 16s ease-in-out infinite" }} />
            {/* centre accent — emerald */}
            <div className="absolute top-1/3 right-12 h-[200px] w-[200px] rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)", animation: "floatA 10s ease-in-out infinite reverse" }} />
            {/* bottom-left — purple soft */}
            <div className="absolute bottom-1/4 -left-16 h-[260px] w-[260px] rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", animation: "floatB 12s ease-in-out infinite reverse" }} />
        </div>
    );
}

function GridOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 opacity-[0.025]" aria-hidden
            style={{
                backgroundImage: `linear-gradient(rgba(16,185,129,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,.6) 1px, transparent 1px)`,
                backgroundSize: "44px 44px",
            }} />
    );
}

// ============================================================================
// STATUS BANNER
// ============================================================================

function StatusBanner({ status, message }) {
    if (!status || !message) return null;
    const ok = status === "success";
    return (
        <div className="mb-5 flex items-start gap-2.5 rounded-xl border px-4 py-3"
            style={{
                animation: "slideUp .3s ease both",
                background: ok ? "rgba(16,185,129,.08)" : "rgba(239,68,68,.08)",
                borderColor: ok ? "rgba(16,185,129,.25)" : "rgba(239,68,68,.25)",
            }}>
            {ok
                ? <CircleCheckFill className="mt-0.5 shrink-0" style={{ color: "#34d399", width: 16, height: 16 }} />
                : <TriangleExclamation className="mt-0.5 shrink-0" style={{ color: "#f87171", width: 16, height: 16 }} />
            }
            <p className="text-sm" style={{ color: ok ? "#34d399" : "#f87171" }}>{message}</p>
        </div>
    );
}

// ============================================================================
// MAIN — LOGIN PAGE
// ============================================================================

export default function LoginPage() {
    const router = useRouter();

    const [form, setForm] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({});
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [statusMsg, setStatusMsg] = useState("");

    const errors = {
        email: touched.email && !isValidEmail(form.email) ? "Please enter a valid email address." : "",
        password: touched.password && !isValidPassword(form.password) ? "Password must be at least 8 characters." : "",
    };
    const formValid = isValidEmail(form.email) && isValidPassword(form.password);
    const isSubmitted = status === "success";

    const handleChange = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
    const handleBlur = (key) => setTouched((prev) => ({ ...prev, [key]: true }));

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setTouched({ email: true, password: true });
        if (!formValid) return;

        setLoading(true);
        setStatus(null);
        setStatusMsg("");

        const { data, error } = await authClient.signIn.email({
            email: form.email.trim().toLowerCase(),
            password: form.password,
            callbackURL: "/",
        });

        setLoading(false);

        if (error) {
            setStatus("error");
            setStatusMsg(getAuthError(error.code));
            return;
        }

        setStatus("success");
        setStatusMsg("Welcome back! Redirecting…");
        setTimeout(() => router.push("/"), 1500);
    };

    // shared input class builder
    const inputCls = (hasError) =>
        `w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm caret-teal-400 outline-none transition-all duration-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 ${hasError ? "border-red-500/70" : "border-white/10 hover:border-teal-500/50"
        }`;

    return (
        <>
            <GlobalStyles />

            <div
                className="relative min-h-screen w-full flex items-center justify-center px-4 py-25"
                style={{
                    background: "linear-gradient(135deg, #030d0e 0%, #040f12 35%, #080818 65%, #05040f 100%)",
                    fontFamily: "'DM Sans', sans-serif",
                }}
            >
                <BackgroundOrbs />
                <GridOverlay />

                {/* Card */}
                <div
                    className="relative w-full max-w-md overflow-hidden border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl z-10"
                    style={{
                        animation: "cardIn .5s cubic-bezier(.22,1,.36,1) both",
                        background: "linear-gradient(160deg, rgba(13,148,136,.10) 0%, rgba(4,15,18,.88) 45%, rgba(5,4,15,.92) 100%)",
                        backdropFilter: "blur(28px) saturate(1.4)",
                        WebkitBackdropFilter: "blur(28px) saturate(1.4)",
                        boxShadow: "0 0 0 1px rgba(16,185,129,.15), 0 32px 64px rgba(0,0,0,.65), 0 0 80px rgba(13,148,136,.07)",
                    }}
                >
                    {/* top glow line — teal */}
                    <div aria-hidden className="absolute inset-x-8 -top-px h-px rounded-full"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(16,185,129,.75), transparent)" }} />

                    {/* Header */}
                    <div className="mb-8 text-center space-y-2">
                        {/* logo */}
                        <div
                            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                            style={{
                                background: "linear-gradient(135deg, #0d9488, #10b981)",
                                boxShadow: "0 8px 24px rgba(13,148,136,.45)",
                            }}
                        >
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M15 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7.5L15 3z" fill="white" fillOpacity=".2" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M15 3v4.5H19.5M9 13h6M9 17h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>

                        <h1
                            className="text-3xl font-extrabold tracking-tight text-white"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                        >
                            Welcome Back
                        </h1>
                        <p className="text-sm text-white/40">Sign in to continue to your account.</p>
                    </div>

                    {/* Banner */}
                    <StatusBanner status={status} message={statusMsg} />

                    {/* Form */}
                    <div className="space-y-5">

                        {/* Email */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-teal-300/80 text-sm font-medium">Email Address</label>
                            <input
                                type="email"
                                placeholder="jane@example.com"
                                value={form.email}
                                onChange={(e) => handleChange("email", e.target.value)}
                                onBlur={() => handleBlur("email")}
                                disabled={loading || isSubmitted}
                                className={inputCls(!!errors.email)}
                                autoComplete="email"
                            />
                            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-teal-300/80 text-sm font-medium">Password</label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-teal-400/70 hover:text-teal-300 transition-colors duration-150"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    onBlur={() => handleBlur("password")}
                                    disabled={loading || isSubmitted}
                                    className={`${inputCls(!!errors.password)} pr-12`}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    aria-label={showPwd ? "Hide password" : "Show password"}
                                    onClick={() => setShowPwd((v) => !v)}
                                    className="absolute right-4 text-white/35 hover:text-teal-400 transition-colors duration-150 outline-none focus:outline-none"
                                >
                                    {showPwd
                                        ? <EyeSlash style={{ width: 18, height: 18 }} />
                                        : <Eye style={{ width: 18, height: 18 }} />
                                    }
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleLogin}
                        disabled={loading || isSubmitted}
                        className="mt-8 w-full rounded-xl py-3.5 text-sm font-semibold text-white tracking-wide flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
                        style={{
                            background: loading || isSubmitted
                                ? "rgba(13,148,136,.4)"
                                : "linear-gradient(135deg, #0d9488 0%, #059669 100%)",
                            boxShadow: loading || isSubmitted ? "none" : "0 6px 24px rgba(13,148,136,.35)",
                        }}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Signing in…
                            </>
                        ) : isSubmitted ? "Redirecting…" : "Sign In"}
                    </button>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-white/25 shrink-0 select-none">or</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Go to register */}
                    <p className="text-center text-sm text-white/40">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="inline-flex items-center gap-1 font-medium text-teal-400 hover:text-teal-300 transition-colors duration-150"
                        >
                            Create one
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </p>
                </div>

                {/* Footer */}
                <p className="absolute bottom-6 text-center text-xs text-white/15 w-full select-none">
                    © {new Date().getFullYear()} YourBrand · All rights reserved.
                </p>
            </div>
        </>
    );
}