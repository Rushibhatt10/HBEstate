import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, List, LayoutGrid,
  BedDouble, MapPin, X,
  ArrowUpDown, AlertCircle, RotateCcw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getDocuments } from '../utils/firestoreUtils';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';



const normalizeText = (value) => (
  value === undefined || value === null ? '' : value.toString().trim().toLowerCase()
);

const toTitleCase = (value) => (
  value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
);



const PropertyImage = ({ src, title, isList }) => {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;
  const sizeClass = isList ? 'h-56 md:h-auto md:w-72' : 'h-60 w-full';
  const initial = title?.trim()?.charAt(0)?.toUpperCase() || 'H';

  if (showImage) {
    return (
      <img
        src={src}
        alt={title}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`${sizeClass} w-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} w-full bg-gradient-to-br from-amber-500/20 via-slate-900/40 to-slate-950/60 flex items-center justify-center text-3xl font-semibold text-white/70`}
      aria-label="No image available"
    >
      {initial}
    </div>
  );
};

const Properties = () => {
  const [viewMode, setViewMode] = useState('grid');

  const [selectedType, setSelectedType] = useState('all');
  const [selectedBhk, setSelectedBhk] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = (propertyId) => {
    if (!currentUser) {
      setShowLoginModal(true);
    } else {
      navigate(`/property/${propertyId}`);
    }
  };

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

  const normalizedProperties = useMemo(() => (
    properties.map((property) => {
      const createdAtValue = property?.createdAt?.toDate
        ? property.createdAt.toDate().getTime()
        : Date.parse(property?.createdAt || '');
      const typeLabel = property?.type?.toString().trim() || '';
      const bhkLabel = property?.bhk?.toString().trim() || '';

      return {
        ...property,
        titleValue: normalizeText(property?.title),
        locationValue: normalizeText(property?.location),
        typeValue: normalizeText(typeLabel),
        typeLabel,
        bhkValue: normalizeText(bhkLabel),
        bhkLabel,
        createdAtValue: Number.isFinite(createdAtValue) ? createdAtValue : 0
      };
    })
  ), [properties]);



  const typeOptions = useMemo(() => {
    const options = new Map();
    normalizedProperties.forEach((property) => {
      if (property.typeValue) {
        const label = property.typeLabel || toTitleCase(property.typeValue);
        if (!options.has(property.typeValue)) {
          options.set(property.typeValue, label);
        }
      }
    });
    const entries = Array.from(options.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
    return [{ value: 'all', label: 'All Types' }, ...entries];
  }, [normalizedProperties]);

  const bhkOptions = useMemo(() => {
    const options = new Map();
    normalizedProperties.forEach((property) => {
      if (property.bhkValue) {
        const label = property.bhkLabel || property.bhkValue;
        if (!options.has(property.bhkValue)) {
          options.set(property.bhkValue, label);
        }
      }
    });
    const entries = Array.from(options.entries())
      .map(([value, label]) => ({ value, label }))
      .sort((a, b) => {
        const aNum = Number(a.value);
        const bNum = Number(b.value);
        if (Number.isFinite(aNum) && Number.isFinite(bNum)) return aNum - bNum;
        return a.label.localeCompare(b.label);
      });
    return [{ value: 'all', label: 'All BHK' }, ...entries];
  }, [normalizedProperties]);

  const filteredProperties = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return normalizedProperties
      .filter((property) => {
        if (!query) return true;
        const title = property.titleValue || '';
        const location = property.locationValue || '';
        return title.includes(query) || location.includes(query);
      })
      .filter((property) => selectedType === 'all' || property.typeValue === selectedType)
      .filter((property) => selectedBhk === 'all' || property.bhkValue === selectedBhk)
      .sort((a, b) => b.createdAtValue - a.createdAtValue);
  }, [normalizedProperties, searchQuery, selectedType, selectedBhk, sortBy]);



  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedBhk('all');
    setSortBy('newest');
    setSortBy('newest');
  };

  const hasActiveFilters = (
    searchQuery ||
    selectedType !== 'all' ||
    selectedBhk !== 'all' ||
    sortBy !== 'newest'
  );

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <Navbar />

      <div className="pt-36 pb-20 px-4 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400/70">Listings</p>
          <h1 className="text-3xl md:text-4xl font-semibold">Find a place that fits you</h1>
          <p className="text-white/60 max-w-2xl">
            Browse handpicked homes and refine quickly with search, price, and layout filters.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1.2fr_1fr_auto] gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by title or location"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400/60"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <select
              value={selectedType}
              onChange={(event) => setSelectedType(event.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400/60"
            >
              {typeOptions.map((type) => (
                <option key={type.value} value={type.value} className="text-slate-900">
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedBhk}
              onChange={(event) => setSelectedBhk(event.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400/60"
            >
              {bhkOptions.map((bhk) => {
                const displayLabel = bhk.value === 'all'
                  ? bhk.label
                  : /\bbhk\b/i.test(bhk.label)
                    ? bhk.label
                    : `${bhk.label} BHK`;
                return (
                  <option key={bhk.value} value={bhk.value} className="text-slate-900">
                    {displayLabel}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400/60"
            >
              <option value="newest" className="text-slate-900">Newest</option>
              <option value="price-asc" className="text-slate-900">Price: Low to High</option>
              <option value="price-desc" className="text-slate-900">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-2">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition ${viewMode === 'grid' ? 'bg-amber-500 text-slate-900' : 'text-white/60 hover:text-white'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition ${viewMode === 'list' ? 'bg-amber-500 text-slate-900' : 'text-white/60 hover:text-white'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/60">
          <span>Showing {filteredProperties.length} of {properties.length} listings</span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-amber-400/70 transition"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}
        </div>

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
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                className={`bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/50 hover:shadow-xl ${viewMode === 'list' ? 'md:flex md:items-stretch' : ''}`}
              >
                <PropertyImage
                  src={property.image}
                  title={property?.title || 'Property'}
                  isList={viewMode === 'list'}
                />

                <div className={`p-5 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between gap-4' : ''}`}>
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">{property?.title || 'Untitled Property'}</h3>
                        <p className="text-sm text-white/60 flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {property?.location || 'Location not specified'}
                        </p>
                      </div>
                      <span className="text-amber-400 font-semibold whitespace-nowrap">
                        {property?.price || 'Price on request'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-white/70">
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-4 h-4 text-amber-500" />
                        {property?.bhk ?? 'N/A'} BHK
                      </span>
                      {property?.type && (
                        <span className="px-2 py-1 rounded-full bg-white/10 text-xs uppercase tracking-wide">
                          {property.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(property.id)}
                    className="block w-full text-center py-2 bg-white/10 rounded-lg hover:bg-amber-500 hover:text-slate-900 transition"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </div>

      <Footer />
    </div>
  );
};

export default Properties;
