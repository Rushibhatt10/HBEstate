import { useState, useEffect } from 'react';
import { getDocuments } from '../../utils/firestoreUtils';
import { Eye, Calendar, User, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserActivity = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await getDocuments('property_views', {
                    orderBy: { field: 'viewedAt', direction: 'desc' },
                    limit: 50
                });
                setLogs(data);
            } catch (error) {
                console.error("Error fetching logs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        return date.toLocaleString();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
                <Eye className="w-8 h-8 text-amber-500" />
                User Activity Log
            </h1>

            <div className="bg-[#0a1628] border border-white/10 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-white/60 text-sm uppercase tracking-wider">
                                <th className="p-4 font-semibold">User</th>
                                <th className="p-4 font-semibold">Property Viewed</th>
                                <th className="p-4 font-semibold">Time</th>
                                <th className="p-4 font-semibold text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-white/80">
                            {logs.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-white/40 italic">
                                        No activity recorded yet.
                                    </td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white">{log.userName}</div>
                                                    <div className="text-xs text-white/50">{log.userEmail}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium">
                                            {log.propertyTitle || 'Unknown Property'}
                                        </td>
                                        <td className="p-4 text-sm text-white/60">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(log.viewedAt)}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            {log.propertyId && (
                                                <Link
                                                    to={`/property/${log.propertyId}`}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-500 hover:text-amber-400 uppercase tracking-wider border border-amber-500/30 px-3 py-1.5 rounded-lg hover:bg-amber-500/10 transition-colors"
                                                >
                                                    View <ExternalLink className="w-3 h-3" />
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserActivity;
