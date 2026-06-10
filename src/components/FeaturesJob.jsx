'use client'
import { Magnifier } from '@gravity-ui/icons';
import {
    Search,
    ChartNoAxesCombined,
    Building2,
    Bookmark,
    Sparkles,
    FileText,
    Hexagon,
    TrendingUp,
} from 'lucide-react'

const FeaturesJob = () => {

    const features = [
        {
            id: 1,
            icon: Search,
            title: 'Smart Search',
            description: 'Find your ideal job with advanced filters.',
        },

        {
            id: 2,
            icon: ChartNoAxesCombined,
            title: 'Salary Insights',
            description: 'Get real salary data to negotiate confidently.',
        },

        {
            id: 3,
            icon: Building2,
            title: 'Top Companies',
            description: 'Apply to vetted companies that are hiring.',
        },

        {
            id: 4,
            icon: Bookmark,
            title: 'Saved Jobs',
            description: 'Manage apps & favorites on your dashboard.',
        },

        {
            id: 5,
            icon: Sparkles,
            title: 'One-Click Apply',
            description: 'Simplify your job applications for an easier process!',
        },

        {
            id: 6,
            icon: FileText,
            title: 'Resume Builder',
            description: 'Create professional resumes with modern templates.',
        },

        {
            id: 7,
            icon: Hexagon,
            title: 'Skill-Based Matching',
            description: 'Discover jobs that match your skills and experience.',
        },

        {
            id: 8,
            icon: TrendingUp,
            title: 'Career Growth Resources',
            description: 'Boost your career with quick interview tips.',
        },
    ]

    return (
        <section className='py-20 bg-[#151516]'>
            <div className="max-w-7xl mx-auto">
                {/* Header Part */}
                <div className=" pb-20">
                    <div className="flex items-center justify-center gap-2 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />

                        <p className="uppercase tracking-[4px] text-zinc-400 text-xs sm:text-lg">
                            Features Job
                        </p>

                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                    </div>
                    <h2 className="text-5xl text-center">Everything you need <br /> to succeed</h2>
                </div>

                {/* Content Part */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {
                        features.map(feature => {
                            const Icon = feature.icon

                            return (<div key={feature.id} className='flex items-center gap-5'>
                                {/* Left */}
                                <div className="w-20 lg:w-30 h-20 rounded-2xl border border-white/20 relative overflow-hidden flex items-center justify-center bg-[#0f0f12]">

                                    {/* Gradient Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-violet-500/10 to-transparent" />

                                    {/* Inner Blur Glow */}
                                    <div className="absolute w-16 h-16 bg-pink-500/20 blur-2xl rounded-full" />

                                    {/* Icon */}
                                    <Icon className='h-8 w-8 text-pink-500' />
                                </div>
                                {/* Right */}
                                <div className='max-w-[208px]'>
                                    <h2 className='text-xl font-bold pb-1.5'>Smart Search</h2>
                                    <p className='text-white/70'>Find your ideal job win advance filters.</p>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default FeaturesJob;