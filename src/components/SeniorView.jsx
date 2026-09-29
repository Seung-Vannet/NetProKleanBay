import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  AlertTriangle,
  Send,
  CheckCircle,
  Clock,
  Wrench,
  Monitor,
  CheckCircle2,
  XCircle,
  RefreshCw,
  PlusCircle,
  Eye,
  Radio,
} from 'lucide-react';

export const SeniorView = () => {
  const {
    currentUser,
    alerts,
    sendAlert,
    attendance,
    setAttendance,
    USERS,
    knownIssues,
    addKnownIssue,
    setActiveTab,
  } = useApp();

  // Alert Form State
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAudience, setAlertAudience] = useState('All Shift 1 Staff');
  const [isUrgent, setIsUrgent] = useState(true);
  const [alertSentNotice, setAlertSentNotice] = useState(false);

  // New Issue Form State
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [newIssueTitle, setNewIssueTitle] = useState('');
  const [newIssueCategory, setNewIssueCategory] = useState('Hardware & Browser');
  const [newIssueSymptoms, setNewIssueSymptoms] = useState('');
  const [newIssueSteps, setNewIssueSteps] = useState('');

  // Handle Dispatch Alert
  const handleSendAlert = (e) => {
    e.preventDefault();
    if (!alertTitle.trim() || !alertMessage.trim()) return;

    sendAlert({
      title: alertTitle,
      message: alertMessage,
      audience: alertAudience,
      urgent: isUrgent,
    });

    setAlertTitle('');
    setAlertMessage('');
    setAlertSentNotice(true);
    setTimeout(() => setAlertSentNotice(false), 4000);
  };

  // Handle Add Known Issue
  const handleCreateIssue = (e) => {
    e.preventDefault();
    if (!newIssueTitle.trim()) return;

    addKnownIssue({
      title: newIssueTitle,
      category: newIssueCategory,
      urgency: 'Medium',
      symptoms: newIssueSymptoms,
      steps: newIssueSteps.split('\n').filter((s) => s.trim().length > 0),
    });

    setShowIssueModal(false);
    setNewIssueTitle('');
    setNewIssueSymptoms('');
    setNewIssueSteps('');
  };

  // Toggle user attendance status
  const handleToggleAttendance = (attId) => {
    setAttendance((prev) =>
      prev.map((item) => {
        if (item.id === attId) {
          const nextStatus =
            item.status === 'Active' ? 'On Break' : item.status === 'On Break' ? 'Active' : 'Active';
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  // Active alerts dispatched
  const activeAlert = alerts[0];

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>{currentUser.name}</h2>
              <span className="badge badge-purple">SENIOR FLOOR SUPPORT</span>
              <span className="badge badge-gray">{currentUser.station}</span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Tracking attendance, troubleshooting PC/tool faults & dispatching unmissable alerts
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowIssueModal(true)}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <PlusCircle size={14} />
            Post PC / Tool Fix
          </button>
        </div>
      </div>

      {/* Grid: Unmissable Alert Broadcaster & Live Acknowledgment Tracker */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '20px' }}>
        {/* Left: Dispatch Alert Form */}
        <div className="panel-card" style={{ borderLeft: '4px solid #dc2626' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={17} style={{ color: '#ef4444' }} />
              <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>Dispatch Unmissable Alert</h3>
            </div>
            <span className="badge badge-red" style={{ fontSize: '0.68rem' }}>MANDATORY ACKNOWLEDGE</span>
          </div>

          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Solves Problem #1: Recipients receive a full-screen alarm on their PC that locks the screen until clicked. Replaces shouting across the floor.
          </p>

          {alertSentNotice && (
            <div style={{ background: 'var(--color-green-bg)', border: '1px solid var(--color-green-border)', color: '#34d399', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} />
              Alert dispatched! Full-screen siren triggered on recipient screens.
            </div>
          )}

          <form onSubmit={handleSendAlert} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Target Audience
              </label>
              <select
                value={alertAudience}
                onChange={(e) => setAlertAudience(e.target.value)}
                className="form-select"
              >
                <option value="All Shift 1 Staff">All Shift 1 Staff (Floor 3)</option>
                <option value="Shift 1 Associates (First Pass Only)">Shift 1 Associates (First Pass Only)</option>
                <option value="QA Labeling Pod">QA Labeling Pod</option>
                <option value="All Shifts (Shift 1, 2, Night)">All Shifts (Company-Wide)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Alert Headline
              </label>
              <input
                type="text"
                placeholder="e.g., Mandatory Station Reboot at 11:00 AM"
                value={alertTitle}
                onChange={(e) => setAlertTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Instructions / Message
              </label>
              <textarea
                rows={3}
                placeholder="Explain the required action. Recipients cannot close this until clicking 'I have seen this'..."
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                className="form-textarea"
                required
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#cbd5e1', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                />
                Urgent Priority (triggers siren sound)
              </label>

              <button type="submit" className="btn btn-danger" style={{ gap: '6px' }}>
                <Send size={13} />
                Broadcast to Floor
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Acknowledgment Tracker */}
        <div className="panel-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={17} style={{ color: 'var(--color-green)' }} />
              <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>Live Acknowledgment Roster</h3>
            </div>
            {activeAlert && (
              <span className="mono badge badge-amber" style={{ fontSize: '0.68rem' }}>
                {activeAlert.timestamp}
              </span>
            )}
          </div>

          {activeAlert ? (
            <div>
              <div style={{
                background: 'var(--ddd-input)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '14px',
                border: '1px solid var(--border-card)',
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f8fafc', marginBottom: '2px' }}>
                  {activeAlert.title}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Audience: <strong style={{ color: '#fbbf24' }}>{activeAlert.audience}</strong> by {activeAlert.sender}
                </div>
              </div>

              {/* Roster of who has confirmed vs who has not */}
              <div style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                Audience Confirmation Status
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
                {USERS.map((user) => {
                  const hasSeen = activeAlert.acknowledgedBy.includes(user.id);
                  return (
                    <div
                      key={user.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: hasSeen ? 'var(--color-green-bg)' : 'var(--color-red-bg)',
                        border: `1px solid ${hasSeen ? 'var(--color-green-border)' : 'var(--color-red-border)'}`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          style={{ width: '26px', height: '26px', borderRadius: '4px' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f1f5f9' }}>
                            {user.name}
                          </div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                            {user.station} • {user.role.toUpperCase()}
                          </div>
                        </div>
                      </div>

                      <div>
                        {hasSeen ? (
                          <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                            <CheckCircle2 size={12} /> Acknowledged
                          </span>
                        ) : (
                          <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>
                            <XCircle size={12} /> Pending Seen
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '12px', fontSize: '0.72rem', color: 'var(--text-dim)', textAlign: 'right' }}>
                Real-time tracking. Zero shouting across the room.
              </div>
            </div>
          ) : (
            <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No active alerts. Dispatch an alert to see the live confirmation roster.
            </div>
          )}
        </div>
      </div>

      {/* Floor Attendance & PC Station Overview */}
      <div className="panel-card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Monitor size={17} style={{ color: 'var(--ddd-blue)' }} />
            <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>Floor 3 Station Attendance & Health</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>
              Blue System Synced (Today 06:15 AM)
            </span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-card)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '8px 12px' }}>Station ID</th>
                <th style={{ padding: '8px 12px' }}>Staff Name</th>
                <th style={{ padding: '8px 12px' }}>Role</th>
                <th style={{ padding: '8px 12px' }}>Shift</th>
                <th style={{ padding: '8px 12px' }}>Check-in</th>
                <th style={{ padding: '8px 12px' }}>Current Work / Status</th>
                <th style={{ padding: '8px 12px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((att) => (
                <tr
                  key={att.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <td style={{ padding: '10px 12px' }}>
                    <span className="mono" style={{ fontWeight: 600, color: 'var(--ddd-blue)' }}>{att.pc}</span>
                  </td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: '#f8fafc' }}>{att.name}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{att.role}</td>
                  <td style={{ padding: '10px 12px' }}>{att.shift}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)' }}>{att.checkIn}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span className={`badge ${
                      att.status === 'Active' ? 'badge-green' :
                      att.status === 'On Break' ? 'badge-amber' : 'badge-gray'
                    }`} style={{ fontSize: '0.7rem' }}>
                      {att.status}
                    </span>
                    <span style={{ marginLeft: '8px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {att.taskCurrent}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleToggleAttendance(att.id)}
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: '0.72rem' }}
                    >
                      Toggle Break
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Post New Known Issue */}
      {showIssueModal && (
        <div className="modal-overlay">
          <div className="panel-card" style={{ maxWidth: '520px', width: '92%', background: 'var(--ddd-surface)' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '8px' }}>
              Add Step-by-Step Fix to Known-Issues Board
            </h3>
            <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Document once so associates search instead of asking in chat repeatedly.
            </p>

            <form onSubmit={handleCreateIssue} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Issue Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chrome WebGL Memory Freezing"
                  value={newIssueTitle}
                  onChange={(e) => setNewIssueTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Category
                </label>
                <select
                  value={newIssueCategory}
                  onChange={(e) => setNewIssueCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="Hardware & Browser">Hardware & Browser (RAM, GPU)</option>
                  <option value="Network">Network & Local Ethernet</option>
                  <option value="Authentication">Tool Authentication & Tokens</option>
                  <option value="Internal HR">Blue System / Internal Portal</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Symptoms
                </label>
                <input
                  type="text"
                  placeholder="What happens on the associate PC?"
                  value={newIssueSymptoms}
                  onChange={(e) => setNewIssueSymptoms(e.target.value)}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Step-by-Step Fix (One per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="Step 1...&#10;Step 2...&#10;Step 3..."
                  value={newIssueSteps}
                  onChange={(e) => setNewIssueSteps(e.target.value)}
                  className="form-textarea"
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="btn btn-ghost btn-sm"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  Save to Known-Issues
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
