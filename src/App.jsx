import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { UnmissableAlertModal } from './components/UnmissableAlertModal';
import { AssociateView } from './components/AssociateView';
import { SeniorView } from './components/SeniorView';
import { TLView } from './components/TLView';
import { PMView } from './components/PMView';
import { RulingsBoard } from './components/RulingsBoard';
import { KnownIssuesBoard } from './components/KnownIssuesBoard';
import { TaskTurnoverView } from './components/TaskTurnoverView';
import { AttendanceView } from './components/AttendanceView';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { GoogleChatDrawer } from './components/GoogleChatDrawer';
import { AICopilotModal } from './components/AICopilotModal';
import { PitchDeckModal } from './components/PitchDeckModal';

const MainLayout = () => {
  const { currentUser, activeTab, switchUser, USERS, setShowPitchDeck } = useApp();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--ddd-navy-dark)' }}>
      {/* Collapsible Left Navigation Tab / Sidebar */}
      <Sidebar />

      {/* Main Workspace Area (Dynamically expands when sidebar closes) */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <Header />

        {/* Mandatory Unmissable Alert Modal */}
        <UnmissableAlertModal />

        {/* Main Content (Spacious, Unconstrained Breathing Room) */}
        <main style={{ flex: 1, padding: '24px 32px 48px', maxWidth: '1600px', width: '100%', margin: '0 auto' }}>
          {activeTab === 'home' && (
            <>
              {currentUser.role === 'associate' && <AssociateView />}
              {currentUser.role === 'senior' && <SeniorView />}
              {currentUser.role === 'tl' && <TLView />}
              {currentUser.role === 'pm' && <PMView />}
            </>
          )}

          {activeTab === 'rulings' && <RulingsBoard />}
          {activeTab === 'issues' && <KnownIssuesBoard />}
          {activeTab === 'tasks' && <TaskTurnoverView />}
          {activeTab === 'attendance' && <AttendanceView />}
        </main>

        {/* Drawers and Overlays */}
        <GoogleSheetsModal />
        <GoogleChatDrawer />
        <AICopilotModal />
        <PitchDeckModal />

        {/* Footer */}
        <footer style={{
          background: 'var(--ddd-surface)',
          borderTop: '1px solid var(--border-card)',
          padding: '16px 32px',
          color: 'var(--text-muted)',
          fontSize: '0.78rem',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                background: '#ffffff',
                borderRadius: '3px',
                padding: '2px 5px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <img
                  src="/assets/ddd_logo.png"
                  alt="Digital Divide Data"
                  style={{ height: '18px', width: 'auto', objectFit: 'contain' }}
                />
              </div>
              <div>
                <span style={{ color: '#fff', fontWeight: 600 }}>DDD FlowHub</span>
                <span style={{ margin: '0 8px', color: 'var(--border-card)' }}>•</span>
                <span>"We did not replace Google Chat & Sheets. We fixed the gaps between them."</span>
              </div>
            </div>

            {/* Quick role jump links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Switch Role:</span>
              {USERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  className={`btn btn-sm ${currentUser.id === u.id ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                >
                  {u.name.split(' ')[0]} ({u.role.toUpperCase()})
                </button>
              ))}
            </div>

            <div>
              <button
                onClick={() => setShowPitchDeck(true)}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.72rem', color: 'var(--ddd-blue)', borderColor: 'var(--ddd-blue-border)' }}
              >
                Pitch Deck (9 Slides)
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
