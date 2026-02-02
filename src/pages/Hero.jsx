import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const mobileImages = [
    '/mob.png',
    '/mob2.jpeg',
    '/mob3.jpg',
    '/mob4.jpg',
    '/mob5.png',
    '/mob6.jpg'
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % mobileImages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  return (
    <section id="home" className="relative w-full min-h-dvh overflow-hidden bg-black">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: isMobile
              ? `url('${mobileImages[currentImageIndex]}')`
              : `url('/webp1.png')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-6 pt-24">
        <div className="text-center max-w-5xl">
          <h1
            className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 8px 40px rgba(0, 0, 0, 0.6)' }}
          >
            Find Your Perfect
          </h1>
          <h2
            className="text-white text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mt-2"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 8px 40px rgba(0, 0, 0, 0.6)' }}
          >
            Property
          </h2>
          <p
            className="text-white/80 text-xl md:text-2xl mt-6 font-light"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.7)' }}
          >
            with HB Estate Solutions
          </p>

          <Link to="/properties" className="mt-12 inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/90 transition-all shadow-2xl hover:shadow-white/20 hover:scale-105">
            Explore Properties
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
