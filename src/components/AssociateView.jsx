import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  BookOpen,
  Send,
  Zap,
  Coffee,
  HelpCircle,
  ArrowRight,
  Shield,
  FileCheck,
} from 'lucide-react';

export const AssociateView = () => {
  const {
    currentUser,
    queueCount,
    fallbackInstruction,
    tasks,
    submitTask,
    SHIFTS,
    setActiveTab,
    setSearchQuery,
    rulings,
  } = useApp();

  const myShift = SHIFTS[currentUser.shift] || SHIFTS.shift_1;
  const myTasks = tasks.filter(
    (t) => t.assigneeEmail === currentUser.email || t.assignee === currentUser.name
  );

  const isQueueEmpty = queueCount === 0;
  const isQueueLow = queueCount > 0 && queueCount <= 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Role & Station Identification Ribbon */}
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
              <span className="badge badge-cyan">{currentUser.subRoleLabel}</span>
              <span className="badge badge-gray">{currentUser.station}</span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {myShift.name} ({myShift.hours}) • {myShift.workingHours} • Team: {currentUser.team}
            </p>
          </div>
        </div>

        {/* Live Queue Health Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: 'var(--ddd-input)',
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-card)',
        }}>
          <div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Client Task Queue</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`pulse-dot ${isQueueEmpty ? 'pulse-dot-red' : ''}`}></span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: isQueueEmpty ? '#ef4444' : 'var(--ddd-blue)' }}>
                {queueCount} tasks left
              </span>
            </div>
          </div>
          <div style={{ borderLeft: '1px solid var(--border-card)', paddingLeft: '14px', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Status: <br />
            <strong style={{ color: isQueueEmpty ? '#ef4444' : isQueueLow ? '#f59e0b' : '#10b981' }}>
              {isQueueEmpty ? 'EMPTY (Queue Stalled)' : isQueueLow ? 'Running Low' : 'Active Flow'}
            </strong>
          </div>
        </div>
      </div>

      {/* CORE FEATURE: "WHAT DO I DO NOW" FALLBACK / ACTION PANEL (No Glow, Clean Border) */}
      <div style={{
        background: isQueueEmpty ? 'rgba(239, 68, 68, 0.08)' : 'var(--ddd-surface)',
        border: `1.5px solid ${isQueueEmpty ? '#ef4444' : 'var(--border-card)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '22px',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              background: isQueueEmpty ? '#ef4444' : 'var(--ddd-blue)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {isQueueEmpty ? <AlertCircle size={18} /> : <Zap size={18} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', margin: 0 }}>
                {isQueueEmpty ? 'QUEUE IS EMPTY — EXECUTE FALLBACK INSTRUCTION' : 'What Do I Do Now?'}
              </h3>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                Configured by {fallbackInstruction.updatedBy} ({fallbackInstruction.updatedAt})
              </div>
            </div>
          </div>
          {isQueueEmpty && (
            <span className="badge badge-red" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
              FALLBACK PROTOCOL ACTIVE
            </span>
          )}
        </div>

        {/* Fallback steps */}
        <div style={{
          background: 'var(--ddd-input)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          border: '1px solid var(--border-card)',
        }}>
          <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '8px', fontSize: '0.86rem' }}>
            {fallbackInstruction.instruction}
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {fallbackInstruction.steps.map((step, idx) => (
              <li key={idx} style={{ fontSize: '0.82rem', color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: 'var(--ddd-blue)', fontWeight: 700 }}>•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid: My Tasks (Turnover mirror) & Today's Schedule */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        {/* Left Column: My Active Tasks */}
        <div className="panel-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} style={{ color: 'var(--ddd-blue)' }} />
              <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>My Assigned Tasks ({myTasks.length})</h3>
            </div>
            <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
              Sub-role: {currentUser.subRoleLabel}
            </span>
          </div>

          {myTasks.length === 0 ? (
            <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={32} style={{ color: 'var(--color-green)', margin: '0 auto 10px' }} />
              <p style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.9rem' }}>All current assigned tasks are completed!</p>
              <p style={{ fontSize: '0.78rem' }}>Check above fallback instruction or wait for auto-turnover batch.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {myTasks.map((task) => (
                <div
                  key={task.id}
                  style={{
                    background: 'var(--ddd-input)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span className="mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ddd-blue)' }}>
                        {task.id}
                      </span>
                      <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{task.batch}</span>
                      <span className={`badge ${task.status === 'processing' ? 'badge-amber' : 'badge-gray'}`} style={{ fontSize: '0.65rem' }}>
                        {task.status.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#f1f5f9' }}>
                      {task.labelName}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {task.notes} • {task.itemsCount} vehicles
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <a
                      href={task.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: '0.74rem', gap: '4px' }}
                    >
                      <ExternalLink size={12} />
                      Client Tool
                    </a>
                    <button
                      onClick={() => submitTask(task.id)}
                      className="btn btn-success btn-sm"
                      style={{ fontSize: '0.74rem', gap: '4px' }}
                      title="Mark complete & auto-archive to submitted sheet"
                    >
                      <FileCheck size={12} />
                      Submit & Archive
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Today's Shift Schedule & Break Times */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="panel-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={17} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.02rem', color: '#fff', margin: 0 }}>My Shift Schedule</h3>
              </div>
              <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>{myShift.name}</span>
            </div>

            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              <Coffee size={13} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '4px', color: 'var(--ddd-blue)' }} />
              Break Window: <strong style={{ color: '#fff' }}>{myShift.breakHour}</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {myShift.schedule.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: item.type === 'break' ? 'rgba(245, 158, 11, 0.08)' : 'var(--ddd-input)',
                    borderLeft: `3px solid ${
                      item.type === 'meeting' ? 'var(--ddd-blue)' :
                      item.type === 'break' ? '#f59e0b' :
                      item.type === 'turnover' ? '#10b981' : 'var(--border-card)'
                    }`,
                  }}
                >
                  <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--ddd-blue)', minWidth: '60px' }}>
                    {item.time}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#e2e8f0', flex: 1 }}>{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Rulings Shortcut */}
          <div className="panel-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} style={{ color: 'var(--ddd-blue)' }} />
                <h4 style={{ fontSize: '0.88rem', color: '#fff', margin: 0 }}>Car Labeling Rulings</h4>
              </div>
              <button
                onClick={() => setActiveTab('rulings')}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.7rem', padding: '2px 6px' }}
              >
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {rulings.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    setSearchQuery(r.tags[0]);
                    setActiveTab('rulings');
                  }}
                  className="badge badge-cyan"
                  style={{ cursor: 'pointer', padding: '3px 7px', fontSize: '0.7rem' }}
                >
                  #{r.tags[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
