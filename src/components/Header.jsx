import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Table,
  MessageSquare,
  Sparkles,
  Presentation,
  Search,
  PanelLeft,
  RotateCcw,
  AlertTriangle,
  Layers,
  BookOpen,
  Wrench,
} from 'lucide-react';

export const Header = () => {
  const {
    currentUser,
    sidebarOpen,
    setSidebarOpen,
    activeTab,
    queueCount,
    setQueueCount,
    setShowSheetsModal,
    setShowChatDrawer,
    setShowPitchDeck,
    setShowAICopilot,
    searchQuery,
    setSearchQuery,
    SHIFTS,
  } = useApp();

  const myShift = SHIFTS[currentUser.shift] || SHIFTS.shift_1;
  const isQueueEmpty = queueCount === 0;

  return (
    <header style={{
      background: 'var(--ddd-surface)',
      borderBottom: '1px solid var(--border-card)',
      position: 'sticky',
      top: 0,
      zIndex: 80,
    }}>
      {/* Top operational banner */}
      <div style={{
        background: '#0d131f',
        padding: '4px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.72rem',
        color: '#94a3b8',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
            DDD FLOWHUB
          </span>
          <span style={{ fontWeight: 600, color: '#f8fafc' }}>Digital Divide Data Workspace:</span>
          <span>Right info, right person, right time.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontStyle: 'italic', opacity: 0.85 }}>
            "We did not replace Google Chat & Sheets. We fixed the gaps between them."
          </span>
          <button
            onClick={() => setShowPitchDeck(true)}
            className="btn btn-sm btn-ghost"
            style={{ padding: '2px 8px', fontSize: '0.68rem', color: 'var(--ddd-blue)', borderColor: 'var(--ddd-blue-border)' }}
          >
            <Presentation size={11} />
            Pitch Deck
          </button>
        </div>
      </div>

      {/* Main Spacious Header Bar */}
      <div style={{
        padding: '10px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}>
        {/* Left: Sidebar Toggle Tab & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? 'Close Navigation Sidebar' : 'Open Navigation Sidebar'}
            className="btn btn-ghost"
            style={{
              padding: '6px 10px',
              fontSize: '0.78rem',
              gap: '6px',
              color: sidebarOpen ? '#cbd5e1' : 'var(--ddd-blue)',
              borderColor: sidebarOpen ? 'var(--border-card)' : 'var(--ddd-blue-border)',
            }}
          >
            <PanelLeft size={16} />
            <span>{sidebarOpen ? 'Close Menu' : 'Open Menu'}</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>
              {activeTab === 'home'
                ? currentUser.role === 'associate'
                  ? 'What Do I Do Now'
                  : `${currentUser.name} — ${currentUser.role.toUpperCase()} Dashboard`
                : activeTab === 'rulings'
                ? 'Client Rulings Board'
                : activeTab === 'issues'
                ? 'Known-Issues & PC Troubleshooting'
                : activeTab === 'tasks'
                ? 'Live Turnover & Auto-Archive Sheet'
                : 'Floor Station Attendance'}
            </span>
            <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>
              {myShift.name} ({myShift.hours})
            </span>
          </div>
        </div>

        {/* Center / Right: Global Search & Quick Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Spacious Search */}
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search rulings, car tags, PC fixes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{
                paddingLeft: '32px',
                paddingTop: '6px',
                paddingBottom: '6px',
                fontSize: '0.8rem',
              }}
            />
          </div>

          {/* Live Queue Pill */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--ddd-input)',
            border: `1px solid ${isQueueEmpty ? '#ef4444' : 'var(--border-card)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '5px 10px',
            fontSize: '0.76rem',
          }}>
            <span className={`pulse-dot ${isQueueEmpty ? 'pulse-dot-red' : ''}`}></span>
            <span style={{ color: 'var(--text-muted)' }}>Queue:</span>
            <strong style={{ color: isQueueEmpty ? '#ef4444' : 'var(--ddd-blue)' }}>
              {queueCount} tasks
            </strong>
          </div>

          {/* Quick Google Sheets */}
          <button
            onClick={() => setShowSheetsModal(true)}
            className="btn btn-ghost btn-sm"
            title="Open Master Turnover Google Sheet"
            style={{ color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.4)' }}
          >
            <Table size={14} />
            <span>Sheets</span>
          </button>

          {/* Quick Google Chat Feed */}
          <button
            onClick={() => setShowChatDrawer(true)}
            className="btn btn-ghost btn-sm"
            title="Google Chat Notifications"
            style={{ color: '#60a5fa' }}
          >
            <MessageSquare size={14} />
            <span>Chat</span>
          </button>

          {/* Quick AI Copilot */}
          <button
            onClick={() => setShowAICopilot(true)}
            className="btn btn-ghost btn-sm"
            title="DDD Copilot (Safe AI)"
            style={{ color: 'var(--ddd-blue)', borderColor: 'var(--ddd-blue-border)' }}
          >
            <Sparkles size={14} />
            <span>AI Copilot</span>
          </button>
        </div>
      </div>
    </header>
  );
};
