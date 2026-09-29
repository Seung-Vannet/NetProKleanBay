import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Shield,
  BookOpen,
  PlusCircle,
  TrendingUp,
  BarChart3,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  Table,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';

export const PMView = () => {
  const {
    currentUser,
    rulings,
    addRuling,
    tasks,
    archivedTasks,
    queueCount,
    SHIFTS,
    setActiveTab,
    setShowSheetsModal,
  } = useApp();

  // New Ruling Modal Form State
  const [showAddRulingModal, setShowAddRulingModal] = useState(false);
  const [rulingTitle, setRulingTitle] = useState('');
  const [rulingCategory, setRulingCategory] = useState('Vehicle Attributes');
  const [rulingTags, setRulingTags] = useState('SUV, Roof Rack, Lights');
  const [clientDecision, setClientDecision] = useState('');
  const [doListText, setDoListText] = useState('Draw cyan box around car chassis\nTag accessories separately');
  const [dontListText, setDontListText] = useState('Do not include luggage boxes in vehicle body');
  const [imageChoice, setImageChoice] = useState('/assets/modified_suv_ruling.jpg');

  const handleCreateRuling = (e) => {
    e.preventDefault();
    if (!rulingTitle.trim() || !clientDecision.trim()) return;

    addRuling({
      title: rulingTitle,
      category: rulingCategory,
      tags: rulingTags.split(',').map((t) => t.trim()).filter(Boolean),
      clientDecision,
      doList: doListText.split('\n').filter((s) => s.trim().length > 0),
      dontList: dontListText.split('\n').filter((s) => s.trim().length > 0),
      image: imageChoice,
    });

    setShowAddRulingModal(false);
    setRulingTitle('');
    setClientDecision('');
  };

  const totalSubmitted = archivedTasks.length + tasks.filter((t) => t.status === 'submitted').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* PM Banner */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{currentUser.name}</h2>
              <span className="badge badge-green">PROJECT MANAGER</span>
              <span className="badge badge-cyan">{currentUser.team}</span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Sole Client Communication Authority • Cross-Shift SLA Monitoring • Official Rulings Publisher
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowAddRulingModal(true)}
            className="btn btn-primary btn-sm"
            style={{ gap: '6px' }}
          >
            <PlusCircle size={14} />
            Publish Client Ruling
          </button>
        </div>
      </div>

      {/* Cross-Shift Operations Overview (3 Shifts) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {Object.entries(SHIFTS).map(([key, shift]) => (
          <div key={key} className="panel-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>{shift.name}</span>
              <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{shift.hours}</span>
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: '4px 0' }}>
              {key === 'shift_1' ? 'Shift Active (Floor 3)' : key === 'shift_2' ? 'Incoming Handover' : 'Night Standby'}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Break: {shift.breakHour.split('(')[0]}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', borderTop: '1px solid var(--border-card)', paddingTop: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Tasks Processed:</span>
              <strong style={{ color: 'var(--ddd-blue)' }}>{key === 'shift_1' ? '184 / 200' : key === 'shift_2' ? 'Scheduled' : 'Completed (162)'}</strong>
            </div>
          </div>
        ))}
      </div>

      {/* Program Health & Client SLA Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Left: Client Rulings Authority Board */}
        <div className="panel-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={17} style={{ color: 'var(--ddd-blue)' }} />
              <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>
                Official Client Rulings ({rulings.length})
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('rulings')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.74rem' }}
            >
              Open Gallery View
            </button>
          </div>

          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Solves Problem #4: Once PM gets client clarification, it is published here as a permanent, searchable visual card. Prevents questions from getting buried in chat.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rulings.map((ruling) => (
              <div
                key={ruling.id}
                style={{
                  background: 'var(--ddd-input)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'center',
                }}
              >
                {ruling.image && (
                  <img
                    src={ruling.image}
                    alt={ruling.title}
                    style={{ width: '74px', height: '56px', borderRadius: '4px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span className="mono" style={{ fontSize: '0.74rem', color: 'var(--ddd-blue)', fontWeight: 600 }}>
                      {ruling.id}
                    </span>
                    <span className="badge badge-green" style={{ fontSize: '0.62rem' }}>{ruling.status}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{ruling.date}</span>
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
                    {ruling.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ruling.clientDecision}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Project Manager Controls & Exports */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="panel-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <BarChart3 size={17} style={{ color: '#10b981' }} />
              <h4 style={{ fontSize: '0.94rem', color: '#fff', margin: 0 }}>Client SLA Scorecard</h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Audit Accuracy Rate:</span>
                  <strong style={{ color: '#10b981' }}>99.2% (Target: 98.5%)</strong>
                </div>
                <div style={{ width: '100%', height: '5px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '99.2%', height: '100%', background: '#10b981' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Batch Turnover On-Time:</span>
                  <strong style={{ color: 'var(--ddd-blue)' }}>98.8%</strong>
                </div>
                <div style={{ width: '100%', height: '5px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '98.8%', height: '100%', background: 'var(--ddd-blue)' }}></div>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Active Client Queue Buffer:</span>
                  <strong style={{ color: queueCount < 10 ? '#ef4444' : '#f59e0b' }}>{queueCount} Tasks</strong>
                </div>
                <div style={{ width: '100%', height: '5px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, (queueCount / 50) * 100)}%`, height: '100%', background: '#f59e0b' }}></div>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-card)', marginTop: '16px', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => setShowSheetsModal(true)}
                className="btn btn-ghost btn-sm"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.74rem' }}
              >
                <Table size={13} style={{ color: '#10b981' }} />
                Review Turnover Google Sheet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Publish Client Ruling Modal */}
      {showAddRulingModal && (
        <div className="modal-overlay">
          <div className="panel-card" style={{ maxWidth: '600px', width: '92%', background: 'var(--ddd-surface)' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '6px' }}>
              Publish Official Client Ruling
            </h3>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Only Project Managers can publish rulings received directly from the client.
            </p>

            <form onSubmit={handleCreateRuling} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Ruling Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Commercial Van Roof Ladders Classification"
                  value={rulingTitle}
                  onChange={(e) => setRulingTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Category
                  </label>
                  <select
                    value={rulingCategory}
                    onChange={(e) => setRulingCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="Vehicle Attributes">Vehicle Attributes</option>
                    <option value="Skip Policy">Skip Policy (Occlusion/Blur)</option>
                    <option value="Vehicle Classes">Vehicle Classes & Hierarchy</option>
                    <option value="Pedestrian & Rider">Pedestrian & Rider Annotations</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    Search Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={rulingTags}
                    onChange={(e) => setRulingTags(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Official Client Decision / Specification
                </label>
                <textarea
                  rows={3}
                  placeholder="Exact quote or policy specification confirmed with client engineering..."
                  value={clientDecision}
                  onChange={(e) => setClientDecision(e.target.value)}
                  className="form-textarea"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.74rem', color: '#10b981', display: 'block', marginBottom: '4px' }}>
                    DO Guidelines (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={doListText}
                    onChange={(e) => setDoListText(e.target.value)}
                    className="form-textarea"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.74rem', color: '#ef4444', display: 'block', marginBottom: '4px' }}>
                    DON'T Guidelines (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={dontListText}
                    onChange={(e) => setDontListText(e.target.value)}
                    className="form-textarea"
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Reference Photo
                </label>
                <select
                  value={imageChoice}
                  onChange={(e) => setImageChoice(e.target.value)}
                  className="form-select"
                >
                  <option value="/assets/modified_suv_ruling.jpg">Modified SUV with Roof Rack Example</option>
                  <option value="/assets/occluded_car_ruling.jpg">Severe Occlusion &gt;70% Skip Example</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddRulingModal(false)}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Publish to Entire Organization
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
