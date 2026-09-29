import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Table,
  Archive,
  Zap,
  CheckCircle2,
  ExternalLink,
  Plus,
  Clock,
  User,
  Shield,
  FileCheck,
  Download,
  Filter,
} from 'lucide-react';

export const TaskTurnoverView = () => {
  const {
    tasks,
    archivedTasks,
    submitTask,
    triggerAutoTurnover,
    queueCount,
    currentUser,
    setShowSheetsModal,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState('active'); // 'active' or 'archive'
  const [filterSubRole, setFilterSubRole] = useState('ALL');

  const filteredActiveTasks = tasks.filter((t) => {
    return filterSubRole === 'ALL' || t.subRole === filterSubRole;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Banner */}
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
            <Table size={20} style={{ color: '#10b981' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Task Tracker, Auto-Turnover & Auto-Archive</h2>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Solves Problems #6 & #7: Auto-generated turnover links and permanent audit history in the auto-archive tab.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowSheetsModal(true)}
            className="btn btn-ghost btn-sm"
            style={{ color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.4)' }}
          >
            <Table size={14} />
            Google Sheets View
          </button>

          {(currentUser.role === 'tl' || currentUser.role === 'pm') && (
            <button
              onClick={() => triggerAutoTurnover()}
              className="btn btn-primary btn-sm"
              style={{ gap: '6px' }}
            >
              <Zap size={14} />
              Auto-Turnover (+25)
            </button>
          )}
        </div>
      </div>

      {/* Sub Tabs: Active Turnover vs Auto-Archive */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-card)', paddingBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveSubTab('active')}
            className={`btn btn-sm ${activeSubTab === 'active' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.8rem' }}
          >
            <Table size={13} />
            Active Turnover Sheet ({tasks.length})
          </button>
          <button
            onClick={() => setActiveSubTab('archive')}
            className={`btn btn-sm ${activeSubTab === 'archive' ? 'btn-primary' : 'btn-ghost'}`}
            style={{ fontSize: '0.8rem' }}
          >
            <Archive size={13} />
            Submitted Auto-Archive ({archivedTasks.length})
          </button>
        </div>

        {activeSubTab === 'active' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Filter Sub-role:</span>
            <select
              value={filterSubRole}
              onChange={(e) => setFilterSubRole(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '3px 8px', fontSize: '0.76rem' }}
            >
              <option value="ALL">All Sub-roles</option>
              <option value="first_pass">First Pass</option>
              <option value="review_skip">Review Skip</option>
              <option value="qa">QA Review</option>
            </select>
          </div>
        )}
      </div>

      {/* Tab 1: Active Turnover Sheet Table */}
      {activeSubTab === 'active' && (
        <div className="panel-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: 'var(--ddd-input)', borderBottom: '1px solid var(--border-card)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px' }}>Task ID</th>
                  <th style={{ padding: '10px 14px' }}>Batch</th>
                  <th style={{ padding: '10px 14px' }}>Label Name</th>
                  <th style={{ padding: '10px 14px' }}>Sub-Role</th>
                  <th style={{ padding: '10px 14px' }}>Assignee</th>
                  <th style={{ padding: '10px 14px' }}>Priority</th>
                  <th style={{ padding: '10px 14px' }}>Status</th>
                  <th style={{ padding: '10px 14px' }}>Task Link</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredActiveTasks.length === 0 ? (
                  <tr>
                    <td colSpan={9} style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
                      No tasks found in active queue. Trigger Auto-Turnover to load next batch.
                    </td>
                  </tr>
                ) : (
                  filteredActiveTasks.map((t) => (
                    <tr key={t.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '10px 14px' }}>
                        <span className="mono" style={{ color: 'var(--ddd-blue)', fontWeight: 600 }}>{t.id}</span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span className="badge badge-purple" style={{ fontSize: '0.66rem' }}>{t.batch}</span>
                      </td>
                      <td style={{ padding: '10px 14px', color: '#f8fafc', fontWeight: 500 }}>{t.labelName}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span className="badge badge-cyan" style={{ fontSize: '0.66rem' }}>
                          {t.subRole === 'first_pass' ? 'First Pass' : t.subRole === 'review_skip' ? 'Review Skip' : 'QA'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px', color: '#cbd5e1' }}>{t.assignee}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span className={`badge ${t.priority === 'Urgent' ? 'badge-red' : t.priority === 'High' ? 'badge-amber' : 'badge-gray'}`} style={{ fontSize: '0.64rem' }}>
                          {t.priority}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <span className={`badge ${t.status === 'processing' ? 'badge-amber' : 'badge-gray'}`} style={{ fontSize: '0.66rem' }}>
                          {t.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--ddd-blue)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                        >
                          Client Link <ExternalLink size={11} />
                        </a>
                      </td>
                      <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                        <button
                          onClick={() => submitTask(t.id)}
                          className="btn btn-success btn-sm"
                          style={{ fontSize: '0.72rem', padding: '3px 8px', gap: '4px' }}
                          title="Auto-move to Submitted tab"
                        >
                          <FileCheck size={12} />
                          Submit & Archive
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Auto-Archive Table */}
      {activeSubTab === 'archive' && (
        <div className="panel-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 18px', background: 'var(--color-green-bg)', borderBottom: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '0.8rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} />
              Permanent Audit Trail: Submitted tasks automatically archived here with timestamps.
            </div>
            <button
              onClick={() => alert('Exporting submitted archive to CSV / Google Drive...')}
              className="btn btn-ghost btn-sm"
              style={{ fontSize: '0.72rem', gap: '4px' }}
            >
              <Download size={12} /> Export CSV
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ background: 'var(--ddd-input)', borderBottom: '1px solid var(--border-card)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px 14px' }}>Task ID</th>
                  <th style={{ padding: '10px 14px' }}>Batch</th>
                  <th style={{ padding: '10px 14px' }}>Label Name</th>
                  <th style={{ padding: '10px 14px' }}>Labeler / Assignee</th>
                  <th style={{ padding: '10px 14px' }}>Submitted Timestamp</th>
                  <th style={{ padding: '10px 14px' }}>QA Audit Status</th>
                  <th style={{ padding: '10px 14px' }}>Archived By</th>
                </tr>
              </thead>
              <tbody>
                {archivedTasks.map((arc) => (
                  <tr key={arc.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="mono" style={{ color: '#10b981', fontWeight: 600 }}>{arc.id}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="badge badge-purple" style={{ fontSize: '0.66rem' }}>{arc.batch}</span>
                    </td>
                    <td style={{ padding: '10px 14px', color: '#f8fafc', fontWeight: 500 }}>{arc.labelName}</td>
                    <td style={{ padding: '10px 14px', color: '#cbd5e1' }}>{arc.assignee}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{arc.submittedAt}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span className="badge badge-green" style={{ fontSize: '0.66rem' }}>
                        {arc.qaScore}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-dim)', fontSize: '0.74rem' }}>
                      {arc.archivedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
