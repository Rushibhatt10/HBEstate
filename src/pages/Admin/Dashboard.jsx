import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocuments, deleteDocument } from '../../utils/firestoreUtils';
import { Plus, Trash2, Edit, LogOut, MapPin, Eye, Search, Home, Mail } from 'lucide-react';

const Dashboard = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchProperties = async () => {
        try {
            const data = await getDocuments('properties', {
                orderBy: { field: 'createdAt', direction: 'desc' }
            });
            setProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            try {
                await deleteDocument('properties', id);
                fetchProperties();
            } catch (error) {
                console.error('Error deleting property:', error);
                alert('Failed to delete property');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/admin/login');
    };

    const filteredProperties = properties.filter(property =>
        property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0a1628] text-white p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                        <p className="text-white/60">Manage your property listings</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <Link
                            to="/admin/queries"
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                            title="View Queries"
                        >
                            <Mail className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/admin/add-property"
                            className="flex-1 md:flex-none bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all font-medium shadow-lg shadow-amber-500/20"
                        >
                            <Plus className="w-5 h-5" /> Add Property
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
                            title="Logout"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-8 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search properties by title or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-amber-500/50 transition-all shadow-sm"
                    />
                </div>

                {/* Content */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white/60">Loading properties...</p>
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Home className="w-8 h-8 text-white/20" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-2">No properties found</h3>
                        <p className="text-white/50 mb-6">
                            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first property"}
                        </p>
                        {!searchTerm && (
                            <Link
                                to="/admin/add-property"
                                className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-medium"
                            >
                                <Plus className="w-4 h-4" /> Create New Listing
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => (
                            <div key={property.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-500/30 transition-all hover:shadow-xl hover:shadow-black/20 flex flex-col">
                                {/* Image Area */}
                                <div className="relative h-48 overflow-hidden bg-black/20">
                                    {property.image ? (
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/20">
                                            <Home className="w-12 h-12" />
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${property.status === 'Ready to Move' ? 'bg-green-500/80 text-white' :
                                            property.status === 'Under Construction' ? 'bg-amber-500/80 text-white' :
                                                'bg-blue-500/80 text-white'
                                            }`}>
                                            {property.status}
                                        </span>
                                    </div>

                                    {/* Map Visibility Badge */}
                                    <div className="absolute top-3 right-3">
                                        {property.showOnMap ? (
                                            <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-full text-green-400" title="Visible on Map">
                                                <MapPin className="w-3 h-3" />
                                            </div>
                                        ) : (
                                            <div className="bg-black/50 backdrop-blur-md p-1.5 rounded-full text-red-400" title="Hidden from Map">
                                                <MapPin className="w-3 h-3" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-5 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-white line-clamp-1" title={property.title}>{property.title}</h3>
                                        <span className="text-amber-500 font-bold whitespace-nowrap ml-2">{property.price}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-sm text-white/50 mb-4">
                                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                                        <span className="truncate">{property.location}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-white/40 mb-6">
                                        <span className="bg-white/5 px-2 py-1 rounded">{property.type}</span>
                                        {property.bhk && <span className="bg-white/5 px-2 py-1 rounded">{property.bhk} BHK</span>}
                                        {property.area && <span className="bg-white/5 px-2 py-1 rounded">{property.area} sq.ft</span>}
                                    </div>

                                    {/* Actions */}
                                    <div className="mt-auto grid grid-cols-3 gap-2 pt-4 border-t border-white/10">
                                        <Link
                                            to={`/property/${property.id}`}
                                            className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors text-sm font-medium"
                                        >
                                            <Eye className="w-4 h-4" /> View
                                        </Link>
                                        <Link
                                            to={`/admin/edit-property/${property.id}`}
                                            className="flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors text-sm font-medium"
                                        >
                                            <Edit className="w-4 h-4" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(property.id)}
                                            className="flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors text-sm font-medium"
                                        >
                                            <Trash2 className="w-4 h-4" /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
