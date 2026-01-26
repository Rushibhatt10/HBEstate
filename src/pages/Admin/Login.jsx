import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Hardcoded Password - CHANGE THIS HERE
    const ADMIN_PASSWORD = "admin";

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay for better UX
        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                // Set a flag in localStorage to indicate logged in state
                localStorage.setItem('isAdminLoggedIn', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid password');
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                        <Lock className="w-8 h-8 text-amber-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Admin Access</h1>
                    <p className="text-white/60">Enter password to continue</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            'Unlock Panel'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
