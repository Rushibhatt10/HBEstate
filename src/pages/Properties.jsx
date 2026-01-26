import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, Map as MapIcon, List, Heart,
  ArrowRight, Phone, MessageCircle, ChevronDown,
  BedDouble, Square, MapPin, Star, X,
  ArrowUpDown, AlertCircle, RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDocuments } from '../utils/firestoreUtils';
import { parsePrice } from '../utils/priceUtils';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Properties = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [selectedType, setSelectedType] = useState('All');
  const [selectedBhk, setSelectedBhk] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getDocuments('properties', {
          orderBy: { field: 'createdAt', direction: 'desc' }
        });
        setProperties(data);
      } catch (err) {
        setError({
          title: 'Failed to Load Properties',
          message: err.message || 'Something went wrong'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filteredProperties = properties
    .filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(p => selectedType === 'All' || p.type === selectedType)
    .filter(p => selectedBhk === 'All' || p.bhk == selectedBhk)
    .filter(p => {
      const price = parsePrice(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
      if (sortBy === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Navbar />

      <div className="pt-36 pb-20 px-4 max-w-[1600px] mx-auto">

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-500" />
              <div>
                <h3 className="text-red-500 font-semibold">{error.title}</h3>
                <p className="text-red-300">{error.message}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  <RotateCcw className="inline w-4 h-4 mr-2" />
                  Retry
                </button>
              </div>
            </div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-24 text-white/60">
            <Search className="mx-auto w-12 h-12 mb-4" />
            <p>No properties found</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'}`}
          >
            {filteredProperties.map(property => (
              <motion.div
                key={property.id}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:shadow-xl"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-60 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <p className="text-sm text-white/60 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {property.location}
                  </p>

                  <div className="flex justify-between mt-3 text-sm">
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4 text-amber-500" />
                      {property.bhk} BHK
                    </span>
                    <span className="text-amber-400 font-semibold">
                      {property.price}
                    </span>
                  </div>

                  <Link
                    to={`/property/${property.id}`}
                    className="block mt-4 text-center py-2 bg-white/10 rounded-lg hover:bg-amber-500 transition"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Properties;