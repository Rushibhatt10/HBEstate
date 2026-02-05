import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const LoginModal = ({ isOpen, onClose, message = "Please login to view property details" }) => {
    const { loginWithGoogle } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            onClose(); // Close modal on success
        } catch (err) {
            setError(err.message || 'Failed to sign in. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-md bg-[#0a1628] border border-white/10 rounded-2xl p-8 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                        <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Login Required</h3>
                    <p className="text-white/60">{message}</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin" />
                    ) : (
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                    )}
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default LoginModal;
