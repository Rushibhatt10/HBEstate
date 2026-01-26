import { useState, useEffect } from 'react';
import { Home, Building2, MapPin, TrendingUp, FileText } from 'lucide-react';

const Services = () => {
    const serviceCategories = [
        {
            icon: Home,
            category: "RESIDENTIAL SERVICES",
            services: [
                "Residential Properties",
                "Rental Properties",
                "Pre-Leased Properties",
                "Resale Properties",
                "Home Loan Assistance"
            ]
        },
        {
            icon: Building2,
            category: "COMMERCIAL SERVICES",
            services: [
                "Commercial Properties",
                "Commercial Leasing",
                "Office & Retail Spaces",
                "Asset Advisory"
            ]
        },
        {
            icon: MapPin,
            category: "LAND & DEVELOPMENT",
            services: [
                "Plots & Land",
                "Land Development",
                "Site Development",
                "Joint Venture Projects"
            ]
        },
        {
            icon: TrendingUp,
            category: "INVESTMENT & CONSULTING",
            services: [
                "Property Investment",
                "Investment Opportunities",
                "Real Estate Consulting",
                "Property Valuation"
            ]
        },
        {
            icon: FileText,
            category: "LEGAL & SUPPORT",
            services: [
                "Legal Assistance",
                "Property Documentation",
                "NRI Property Services",
                "Property Management",
                "Property Barter"
            ]
        }
    ];

    return (
        <section id="services" className="relative w-full min-h-screen bg-[#0a1628] py-20 md:py-24 px-4 md:px-6 overflow-hidden">
            {/* Ambient Glow Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <h2
                        className="text-white text-4xl md:text-6xl lg:text-7xl font-semibold uppercase tracking-[0.15em] mb-6"
                        style={{
                            textShadow: '0 0 40px rgba(251, 191, 36, 0.3), 0 0 80px rgba(251, 191, 36, 0.15)',
                            letterSpacing: '0.15em'
                        }}
                    >
                        OUR SERVICES
                    </h2>
                    <div className="w-24 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8" />
                    <p className="text-white/70 text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed px-4">
                        Comprehensive real estate solutions tailored to your unique needs
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {serviceCategories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <div
                                key={index}
                                className="group relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/8 hover:border-amber-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(251,191,36,0.15)] hover:-translate-y-2"
                                style={{
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                {/* Icon */}
                                <div className="mb-6 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-500">
                                    <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-amber-500" strokeWidth={1.5} />
                                </div>

                                {/* Category Title */}
                                <h3
                                    className="text-white text-xl md:text-2xl font-semibold uppercase tracking-widest mb-6 relative z-10"
                                    style={{
                                        textShadow: '0 0 20px rgba(251, 191, 36, 0.2)',
                                        letterSpacing: '0.1em'
                                    }}
                                >
                                    {category.category}
                                </h3>

                                {/* Gold Accent Line */}
                                <div className="w-12 h-0.5 bg-linear-to-r from-amber-500 to-amber-600 mb-6 group-hover:w-20 transition-all duration-500" />

                                {/* Services List */}
                                <ul className="space-y-3">
                                    {category.services.map((service, idx) => (
                                        <li
                                            key={idx}
                                            className="text-white/70 text-sm md:text-base font-light flex items-start group-hover:text-white/90 transition-colors duration-300"
                                        >
                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500/60 mt-2 mr-3 shrink-0" />
                                            <span>{service}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-500/0 via-amber-500/0 to-amber-600/0 group-hover:from-amber-500/5 group-hover:via-transparent group-hover:to-amber-600/5 transition-all duration-500 pointer-events-none" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Services;
