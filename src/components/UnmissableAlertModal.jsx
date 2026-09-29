import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { soundFX } from '../utils/audio';
import { AlertOctagon, Volume2, ShieldAlert, CheckCircle, Clock, UserCheck } from 'lucide-react';

export const UnmissableAlertModal = () => {
  const { unacknowledgedAlert, acknowledgeAlert, currentUser } = useApp();
  const [soundPlaying, setSoundPlaying] = useState(false);

  useEffect(() => {
    if (unacknowledgedAlert) {
      soundFX.playAlert(unacknowledgedAlert.urgent);
      setSoundPlaying(true);
      const timer = setTimeout(() => setSoundPlaying(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [unacknowledgedAlert]);

  if (!unacknowledgedAlert) return null;

  const handleAcknowledge = () => {
    acknowledgeAlert(unacknowledgedAlert.id);
  };

  const handleReplayAudio = () => {
    soundFX.playAlert(unacknowledgedAlert.urgent);
    setSoundPlaying(true);
    setTimeout(() => setSoundPlaying(false), 1500);
  };

  return (
    <div
      className="modal-overlay"
      style={{
        zIndex: 9999,
        background: 'rgba(8, 12, 20, 0.92)',
        cursor: 'not-allowed', // Prevent dismiss
      }}
    >
      <div
        className="unmissable-alert-box"
        style={{
          maxWidth: '660px',
          width: '92%',
          background: '#151c2c',
          borderRadius: 'var(--radius-lg)',
          padding: '32px',
          border: '2px solid #dc2626',
          boxShadow: 'var(--shadow-lg)',
          cursor: 'default',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Top Urgent Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(220, 38, 38, 0.15)',
          border: '1px solid rgba(220, 38, 38, 0.35)',
          color: '#f87171',
          fontWeight: 700,
          fontSize: '0.82rem',
          marginBottom: '20px',
        }}>
          <AlertOctagon size={16} />
          <span>MANDATORY OPERATIONAL ALERT — CANNOT BE MUTED</span>
        </div>

        {/* Sender details */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '20px',
          color: 'var(--text-muted)',
          fontSize: '0.82rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <UserCheck size={15} style={{ color: 'var(--ddd-blue)' }} />
            <span>Sender: <strong style={{ color: '#fff' }}>{unacknowledgedAlert.sender}</strong></span>
          </div>
          <span>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={15} />
            <span>Dispatched: <strong style={{ color: '#fff' }}>{unacknowledgedAlert.timestamp}</strong></span>
          </div>
          <span>•</span>
          <div>Audience: <strong style={{ color: '#fbbf24' }}>{unacknowledgedAlert.audience}</strong></div>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '1.45rem',
          color: '#fff',
          fontWeight: 800,
          marginBottom: '16px',
          lineHeight: 1.25,
        }}>
          {unacknowledgedAlert.title}
        </h2>

        {/* Message Card */}
        <div style={{
          background: '#0d131f',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          color: '#cbd5e1',
          fontSize: '0.98rem',
          lineHeight: 1.6,
          textAlign: 'left',
          marginBottom: '24px',
          maxHeight: '260px',
          overflowY: 'auto',
          borderLeft: '4px solid #dc2626',
        }}>
          {unacknowledgedAlert.message}
        </div>

        {/* Audio Replay & Instructions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', padding: '0 4px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textAlign: 'left' }}>
            <ShieldAlert size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: '-2px', color: '#f59e0b' }} />
            Acknowledgment timestamp will be recorded on the Team Leader's audit roster.
          </div>
          <button
            onClick={handleReplayAudio}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.76rem', color: '#f8fafc' }}
            title="Replay alert chime"
          >
            <Volume2 size={14} style={{ color: soundPlaying ? '#ef4444' : 'var(--ddd-blue)' }} />
            {soundPlaying ? 'Playing Siren...' : 'Replay Siren'}
          </button>
        </div>

        {/* Mandatory Action Button (Clean, Solid, No Glow) */}
        <button
          id="btn-acknowledge-alert"
          onClick={handleAcknowledge}
          className="btn btn-danger btn-lg"
          style={{
            width: '100%',
            padding: '14px 24px',
            fontSize: '1.05rem',
            fontWeight: 800,
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <CheckCircle size={20} />
          I HAVE SEEN THIS AND WILL COMPLY
        </button>

        <div style={{ marginTop: '14px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          Logged in as: <strong style={{ color: '#fff' }}>{currentUser.name}</strong> ({currentUser.email})
        </div>
      </div>
    </div>
  );
};
