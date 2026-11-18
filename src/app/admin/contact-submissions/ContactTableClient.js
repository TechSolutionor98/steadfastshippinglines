"use client"
import React, { useState, useMemo, useEffect } from 'react';

export default function ContactTableClient({ initialData = [], apiBase = process.env.NEXT_PUBLIC_API_URL }) {
  const [rows, setRows] = useState(initialData || []);
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'contact' | 'quote'
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [viewRow, setViewRow] = useState(null);

  useEffect(() => {
    if (!initialData || initialData.length === 0) {
      refresh();
    }
  }, []);

  // Helper to accurately detect form source (Get a Quote vs Contact Us)
  const getRowType = (r) => {
    if (r?.formType === 'quote') return 'quote';
    if (r?.formType === 'contact') return 'contact';
    const sub = (r?.subject || '').toLowerCase();
    const com = (r?.comments || '').toLowerCase();
    if (
      sub.includes('quote') ||
      com.includes('quote estimate request') ||
      com.includes('freight service:') ||
      com.includes('origin:')
    ) {
      return 'quote';
    }
    return 'contact';
  };

  // Sort latest first
  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return db - da;
    });
  }, [rows]);

  // Source Counts
  const counts = useMemo(() => {
    let contact = 0;
    let quote = 0;
    sorted.forEach(r => {
      if (getRowType(r) === 'quote') quote++;
      else contact++;
    });
    return { all: sorted.length, contact, quote };
  }, [sorted]);

  const filtered = useMemo(() => {
    let list = sorted;

    // Filter by Form Source (All / Contact Us / Get a Quote)
    if (filterType !== 'all') {
      list = list.filter(r => getRowType(r) === filterType);
    }

    const q = query.trim().toLowerCase();
    if (!q) return list;

    return list.filter(r => (
      (r.name || '').toString().toLowerCase().includes(q) ||
      (r.email || '').toString().toLowerCase().includes(q) ||
      (r.phone || '').toString().toLowerCase().includes(q) ||
      (r.subject || '').toString().toLowerCase().includes(q) ||
      (r.service || '').toString().toLowerCase().includes(q) ||
      (r.comments || '').toString().toLowerCase().includes(q) ||
      (r.productName || '').toString().toLowerCase().includes(q) ||
      (r.productBarcode || '').toString().toLowerCase().includes(q)
    ));
  }, [sorted, query, filterType]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  async function refresh() {
    try {
      setLoading(true);
      const baseUrl = apiBase || '';
      const res = await fetch(`${baseUrl}/api/contact-submissions`);
      if (!res.ok) throw new Error('Fetch failed');
      const data = await res.json();
      setRows(data);
      setPage(1);
    } catch (err) {
      console.error('Failed to refresh:', err);
      alert('Failed to refresh: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function downloadCSV() {
    if (!rows || rows.length === 0) return alert('No data');
    const headers = ['#', 'Source', 'Name', 'Email', 'Phone', 'Subject', 'Service', 'Comments', 'Submitted At'];
    const csv = [headers.join(',')].concat(rows.map((r, i) => {
      const isQuote = getRowType(r) === 'quote';
      const vals = [
        i + 1,
        isQuote ? 'Get a Quote' : 'Contact Us',
        r.name,
        r.email,
        r.phone,
        r.subject,
        r.service,
        r.comments,
        r.createdAt ? new Date(r.createdAt).toLocaleString() : ''
      ];
      return vals.map(v => {
        const s = ((v ?? '') + '').replace(/"/g, '""');
        return `"${s}"`;
      }).join(',');
    })).join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inquiries_${filterType}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Get the global index for a row on current page
  const getGlobalIndex = (pageIndex) => (page - 1) * pageSize + pageIndex + 1;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full">
      {/* Top Filter Buttons / Source Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-2">
          {/* Tab 1: All */}
          <button
            onClick={() => { setFilterType('all'); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              filterType === 'all'
                ? 'bg-[#141E36] text-white border-[#141E36] shadow-sm'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <span>All Inquiries</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              filterType === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-800'
            }`}>
              {counts.all}
            </span>
          </button>

          {/* Tab 2: Contact Us */}
          <button
            onClick={() => { setFilterType('contact'); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              filterType === 'contact'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                : 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Contact Us</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              filterType === 'contact' ? 'bg-white/20 text-white' : 'bg-blue-200 text-blue-900'
            }`}>
              {counts.contact}
            </span>
          </button>

          {/* Tab 3: Get a Quote */}
          <button
            onClick={() => { setFilterType('quote'); setPage(1); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 border ${
              filterType === 'quote'
                ? 'bg-[#C59B24] text-white border-[#C59B24] shadow-sm shadow-[#C59B24]/30'
                : 'bg-[#FDF9EE] text-[#C59B24] border-[#E2C876] hover:bg-[#F9F0D6]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#C59B24]" />
            <span>Get a Quote</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              filterType === 'quote' ? 'bg-white/20 text-white' : 'bg-[#E2C876] text-[#141E36]'
            }`}>
              {counts.quote}
            </span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={refresh}
            className={`px-3.5 py-2 rounded-xl bg-[#C59B24] hover:bg-[#B0891E] text-white text-xs font-bold shadow-sm ${loading ? 'opacity-60' : ''} transition-all cursor-pointer`}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={downloadCSV}
            className="px-3.5 py-2 rounded-xl bg-[#141E36] hover:bg-[#1D2A4C] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <input
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search name, email, phone, cargo, subject..."
            className="border border-[#D7DCE0] focus:border-[#C59B24] px-3.5 py-2 rounded-xl w-full text-xs sm:text-sm outline-none transition-all"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setPage(1); }}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Source Dropdown Filter & Page Size */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Filter:</span>
            <select
              value={filterType}
              onChange={e => { setFilterType(e.target.value); setPage(1); }}
              className="border border-[#D7DCE0] rounded-xl px-3 py-1.5 text-xs font-semibold outline-none focus:border-[#C59B24] cursor-pointer bg-white"
            >
              <option value="all">All Sources ({counts.all})</option>
              <option value="contact">Contact Us ({counts.contact})</option>
              <option value="quote">Get a Quote ({counts.quote})</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Rows:</span>
            <select
              value={pageSize}
              onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="border border-[#D7DCE0] rounded-xl px-3 py-1.5 text-xs font-semibold outline-none focus:border-[#C59B24] cursor-pointer bg-white"
            >
              {[10, 25, 50, 100].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Table */}
      <div style={{ overflowX: "auto", maxHeight: "560px", overflowY: "auto" }} className="w-full rounded-2xl border border-gray-200 shadow-xs">
        <table style={{ whiteSpace: "nowrap" }} className="w-full text-xs sm:text-sm overflow-hidden">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#141E36] text-white">
              <th className="px-4 py-3.5 font-bold text-left">#</th>
              <th className="px-4 py-3.5 font-bold text-left">Form Source</th>
              <th className="px-4 py-3.5 font-bold text-left">Name</th>
              <th className="px-4 py-3.5 font-bold text-left">Email</th>
              <th className="px-4 py-3.5 font-bold text-left">Phone</th>
              <th className="px-4 py-3.5 font-bold text-left">Subject / Routing</th>
              <th className="px-4 py-3.5 font-bold text-left">Service</th>
              <th className="px-4 py-3.5 font-bold text-left">Comments</th>
              <th className="px-4 py-3.5 font-bold text-left">Submitted At</th>
              <th className="px-4 py-3.5 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-12 text-gray-400">
                  <div className="space-y-1">
                    <p className="font-semibold text-sm">No inquiries found</p>
                    <p className="text-xs">Try selecting a different filter or clearing search</p>
                  </div>
                </td>
              </tr>
            ) : (
              pageData.map((s, idx) => {
                const isQuote = getRowType(s) === 'quote';
                return (
                  <tr key={s.id ?? s._id ?? idx} className="hover:bg-slate-50 border-b border-gray-100 transition-colors">
                    <td className="px-4 py-3 align-middle font-bold text-[#141E36]">{getGlobalIndex(idx)}</td>
                    
                    {/* Form Source Badge (Quote vs Contact) */}
                    <td className="px-4 py-3 align-middle">
                      {isQuote ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FDF9EE] text-[#C59B24] border border-[#E2C876] shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C59B24]" />
                          Get a Quote
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-900 border border-blue-200 shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          Contact Us
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3 align-middle font-semibold text-gray-900">{s.name}</td>
                    <td className="px-4 py-3 align-middle text-gray-600">{s.email}</td>
                    <td className="px-4 py-3 align-middle text-gray-700 font-mono text-xs">{s.phone}</td>
                    <td className="px-4 py-3 align-middle text-gray-800 max-w-[200px] truncate" title={s.subject}>
                      {s.subject}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs font-medium">
                        {s.service || 'General'}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-gray-500 max-w-[180px] truncate" title={s.comments}>
                      {(s.comments || '').length > 35 ? s.comments.substring(0, 35) + '...' : s.comments}
                    </td>
                    <td className="px-4 py-3 align-middle text-gray-500 text-xs">
                      {s.createdAt ? new Date(s.createdAt).toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3 align-middle text-center">
                      <button
                        onClick={() => setViewRow({ ...s, inquiryNo: getGlobalIndex(idx), isQuote })}
                        className="px-3.5 py-1.5 bg-[#141E36] hover:bg-[#1D2A4C] text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-xs"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-3 border-t border-gray-100">
        <div className="text-xs text-gray-600">
          Showing <span className="font-bold">{filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}</span> - <span className="font-bold">{Math.min(filtered.length, page * pageSize)}</span> of <span className="font-bold">{filtered.length}</span> inquiries
        </div>
        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold disabled:opacity-40 bg-white hover:bg-gray-50 transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <div className="px-3 py-1 text-xs font-bold text-[#141E36]">{page} / {totalPages}</div>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-3.5 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold disabled:opacity-40 bg-white hover:bg-gray-50 transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Detail Modal Popup */}
      {viewRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4" onClick={() => setViewRow(null)}>
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-[620px] max-h-[92vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#141E36] px-6 py-4 flex items-center justify-between text-white shrink-0 border-b border-[#C59B24]/40">
              <div className="flex items-center gap-3">
                <h3 className="text-base sm:text-lg font-bold">Inquiry #{viewRow.inquiryNo}</h3>
                {viewRow.isQuote ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#C59B24] text-white">
                    Get a Quote
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500 text-white">
                    Contact Us
                  </span>
                )}
              </div>
              <button
                onClick={() => setViewRow(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg font-bold cursor-pointer transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Full Name</p>
                  <p className="text-[#141E36] font-bold">{viewRow.name || '—'}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-[#141E36] font-bold break-all">{viewRow.email || '—'}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                  <p className="text-[#141E36] font-bold font-mono">{viewRow.phone || '—'}</p>
                </div>
                <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Service Type</p>
                  <p className="text-[#C59B24] font-bold">{viewRow.service || '—'}</p>
                </div>
                <div className="col-span-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Subject</p>
                  <p className="text-[#141E36] font-semibold">{viewRow.subject || '—'}</p>
                </div>
                <div className="col-span-2 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">Submitted At</p>
                  <p className="text-gray-700 font-medium">{viewRow.createdAt ? new Date(viewRow.createdAt).toLocaleString() : '—'}</p>
                </div>
              </div>

              {/* Comments / Quote Specification breakdown */}
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {viewRow.isQuote ? 'Quote Specifications & Notes' : 'Message / Inquiries'}
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap font-mono leading-relaxed max-h-60 overflow-y-auto">
                  {viewRow.comments || '—'}
                </div>
              </div>

              <button
                onClick={() => setViewRow(null)}
                className="w-full py-3 bg-[#141E36] hover:bg-[#1D2A4C] text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors shadow-md"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
