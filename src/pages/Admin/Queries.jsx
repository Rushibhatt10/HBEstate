import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocuments, deleteDocument } from '../../utils/firestoreUtils';
import { ArrowLeft, Trash2, Mail, Phone, Calendar, Image as ImageIcon } from 'lucide-react';

const Queries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchQueries = async () => {
        try {
            const data = await getDocuments('queries', {
                orderBy: { field: 'createdAt', direction: 'desc' }
            });
            setQueries(data);
        } catch (error) {
            console.error('Error fetching queries:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this query?')) {
            try {
                await deleteDocument('queries', id);
                fetchQueries();
            } catch (error) {
                console.error('Error deleting query:', error);
                alert('Failed to delete query');
            }
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return 'Unknown Date';
        return new Date(isoString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-[#0a1628] text-white p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
                    </button>
                    <h1 className="text-2xl font-bold">Customer Queries</h1>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/60">Loading queries...</p>
                    </div>
                ) : queries.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-white/20" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No queries yet</h3>
                        <p className="text-white/50">Messages from the contact page will appear here.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {queries.map((query) => (
                            <div key={query.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-all flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-white">{query.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-white/40 mt-1">
                                            <Calendar className="w-3 h-3" />
                                            {formatDate(query.createdAt)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(query.id)}
                                        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                                        title="Delete Query"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="space-y-3 mb-6 flex-1">
                                    <div className="flex items-center gap-2 text-white/70 text-sm">
                                        <Phone className="w-4 h-4 text-amber-500" />
                                        <a href={`tel:${query.phone}`} className="hover:text-amber-500 transition-colors">{query.phone}</a>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/70 text-sm">
                                        <Mail className="w-4 h-4 text-amber-500" />
                                        <a href={`mailto:${query.email}`} className="hover:text-amber-500 transition-colors truncate">{query.email}</a>
                                    </div>

                                    <div className="bg-black/20 rounded-xl p-4 text-sm text-white/80 italic border border-white/5 mt-4">
                                        "{query.message}"
                                    </div>
                                </div>

                                {query.image && (
                                    <div className="mt-auto pt-4 border-t border-white/10">
                                        <p className="text-xs text-white/40 mb-2 flex items-center gap-1">
                                            <ImageIcon className="w-3 h-3" /> Attached Image
                                        </p>
                                        <a href={query.image} target="_blank" rel="noopener noreferrer" className="block group relative rounded-lg overflow-hidden h-32">
                                            <img
                                                src={query.image}
                                                alt="Attachment"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-xs text-white font-medium bg-black/50 px-2 py-1 rounded">View Full Size</span>
                                            </div>
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Queries;
