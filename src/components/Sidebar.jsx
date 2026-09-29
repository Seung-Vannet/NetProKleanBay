import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  BookOpen,
  Wrench,
  Table,
  UserCheck,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  RotateCcw,
  Presentation,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Sliders,
  Radio,
} from 'lucide-react';

export const Sidebar = () => {
  const {
    currentUser,
    switchUser,
    USERS,
    activeTab,
    setActiveTab,
    sidebarOpen,
    setSidebarOpen,
    rulings,
    knownIssues,
    tasks,
    attendance,
    queueCount,
    setQueueCount,
    sendAlert,
    setShowSheetsModal,
    setShowChatDrawer,
    setShowPitchDeck,
    setShowAICopilot,
    resetDemoData,
  } = useApp();

  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const handleQuickAlert = () => {
    sendAlert({
      title: 'CRITICAL CLIENT AUDIT ALERT: Re-check Bounding Box Margins',
      message: 'Attention Shift 1! Client audit rejected 4 vehicles due to tight 2px cropping around wheels. Leave a 5px margin on ground contact points immediately.',
      audience: 'All Shift 1 Staff',
      urgent: true,
    });
  };

  const handleToggleQueue = () => {
    setQueueCount(queueCount > 0 ? 0 : 38);
  };

  const activeStaffCount = attendance.filter((a) => a.status === 'Active').length;

  return (
    <>
      {/* Floating Left Edge Toggle Tab when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          title="Open Navigation Sidebar"
          style={{
            position: 'fixed',
            left: 0,
            top: '72px',
            zIndex: 90,
            background: 'var(--ddd-surface)',
            border: '1px solid var(--border-card)',
            borderLeft: 'none',
            borderTopRightRadius: 'var(--radius-md)',
            borderBottomRightRadius: 'var(--radius-md)',
            padding: '10px 8px',
            color: 'var(--ddd-blue)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: 'var(--shadow-md)',
            fontSize: '0.78rem',
            fontWeight: 600,
          }}
        >
          <PanelLeft size={18} />
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '1px' }}>
            MENU
          </span>
        </button>
      )}

      {/* Main Sidebar Container */}
      <aside
        style={{
          width: sidebarOpen ? '260px' : '0px',
          minWidth: sidebarOpen ? '260px' : '0px',
          height: '100vh',
          background: 'var(--ddd-surface)',
          borderRight: sidebarOpen ? '1px solid var(--border-card)' : 'none',
          position: 'sticky',
          top: 0,
          zIndex: 95,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        {/* Sidebar Header: Logo & Collapse Button */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              padding: '2px 6px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <img
                src="/assets/ddd_logo.png"
                alt="Digital Divide Data"
                style={{ height: '24px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
                FlowHub
              </div>
              <div style={{ fontSize: '0.66rem', color: 'var(--ddd-blue)', fontWeight: 600 }}>
                Car Vision v2.4
              </div>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            title="Collapse Sidebar"
            className="btn btn-ghost btn-sm"
            style={{ padding: '5px', color: 'var(--text-muted)' }}
          >
            <PanelLeftClose size={16} />
          </button>
        </div>

        {/* Current User & Role Switcher Card */}
        <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-subtle)' }}>
          <div
            onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
            style={{
              background: 'var(--ddd-input)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'border-color 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: '28px', height: '28px', borderRadius: '4px', objectFit: 'cover' }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: '0.66rem', color: 'var(--ddd-blue)', textTransform: 'uppercase' }}>
                  {currentUser.role} • {currentUser.subRoleLabel.split(' ')[0]}
                </div>
              </div>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
          </div>

          {/* Role Dropdown */}
          {showRoleSwitcher && (
            <div style={{
              background: '#0d131f',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              marginTop: '6px',
              padding: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <div style={{ fontSize: '0.64rem', color: 'var(--text-dim)', padding: '2px 6px', fontWeight: 700 }}>
                SWITCH ROLE (GOOGLE OAUTH)
              </div>
              {USERS.map((u) => (
                <div
                  key={u.id}
                  onClick={() => {
                    switchUser(u.id);
                    setShowRoleSwitcher(false);
                  }}
                  style={{
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-sm)',
                    background: u.id === currentUser.id ? 'var(--ddd-blue-subtle)' : 'transparent',
                    color: u.id === currentUser.id ? 'var(--ddd-blue)' : '#cbd5e1',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{u.name} ({u.role.toUpperCase()})</span>
                  {u.id === currentUser.id && <CheckCircle2 size={13} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Scrollable Navigation Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Main Navigation */}
          <div>
            <div style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '6px', letterSpacing: '0.5px' }}>
              Core Workflows
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <button
                onClick={() => setActiveTab('home')}
                className={`btn ${activeTab === 'home' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'space-between', padding: '8px 10px', fontSize: '0.8rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={15} />
                  <span>{currentUser.role === 'associate' ? 'What Do I Do Now' : 'Role Dashboard'}</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('rulings')}
                className={`btn ${activeTab === 'rulings' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'space-between', padding: '8px 10px', fontSize: '0.8rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={15} />
                  <span>Rulings Board</span>
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '0.64rem', padding: '1px 5px' }}>{rulings.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('issues')}
                className={`btn ${activeTab === 'issues' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'space-between', padding: '8px 10px', fontSize: '0.8rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Wrench size={15} />
                  <span>Known Issues</span>
                </div>
                <span className="badge badge-amber" style={{ fontSize: '0.64rem', padding: '1px 5px' }}>{knownIssues.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('tasks')}
                className={`btn ${activeTab === 'tasks' ? 'btn-primary' : 'btn-ghost'}`}
                style={{ width: '100%', justifyContent: 'space-between', padding: '8px 10px', fontSize: '0.8rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Table size={15} />
                  <span>Turnover Sheet</span>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.64rem', padding: '1px 5px' }}>{tasks.length}</span>
              </button>

              {(currentUser.role === 'senior' || currentUser.role === 'pm' || currentUser.role === 'tl') && (
                <button
                  onClick={() => setActiveTab('attendance')}
                  className={`btn ${activeTab === 'attendance' ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ width: '100%', justifyContent: 'space-between', padding: '8px 10px', fontSize: '0.8rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserCheck size={15} />
                    <span>Attendance</span>
                  </div>
                  <span className="badge badge-purple" style={{ fontSize: '0.64rem', padding: '1px 5px' }}>{activeStaffCount} Active</span>
                </button>
              )}
            </div>
          </div>

          {/* Integrated Tool Integrations */}
          <div>
            <div style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', paddingLeft: '8px', marginBottom: '6px', letterSpacing: '0.5px' }}>
              Connected Tools
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <button
                onClick={() => setShowSheetsModal(true)}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'space-between', padding: '7px 10px', fontSize: '0.78rem', color: '#34d399' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Table size={14} />
                  <span>Google Sheets Sync</span>
                </div>
                <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span>
              </button>

              <button
                onClick={() => setShowChatDrawer(true)}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'space-between', padding: '7px 10px', fontSize: '0.78rem', color: '#60a5fa' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={14} />
                  <span>Google Chat Webhooks</span>
                </div>
                <span className="badge badge-cyan" style={{ fontSize: '0.6rem', padding: '1px 4px' }}>Live</span>
              </button>

              <button
                onClick={() => setShowAICopilot(true)}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'flex-start', padding: '7px 10px', fontSize: '0.78rem', color: 'var(--ddd-blue)' }}
              >
                <Sparkles size={14} />
                <span>DDD Copilot (Safe AI)</span>
              </button>

              <button
                onClick={() => setShowPitchDeck(true)}
                className="btn btn-ghost"
                style={{ width: '100%', justifyContent: 'flex-start', padding: '7px 10px', fontSize: '0.78rem', color: '#f59e0b' }}
              >
                <Presentation size={14} />
                <span>Hackathon Pitch Deck</span>
              </button>
            </div>
          </div>

          {/* Demo Controls Section */}
          <div style={{
            background: 'var(--ddd-input)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '10px',
            marginTop: 'auto',
          }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Sliders size={11} />
              <span>Demo Scenario Triggers</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <button
                onClick={handleQuickAlert}
                className="btn btn-danger btn-sm"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.72rem', padding: '5px 8px' }}
              >
                <Radio size={12} />
                Fire Unmissable Alert
              </button>
              <button
                onClick={handleToggleQueue}
                className="btn btn-ghost btn-sm"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.72rem', padding: '5px 8px', color: '#fbbf24' }}
              >
                <RotateCcw size={12} />
                {queueCount === 0 ? 'Restore Queue (38)' : 'Simulate Empty Queue (0)'}
              </button>
              <button
                onClick={resetDemoData}
                className="btn btn-ghost btn-sm"
                style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.68rem', padding: '4px 8px', color: 'var(--text-dim)' }}
              >
                Reset Mock Data
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
