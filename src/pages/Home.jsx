import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from './Hero'
import Services from './Services'
import About from './About'
import Footer from '../components/Footer'

const Home = () => {
    const [activeTab, setActiveTab] = useState('about')

    return (
        <div className="bg-[#0a1628] min-h-screen">
            <Navbar />
            <Hero />

            {/* Toggle Slider Section */}
            <div className="sticky top-0 z-40 bg-[#0a1628]/80 backdrop-blur-md border-b border-white/5 py-4">
                <div className="flex justify-center items-center px-4">
                    <div className="relative bg-white/5 border border-white/10 rounded-full p-1 flex w-full max-w-[350px] h-14 shadow-2xl backdrop-blur-sm">
                        {/* Sliding Background */}
                        <div
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-amber-500 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all duration-300 ease-in-out ${activeTab === 'about' ? 'left-1' : 'left-[calc(50%+2px)]'
                                }`}
                        ></div>

                        {/* About Button */}
                        <button
                            onClick={() => setActiveTab('about')}
                            className={`relative flex-1 z-10 text-sm md:text-base font-bold tracking-widest transition-colors duration-200 uppercase ${activeTab === 'about' ? 'text-black' : 'text-white/60 hover:text-white'
                                }`}
                        >
                            About Us
                        </button>

                        {/* Services Button */}
                        <button
                            onClick={() => setActiveTab('services')}
                            className={`relative flex-1 z-10 text-sm md:text-base font-bold tracking-widest transition-colors duration-200 uppercase ${activeTab === 'services' ? 'text-black' : 'text-white/60 hover:text-white'
                                }`}
                        >
                            Services
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Sections */}
            <div className="transition-opacity duration-300 ease-in-out animate-fade-in min-h-[50vh]">
                {activeTab === 'about' ? <About /> : <Services />}
            </div>

            <Footer />
        </div>
    )
}

export default Home
