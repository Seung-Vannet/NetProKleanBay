import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Edit3,
  Save,
  Send,
  Table,
  Archive,
  ArrowRight,
  TrendingUp,
  FileCheck,
  ExternalLink,
  Plus,
  RefreshCw,
  Sliders,
} from 'lucide-react';

export const TLView = () => {
  const {
    currentUser,
    fallbackInstruction,
    updateFallback,
    queueCount,
    setQueueCount,
    triggerAutoTurnover,
    tasks,
    archivedTasks,
    submitTask,
    alerts,
    sendAlert,
    setShowSheetsModal,
  } = useApp();

  // Fallback editor state
  const [isEditingFallback, setIsEditingFallback] = useState(false);
  const [fallbackTitle, setFallbackTitle] = useState(fallbackInstruction.instruction);
  const [fallbackStepsText, setFallbackStepsText] = useState(fallbackInstruction.steps.join('\n'));

  // Quick Queue Count input
  const [customQueueInput, setCustomQueueInput] = useState(queueCount);

  // TL Alert form
  const [tlAlertTitle, setTlAlertTitle] = useState('');
  const [tlAlertMsg, setTlAlertMsg] = useState('');
  const [tlAudience, setTlAudience] = useState('Alpha Team (Car Labeling)');

  const handleSaveFallback = (e) => {
    e.preventDefault();
    updateFallback({
      instruction: fallbackTitle,
      steps: fallbackStepsText.split('\n').filter((s) => s.trim().length > 0),
    });
    setIsEditingFallback(false);
  };

  const handleUpdateQueue = (e) => {
    e.preventDefault();
    setQueueCount(Number(customQueueInput));
  };

  const handleSendTlAlert = (e) => {
    e.preventDefault();
    if (!tlAlertTitle.trim() || !tlAlertMsg.trim()) return;

    sendAlert({
      title: tlAlertTitle,
      message: tlAlertMsg,
      audience: tlAudience,
      urgent: true,
    });

    setTlAlertTitle('');
    setTlAlertMsg('');
  };

  // Metrics
  const activeTasksCount = tasks.filter((t) => t.status === 'processing').length;
  const pendingTasksCount = tasks.filter((t) => t.status === 'pending').length;
  const submittedTodayCount = archivedTasks.length + tasks.filter((t) => t.status === 'submitted').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* TL Header & KPI Summary */}
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
              <span className="badge badge-amber">TEAM LEADER</span>
              <span className="badge badge-cyan">{currentUser.team}</span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Managing associates, turnover generation, fallback instructions, and Google Sheets sync
            </p>
          </div>
        </div>

        {/* Quick Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowSheetsModal(true)}
            className="btn btn-ghost btn-sm"
            style={{ color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.4)' }}
          >
            <Table size={14} />
            Master Sheet
          </button>
          <button
            onClick={() => triggerAutoTurnover()}
            className="btn btn-primary btn-sm"
            style={{ gap: '6px' }}
          >
            <Zap size={14} />
            Auto-Turnover (+25 Tasks)
          </button>
        </div>
      </div>

      {/* KPI Cards (Clean Flat Matte) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="panel-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Client Task Queue</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: queueCount === 0 ? '#ef4444' : 'var(--ddd-blue)', marginTop: '4px' }}>
            {queueCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: queueCount === 0 ? '#ef4444' : 'var(--text-muted)', marginTop: '2px' }}>
            {queueCount === 0 ? 'Empty — Fallback Active' : 'Normal task buffer'}
          </div>
        </div>

        <div className="panel-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tasks In Progress</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
            {activeTasksCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            {pendingTasksCount} pending assignment
          </div>
        </div>

        <div className="panel-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Submitted & Auto-Archived</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
            {submittedTodayCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Tracked in Submitted Tab
          </div>
        </div>

        <div className="panel-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>QA Client Pass Rate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>
            99.2%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Above 98.5% Client SLA
          </div>
        </div>
      </div>

      {/* Grid: Fallback Instruction Editor & Client Queue Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        {/* Fallback Instruction Editor (Solves Problem 2) */}
        <div className="panel-card" style={{ borderLeft: '4px solid var(--ddd-blue)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={17} style={{ color: 'var(--ddd-blue)' }} />
              <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>
                Empty Queue Fallback Protocol
              </h3>
            </div>
            {!isEditingFallback ? (
              <button
                onClick={() => {
                  setFallbackTitle(fallbackInstruction.instruction);
                  setFallbackStepsText(fallbackInstruction.steps.join('\n'));
                  setIsEditingFallback(true);
                }}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.74rem' }}
              >
                <Edit3 size={13} />
                Edit Instruction
              </button>
            ) : (
              <span className="badge badge-amber">Editing Mode</span>
            )}
          </div>

          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Solves Problem #2: When the task queue runs out, associates instantly see this fallback protocol on their "What do I do now" screen. No idle waiting.
          </p>

          {!isEditingFallback ? (
            <div style={{ background: 'var(--ddd-input)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
              <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.86rem', marginBottom: '8px' }}>
                {fallbackInstruction.instruction}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                {fallbackInstruction.steps.map((st, i) => (
                  <li key={i} style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ color: 'var(--ddd-blue)' }}>•</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: '10px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Last edited by {fallbackInstruction.updatedBy} ({fallbackInstruction.updatedAt})
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveFallback} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Condition Headline
                </label>
                <input
                  type="text"
                  value={fallbackTitle}
                  onChange={(e) => setFallbackTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Action Steps (One per line)
                </label>
                <textarea
                  rows={4}
                  value={fallbackStepsText}
                  onChange={(e) => setFallbackStepsText(e.target.value)}
                  className="form-textarea"
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditingFallback(false)}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                  <Save size={13} />
                  Save & Push to Associates
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Client Queue Count Input & Auto-Turnover Trigger */}
        <div className="panel-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={17} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>
                Client Queue Count & Turnover
              </h3>
            </div>
            <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>Client Portal Sync</span>
          </div>

          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Solves Problem #6: Queue count lives on client's private website. TL or Senior enters the count, or triggers Auto-Turnover to populate links to the sheet.
          </p>

          <form onSubmit={handleUpdateQueue} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Observed Client Queue Count:
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={customQueueInput}
                onChange={(e) => setCustomQueueInput(e.target.value)}
                className="form-input"
              />
            </div>
            <button type="submit" className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-end', padding: '8px 12px' }}>
              Update Count
            </button>
          </form>

          <div style={{ background: 'var(--ddd-input)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc', marginBottom: '4px' }}>
              Auto-Turnover Generator
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Provisions next batch task links into the turnover sheet and posts to Google Chat.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => triggerAutoTurnover('Batch #903 (Highway North)')}
                className="btn btn-success btn-sm"
                style={{ flex: 1, gap: '6px' }}
              >
                <Plus size={14} />
                Generate Batch #903
              </button>
              <button
                onClick={() => setQueueCount(0)}
                className="btn btn-danger btn-sm"
                title="Simulate queue dropping to 0 to test fallback"
              >
                Set Queue = 0
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Turnover Sheet Tracker */}
      <div className="panel-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Table size={17} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>
                Live Turnover Sheet (Synced with Google Sheets)
              </h3>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: '2px 0 0' }}>
              When a task is submitted, it automatically moves to the "Submitted Archive" tab, preserving full audit history.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowSheetsModal(true)}
              className="btn btn-ghost btn-sm"
              style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.4)' }}
            >
              <Table size={14} />
              Open In Google Sheets Tab
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-card)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Task ID</th>
                <th style={{ padding: '10px 12px' }}>Batch</th>
                <th style={{ padding: '10px 12px' }}>Label Name</th>
                <th style={{ padding: '10px 12px' }}>Sub-Role</th>
                <th style={{ padding: '10px 12px' }}>Assignee</th>
                <th style={{ padding: '10px 12px' }}>Status</th>
                <th style={{ padding: '10px 12px' }}>Task URL</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <span className="mono" style={{ color: 'var(--ddd-blue)', fontWeight: 600 }}>{task.id}</span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.68rem' }}>{task.batch}</span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#f8fafc', fontWeight: 500 }}>{task.labelName}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{task.subRole}</td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1' }}>{task.assignee}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span className={`badge ${
                      task.status === 'processing' ? 'badge-amber' :
                      task.status === 'submitted' ? 'badge-green' : 'badge-gray'
                    }`} style={{ fontSize: '0.68rem' }}>
                      {task.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <a
                      href={task.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--ddd-blue)', display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                    >
                      Open Link <ExternalLink size={11} />
                    </a>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                    <button
                      onClick={() => submitTask(task.id)}
                      className="btn btn-success btn-sm"
                      style={{ fontSize: '0.72rem', padding: '4px 8px', gap: '4px' }}
                      title="Move to Submitted Archive"
                    >
                      <FileCheck size={12} />
                      Submit & Archive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
