import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  Search,
  ThumbsUp,
  Copy,
  Check,
  AlertTriangle,
  Cpu,
  Wifi,
  Key,
  HelpCircle,
  Clock,
  User,
} from 'lucide-react';

export const KnownIssuesBoard = () => {
  const { knownIssues, upvoteIssue, searchQuery, setSearchQuery, currentUser } = useApp();
  const [copiedId, setCopiedId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('ALL');

  const categories = ['ALL', 'Hardware & Browser', 'Authentication', 'Network', 'Internal HR'];

  const filteredIssues = knownIssues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.symptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.steps.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = filterCategory === 'ALL' || issue.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopySteps = (id, steps) => {
    navigator.clipboard.writeText(steps.join('\n'));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Banner */}
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
            <Wrench size={20} style={{ color: '#f59e0b' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Known-Issues Board (PC & Tools)</h2>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Solves Problem #5: Repeated PC and tool problems documented with step-by-step fixes so seniors don't repeat themselves.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
            {knownIssues.length} Verified Solutions
          </span>
        </div>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`btn btn-sm ${filterCategory === cat ? 'btn-primary' : 'btn-ghost'}`}
              style={{ fontSize: '0.74rem' }}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredIssues.length}</strong> issues
        </div>
      </div>

      {/* Issues List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredIssues.map((issue) => (
          <div
            key={issue.id}
            className="panel-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              borderLeft: `4px solid ${
                issue.category === 'Hardware & Browser' ? 'var(--ddd-blue)' :
                issue.category === 'Network' ? '#10b981' :
                issue.category === 'Authentication' ? '#f59e0b' : '#8b5cf6'
              }`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="mono" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ddd-blue)' }}>
                  {issue.id}
                </span>
                <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>
                  {issue.title}
                </h3>
                <span className="badge badge-gray" style={{ fontSize: '0.66rem' }}>
                  {issue.category}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={() => upvoteIssue(issue.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ gap: '4px', fontSize: '0.74rem', color: 'var(--ddd-blue)' }}
                  title="Mark as helpful"
                >
                  <ThumbsUp size={12} />
                  <span>{issue.upvotes} Helpful</span>
                </button>
                <button
                  onClick={() => handleCopySteps(issue.id, issue.steps)}
                  className="btn btn-ghost btn-sm"
                  style={{ gap: '4px', fontSize: '0.74rem' }}
                >
                  {copiedId === issue.id ? <Check size={12} style={{ color: '#10b981' }} /> : <Copy size={12} />}
                  <span>{copiedId === issue.id ? 'Copied Steps!' : 'Copy Steps'}</span>
                </button>
              </div>
            </div>

            {/* Symptoms banner */}
            <div style={{
              background: 'var(--color-red-bg)',
              border: '1px solid var(--color-red-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 12px',
              fontSize: '0.78rem',
              color: '#fca5a5',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <AlertTriangle size={14} style={{ flexShrink: 0 }} />
              <div>
                <strong>Symptoms:</strong> {issue.symptoms}
              </div>
            </div>

            {/* Step-by-step fix */}
            <div style={{
              background: 'var(--ddd-input)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--ddd-blue)', marginBottom: '6px' }}>
                VERIFIED FIX PROCEDURE:
              </div>
              <ol style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                {issue.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <div>Documented by: <strong style={{ color: '#fff' }}>{issue.author}</strong></div>
              <div>Updated: {issue.updated}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
