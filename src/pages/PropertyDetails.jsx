import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getDocument } from '../utils/firestoreUtils';
import {
    ArrowLeft, MapPin, BedDouble, Square, Phone,
    MessageCircle, Check, Calendar, Share2
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getDocument('properties', id);
                setProperty(data);
            } catch (error) {
                console.error('Error fetching property:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleContact = (type) => {
        const message = `Hi, I'm interested in ${property.title} located at ${property.location}. Please provide more details.`;
        if (type === 'whatsapp') {
            window.open(`https://wa.me/919825355650?text=${encodeURIComponent(message)}`, '_blank');
        } else {
            window.location.href = `tel:+919825355650`;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen bg-[#0a1628] flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
                <Link to="/properties" className="text-amber-500 hover:underline">Back to Properties</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a1628] text-white font-sans pb-20">
            {/* Navbar */}
            <Navbar />

            <div className="pt-36 px-4 md:px-6 max-w-7xl mx-auto">
                <div className="space-y-4 mb-8">
                    {/* Hero Image */}
                    <div className="relative h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden group">
                        <img
                            src={property.images && property.images.length > 0 ? (property.selectedImage || property.images[0]) : property.image}
                            alt={property.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#0a1628] via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                            <div className="flex gap-3 mb-4">
                                <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                                    {property.type}
                                </span>
                                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
                                    {property.status}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-2">{property.title}</h1>
                            <div className="flex items-center gap-2 text-white/70 text-lg">
                                <MapPin className="w-5 h-5 text-amber-500" /> {property.location}
                            </div>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    {property.images && property.images.length > 1 && (
                        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                            {property.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setProperty(prev => ({ ...prev, selectedImage: img }))}
                                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${(property.selectedImage === img || (!property.selectedImage && index === 0))
                                            ? 'border-amber-500 ring-2 ring-amber-500/50'
                                            : 'border-transparent hover:border-white/30'
                                        }`}
                                >
                                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Key Features */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Price</p>
                                <p className="text-xl font-bold text-amber-500">{property.price}</p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Area</p>
                                <div className="flex items-center justify-center gap-2 text-xl font-bold">
                                    <Square className="w-5 h-5 text-white/70" /> {property.area}
                                </div>
                            </div>
                            {property.bhk && (
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                    <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Configuration</p>
                                    <div className="flex items-center justify-center gap-2 text-xl font-bold">
                                        <BedDouble className="w-5 h-5 text-white/70" /> {property.bhk} BHK
                                    </div>
                                </div>
                            )}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                                <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Posted</p>
                                <div className="flex items-center justify-center gap-2 text-lg font-bold">
                                    <Calendar className="w-5 h-5 text-white/70" /> Recent
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
                            <h3 className="text-2xl font-semibold mb-6">About this Property</h3>
                            <h3 className="text-xl font-semibold mb-2">Interested?</h3>
                            <p className="text-white/60 mb-6 text-sm">Contact us directly to schedule a visit or get more details.</p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => handleContact('call')}
                                    className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
                                >
                                    <Phone className="w-5 h-5" /> Call Now
                                </button>
                                <button
                                    onClick={() => handleContact('whatsapp')}
                                    className="w-full py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-600/20"
                                >
                                    <MessageCircle className="w-5 h-5" /> WhatsApp
                                </button>
                                <button className="w-full py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium flex items-center justify-center gap-2 transition-all border border-white/10">
                                    <Share2 className="w-5 h-5" /> Share Property
                                </button>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10 text-center">
                                <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Managed By</p>
                                <p className="font-bold text-lg">HB Estate</p>
                                <p className="text-amber-500 text-sm">Premium Real Estate Partner</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PropertyDetails;
