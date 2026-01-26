import { Phone, MapPin, Award, Users } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="relative w-full min-h-screen bg-[#0a1628] py-20 md:py-24 px-4 md:px-6 overflow-hidden">
            {/* Ambient Glow Effects */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

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
                        ABOUT US
                    </h2>
                    <div className="w-24 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8" />
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-16">
                    {/* Left Column - Company Info */}
                    <div className="space-y-8">
                        {/* Company Description */}
                        <div
                            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/8 hover:border-amber-500/30 transition-all duration-500"
                            style={{
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <h3 className="text-white text-2xl md:text-3xl font-semibold uppercase tracking-wider mb-6">
                                HB Estate Solution
                            </h3>
                            <div className="w-16 h-0.5 bg-linear-to-r from-amber-500 to-amber-600 mb-6" />
                            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                                HB Estate Solution is a trusted real estate consultancy based in Ahmedabad, offering expert property solutions with over <span className="text-amber-500 font-semibold">11+ years of experience</span> in the real estate industry.
                            </p>
                            <p className="text-white/80 text-base md:text-lg leading-relaxed mb-6">
                                We specialize in residential and commercial property buying, selling, renting, and investment consulting across Ahmedabad and surrounding areas.
                            </p>
                            <p className="text-white/80 text-base md:text-lg leading-relaxed">
                                With a strong reputation for transparency, reliability, and customer satisfaction, we have successfully served <span className="text-amber-500 font-semibold">thousands of happy clients</span>, helping them find the right property that fits their needs and budget.
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/8 hover:border-amber-500/30 transition-all duration-500"
                                style={{
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                <Award className="w-8 h-8 text-amber-500 mx-auto mb-3" strokeWidth={1.5} />
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">11+</div>
                                <div className="text-white/70 text-sm uppercase tracking-wider">Years Experience</div>
                            </div>
                            <div
                                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/8 hover:border-amber-500/30 transition-all duration-500"
                                style={{
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                <Users className="w-8 h-8 text-amber-500 mx-auto mb-3" strokeWidth={1.5} />
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
                                <div className="text-white/70 text-sm uppercase tracking-wider">Happy Clients</div>
                            </div>
                        </div>

                        {/* Our Approach */}
                        <div
                            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/8 hover:border-amber-500/30 transition-all duration-500"
                            style={{
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <h4 className="text-white text-xl md:text-2xl font-semibold uppercase tracking-wider mb-4">
                                Our Approach
                            </h4>
                            <div className="w-12 h-0.5 bg-linear-to-r from-amber-500 to-amber-600 mb-6" />
                            <p className="text-white/80 text-base md:text-lg leading-relaxed">
                                Our team provides complete assistance — from property selection and site visits to documentation and final deal closure.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Founder & Contact */}
                    <div className="space-y-8">
                        {/* Founder Info */}
                        <div
                            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/8 hover:border-amber-500/30 transition-all duration-500"
                            style={{
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-linear-to-br from-amber-500/20 to-amber-600/20 border-2 border-amber-500/30 mb-4 mx-auto">
                                    <span className="text-4xl md:text-5xl font-bold text-amber-500">HB</span>
                                </div>
                                <h3 className="text-white text-2xl md:text-3xl font-semibold uppercase tracking-wider mb-2">
                                    Hardik Bhatt
                                </h3>
                                <p className="text-amber-500 text-sm md:text-base uppercase tracking-widest font-light">
                                    Co-Founder
                                </p>
                            </div>
                            <div className="w-16 h-0.5 bg-linear-to-r from-amber-500 to-amber-600 mx-auto mb-6" />
                            <p className="text-white/80 text-base md:text-lg leading-relaxed text-center">
                                Leading HB Estate Solution with a vision to provide transparent and reliable real estate services to every client.
                            </p>
                        </div>

                        {/* Contact Information */}
                        <div
                            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/8 hover:border-amber-500/30 transition-all duration-500"
                            style={{
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <h4 className="text-white text-xl md:text-2xl font-semibold uppercase tracking-wider mb-6">
                                Contact Information
                            </h4>
                            <div className="w-12 h-0.5 bg-linear-to-r from-amber-500 to-amber-600 mb-6" />

                            {/* Phone */}
                            <div className="flex items-start mb-6 md:mb-8 group">
                                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/10 border border-amber-500/20 shrink-0 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-300">
                                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-amber-500" strokeWidth={1.5} />
                                </div>
                                <div className="ml-3 md:ml-4 flex-1 min-w-0">
                                    <p className="text-white/60 text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2">Phone</p>
                                    <a
                                        href="tel:+919825355650"
                                        className="text-white text-base md:text-lg lg:text-xl hover:text-amber-500 transition-colors duration-300 block break-all"
                                    >
                                        +91 98253 55650
                                    </a>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start group">
                                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-amber-500/10 border border-amber-500/20 shrink-0 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all duration-300">
                                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-amber-500" strokeWidth={1.5} />
                                </div>
                                <div className="ml-3 md:ml-4 flex-1 min-w-0">
                                    <p className="text-white/60 text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2">Address</p>
                                    <p className="text-white/90 text-sm md:text-base lg:text-lg leading-relaxed">
                                        11, New York Trade Center,<br />
                                        SG Highway, Thaltej Cross Road,<br />
                                        Thaltej, Ahmedabad,<br />
                                        Gujarat 380054, India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Google Map */}
                        <div
                            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 hover:bg-white/8 hover:border-amber-500/30 transition-all duration-500 overflow-hidden"
                            style={{
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <h4 className="text-white text-lg md:text-xl font-semibold uppercase tracking-wider mb-4">
                                Find Us Here
                            </h4>
                            <div className="w-12 h-0.5 bg-linear-to-r from-amber-500 to-amber-600 mb-4" />
                            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border border-white/10">
                                <iframe
                                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=11+New+York+Trade+Center+SG+Highway+Thaltej+Cross+Road+Thaltej+Ahmedabad+Gujarat+380054+India&zoom=15"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="HB Estate Solution Location"
                                    className="grayscale hover:grayscale-0 transition-all duration-500"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
