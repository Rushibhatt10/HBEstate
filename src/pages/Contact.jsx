import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Upload, X, MessageSquare, AlertCircle } from 'lucide-react';
import { addDocument } from '../utils/firestoreUtils';
import { uploadImageToCloudinary } from '../utils/cloudinaryUtils';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loginAnonymously } from '../utils/authUtils';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrorMsg('');
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setErrorMsg('');
        setUploading(true);
        try {
            const imageUrl = await uploadImageToCloudinary(file);
            setFormData(prev => ({ ...prev, image: imageUrl }));
        } catch (error) {
            setErrorMsg(`Failed to upload image: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const validateForm = () => {
        if (!formData.name.trim()) return 'Please enter your name';
        if (!formData.email.trim()) return 'Please enter your email';
        if (!formData.phone.trim()) return 'Please enter your phone number';
        if (!formData.message.trim()) return 'Please enter a message';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return 'Please enter a valid email address';

        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        const validationError = validateForm();
        if (validationError) {
            setErrorMsg(validationError);
            return;
        }

        setLoading(true);

        try {
            await loginAnonymously();
            await addDocument('queries', {
                ...formData,
                createdAt: new Date().toISOString()
            });
            setSuccess(true);
            setFormData({ name: '', email: '', phone: '', message: '', image: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error('Error submitting query:', error);
            setErrorMsg(error.message || 'Failed to submit query. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a1628] text-white pt-36 pb-12 px-6">
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-white to-white/60 bg-clip-text text-transparent">
                        Get in Touch
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Have a question about a property or want to list with us? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white/80 mb-1">Phone</h3>
                                        <a href="tel:+919825355650" className="text-white text-lg hover:text-amber-500 transition-colors block">+91 9825355650</a>
                                        <p className="text-white/40 text-sm">Mon-Sat 10:30am to 6pm</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white/80 mb-1">Email</h3>
                                        <a href="mailto:hbestatesolution@gmail.com" className="text-white text-lg hover:text-amber-500 transition-colors block">hbestatesolution@gmail.com</a>
                                        <p className="text-white/40 text-sm">Online support</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white/80 mb-1">Office</h3>
                                        <p className="text-white text-lg max-w-xs mx-auto">11, New York Trade Center, SG Highway, Thaltej cross road, Thaltej, AHMEDABAD, Gujarat 380054, India</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <h3 className="font-medium text-white/80 mb-4">Connect with us</h3>
                                <a
                                    href="https://wa.me/919825355650"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-xl transition-all"
                                >
                                    <MessageSquare className="w-5 h-5" /> Chat on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Query Form */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                        {success ? (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                                <p className="text-white/60">Thank you for contacting us. We will get back to you shortly.</p>
                                <button
                                    onClick={() => setSuccess(false)}
                                    className="mt-6 text-amber-500 hover:text-amber-400 font-medium"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {errorMsg && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                        <p className="text-red-200 text-sm">{errorMsg}</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="Name"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            autoComplete="tel"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                            placeholder="+91xxxxxxxxxx"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Your Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-amber-500/50 transition-all resize-none"
                                        placeholder="Tell us what you're looking for..."
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="image-upload" className="block text-sm font-medium text-white/70 mb-2">Attach Photo (Optional)</label>
                                    {!formData.image ? (
                                        <div className="relative border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-amber-500/50 transition-colors bg-white/5">
                                            <input
                                                type="file"
                                                id="image-upload"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                disabled={uploading}
                                            />
                                            <div className="flex flex-col items-center gap-2">
                                                {uploading ? (
                                                    <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                                ) : (
                                                    <Upload className="w-6 h-6 text-white/40" />
                                                )}
                                                <p className="text-white/60 text-sm">
                                                    {uploading ? 'Uploading...' : 'Click to upload property photo'}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative rounded-xl overflow-hidden border border-white/10 group inline-block">
                                            <img
                                                src={formData.image}
                                                alt="Uploaded"
                                                className="h-32 w-auto object-cover rounded-xl"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || uploading}

                                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Sending...' : (
                                        <>
                                            Send Message <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
