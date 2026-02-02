import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0a1628] border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand & Social */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/logo-removebg-preview.png" alt="HB-Estates" className="h-16 w-auto" />
                        </div>
                        <p className="text-white/60 mb-6 max-w-xs">
                            Premium real estate solutions tailored to your lifestyle. Find your dream property with HB Estates.
                        </p>

                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4 text-white/60">
                            <li><Link to="/" className="hover:text-amber-500 transition-colors">Home</Link></li>
                            <li><Link to="/properties" className="hover:text-amber-500 transition-colors">Properties</Link></li>
                            <li><Link to="/contact" className="hover:text-amber-500 transition-colors">Contact Us</Link></li>
                            <li><a href="/#about" className="hover:text-amber-500 transition-colors">About Us</a></li>
                            <li><a href="/#services" className="hover:text-amber-500 transition-colors">Services</a></li>
                        </ul>
                    </div>

                    {/* Contact Info (Centered as requested) */}
                    <div className="flex flex-col items-center text-center">
                        <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
                        <div className="space-y-6">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mb-1">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <a href="tel:+919825355650" className="text-white hover:text-amber-500 transition-colors block font-medium">+91 9825355650</a>
                                    <span className="text-white/40 text-xs">Mon-Sat 10:30am to 6pm</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mb-1">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <a href="mailto:hbestatesolution@gmail.com" className="text-white hover:text-amber-500 transition-colors block font-medium">hbestatesolution@gmail.com</a>
                                    <span className="text-white/40 text-xs">Online support</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mb-1">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <p className="text-white/80 text-sm max-w-[250px]">
                                    11, New York Trade Center, SG Highway, Thaltej cross road, Thaltej, AHMEDABAD, Gujarat 380054, India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
                    <p>&copy; {new Date().getFullYear()} HB Estate . All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
