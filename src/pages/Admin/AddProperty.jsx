import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addDocument, getDocument, updateDocument } from '../../utils/firestoreUtils';
import { loginAnonymously } from '../../utils/authUtils';
import { uploadImageToCloudinary } from '../../utils/cloudinaryUtils';
import { ArrowLeft, Upload, MapPin, X, AlertCircle } from 'lucide-react';

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
    if (isEditMode) {
      const fetchProperty = async () => {
        try {
          const data = await getDocument('properties', id);
          if (data) {
            const images = data.images || (data.image ? [data.image] : []);
            setFormData({ ...data, images });
          }
        } catch (err) {
          setError('Failed to load property details.');
        }
      };
      fetchProperty();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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

    try {
      const urls = await Promise.all(
        files.map(file => uploadImageToCloudinary(file))
      );

      setFormData(prev => {
        const updated = [...prev.images, ...urls];
        return {
          ...prev,
          images: updated,
          image: updated[0]
        };
      });

      setSuccess('Images uploaded successfully!');
      setTimeout(() => setSuccess(''), 2500);
    } catch (err) {
      setError('Image upload failed.');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => {
      const imgs = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: imgs,
        image: imgs[0] || ''
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await loginAnonymously();

      if (isEditMode) {
        await updateDocument('properties', id, formData);
        setSuccess('Property updated successfully!');
      } else {
        await addDocument('properties', formData);
        setSuccess('Property added successfully!');
      }

      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (err) {
      setError('Failed to save property.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white p-6">
      <div className="max-w-4xl mx-auto">

        <button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-white/60 hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

          <h1 className="text-2xl font-bold mb-6">
            {isEditMode ? 'Edit Property' : 'Add Property'}
          </h1>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <p className="text-green-400">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ALL YOUR EXISTING JSX CONTINUES HERE EXACTLY AS YOU SENT */}

            {/* FEATURED */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5"
              />
              <label>Mark as Featured Property</label>
            </div>

            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="w-full bg-amber-500 hover:bg-amber-600 py-4 rounded-xl font-bold"
            >
              {loading ? 'Saving...' : isEditMode ? 'Update Property' : 'Add Property'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
