'use client'

import { useState } from 'react'
import {
    Rocket,
    TrendingUp,
    Zap,
    ArrowRight,
    Plus,
} from 'lucide-react'

const pricingPlans = [
    {
        id: 1,
        icon: Rocket,
        title: 'Starter',
        price: '$0',
        features: [
            'Daily AI match brief (top 5)',
            'Verified salary bands',
            'Company insight dashboards',
            '1-click apply, unlimited',
        ],
        isPopular: false,
    },
    {
        id: 2,
        icon: TrendingUp,
        title: 'Growth',
        price: '$17',
        features: [
            'Daily AI match brief (top 5)',
            'Verified salary bands',
            'Company insight dashboards',
            '1-click apply, unlimited',
        ],
        isPopular: true,
    },
    {
        id: 3,
        icon: Zap,
        title: 'Premium',
        price: '$99',
        features: [
            'Everything in Pro',
            'Multi-profile career portfolios',
            'Shared talent rooms',
            'Recruiter view (read-only)',
        ],
        isPopular: false,
    },
]

const PricingSection = () => {
    const [billing, setBilling] = useState('monthly')

    return (
        <section className="bg-black text-white py-20 md:py-24 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Top Content */}
                <div className="text-center">
                    {/* Label */}
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />

                        <p className="uppercase tracking-[4px] text-zinc-400 text-xs sm:text-lg">
                            Pricing
                        </p>

                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-4xl mx-auto">
                        Pay for the leverage,
                        <br />
                        not the listings
                    </h2>

                    {/* Billing Toggle */}
                    <div className="mt-8 md:mt-10 flex justify-center">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-full p-1 flex items-center gap-1">
                            <button
                                onClick={() => setBilling('monthly')}
                                className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${billing === 'monthly'
                                        ? 'bg-white text-black'
                                        : 'text-zinc-300'
                                    }`}
                            >
                                Monthly
                            </button>

                            <button
                                onClick={() => setBilling('yearly')}
                                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium flex items-center gap-2 transition-all duration-300 ${billing === 'yearly'
                                        ? 'bg-white text-black'
                                        : 'text-zinc-300'
                                    }`}
                            >
                                Yearly

                                <span className="bg-fuchsia-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                                    25%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mt-16 md:mt-20">
                    {pricingPlans.map((plan) => {
                        const Icon = plan.icon

                        return (
                            <div
                                key={plan.id}
                                className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 p-5 sm:p-6 lg:p-7 ${plan.isPopular
                                        ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-zinc-700 shadow-[0_0_50px_rgba(255,255,255,0.06)] lg:scale-[1.02]'
                                        : 'bg-black border-zinc-800'
                                    }`}
                            >
                                <div>
                                    {/* Top */}
                                    <div className="flex items-start justify-between gap-4">
                                        {/* Left */}
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${plan.isPopular
                                                        ? 'bg-zinc-900 border-zinc-700'
                                                        : 'bg-zinc-950 border-zinc-800'
                                                    }`}
                                            >
                                                <Icon
                                                    size={20}
                                                    strokeWidth={2.2}
                                                    className={
                                                        plan.isPopular
                                                            ? 'text-fuchsia-400'
                                                            : 'text-fuchsia-300'
                                                    }
                                                />
                                            </div>

                                            <h3 className="text-2xl sm:text-3xl font-medium">
                                                {plan.title}
                                            </h3>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-start flex-shrink-0">
                                            <span className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-none">
                                                {plan.price}
                                            </span>

                                            <span className="text-zinc-400 text-xs sm:text-sm mt-1 sm:mt-2 ml-1">
                                                /month
                                            </span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-zinc-300 mt-8 md:mt-10 text-base sm:text-lg">
                                        Start building your insights hub:
                                    </p>

                                    {/* Features */}
                                    <div className="mt-6 sm:mt-7 space-y-4 sm:space-y-5">
                                        {plan.features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 text-zinc-400"
                                            >
                                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                                                    <Plus size={12} strokeWidth={2.5} />
                                                </div>

                                                <p className="text-sm sm:text-base">{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Button */}
                                <button
                                    className={`mt-10 sm:mt-14 h-12 sm:h-14 rounded-2xl flex items-center justify-between px-5 sm:px-6 text-sm font-medium transition-all duration-300 ${plan.isPopular
                                            ? 'bg-white text-black hover:bg-zinc-200'
                                            : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                                        }`}
                                >
                                    Choose This Plan

                                    <ArrowRight size={18} strokeWidth={2.2} />
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default PricingSection