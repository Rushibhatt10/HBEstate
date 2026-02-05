import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Smooth scroll function
    const scrollToSection = (sectionId) => {
        setIsMobileMenuOpen(false);

        // If we are already on the home page, scroll to the section
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            // If we are on another page, navigate to home with hash
            navigate(`/#${sectionId}`);
        }
    };

    // Handle scroll from hash when location changes (e.g. arriving from another page)
    useEffect(() => {
        if (location.pathname === '/' && location.hash) {
            const sectionId = location.hash.replace('#', '');
            const element = document.getElementById(sectionId);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location]);

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img
                        src="/logo-removebg-preview.png"
                        alt="HB-Estates Logo"
                        className="h-20 w-auto md:h-22"
                    />
                </div>

                {/* Desktop Navigation - Glass Capsule Design */}
                <div className="hidden md:block">
                    <ul className="flex items-center gap-8 text-white/90 text-sm backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-10 py-3 shadow-lg">
                        <li className="hover:text-white cursor-pointer transition" onClick={() => scrollToSection('home')}>Home</li>
                        <li className="hover:text-white cursor-pointer transition" onClick={() => scrollToSection('services')}>Services</li>
                        <li className="hover:text-white cursor-pointer transition" onClick={() => scrollToSection('about')}>About</li>
                        <Link to="/properties" className="hover:text-white cursor-pointer transition">Properties</Link>
                        <Link to="/contact" className="hover:text-white cursor-pointer transition">Contact</Link>
                    </ul>
                </div>

                {/* Contact Us Button (Desktop) - Glass Capsule */}
                

                {/* Mobile Hamburger Menu */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-white p-2 focus:outline-none"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-8 h-8" />
                    ) : (
                        <Menu className="w-8 h-8" />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden h-screen">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-8 right-8 text-white p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <ul className="flex flex-col items-center gap-8 text-white text-xl">
                        <li className="hover:text-amber-500 cursor-pointer transition" onClick={() => scrollToSection('home')}>Home</li>
                        <li className="hover:text-amber-500 cursor-pointer transition" onClick={() => scrollToSection('services')}>Services</li>
                        <li className="hover:text-amber-500 cursor-pointer transition" onClick={() => scrollToSection('about')}>About</li>
                        <Link to="/properties" className="hover:text-amber-500 cursor-pointer transition" onClick={() => setIsMobileMenuOpen(false)}>Properties</Link>
                        <Link to="/contact" className="hover:text-amber-500 cursor-pointer transition" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
