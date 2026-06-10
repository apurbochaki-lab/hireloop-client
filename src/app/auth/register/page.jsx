"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

// ─── ICONS ─────────────────────────────────────────────────────────────────
import {
    CircleCheckFill,
    Eye,
    EyeSlash,
    TriangleExclamation,
} from "@gravity-ui/icons";

// ─── AUTH CLIENT ───────────────────────────────────────────────────────────
import { signUp } from "@/lib/auth-client";

// ============================================================================
// ১. HELPERS & CONSTANTS (লজিক পার্ট)
// ============================================================================

const AUTH_ERROR_MAP = {
    USER_ALREADY_EXISTS: "An account with this email already exists.",
    INVALID_EMAIL: "Please enter a valid email address.",
    PASSWORD_TOO_SHORT: "Password must be at least 8 characters.",
    PASSWORD_TOO_LONG: "Password is too long (max 128 characters).",
    FAILED_TO_CREATE_USER: "Could not create your account. Please try again.",
    DEFAULT: "Something went wrong. Please try again.",
};

const getAuthError = (code) => AUTH_ERROR_MAP[code] ?? AUTH_ERROR_MAP.DEFAULT;

// ভ্যালিডেশন ফাংশনস
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPassword = (v) => v.length >= 8;
const isValidName = (v) => v.trim().length >= 2;

// ============================================================================
// ২. SUB-COMPONENTS (অ্যানিমেশন ও এক্সট্রা পার্ট)
// ============================================================================

// CSS অ্যানিমেশন এবং ফন্ট লোডার
function GlobalStyles() {
    return (
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
            @keyframes floatA {
                0%,100% { transform: translate(0,0) scale(1); }
                33%      { transform: translate(30px,-40px) scale(1.05); }
                66%      { transform: translate(-20px,25px) scale(.97); }
            }
            @keyframes floatB {
                0%,100% { transform: translate(0,0) scale(1); }
                50%      { transform: translate(-35px,-30px) scale(1.08); }
            }
            @keyframes cardIn {
                from { opacity:0; transform:translateY(28px) scale(.97); }
                to   { opacity:1; transform:translateY(0) scale(1); }
            }
            @keyframes slideUp {
                from { opacity:0; transform:translateY(8px); }
                to   { opacity:1; transform:translateY(0); }
            }
            @keyframes fadeIn {
                from { opacity:0; }
                to   { opacity:1; }
            }
        `}</style>
    );
}

// ব্যাকগ্রাউন্ডের পার্পল গ্লো ইফেক্ট
function PurpleOrbs() {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
            <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", animation: "floatA 12s ease-in-out infinite" }} />
            <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", animation: "floatB 15s ease-in-out infinite" }} />
            <div className="absolute top-1/2 right-16 h-[180px] w-[180px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #c084fc 0%, transparent 70%)", animation: "floatA 9s ease-in-out infinite reverse" }} />
        </div>
    );
}

// ব্যাকগ্রাউন্ড গ্রিড ওভারলে
function GridOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 opacity-[0.03]" aria-hidden style={{ backgroundImage: `linear-gradient(rgba(168,85,247,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,.5) 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
    );
}

// পাসওয়ার্ড স্ট্রেন্থ মিটার
function StrengthMeter({ password }) {
    if (!password) return null;

    const score = [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[0-9]/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ].filter(Boolean).length;

    const labels = ["", "Weak", "Fair", "Good", "Strong"];
    const colors = ["", "#ef4444", "#f97316", "#eab308", "#22c55e"];
    const widths = ["0%", "25%", "50%", "75%", "100%"];

    return (
        <div className="mt-1.5 space-y-1" style={{ animation: "fadeIn .2s ease" }}>
            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: widths[score], backgroundColor: colors[score] }} />
            </div>
            <p className="text-xs" style={{ color: colors[score] }}>{labels[score]}</p>
        </div>
    );
}

// এরর বা সাকসেস ব্যানার
function StatusBanner({ status, message }) {
    if (!status || !message) return null;
    const ok = status === "success";

    return (
        <div className="mb-6 flex items-start gap-2.5 rounded-xl border px-4 py-3" style={{ animation: "slideUp .3s ease both", background: ok ? "rgba(34,197,94,.08)" : "rgba(239,68,68,.08)", borderColor: ok ? "rgba(34,197,94,.25)" : "rgba(239,68,68,.25)" }}>
            {ok ? (
                <CircleCheckFill className="mt-0.5 shrink-0" style={{ color: "#4ade80", width: 16, height: 16 }} />
            ) : (
                <TriangleExclamation className="mt-0.5 shrink-0" style={{ color: "#f87171", width: 16, height: 16 }} />
            )}
            <p className="text-sm" style={{ color: ok ? "#4ade80" : "#f87171" }}>{message}</p>
        </div>
    );
}


// ============================================================================
// ৩. MAIN COMPONENT (REGISTER PAGE)
// ============================================================================

export default function RegisterPage() {
    // Hooks
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [touched, setTouched] = useState({});
    const [showPwd, setShowPwd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [statusMsg, setStatusMsg] = useState("");

    const [role, setRole] = useState("seeker");

    // ভ্যালিডেশন লজিক (Derived States)
    const errors = {
        name: touched.name && !isValidName(form.name) ? "Name must be at least 2 characters." : "",
        email: touched.email && !isValidEmail(form.email) ? "Please enter a valid email address." : "",
        password: touched.password && !isValidPassword(form.password) ? "Password must be at least 8 characters." : "",
    };

    const formValid = isValidName(form.name) && isValidEmail(form.email) && isValidPassword(form.password);
    const isSubmitted = status === "success";

    // ইনপুট চেঞ্জ হ্যান্ডলার
    const handleInputChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    // ইনপুট টাচ হ্যান্ডলার (Blur)
    const handleBlur = (key) => {
        setTouched((prev) => ({ ...prev, [key]: true }));
    };

    // সাবমিট হ্যান্ডলার 
    const handleRegister = async (e) => {
        if (e) e.preventDefault();
        setTouched({ name: true, email: true, password: true });
        if (!formValid) return;

        setLoading(true);
        setStatus(null);
        setStatusMsg("");

        const { data, error } = await signUp.email({
            name: form.name.trim(),
            email: form.email.trim().toLowerCase(),
            password: form.password,
            role
        });

        setLoading(false);

        if (error) {
            setStatus("error");
            setStatusMsg(getAuthError(error.code));
            return;
        }

        setStatus("success");
        setStatusMsg(
            data?.user?.emailVerified === false
                ? "Account created! Check your inbox to verify your email."
                : "Account created! Redirecting…"
        );

        setForm({ name: "", email: "", password: "" });
        setTouched({});
        setTimeout(() => router.push("/"), 2000);
    };

    // ============================================================================
    // ৪. DESIGN PART (একদম ক্লিন এবং এরর-ফ্রি সিঙ্গেলে রিটার্ন স্টেটমেন্ট)
    // ============================================================================
    return (
        <>
            {/* অ্যানিমেশন ও গ্লোবাল স্টাইল লোডার */}
            <GlobalStyles />

            {/* মেইন পেজ কন্টেইনার */}
            <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-25" style={{ background: "linear-gradient(135deg,#0a0614 0%,#0f0720 40%,#130926 70%,#0c061a 100%)", fontFamily: "'DM Sans', sans-serif" }}>

                {/* ব্যাকগ্রাউন্ড ইফেক্টস */}
                <PurpleOrbs />
                <GridOverlay />

                {/* ফর্ম গ্লাস কার্ড */}
                <div className="relative w-full max-w-md overflow-hidden border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl z-10" style={{ animation: "cardIn .55s cubic-bezier(.22,1,.36,1) both", background: "linear-gradient(160deg,rgba(124,58,237,.12) 0%,rgba(15,7,32,.85) 50%,rgba(10,6,20,.9) 100%)", backdropFilter: "blur(28px) saturate(1.4)", WebkitBackdropFilter: "blur(28px) saturate(1.4)", boxShadow: "0 0 0 1px rgba(168,85,247,.18),0 32px 64px rgba(0,0,0,.6),0 0 80px rgba(124,58,237,.08)" }}>

                    {/* টপ গ্লো লাইন */}
                    <div aria-hidden className="absolute inset-x-8 -top-px h-px rounded-full" style={{ background: "linear-gradient(90deg,transparent,rgba(168,85,247,.8),transparent)" }} />

                    {/* হেডার পার্ট (লোগো এবং টাইটেল) */}
                    <div className="mb-8 text-center space-y-2">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg,#7c3aed,#a855f7)", boxShadow: "0 8px 24px rgba(124,58,237,.45)" }}>
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
                                <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" fill="white" fillOpacity=".9" />
                            </svg>
                        </div>
                        <h1
                            className="text-3xl font-extrabold tracking-tight text-white hover:"
                            style={{ fontFamily: "'Syne', sans-serif" }}>
                            Create Account
                        </h1>
                        <p className="text-sm text-white/45">Join us — it only takes a minute.</p>
                    </div>

                    {/* নোটিফিকেশন / স্ট্যাটাস ব্যানার */}
                    <StatusBanner status={status} message={statusMsg} />

                    {/* ইনপুট ফর্ম */}
                    <div className="space-y-5">

                        {/* ফুল নেম ইনপুট */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-purple-300/80 text-sm font-medium">Full Name</label>
                            <input
                                type="text"
                                placeholder="Jane Doe"
                                value={form.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                onBlur={() => handleBlur("name")}
                                disabled={loading || isSubmitted}
                                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm caret-purple-400 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${errors.name ? 'border-red-500/70' : 'border-white/10 hover:border-purple-500/60'
                                    }`}
                                autoComplete="name"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-0.5">{errors.name}</p>}
                        </div>

                        {/* ইমেইল ইনপুট */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-purple-300/80 text-sm font-medium">Email Address</label>
                            <input
                                type="email"
                                placeholder="jane@example.com"
                                value={form.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                onBlur={() => handleBlur("email")}
                                disabled={loading || isSubmitted}
                                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm caret-purple-400 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${errors.email ? 'border-red-500/70' : 'border-white/10 hover:border-purple-500/60'
                                    }`}
                                autoComplete="email"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-0.5">{errors.email}</p>}
                        </div>

                        {/* পাসওয়ার্ড ইনপুট + স্ট্রেন্থ মিটার */}
                        <div className="flex flex-col space-y-1.5">
                            <label className="text-purple-300/80 text-sm font-medium">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPwd ? "text" : "password"}
                                    placeholder="Min. 8 characters"
                                    value={form.password}
                                    onChange={(e) => handleInputChange("password", e.target.value)}
                                    onBlur={() => handleBlur("password")}
                                    disabled={loading || isSubmitted}
                                    className={`w-full bg-white/5 border rounded-xl pl-4 pr-12 py-3 text-white placeholder:text-white/25 text-sm caret-purple-400 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 ${errors.password ? 'border-red-500/70' : 'border-white/10 hover:border-purple-500/60'
                                        }`}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    aria-label={showPwd ? "Hide password" : "Show password"}
                                    onClick={() => setShowPwd((v) => !v)}
                                    className="absolute right-4 text-white/35 hover:text-purple-400 transition-colors duration-150 outline-none focus:outline-none"
                                >
                                    {showPwd ? <EyeSlash style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-0.5">{errors.password}</p>}
                            <StrengthMeter password={form.password} />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label>What is your role?</Label>
                            <RadioGroup defaultValue="seeker" name="plan-orientation" orientation="horizontal" className="mx-auto" onChange={value => setRole(value)}>
                                <Radio value="seeker">
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <Radio.Content>
                                        <Label>Job Seeker</Label>
                                        <Description>Find your Jobs</Description>
                                    </Radio.Content>
                                </Radio>
                                <Radio value="recruiter">
                                    <Radio.Control>
                                        <Radio.Indicator />
                                    </Radio.Control>
                                    <Radio.Content>
                                        <Label>Recruiter</Label>
                                        <Description>Hire for jobs</Description>
                                    </Radio.Content>
                                </Radio>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* রেজিস্টার বাটন */}
                    <button
                        onClick={handleRegister}
                        disabled={loading || isSubmitted}
                        className="mt-8 w-full rounded-xl py-3.5 text-sm font-semibold text-white tracking-wide flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 cursor-pointer"
                        style={{
                            background: loading || isSubmitted ? "rgba(124,58,237,.45)" : "linear-gradient(135deg,#7c3aed 0%,#9333ea 100%)",
                            boxShadow: loading || isSubmitted ? "none" : "0 6px 24px rgba(124,58,237,.4)",
                        }}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Creating account…
                            </>
                        ) : isSubmitted ? "Redirecting…" : "Create Account"}
                    </button>

                    {/* ডিভাইডার */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-white/25 shrink-0 select-none">or</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* লগইন লিংক */}
                    <p className="text-center text-sm text-white/40">
                        Already have an account?{" "}
                        <Link href="/login" className="inline-flex items-center gap-1 font-medium text-purple-400 hover:text-purple-300 transition-colors duration-150">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                                <path d="M19 12H5M12 5l-7 7 7 7" />
                            </svg>
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}