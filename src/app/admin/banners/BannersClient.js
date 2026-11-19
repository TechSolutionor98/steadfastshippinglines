'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiUploadCloud,
  FiArrowUp,
  FiArrowDown,
  FiCheck,
  FiX,
  FiEye,
  FiEyeOff,
  FiLink,
  FiImage,
  FiRefreshCw,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiType,
  FiLayers,
  FiFilter,
} from 'react-icons/fi';

export const AVAILABLE_PAGES = [
  { path: '/', label: 'Home Page (Hero Slider)', group: 'Core Pages' },
  { path: '/about-us', label: 'About Us', group: 'Core Pages' },
  { path: '/services', label: 'Our Services Overview', group: 'Core Pages' },
  { path: '/contact', label: 'Contact Us', group: 'Core Pages' },
  { path: '/blogs', label: 'Blogs Page', group: 'Core Pages' },
  { path: '/ocean-freight', label: 'Ocean Freight', group: 'Freight Services' },
  { path: '/air-freight', label: 'Air Freight', group: 'Freight Services' },
  { path: '/road-freight', label: 'Road Freight', group: 'Freight Services' },
  { path: '/warehousing-service', label: 'Warehousing Service', group: 'Freight Services' },
  { path: '/cargo-services', label: 'Cargo Services', group: 'Freight Services' },
  { path: '/customs-clearance-service', label: 'Customs Clearance Service', group: 'Freight Services' },
  { path: '/break-bulk-cargo-service', label: 'Break Bulk Cargo Service', group: 'Freight Services' },
  { path: '/cross-stuffing-service', label: 'Cross-Stuffing Service', group: 'Freight Services' },
  { path: '/transportation-service', label: 'Transportation Service', group: 'Freight Services' },
  { path: '/door-to-door-delievery', label: 'Door to Door Delivery', group: 'Freight Services' },
];

export default function BannersClient() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPageFilter, setSelectedPageFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    page: '/',
    title: '',
    subtitle: '',
    imageUrl: '',
    link: '',
    order: 1,
    active: true,
    showText: true,
    textColor: '#ffffff',
    textAlign: 'center',
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

  const getPageLabel = (pagePath) => {
    const found = AVAILABLE_PAGES.find((p) => p.path === (pagePath || '/'));
    return found ? found.label : pagePath || '/';
  };

  // Filtered banners by page
  const filteredBanners = useMemo(() => {
    if (selectedPageFilter === 'all') return banners;
    return banners.filter((b) => (b.page || '/') === selectedPageFilter);
  }, [banners, selectedPageFilter]);

  // Page counts
  const pageCounts = useMemo(() => {
    const map = { all: banners.length };
    AVAILABLE_PAGES.forEach((p) => {
      map[p.path] = banners.filter((b) => (b.page || '/') === p.path).length;
    });
    return map;
  }, [banners]);

  // Active banners for preview
  const previewBanners = useMemo(() => {
    const pool = selectedPageFilter === 'all'
      ? banners.filter((b) => (b.page || '/') === '/')
      : filteredBanners;
    return pool.filter((b) => b.active !== false);
  }, [banners, filteredBanners, selectedPageFilter]);

  useEffect(() => {
    setPreviewSlide(0);
  }, [selectedPageFilter, previewBanners.length]);

  // Open Modal for Add
  const handleOpenAdd = () => {
    setEditingBanner(null);
    const targetPage = selectedPageFilter === 'all' ? '' : selectedPageFilter;
    const samePageCount = targetPage ? banners.filter((b) => (b.page || '/') === targetPage).length : 0;
    setFormData({
      page: targetPage,
      title: targetPage ? `${getPageLabel(targetPage)} Banner` : '',
      subtitle: '',
      imageUrl: '',
      link: '',
      order: samePageCount + 1,
      active: true,
      showText: true,
      textColor: '#ffffff',
      textAlign: 'center',
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      page: banner.page || '/',
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      imageUrl: banner.imageUrl || '',
      link: banner.link || '',
      order: banner.order || 1,
      active: banner.active !== false,
      showText: banner.showText !== false,
      textColor: banner.textColor || '#ffffff',
      textAlign: banner.textAlign || 'center',
    });
    setIsModalOpen(true);
  };

  // Image Upload handler
  const handleFileChange = async (e) => {
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

  // Save Banner
  const handleSaveBanner = async (e) => {
    e.preventDefault();
    if (!formData.page || !formData.page.trim()) {
      toast.error('Pehle Target Page select karein! Page select karna lazmi hai.');
      return;
    }
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
          toast.success('Banner updated successfully!');
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
          toast.success('New banner added successfully!');
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
        toast.success(`Banner ${updatedStatus ? 'activated' : 'deactivated'}`);
      } else {
        toast.error(data.error || 'Status update failed');
      }
    } catch (err) {
      toast.error('Failed to change status');
    }
  };

  // Move Order
  const handleMoveOrder = async (index, direction) => {
    const targetList = filteredBanners;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= targetList.length) return;

    const currentBanner = targetList[index];
    const targetBanner = targetList[targetIndex];

    const newCurrentOrder = targetBanner.order || targetIndex + 1;
    const newTargetOrder = currentBanner.order || index + 1;

    try {
      await Promise.all([
        fetch('/api/banners', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentBanner._id, order: newCurrentOrder }),
        }),
        fetch('/api/banners', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: targetBanner._id, order: newTargetOrder }),
        }),
      ]);
      fetchBanners();
      toast.success('Order updated!');
    } catch (err) {
      toast.error('Failed to update order');
    }
  };

  // Delete Banner
  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/banners?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.ok) {
        setBanners((prev) => prev.filter((b) => b._id !== id));
        toast.success('Banner deleted successfully');
        setDeleteConfirmId(null);
      } else {
        toast.error(data.error || 'Failed to delete banner');
      }
    } catch (err) {
      toast.error('Error deleting banner');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-black text-[#141E36] tracking-tight uppercase">
            Hero Banners Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Configure dynamic hero section banners and background sliders for all website pages.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchBanners(true)}
            disabled={refreshing}
            className="p-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 transition cursor-pointer"
            title="Refresh Banners"
          >
            <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#C59B24]' : ''}`} />
          </button>
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl bg-[#141E36] hover:bg-[#1D2A4C] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition cursor-pointer"
          >
            <FiPlus className="w-4 h-4 text-[#C59B24]" />
            <span>Add New Banner</span>
          </button>
        </div>
      </div>

      {/* Page Filter Toolbar & Quick Tabs */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FiLayers className="w-4 h-4 text-[#C59B24]" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Filter By Target Page:
            </span>
          </div>

          {/* Page Dropdown for Quick Jump */}
          <div className="flex items-center gap-2">
            <select
              value={selectedPageFilter}
              onChange={(e) => setSelectedPageFilter(e.target.value)}
              className="border border-[#D7DCE0] rounded-xl px-3 py-1.5 text-xs font-semibold text-gray-800 bg-white focus:outline-none focus:border-[#C59B24] cursor-pointer"
            >
              <option value="all">All Pages ({pageCounts.all || 0})</option>
              <optgroup label="Core Pages">
                {AVAILABLE_PAGES.filter((p) => p.group === 'Core Pages').map((p) => (
                  <option key={p.path} value={p.path}>
                    {p.label} ({pageCounts[p.path] || 0})
                  </option>
                ))}
              </optgroup>
              <optgroup label="Freight Services">
                {AVAILABLE_PAGES.filter((p) => p.group === 'Freight Services').map((p) => (
                  <option key={p.path} value={p.path}>
                    {p.label} ({pageCounts[p.path] || 0})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-gray-100">
          <button
            onClick={() => setSelectedPageFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              selectedPageFilter === 'all'
                ? 'bg-[#141E36] text-white shadow-xs'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>All Pages</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {pageCounts.all || 0}
            </span>
          </button>

          {AVAILABLE_PAGES.slice(0, 5).map((p) => (
            <button
              key={p.path}
              onClick={() => setSelectedPageFilter(p.path)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                selectedPageFilter === p.path
                  ? 'bg-[#C59B24] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{p.label.replace(' Page', '').replace(' (Hero Slider)', '')}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedPageFilter === p.path ? 'bg-white/20' : 'bg-gray-200 text-gray-800'
              }`}>
                {pageCounts[p.path] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Preview Section */}
      {previewBanners.length > 0 && (
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#141E36]">
                Live Preview: {selectedPageFilter === 'all' ? 'Home Slider' : getPageLabel(selectedPageFilter)} ({previewBanners.length} Active Slide{previewBanners.length > 1 ? 's' : ''})
              </span>
            </div>
            <span className="text-[11px] text-gray-400 font-mono">Dynamic Live Rendering</span>
          </div>

          <div className="relative w-full h-48 sm:h-64 rounded-xl overflow-hidden bg-slate-900 border border-gray-200 shadow-inner">
            {previewBanners.map((slide, idx) => (
              <div
                key={slide._id || idx}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  idx === previewSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${slide.imageUrl})` }}
                />

                {/* Dark Vignette Overlay: only when text overlay is active */}
                {slide.showText !== false && slide.title && (
                  <div
                    className={`absolute inset-0 pointer-events-none ${
                      slide.textAlign === 'left'
                        ? 'bg-gradient-to-r from-black/85 via-black/50 to-transparent'
                        : slide.textAlign === 'right'
                        ? 'bg-gradient-to-l from-black/85 via-black/50 to-transparent'
                        : 'bg-black/50'
                    }`}
                  />
                )}

                {/* Heading Text */}
                {slide.showText !== false && slide.title && (
                  <div
                    className={`absolute inset-0 flex flex-col justify-center p-6 sm:p-10 pointer-events-none ${
                      slide.textAlign === 'left'
                        ? 'items-start text-left'
                        : slide.textAlign === 'right'
                        ? 'items-end text-right'
                        : 'items-center text-center'
                    }`}
                  >
                    <div className="max-w-xl space-y-2">
                      <h3
                        className="text-base sm:text-2xl font-black uppercase tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                        style={{ color: slide.textColor || '#ffffff' }}
                      >
                        {slide.title}
                      </h3>
                      {slide.subtitle && (
                        <p className="text-xs sm:text-sm text-gray-200 drop-shadow">
                          {slide.subtitle}
                        </p>
                      )}
                      <div
                        className={`w-12 h-1 rounded-full shadow ${
                          slide.textAlign === 'left'
                            ? 'mr-auto'
                            : slide.textAlign === 'right'
                            ? 'ml-auto'
                            : 'mx-auto'
                        }`}
                        style={{
                          backgroundColor:
                            slide.textColor?.toLowerCase() === '#c59b24' ? '#ffffff' : '#C59B24',
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded text-[11px] font-bold">
                  Slide {idx + 1} of {previewBanners.length}
                </div>
              </div>
            ))}

            {/* Slider Navigation Buttons */}
            {previewBanners.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setPreviewSlide((prev) => (prev === 0 ? previewBanners.length - 1 : prev - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-[#C59B24] text-white flex items-center justify-center transition cursor-pointer"
                >
                  ❮
                </button>
                <button
                  onClick={() => setPreviewSlide((prev) => (prev + 1) % previewBanners.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-[#C59B24] text-white flex items-center justify-center transition cursor-pointer"
                >
                  ❯
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                  {previewBanners.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewSlide(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
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

      {/* Banners Table Section (Replaces Old Cards UI) */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[#141E36]">
              Configured Hero Banners ({filteredBanners.length})
            </h2>
            <p className="text-xs text-gray-500">
              Showing banners for: <span className="font-bold text-[#C59B24]">{selectedPageFilter === 'all' ? 'All Pages' : getPageLabel(selectedPageFilter)}</span>
            </p>
          </div>

          {selectedPageFilter !== 'all' && (
            <button
              onClick={() => setSelectedPageFilter('all')}
              className="text-xs font-semibold text-[#141E36] hover:underline cursor-pointer"
            >
              Reset to All Pages
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-16 text-center text-gray-400">Loading banners...</div>
        ) : filteredBanners.length === 0 ? (
          <div className="p-10 text-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 space-y-3">
            <FiImage className="w-10 h-10 text-gray-400 mx-auto" />
            <div>
              <p className="text-sm font-bold text-gray-700">No banners configured for this page</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Add a banner to display a custom hero background on {selectedPageFilter === 'all' ? 'any page' : getPageLabel(selectedPageFilter)}.
              </p>
            </div>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-[#141E36] hover:bg-[#1D2A4C] text-white text-xs font-bold transition cursor-pointer"
            >
              Add Banner For This Page
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#141E36] text-white">
                <tr>
                  <th className="px-4 py-3 font-bold text-center w-20">Order</th>
                  <th className="px-4 py-3 font-bold w-24">Thumbnail</th>
                  <th className="px-4 py-3 font-bold">Target Page</th>
                  <th className="px-4 py-3 font-bold">Banner Title / Heading</th>
                  <th className="px-4 py-3 font-bold">Text Overlay</th>
                  <th className="px-4 py-3 font-bold text-center">Status</th>
                  <th className="px-4 py-3 font-bold">Link URL</th>
                  <th className="px-4 py-3 font-bold text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBanners.map((banner, index) => {
                  const targetPageObj = AVAILABLE_PAGES.find((p) => p.path === (banner.page || '/'));
                  return (
                    <tr key={banner._id} className="hover:bg-slate-50 transition-colors">
                      {/* Order & Move buttons */}
                      <td className="px-4 py-3 align-middle text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-bold text-gray-700 w-4">{index + 1}</span>
                          <div className="flex flex-col">
                            <button
                              onClick={() => handleMoveOrder(index, 'up')}
                              disabled={index === 0}
                              className="p-0.5 text-gray-400 hover:text-black disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                              title="Move Up"
                            >
                              <FiArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleMoveOrder(index, 'down')}
                              disabled={index === filteredBanners.length - 1}
                              className="p-0.5 text-gray-400 hover:text-black disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                              title="Move Down"
                            >
                              <FiArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Thumbnail Preview */}
                      <td className="px-4 py-3 align-middle">
                        <div className="w-20 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden relative group shrink-0">
                          <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-200 group-hover:scale-110"
                            style={{ backgroundImage: `url(${banner.imageUrl})` }}
                          />
                        </div>
                      </td>

                      {/* Target Page Badge */}
                      <td className="px-4 py-3 align-middle">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FDF9EE] text-[#141E36] border border-[#E2C876]">
                          {targetPageObj ? targetPageObj.label : banner.page || '/'}
                        </span>
                        <span className="block text-[10px] text-gray-400 font-mono mt-0.5">
                          {banner.page || '/'}
                        </span>
                      </td>

                      {/* Title & Subtitle */}
                      <td className="px-4 py-3 align-middle max-w-xs">
                        <p className="font-bold text-gray-900 line-clamp-1">{banner.title || 'Untitled Banner'}</p>
                        {banner.subtitle && (
                          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{banner.subtitle}</p>
                        )}
                      </td>

                      {/* Text Display Badges */}
                      <td className="px-4 py-3 align-middle">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              banner.showText !== false
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {banner.showText !== false ? 'Text ON' : 'Image Only'}
                          </span>
                          {banner.showText !== false && (
                            <span
                              className="w-3 h-3 rounded-full border border-gray-300 shadow-2xs"
                              style={{ backgroundColor: banner.textColor || '#ffffff' }}
                              title={`Text Color: ${banner.textColor || '#ffffff'}`}
                            />
                          )}
                        </div>
                      </td>

                      {/* Status Toggle */}
                      <td className="px-4 py-3 align-middle text-center">
                        <button
                          onClick={() => handleToggleActive(banner)}
                          className={`px-2.5 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                            banner.active
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-gray-100 text-gray-500 border border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          {banner.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>

                      {/* Link URL */}
                      <td className="px-4 py-3 align-middle text-xs text-gray-600 max-w-[120px] truncate">
                        {banner.link ? (
                          <span className="text-[#C59B24] font-medium flex items-center gap-1 truncate" title={banner.link}>
                            <FiLink className="w-3 h-3 shrink-0" />
                            <span className="truncate">{banner.link}</span>
                          </span>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 align-middle text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(banner)}
                            className="p-1.5 rounded-lg bg-gray-100 hover:bg-[#141E36] hover:text-white text-gray-700 transition cursor-pointer"
                            title="Edit Banner"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(banner._id)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 transition cursor-pointer"
                            title="Delete Banner"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Banner Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[92vh] overflow-hidden flex flex-col border border-gray-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#141E36] px-6 py-4 flex items-center justify-between text-white shrink-0 border-b border-[#C59B24]/40">
              <div className="flex items-center gap-2">
                <FiImage className="w-5 h-5 text-[#C59B24]" />
                <h3 className="text-base sm:text-lg font-bold">
                  {editingBanner ? 'Edit Hero Banner' : 'Add New Hero Banner'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold cursor-pointer transition"
              >
                ×
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSaveBanner} className="p-6 space-y-4 overflow-y-auto text-xs sm:text-sm">
              {/* Target Page Selector (Mandatory Step 1) */}
              <div className={`space-y-1.5 p-4 rounded-2xl border transition-all ${
                !formData.page ? 'bg-amber-50/70 border-amber-300' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#141E36] uppercase tracking-wider">
                    Step 1: Select Target Page <span className="text-red-500 font-black">*</span>
                  </label>
                  {!formData.page && (
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      Page Selection Required
                    </span>
                  )}
                </div>
                <select
                  value={formData.page || ''}
                  onChange={(e) => {
                    const newPage = e.target.value;
                    const sameCount = banners.filter((b) => (b.page || '/') === newPage).length;
                    setFormData({
                      ...formData,
                      page: newPage,
                      title: (!formData.title || formData.title.endsWith('Banner')) ? `${getPageLabel(newPage)} Banner` : formData.title,
                      order: sameCount + 1,
                    });
                  }}
                  required
                  className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl text-gray-800 font-bold focus:outline-none cursor-pointer border ${
                    !formData.page ? 'border-amber-400 ring-2 ring-amber-300/40' : 'border-gray-300 focus:border-[#C59B24]'
                  }`}
                >
                  <option value="" disabled>-- Select Page First (Required) --</option>
                  <optgroup label="Core Pages">
                    {AVAILABLE_PAGES.filter((p) => p.group === 'Core Pages').map((p) => (
                      <option key={p.path} value={p.path}>
                        {p.label} ({p.path})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Freight Services">
                    {AVAILABLE_PAGES.filter((p) => p.group === 'Freight Services').map((p) => (
                      <option key={p.path} value={p.path}>
                        {p.label} ({p.path})
                      </option>
                    ))}
                  </optgroup>
                </select>
                <p className="text-[11px] text-gray-500">
                  Banner strictly usi page ke hero section me show hoga jo aap yahan select karein ge, kisi doosre page par show nahi hoga.
                </p>
              </div>

              {/* Title / Heading */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Banner Heading / Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. RELIABLE FREIGHT SOLUTIONS"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-[#C59B24]"
                />
              </div>

              {/* Subtitle / Tagline */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Banner Subtitle / Tagline (Optional)
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Delivering excellence across borders with innovative multimodal logistics..."
                  className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-[#C59B24]"
                />
              </div>

              {/* Image Upload / Direct URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Banner Image *
                </label>

                {/* Upload box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition ${
                    uploading
                      ? 'border-[#C59B24] bg-amber-50/50'
                      : 'border-gray-300 hover:border-[#141E36] hover:bg-gray-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <FiUploadCloud className="w-8 h-8 text-[#C59B24] mx-auto mb-1" />
                  <p className="text-xs font-bold text-gray-800">
                    {uploading ? 'Uploading image...' : 'Click to upload image'}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    PNG, JPG, or WEBP — Recommended Size: <strong>1920 x 600 px</strong> (Inner Pages) / 1920 x 680 px (Home Slider)
                  </p>

                  {uploading && (
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div
                        className="bg-[#C59B24] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Direct Image URL input */}
                <div>
                  <span className="text-[11px] text-gray-500 block mb-1">Or paste image URL / local path:</span>
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="e.g. /images/home/banner-1.webp or https://..."
                    required
                    className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-[#C59B24]"
                  />
                </div>

                {/* Thumbnail Preview with Heading */}
                {formData.imageUrl && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 shadow-xs bg-[#141E36] mt-2">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${formData.imageUrl})` }}
                    />
                    {formData.showText && formData.title && (
                      <div
                        className={`absolute inset-0 flex flex-col justify-center p-4 pointer-events-none ${
                          formData.textAlign === 'left'
                            ? 'items-start text-left bg-gradient-to-r from-black/80 via-black/40 to-transparent'
                            : formData.textAlign === 'right'
                            ? 'items-end text-right bg-gradient-to-l from-black/80 via-black/40 to-transparent'
                            : 'items-center text-center bg-black/50'
                        }`}
                      >
                        <p
                          className="text-xs sm:text-sm font-black uppercase tracking-tight drop-shadow max-w-[85%]"
                          style={{ color: formData.textColor || '#ffffff' }}
                        >
                          {formData.title}
                        </p>
                        <div
                          className={`w-8 h-0.5 rounded-full mt-1 ${
                            formData.textAlign === 'left'
                              ? 'mr-auto'
                              : formData.textAlign === 'right'
                              ? 'ml-auto'
                              : 'mx-auto'
                          }`}
                          style={{
                            backgroundColor:
                              formData.textColor?.toLowerCase() === '#c59b24' ? '#ffffff' : '#C59B24',
                          }}
                        />
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                      Preview
                    </div>
                  </div>
                )}
              </div>

              {/* Text Management (Show/Hide, Color, Alignment) */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">
                      Show Text On Banner
                    </label>
                    <p className="text-[11px] text-gray-500">
                      Enable heading text display on the website
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showText}
                      onChange={(e) => setFormData({ ...formData, showText: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#141E36]"></div>
                  </label>
                </div>

                {formData.showText && (
                  <div className="pt-3 border-t border-gray-200 grid grid-cols-2 gap-4">
                    {/* Text Color */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-gray-700">Text Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={formData.textColor?.length === 7 ? formData.textColor : '#ffffff'}
                          onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                          className="w-8 h-8 p-0.5 rounded border border-gray-300 cursor-pointer bg-white"
                        />
                        <input
                          type="text"
                          value={formData.textColor || '#ffffff'}
                          onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                          placeholder="#ffffff"
                          className="w-full px-2.5 py-1 text-xs font-mono bg-white border border-gray-300 rounded-lg text-gray-800"
                        />
                      </div>
                      {/* Quick Swatches */}
                      <div className="flex items-center gap-1.5 pt-1">
                        {[
                          { label: 'White', color: '#ffffff' },
                          { label: 'Navy', color: '#141E36' },
                          { label: 'Gold', color: '#C59B24' },
                          { label: 'Black', color: '#000000' },
                        ].map((sw) => (
                          <button
                            key={sw.color}
                            type="button"
                            onClick={() => setFormData({ ...formData, textColor: sw.color })}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${
                              formData.textColor?.toLowerCase() === sw.color.toLowerCase()
                                ? 'border-[#C59B24] bg-[#FDF9EE] text-[#C59B24]'
                                : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {sw.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Alignment */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-gray-700">Text Alignment</label>
                      <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-lg border border-gray-300">
                        {[
                          { id: 'left', icon: FiAlignLeft },
                          { id: 'center', icon: FiAlignCenter },
                          { id: 'right', icon: FiAlignRight },
                        ].map((align) => {
                          const Icon = align.icon;
                          const isSelected = (formData.textAlign || 'center') === align.id;
                          return (
                            <button
                              key={align.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, textAlign: align.id })}
                              className={`py-1.5 rounded flex items-center justify-center transition cursor-pointer ${
                                isSelected ? 'bg-[#141E36] text-white' : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
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
                  placeholder="e.g. /services or /contact"
                  className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-[#C59B24]"
                />
              </div>

              {/* Order & Active Switch */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:border-[#C59B24]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Display Status
                  </label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, active: !formData.active })}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 ${
                      formData.active
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-300'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${formData.active ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                    <span>{formData.active ? 'Active (Visible)' : 'Inactive (Hidden)'}</span>
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white text-xs font-bold shadow-md shadow-[#C59B24]/20 transition cursor-pointer"
                >
                  {editingBanner ? 'Save Changes' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full space-y-4 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <FiTrash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-gray-900">Delete Hero Banner?</h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to permanently delete this banner? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer disabled:opacity-50"
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
