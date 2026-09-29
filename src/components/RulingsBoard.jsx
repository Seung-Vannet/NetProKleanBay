import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Search,
  Tag,
  CheckCircle,
  XCircle,
  Calendar,
  User,
  Shield,
  Maximize2,
  X,
  Filter,
} from 'lucide-react';

export const RulingsBoard = () => {
  const { rulings, searchQuery, setSearchQuery, currentUser, setActiveTab } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [zoomedImage, setZoomedImage] = useState(null);

  const categories = ['ALL', 'Vehicle Attributes', 'Skip Policy', 'Vehicle Classes'];

  const filteredRulings = rulings.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.clientDecision.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Search Bar */}
      <div style={{
        background: 'var(--ddd-surface)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} style={{ color: 'var(--ddd-blue)' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Client Rulings Board</h2>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Solves Problem #4: Client decisions published once as searchable cards with sample photos. No repeated questions in chat.
          </p>
        </div>

        {currentUser.role === 'pm' && (
          <span className="badge badge-green" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
            PM Authority: Switch to PM tab to Publish New Rulings
          </span>
        )}
      </div>

      {/* Filter and Category Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Filter size={14} style={{ color: 'var(--text-muted)' }} />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.74rem' }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Showing <strong style={{ color: '#fff' }}>{filteredRulings.length}</strong> rulings
        </div>
      </div>

      {/* Rulings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: '20px' }}>
        {filteredRulings.map((ruling) => (
          <div
            key={ruling.id}
            className="panel-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0',
              overflow: 'hidden',
            }}
          >
            {/* Visual Example Image if available */}
            {ruling.image && (
              <div style={{ position: 'relative', height: '210px', background: '#0a0f1a', overflow: 'hidden' }}>
                <img
                  src={ruling.image}
                  alt={ruling.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={() => setZoomedImage(ruling.image)}
                  className="btn btn-ghost btn-sm"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    padding: '3px 8px',
                    fontSize: '0.72rem',
                    gap: '4px',
                  }}
                >
                  <Maximize2 size={12} /> Zoom
                </button>
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '10px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: 'var(--ddd-blue)',
                  border: '1px solid var(--border-card)',
                }}>
                  {ruling.id} • {ruling.category}
                </div>
              </div>
            )}

            {/* Content Body */}
            <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>{ruling.status}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <Calendar size={11} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
                  {ruling.date}
                </span>
              </div>

              <h3 style={{ fontSize: '1.02rem', color: '#fff', marginBottom: '8px', lineHeight: 1.3 }}>
                {ruling.title}
              </h3>

              <div style={{
                background: 'var(--ddd-input)',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                color: '#cbd5e1',
                lineHeight: 1.5,
                marginBottom: '14px',
                borderLeft: '3px solid var(--ddd-blue)',
              }}>
                <strong style={{ color: '#fff', display: 'block', marginBottom: '3px', fontSize: '0.82rem' }}>Client Ruling Specification:</strong>
                {ruling.clientDecision}
              </div>

              {/* DOs and DONTs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px', fontSize: '0.76rem' }}>
                <div style={{ background: 'var(--color-green-bg)', border: '1px solid var(--color-green-border)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: '#34d399', fontWeight: 700, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle size={12} /> DO:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', color: '#e2e8f0' }}>
                    {ruling.doList?.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: 'var(--color-red-bg)', border: '1px solid var(--color-red-border)', padding: '10px', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: '#f87171', fontWeight: 700, marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <XCircle size={12} /> DON'T:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', color: '#e2e8f0' }}>
                    {ruling.dontList?.map((d, i) => (
                      <li key={i}>• {d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags and Author Footer */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-card)', paddingTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {ruling.tags.map((tag) => (
                    <span key={tag} className="badge badge-cyan" style={{ fontSize: '0.64rem' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Published by {ruling.author}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Zoom Image Modal */}
      {zoomedImage && (
        <div className="modal-overlay" onClick={() => setZoomedImage(null)}>
          <div style={{ position: 'relative', maxWidth: '1000px', width: '95%' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomedImage(null)}
              className="btn btn-ghost"
              style={{ position: 'absolute', top: '-40px', right: 0, color: '#fff' }}
            >
              <X size={20} /> Close
            </button>
            <img
              src={zoomedImage}
              alt="High resolution labeling guideline"
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-card)' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
