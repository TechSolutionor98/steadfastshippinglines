'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUploadCloud,
  FiMove,
  FiArrowUp,
  FiArrowDown,
  FiCheck,
  FiX,
  FiEye,
  FiLink,
  FiImage,
  FiRefreshCw
} from 'react-icons/fi';

export default function BannersClient() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    link: '',
    order: 1,
    active: true,
  });

  // Upload State
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  // Delete Confirm State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Live Preview Slide Index
  const [previewSlide, setPreviewSlide] = useState(0);

  // Fetch Banners
  const fetchBanners = async (showToast = false) => {
    try {
      if (showToast) setRefreshing(true);
      const res = await fetch('/api/banners?all=true', { cache: 'no-store' });
      const data = await res.json();
      if (data.ok && Array.isArray(data.banners)) {
        setBanners(data.banners);
        if (showToast) toast.success('Banners updated successfully!');
      } else {
        toast.error(data.error || 'Failed to load banners');
      }
    } catch (err) {
      console.error('Error fetching banners:', err);
      toast.error('Could not connect to server');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingBanner(null);
    setFormData({
      title: `Hero Banner ${banners.length + 1}`,
      imageUrl: '',
      link: '',
      order: banners.length + 1,
      active: true,
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || '',
      imageUrl: banner.imageUrl || '',
      link: banner.link || '',
      order: banner.order || 1,
      active: banner.active !== false,
    });
    setIsModalOpen(true);
  };

  // Handle File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WEBP)');
      return;
    }

    setUploading(true);
    setUploadProgress(20);

    try {
      const data = new FormData();
      data.append('file', file);

      setUploadProgress(50);
      const res = await fetch('/api/banners/upload', {
        method: 'POST',
        body: data,
      });

      setUploadProgress(90);
      const json = await res.json();

      if (json.ok && json.url) {
        setFormData((prev) => ({ ...prev, imageUrl: json.url }));
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(json.error || 'Image upload failed');
      }
    } catch (err) {
      console.error('File upload error:', err);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Save Banner (Create or Update)
  const handleSaveBanner = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl.trim()) {
      toast.error('Please upload an image or provide an image URL');
      return;
    }

    try {
      if (editingBanner) {
        // Update
        const res = await fetch('/api/banners', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingBanner._id,
            ...formData,
          }),
        });
        const data = await res.json();
        if (data.ok) {
          toast.success('Banner updated!');
          setIsModalOpen(false);
          fetchBanners();
        } else {
          toast.error(data.error || 'Failed to update banner');
        }
      } else {
        // Create
        const res = await fetch('/api/banners', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.ok) {
          toast.success('New banner added!');
          setIsModalOpen(false);
          fetchBanners();
        } else {
          toast.error(data.error || 'Failed to add banner');
        }
      }
    } catch (err) {
      console.error('Error saving banner:', err);
      toast.error('An error occurred while saving');
    }
  };

  // Toggle Active Status
  const handleToggleActive = async (banner) => {
    const updatedStatus = !banner.active;
    try {
      const res = await fetch('/api/banners', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: banner._id,
          active: updatedStatus,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setBanners((prev) =>
          prev.map((b) => (b._id === banner._id ? { ...b, active: updatedStatus } : b))
        );
        toast.success(updatedStatus ? 'Banner activated' : 'Banner paused');
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update banner status');
    }
  };

  // Move Order (Up or Down)
  const handleMoveOrder = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= banners.length) return;

    const newBanners = [...banners];
    const currentItem = newBanners[index];
    const targetItem = newBanners[targetIndex];

    // Swap orders
    const currentOrder = currentItem.order || index + 1;
    const targetOrder = targetItem.order || targetIndex + 1;

    // Optimistic UI update
    newBanners[index] = { ...targetItem, order: currentOrder };
    newBanners[targetIndex] = { ...currentItem, order: targetOrder };
    setBanners(newBanners);

    try {
      await Promise.all([
        fetch('/api/banners', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentItem._id, order: targetOrder }),
        }),
        fetch('/api/banners', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetItem._id, order: currentOrder }),
        }),
      ]);
      fetchBanners();
    } catch (err) {
      console.error('Order update error:', err);
      toast.error('Failed to update order');
      fetchBanners();
    }
  };

  // Delete Banner
  const handleDelete = async () => {
    if (!deleteConfirmId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/banners?id=${deleteConfirmId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.ok) {
        toast.success('Banner deleted');
        setDeleteConfirmId(null);
        fetchBanners();
      } else {
        toast.error(data.error || 'Failed to delete banner');
      }
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete banner');
    } finally {
      setDeleting(false);
    }
  };

  const activeBanners = banners.filter((b) => b.active !== false);

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-black text-[#141E36] tracking-tight">Hero Banners Slider</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage the full-width image slider on the homepage hero section. Upload images, reorder slides, or toggle display status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchBanners(true)}
            disabled={refreshing}
            className="p-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors shadow-sm"
            title="Refresh Banners"
          >
            <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#141E36] hover:bg-[#1D2A4C] text-white text-sm font-bold shadow-md transition-all hover:scale-[1.02]"
          >
            <FiPlus className="w-4 h-4 text-[#C59B24]" />
            <span>Add New Banner</span>
          </button>
        </div>
      </div>

      {/* Live Preview Box */}
      {activeBanners.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiEye className="text-[#C59B24] w-4 h-4" />
              <h2 className="text-sm font-bold text-[#141E36] uppercase tracking-wider">
                Live Homepage Slider Preview ({activeBanners.length} active slides)
              </h2>
            </div>
            <span className="text-xs text-gray-500 font-medium">Dynamic Heading Preview</span>
          </div>

          <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden bg-[#141E36] border border-gray-200 shadow-inner group">
            {activeBanners.map((slide, idx) => (
              <div
                key={slide._id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  idx === previewSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                />

                {/* Live Preview Heading */}
                {slide.title && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center pointer-events-none">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] max-w-xl">
                      {slide.title}
                    </h3>
                    <div className="w-12 h-1 bg-[#C59B24] mx-auto mt-2 rounded-full shadow" />
                  </div>
                )}

                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-semibold">
                  Slide {idx + 1} of {activeBanners.length}
                </div>
              </div>
            ))}

            {/* Preview Navigation */}
            {activeBanners.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setPreviewSlide((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-[#C59B24] text-white flex items-center justify-center transition-all"
                >
                  ❮
                </button>
                <button
                  onClick={() => setPreviewSlide((prev) => (prev + 1) % activeBanners.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-[#C59B24] text-white flex items-center justify-center transition-all"
                >
                  ❯
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-y-0 -translate-x-1/2 z-20 flex gap-2">
                  {activeBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewSlide(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === previewSlide ? 'w-6 bg-[#C59B24]' : 'w-2 bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Banners Grid / List */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-[#141E36]">Current Slider Banners ({banners.length})</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-gray-100 animate-pulse border border-gray-200" />
            ))}
          </div>
        ) : banners.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 space-y-4">
            <FiImage className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-base font-bold text-gray-700">No banners found</p>
              <p className="text-xs text-gray-500 mt-1">Get started by creating your first hero slider banner.</p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-lg bg-[#141E36] hover:bg-[#1D2A4C] text-white text-xs font-bold transition"
            >
              Add First Banner
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {banners.map((banner, index) => (
              <div
                key={banner._id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md flex flex-col justify-between ${
                  banner.active ? 'border-gray-200' : 'border-gray-200 opacity-60 bg-gray-50/70'
                }`}
              >
                {/* Banner Thumbnail */}
                <div className="relative w-full h-44 bg-gray-100 overflow-hidden group">
                  <div
                    className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${banner.imageUrl})` }}
                  />

                  {/* Order Badge */}
                  <div className="absolute top-3 left-3 bg-[#141E36]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow">
                    <FiMove className="w-3 h-3 text-[#C59B24]" />
                    <span>Slide #{index + 1}</span>
                  </div>

                  {/* Active / Inactive Badge */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleToggleActive(banner)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider shadow backdrop-blur-sm transition ${
                        banner.active
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-gray-700 text-white hover:bg-gray-800'
                      }`}
                    >
                      {banner.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>

                {/* Banner Details */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-sm text-[#141E36] line-clamp-1">
                      {banner.title || `Hero Banner #${index + 1}`}
                    </h3>
                    {banner.link ? (
                      <p className="text-xs text-[#C59B24] flex items-center gap-1.5 truncate">
                        <FiLink className="w-3 h-3 shrink-0" />
                        <span className="truncate">{banner.link}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-gray-400 italic">No click link configured</p>
                    )}
                    <p className="text-[10px] text-gray-400 truncate">URL: {banner.imageUrl}</p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-gray-150 flex items-center justify-between">
                    {/* Move Up / Down */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleMoveOrder(index, 'up')}
                        disabled={index === 0}
                        className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        title="Move Earlier in Slider"
                      >
                        <FiArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveOrder(index, 'down')}
                        disabled={index === banners.length - 1}
                        className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                        title="Move Later in Slider"
                      >
                        <FiArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Edit & Delete */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(banner)}
                        className="px-3 py-1.5 bg-[#141E36] hover:bg-[#1D2A4C] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition"
                      >
                        <FiEdit2 className="w-3 h-3 text-[#C59B24]" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(banner._id)}
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                        title="Delete Banner"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Banner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-150 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="text-xl font-bold text-[#141E36]">
                {editingBanner ? 'Edit Hero Banner' : 'Add New Hero Banner'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-5">
              {/* Image Upload Area */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Banner Image *
                </label>

                {/* Drag and Drop / Choose File */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-[#141E36] rounded-2xl p-6 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <FiUploadCloud className="w-10 h-10 text-gray-400 group-hover:text-[#C59B24] mx-auto transition-colors" />
                  <p className="text-sm font-bold text-gray-700 mt-2">
                    {uploading ? 'Uploading Image...' : 'Click to upload banner image'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports PNG, JPG, WEBP. Recommended size: 1920x800 or 1920x900px.
                  </p>
                  {uploading && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3 overflow-hidden">
                      <div
                        className="bg-[#C59B24] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Or enter Direct Image URL */}
                <div className="pt-2">
                  <span className="text-[11px] text-gray-400 block mb-1">Or paste direct image URL / path:</span>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="e.g. /images/home/banner-1.webp or https://..."
                    required
                    className="w-full px-4 py-2.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#141E36] focus:ring-1 focus:ring-[#141E36]"
                  />
                </div>

                {/* Thumbnail Preview */}
                {formData.imageUrl && (
                  <div className="mt-3 relative w-full h-36 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${formData.imageUrl})` }}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      Image Preview
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Banner Title / Label
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Ocean Logistics Banner"
                  className="w-full px-4 py-2.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#141E36] focus:ring-1 focus:ring-[#141E36]"
                />
              </div>

              {/* Click Link */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Click Link (Optional)
                </label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="e.g. /services or /quote or leave blank"
                  className="w-full px-4 py-2.5 text-xs bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#141E36] focus:ring-1 focus:ring-[#141E36]"
                />
                <p className="text-[11px] text-gray-400">If provided, clicking on the slide will navigate to this link.</p>
              </div>

              {/* Order & Active Toggle */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Slide Order #
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2 text-xs bg-white border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:border-[#141E36]"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-4 h-4 rounded text-[#141E36] focus:ring-[#141E36]"
                    />
                    <span className="text-xs font-bold text-gray-700">Display in Slider</span>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-lg bg-[#141E36] hover:bg-[#1D2A4C] text-white text-xs font-bold transition shadow-md flex items-center gap-2"
                >
                  <FiCheck className="w-4 h-4 text-[#C59B24]" />
                  <span>{editingBanner ? 'Save Changes' : 'Create Banner'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-xl border border-gray-150">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <FiTrash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Delete Banner?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to remove this banner from the slider? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-xs font-bold hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

