import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDocument, getDocument, updateDocument } from '../../utils/firestoreUtils';
import { loginAnonymously } from '../../utils/authUtils';
import { uploadImageToCloudinary } from '../../utils/cloudinaryUtils';
import { ArrowLeft, Upload, MapPin, X, AlertCircle, Building2, Layout, Ruler, Tag, DollarSign, Image as ImageIcon } from 'lucide-react';

const AddProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    type: 'Apartment',
    status: 'Ready to Move',
    area: '',
    bhk: '',
    description: '',
    images: [],
    image: '',
    showOnMap: true,
    mapLink: '',
    featured: false
  });

  useEffect(() => {
    let isMounted = true;
    if (isEditMode) {
      const fetchProperty = async () => {
        try {
          const data = await getDocument('properties', id);
          if (isMounted) {
            if (data) {
              // Ensure images is always an array
              const images = data.images || (data.image ? [data.image] : []);
              setFormData({ ...data, images });
            } else {
              setError('Property not found.');
            }
          }
        } catch (err) {
          console.error(err);
          if (isMounted) setError('Failed to load property details.');
        }
      };
      fetchProperty();
    }
    return () => { isMounted = false; };
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Smart Map Link Handler
    if (name === 'mapLink') {
      let cleanValue = value;
      // Parse iframe src if user pastes full embed code
      if (cleanValue.includes('<iframe')) {
        const srcMatch = cleanValue.match(/src="([^"]+)"/);
        if (srcMatch && srcMatch[1]) {
          cleanValue = srcMatch[1];
        }
      }
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (formData.images.length + files.length > 10) {
      setError('You can only upload up to 10 images.');
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      const uploadPromises = files.map(file => uploadImageToCloudinary(file));
      const results = await Promise.allSettled(uploadPromises);

      const successfulUrls = results
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value);

      if (successfulUrls.length === 0 && results.length > 0) {
        throw new Error("Failed to upload images. Please check your connection.");
      }

      setFormData(prev => {
        const updated = [...prev.images, ...successfulUrls];
        return {
          ...prev,
          images: updated,
          image: prev.image || updated[0] // Set primary if none exists
        };
      });

      const failedCount = results.length - successfulUrls.length;
      if (failedCount > 0) {
        setError(`${successfulUrls.length} uploaded, but ${failedCount} failed.`);
      } else {
        setSuccess('Images uploaded successfully!');
        setTimeout(() => setSuccess(''), 2500);
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'Image upload failed. Please try again.');
    } finally {
      setUploadingImage(false);
      e.target.value = ''; // Reset input to allow re-uploading same file
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => {
      const imgToRemove = prev.images[index];
      const imgs = prev.images.filter((_, i) => i !== index);

      let newPrimaryImage = prev.image;
      if (prev.image === imgToRemove) {
        newPrimaryImage = imgs.length > 0 ? imgs[0] : '';
      }

      return {
        ...prev,
        images: imgs,
        image: newPrimaryImage
      };
    });
  };

  const handleSetPrimary = (imgUrl) => {
    setFormData(prev => ({
      ...prev,
      image: imgUrl
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.title.trim() || !formData.price || !formData.location.trim()) {
      setError("Please fill in all required fields (Title, Price, Location).");
      setLoading(false);
      return;
    }

    try {
      await loginAnonymously();

      // Clean up price (remove commas if user added them)
      const cleanedData = {
        ...formData,
        price: formData.price.toString().replace(/,/g, ''), // Ensure clean number string
        updatedAt: new Date().toISOString()
      };

      if (!isEditMode) {
        cleanedData.createdAt = new Date().toISOString();
      }

      if (isEditMode) {
        await updateDocument('properties', id, cleanedData);
        setSuccess('Property updated successfully!');
      } else {
        await addDocument('properties', cleanedData);
        setSuccess('Property added successfully!');
      }

      // Small delay to allow success message to be seen
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      setError('Failed to save property. Please check your connection.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-6 pb-20">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </button>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">

          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-linear-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              {isEditMode ? 'Edit Property' : 'Add New Property'}
            </h1>
            <p className="text-white/60 mt-2">Fill in the details below to list a property.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="text-red-400 w-5 h-5 shrink-0" />
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-black text-xs font-bold">✓</div>
              <p className="text-green-400 font-medium">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Section 1: Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-500/80 flex items-center gap-2">
                <Layout className="w-4 h-4" /> Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Property Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Luxury Villa in Palm Jumeirah"
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-medium"
                    required
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Price (₹ or $) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="e.g. 2,50,00,000"
                      className="w-full bg-black/20 border border-white/10 rounded-xl p-3 pl-10 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all font-medium"
                      required
                    />
                  </div>
                  <p className="text-xs text-white/30 pl-1">Enter numeric value (commas allowed)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Property Type</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl p-3 pl-10 focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                    >
                      <option value="Apartment" className="bg-[#0a1628]">Apartment</option>
                      <option value="Villa" className="bg-[#0a1628]">Villa</option>
                      <option value="Plot" className="bg-[#0a1628]">Plot</option>
                      <option value="Commercial" className="bg-[#0a1628]">Commercial</option>
                      <option value="Penthouse" className="bg-[#0a1628]">Penthouse</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Status</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full bg-black/20 border border-white/10 rounded-xl p-3 pl-10 focus:outline-none focus:border-amber-500/50 appearance-none cursor-pointer"
                    >
                      <option value="Ready to Move" className="bg-[#0a1628]">Ready to Move</option>
                      <option value="Under Construction" className="bg-[#0a1628]">Under Construction</option>
                      <option value="Resale" className="bg-[#0a1628]">Resale</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Location & Dimensions */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-lg font-semibold text-amber-500/80 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Location & Dimensions
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Address / Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Sector 12, Noida"
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Area (sq. ft)</label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      placeholder="e.g. 1500"
                      className="w-full bg-black/20 border border-white/10 rounded-xl p-3 pl-10 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">BHK / Config</label>
                  <div className="relative">
                    <Layout className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      name="bhk"
                      value={formData.bhk}
                      onChange={handleChange}
                      placeholder="e.g. 3 BHK"
                      className="w-full bg-black/20 border border-white/10 rounded-xl p-3 pl-10 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Description */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-amber-500/80 mb-2">Description</h3>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Describe the property features, amenities, and surroundings..."
                  className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all resize-y min-h-[120px]"
                />
              </div>
            </div>

            {/* Section 4: Map Integration */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-lg font-semibold text-amber-500/80 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Map Integration
              </h3>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                <input
                  type="checkbox"
                  name="showOnMap"
                  id="showOnMap"
                  checked={formData.showOnMap}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-white/20 bg-black/20 text-amber-500 focus:ring-amber-500/50 cursor-pointer"
                />
                <label htmlFor="showOnMap" className="text-sm font-medium text-white/90 cursor-pointer select-none">
                  Show Map on Property Page
                </label>
              </div>

              {formData.showOnMap && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-1">
                  <label className="text-sm font-medium text-white/80">Google Maps Embed Link (Src)</label>
                  <input
                    type="text"
                    name="mapLink"
                    value={formData.mapLink}
                    onChange={handleChange}
                    placeholder='Paste Google Maps Embed Code or URL here...'
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-all text-xs text-white/80 font-mono"
                  />
                  <p className="text-xs text-white/40">
                    Tip: Go to Google Maps {'>'} Share {'>'} Embed a map {'>'} Copy HTML. Paste it here and we'll extract the link automatically.
                  </p>
                </div>
              )}
            </div>


            {/* Section 5: Images */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-lg font-semibold text-amber-500/80 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Gallery
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Upload Button */}
                <div className="relative group aspect-square">
                  <label className={`absolute inset-0 flex flex-col items-center justify-center bg-white/5 border border-dashed ${uploadingImage ? 'border-amber-500/50 bg-amber-500/5' : 'border-white/20 hover:bg-white/10 hover:border-amber-500/50'} rounded-xl transition-all cursor-pointer overflow-hidden`}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                        <span className="text-xs text-amber-500 animate-pulse">Uploading...</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-white/40 mb-2 group-hover:text-amber-500 transition-colors" />
                        <span className="text-xs text-white/60 text-center px-2 group-hover:text-white transition-colors">Click to Upload Max 10</span>
                      </>
                    )}
                  </label>
                </div>

                {/* Image Previews */}
                {formData.images.map((url, index) => (
                  <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10 bg-black/50">
                    <img
                      src={url}
                      alt={`Property ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => e.target.style.display = 'none'} // Fail gracefully
                    />

                    {/* Remove Button */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                      title="Remove Image"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    {/* Primary Badge */}
                    {formData.image === url ? (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-amber-500 text-black text-[10px] font-bold rounded shadow-sm">
                        Cover
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(url)}
                        className="absolute bottom-2 left-2 px-2 py-1 bg-black/60 hover:bg-amber-500 hover:text-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                      >
                        Set as Cover
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Toggle */}
            <div className="pt-6 border-t border-white/5 flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-white/20 bg-black/20 text-amber-500 focus:ring-amber-500/50 cursor-pointer"
              />
              <label htmlFor="featured" className="text-white/90 font-medium select-none cursor-pointer">
                Mark as Featured Property (Shows on Homepage)
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-amber-500/20"
              >
                {loading ? 'Saving Property...' : isEditMode ? 'Update Property' : 'Add Property Listing'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
