import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Table,
  Check,
  Download,
  Share2,
  ExternalLink,
  Plus,
  RefreshCw,
} from 'lucide-react';

export const GoogleSheetsModal = () => {
  const { showSheetsModal, setShowSheetsModal, tasks, archivedTasks, queueCount } = useApp();
  const [activeSheetTab, setActiveSheetTab] = useState('turnover'); // 'turnover', 'submitted', 'calculations'

  if (!showSheetsModal) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowSheetsModal(false)}>
      <div
        className="google-sheet-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '94%',
          maxWidth: '1200px',
          height: '85vh',
          background: 'var(--ddd-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Google Sheets Header Bar */}
        <div style={{
          background: '#0d131f',
          padding: '12px 20px',
          borderBottom: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: '#0f9d58',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Table size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>
                  DDD_Car_Vision_Master_Turnover_Sheet_2026
                </span>
                <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>Saved to Google Drive</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                File • Edit • View • Insert • Format • Tools • Extensions (FlowHub Webhook Connected)
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span className="pulse-dot"></span> Live 2-Way Sync Active
            </span>
            <button
              onClick={() => setShowSheetsModal(false)}
              className="btn btn-ghost btn-sm"
              style={{ padding: '4px 8px' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Formula Bar Simulation */}
        <div style={{
          background: 'var(--ddd-input)',
          padding: '6px 16px',
          borderBottom: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontSize: '0.78rem',
        }}>
          <span className="mono" style={{ color: 'var(--text-muted)', fontWeight: 600 }}>fx</span>
          <div style={{
            background: 'var(--ddd-surface)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-sm)',
            padding: '3px 10px',
            flex: 1,
            color: 'var(--ddd-blue)',
            fontFamily: 'var(--font-mono)',
          }}>
            =COUNTA(Active_Turnover!A2:A) & " Active Tasks | Client Queue: " & {queueCount}
          </div>
        </div>

        {/* Sheet Content Area */}
        <div style={{ flex: 1, overflow: 'auto', background: '#0a0f1a' }}>
          {activeSheetTab === 'turnover' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
              <thead>
                <tr style={{ background: '#111827', borderBottom: '1px solid #1f293d', color: '#94a3b8' }}>
                  <th style={{ width: '40px', padding: '6px', textAlign: 'center', borderRight: '1px solid #1f293d' }}>#</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>A (Task ID)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>B (Batch)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>C (Label Name)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>D (Sub-Role)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>E (Assignee Email)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>F (Status)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>G (Task Link)</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t, idx) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #192233', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                    <td style={{ textAlign: 'center', color: '#64748b', borderRight: '1px solid #1f293d' }}>{idx + 2}</td>
                    <td style={{ padding: '6px 12px', color: 'var(--ddd-blue)', borderRight: '1px solid #1f293d' }}>{t.id}</td>
                    <td style={{ padding: '6px 12px', color: '#a78bfa', borderRight: '1px solid #1f293d' }}>{t.batch}</td>
                    <td style={{ padding: '6px 12px', color: '#f8fafc', borderRight: '1px solid #1f293d' }}>{t.labelName}</td>
                    <td style={{ padding: '6px 12px', color: '#94a3b8', borderRight: '1px solid #1f293d' }}>{t.subRole}</td>
                    <td style={{ padding: '6px 12px', color: '#cbd5e1', borderRight: '1px solid #1f293d' }}>{t.assigneeEmail || t.assignee}</td>
                    <td style={{ padding: '6px 12px', borderRight: '1px solid #1f293d' }}>
                      <span style={{ color: t.status === 'processing' ? '#f59e0b' : '#10b981', fontWeight: 600 }}>
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '6px 12px', color: '#60a5fa' }}>{t.url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeSheetTab === 'submitted' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
              <thead>
                <tr style={{ background: '#111827', borderBottom: '1px solid #1f293d', color: '#94a3b8' }}>
                  <th style={{ width: '40px', padding: '6px', textAlign: 'center', borderRight: '1px solid #1f293d' }}>#</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>A (Archive ID)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>B (Batch)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>C (Label Name)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>D (Submitted By)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left', borderRight: '1px solid #1f293d' }}>E (Submitted Timestamp)</th>
                  <th style={{ padding: '8px 12px', textAlign: 'left' }}>F (Audit Score)</th>
                </tr>
              </thead>
              <tbody>
                {archivedTasks.map((arc, idx) => (
                  <tr key={arc.id} style={{ borderBottom: '1px solid #192233', background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
                    <td style={{ textAlign: 'center', color: '#64748b', borderRight: '1px solid #1f293d' }}>{idx + 2}</td>
                    <td style={{ padding: '6px 12px', color: '#10b981', borderRight: '1px solid #1f293d' }}>{arc.id}</td>
                    <td style={{ padding: '6px 12px', color: '#a78bfa', borderRight: '1px solid #1f293d' }}>{arc.batch}</td>
                    <td style={{ padding: '6px 12px', color: '#f8fafc', borderRight: '1px solid #1f293d' }}>{arc.labelName}</td>
                    <td style={{ padding: '6px 12px', color: '#cbd5e1', borderRight: '1px solid #1f293d' }}>{arc.assignee}</td>
                    <td style={{ padding: '6px 12px', color: '#94a3b8', borderRight: '1px solid #1f293d' }}>{arc.submittedAt}</td>
                    <td style={{ padding: '6px 12px', color: '#34d399', fontWeight: 600 }}>{arc.qaScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeSheetTab === 'calculations' && (
            <div style={{ padding: '24px', color: '#e2e8f0', fontSize: '0.85rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '12px' }}>Summary Calculations & SLA Formulas</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ background: 'var(--ddd-input)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>=AVERAGE(Submitted!F2:F)</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#10b981', margin: '6px 0' }}>99.4%</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Client Quality Target: 98.5%</div>
                </div>
                <div style={{ background: 'var(--ddd-input)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>=COUNTIF(Turnover!F:F, "processing")</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f59e0b', margin: '6px 0' }}>{tasks.filter(t => t.status === 'processing').length}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>WIP Capacity Limit: 25</div>
                </div>
                <div style={{ background: 'var(--ddd-input)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-card)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>=SUM(Archive!TotalRows)</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--ddd-blue)', margin: '6px 0' }}>{archivedTasks.length}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Auto-Archived Today</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Sheet Tabs */}
        <div style={{
          background: '#0d131f',
          borderTop: '1px solid var(--border-card)',
          padding: '4px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <button
            onClick={() => setActiveSheetTab('turnover')}
            style={{
              padding: '6px 14px',
              background: activeSheetTab === 'turnover' ? '#151c2c' : 'transparent',
              color: activeSheetTab === 'turnover' ? 'var(--ddd-blue)' : '#94a3b8',
              border: 'none',
              borderBottom: activeSheetTab === 'turnover' ? '2px solid #0f9d58' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            Turnover (Active)
          </button>

          <button
            onClick={() => setActiveSheetTab('submitted')}
            style={{
              padding: '6px 14px',
              background: activeSheetTab === 'submitted' ? '#151c2c' : 'transparent',
              color: activeSheetTab === 'submitted' ? '#10b981' : '#94a3b8',
              border: 'none',
              borderBottom: activeSheetTab === 'submitted' ? '2px solid #0f9d58' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            Submitted (Auto-Archived)
          </button>

          <button
            onClick={() => setActiveSheetTab('calculations')}
            style={{
              padding: '6px 14px',
              background: activeSheetTab === 'calculations' ? '#151c2c' : 'transparent',
              color: activeSheetTab === 'calculations' ? '#a78bfa' : '#94a3b8',
              border: 'none',
              borderBottom: activeSheetTab === 'calculations' ? '2px solid #0f9d58' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: 600,
            }}
          >
            Calculations & SLA
          </button>
        </div>
      </div>
    </div>
  );
};
