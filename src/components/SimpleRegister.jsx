"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    Button,
    Card,
    FieldError,
    Input,
    Label,
    Separator,
    Spinner,
    TextField,
} from "@heroui/react";
import { Eye, EyeSlash, CircleCheckFill, TriangleExclamation } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

const AUTH_ERRORS = {
    USER_ALREADY_EXISTS: "An account with this email already exists.",
    INVALID_EMAIL: "Please enter a valid email address.",
    PASSWORD_TOO_SHORT: "Password must be at least 8 characters.",
    FAILED_TO_CREATE_USER: "Could not create your account. Please try again.",
    DEFAULT: "Something went wrong. Please try again.",
};

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPassword = (v) => v.length >= 8;
const isValidName = (v) => v.trim().length >= 2;

export default function RegisterPage() {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({});
    const [loading, setLoading] = useState(false);
    const [banner, setBanner] = useState(null); // { type: "success"|"error", msg: string }

    const nameError = touched.name && !isValidName(name) ? "Name must be at least 2 characters." : "";
    const emailError = touched.email && !isValidEmail(email) ? "Please enter a valid email address." : "";
    const passwordError = touched.password && !isValidPassword(password) ? "Password must be at least 8 characters." : "";
    const formValid = isValidName(name) && isValidEmail(email) && isValidPassword(password);

    const handleRegister = async () => {
        setTouched({ name: true, email: true, password: true });
        if (!formValid) return;

        setLoading(true);
        setBanner(null);

        const { data, error } = await authClient.signUp.email({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password,
        });

        setLoading(false);

        if (error) {
            setBanner({ type: "error", msg: AUTH_ERRORS[error.code] ?? AUTH_ERRORS.DEFAULT });
            return;
        }

        setBanner({
            type: "success",
            msg: data?.user?.emailVerified === false
                ? "Account created! Check your inbox to verify your email."
                : "Account created! Redirecting…",
        });
        setName(""); setEmail(""); setPassword(""); setTouched({});
        setTimeout(() => router.push("/dashboard"), 2000);
    };

    const done = banner?.type === "success";

    return (
        <div className="min-h-screen flex items-center justify-center bg-purple-500/20 px-4">
            <Card className="w-full max-w-md p-8 border border-white/20">

                {/* Header */}
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
                <p className="text-sm text-gray-500 mb-6">Fill in the details below to get started.</p>

                {/* Banner */}
                {banner && (
                    <div className={`flex items-start gap-2 rounded-lg border px-4 py-3 mb-5 text-sm ${banner.type === "success"
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-red-50 border-red-200 text-red-700"
                        }`}>
                        {banner.type === "success"
                            ? <CircleCheckFill className="mt-0.5 shrink-0" width={16} height={16} />
                            : <TriangleExclamation className="mt-0.5 shrink-0" width={16} height={16} />
                        }
                        <span>{banner.msg}</span>
                    </div>
                )}

                {/* Form */}
                <div className="space-y-4">

                    {/* Name */}
                    <TextField
                        isInvalid={!!nameError}
                        isDisabled={loading || done}
                        className="w-full"
                    >
                        <Label className="text-sm font-medium text-gray-700">Full Name</Label>
                        <Input
                            placeholder="Jane Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                            autoComplete="name"
                        />
                        <FieldError>{nameError}</FieldError>
                    </TextField>

                    {/* Email */}
                    <TextField
                        isInvalid={!!emailError}
                        isDisabled={loading || done}
                        className="w-full"
                    >
                        <Label className="text-sm font-medium text-gray-700">Email Address</Label>
                        <Input
                            type="email"
                            placeholder="jane@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                            autoComplete="email"
                        />
                        <FieldError>{emailError}</FieldError>
                    </TextField>

                    {/* Password */}
                    <TextField
                        isInvalid={!!passwordError}
                        isDisabled={loading || done}
                        className="w-full"
                    >
                        <Label className="text-sm font-medium text-gray-700">Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Min. 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                                autoComplete="new-password"
                                className="w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeSlash width={18} height={18} /> : <Eye width={18} height={18} />}
                            </button>
                        </div>
                        <FieldError>{passwordError}</FieldError>
                    </TextField>

                </div>

                {/* Submit */}
                <Button
                    onPress={handleRegister}
                    isDisabled={loading || done}
                    className="mt-6 w-full"
                    variant="primary"
                >
                    {loading ? <Spinner size="sm" /> : done ? "Redirecting…" : "Create Account"}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <Separator className="flex-1" />
                    <span className="text-xs text-gray-400">or</span>
                    <Separator className="flex-1" />
                </div>

                {/* Back to login */}
                <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline font-medium">
                        Back to Login
                    </Link>
                </p>

            </Card>
        </div>
    );
}