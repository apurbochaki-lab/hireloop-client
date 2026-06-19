"use client";

import { useMemo, useState } from "react";

import {
    Card,
    Button,
    Chip,
} from "@heroui/react";

import {
    Person,
    Rocket,
    CrownDiamond,
    Briefcase,
    ChartColumn,
    Factory,
    CircleCheckFill,
} from "@gravity-ui/icons";

const seekerPlans = [
    {
        name: "Free",
        id: 'seeker_free',
        price: "$0",
        period: "/forever",
        icon: Person,
        popular: false,
        features: [
            "Browse & save up to 10 jobs",
            "Apply to up to 3 jobs per month",
            "Basic profile",
            "Email alerts",
        ],
    },
    {
        name: "Pro",
        id: 'seeker_pro',
        price: "$19",
        period: "/month",
        icon: Rocket,
        popular: true,
        features: [
            "Apply to up to 30 jobs per month",
            "Unlimited saved jobs",
            "Application tracking",
            "Salary insights",
        ],
    },
    {
        name: "Premium",
        id: 'seeker_premium',
        price: "$39",
        period: "/month",
        icon: CrownDiamond,
        popular: false,
        features: [
            "Everything in Pro",
            "Unlimited applications",
            "Profile boost to recruiters",
            "Early access to new jobs",
            "Priority support",
        ],
    },
];

const recruiterPlans = [
    {
        name: "Free",
        id: 'recruiter_free',
        price: "$0",
        period: "/forever",
        icon: Briefcase,
        popular: false,
        features: [
            "Up to 3 active job posts",
            "Basic applicant management",
            "Standard listing visibility",
            "Great for a company's first year of hiring",
        ],
    },
    {
        name: "Growth",
        id: 'recruiter_growth',
        price: "$49",
        period: "/month",
        icon: ChartColumn,
        popular: true,
        features: [
            "Up to 10 active job posts",
            "Applicant tracking",
            "Basic analytics",
            "Email support",
        ],
    },
    {
        name: "Enterprise",
        id: 'recruiter_enterprise',
        price: "$149",
        period: "/month",
        icon: Factory,
        popular: false,
        features: [
            "Up to 50 active job posts",
            "Advanced analytics dashboard",
            "Featured job listings",
            "Team collaboration",
            "Custom branding",
            "Priority support",
        ],
    },
];

export default function PricingPlansPage() {
    const [selectedType, setSelectedType] =
        useState("seekers");

    const plans = useMemo(() => {
        return selectedType === "seekers"
            ? seekerPlans
            : recruiterPlans;
    }, [selectedType]);

    return (
        <section className="container mx-auto px-4 pt-15 pb-30">
            {/* Hero */}

            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-5xl font-bold md:text-6xl">
                    Pricing Plans
                </h1>

                <p className="mt-5 text-lg text-default-500">
                    Flexible pricing for job seekers and recruiters.
                    Choose a plan that fits your goals and scale
                    with confidence.
                </p>
            </div>

            {/* Toggle */}

            <div className="mt-12 flex justify-center">
                <div className="flex rounded-2xl border border-white/10 bg-content1 p-1">
                    <button
                        onClick={() =>
                            setSelectedType("seekers")
                        }
                        className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 md:px-8 ${selectedType === "seekers"
                            ? "bg-blue-500 text-white shadow-lg"
                            : "text-default-500 hover:text-white"
                            }`}
                    >
                        For Job Seekers
                    </button>

                    <button
                        onClick={() =>
                            setSelectedType("recruiters")
                        }
                        className={`rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 md:px-8 ${selectedType === "recruiters"
                            ? "bg-blue-500 text-white shadow-lg"
                            : "text-default-500 hover:text-white"
                            }`}
                    >
                        For Recruiters
                    </button>
                </div>
            </div>

            {/* Cards */}

            <div className="mt-20 grid gap-8 lg:grid-cols-3">
                {plans.map((plan) => {
                    const Icon = plan.icon;

                    return (
                        <Card
                            key={plan.name}
                            className={`group relative overflow-hidden border transition-all duration-300 hover:-translate-y-2 ${plan.popular
                                ? "scale-105 border-primary shadow-[0_0_40px_rgba(59,130,246,0.25)]"
                                : "border-white/10 hover:border-primary/40"
                                }`}
                        >
                            {/* Background Glow */}

                            <div
                                className={`absolute inset-x-0 top-0 h-36 ${plan.popular
                                    ? "bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20"
                                    : "bg-gradient-to-r from-white/5 via-transparent to-white/5"
                                    }`}
                            />

                            {/* Popular Badge */}

                            {plan.popular && (
                                <div className="absolute right-4 top-4 z-20">
                                    <Chip color="primary">
                                        Most Popular
                                    </Chip>
                                </div>
                            )}

                            <Card.Content className="relative z-10 p-8">
                                {/* Icon */}

                                <div
                                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${plan.popular
                                        ? "bg-primary text-white"
                                        : "bg-content2"
                                        }`}
                                >
                                    <Icon
                                        width={30}
                                        height={30}
                                    />
                                </div>

                                {/* Plan */}

                                <h3 className="text-2xl font-bold">
                                    {plan.name}
                                </h3>

                                {/* Price */}

                                <div className="mt-5">
                                    <div className="flex items-end gap-2">
                                        <span className="text-5xl font-extrabold">
                                            {plan.price}
                                        </span>

                                        <span className="pb-2 text-default-500">
                                            {plan.period}
                                        </span>
                                    </div>
                                </div>

                                {/* Features */}

                                <div className="mt-8 space-y-4">
                                    {plan.features.map(
                                        (feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-start gap-3"
                                            >
                                                <CircleCheckFill
                                                    width={18}
                                                    height={18}
                                                    className="mt-1 shrink-0 text-primary"
                                                />

                                                <span className="text-sm text-default-700 dark:text-default-300">
                                                    {feature}
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* CTA */}

                                <form action="/api/checkout_sessions" method="POST">
                                <input type="hidden" name="plan_id" value={plan.id} />
                                    <section>
                                        <Button
                                            type="submit"
                                            role="link"
                                            color={plan.popular ? "primary" : "default"}
                                            size="lg"
                                            className="mt-10 w-full font-semibold"
                                        >
                                            {plan.price === "$0"
                                                ? "Get Started"
                                                : "Upgrade Now"}
                                        </Button>
                                    </section>
                                </form>
                            </Card.Content>
                        </Card>
                    );
                })}
            </div>

            {/* Bottom Text */}

            <div className="mx-auto mt-16 max-w-3xl text-center">
                <p className="text-default-500">
                    Upgrade, downgrade, or cancel anytime.
                    Need a custom solution for your team?
                    Contact us for tailored enterprise pricing.
                </p>
            </div>
        </section>
    );
}