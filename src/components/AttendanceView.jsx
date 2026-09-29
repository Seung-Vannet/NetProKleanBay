import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  CheckCircle,
  Clock,
  RefreshCw,
  Monitor,
  Coffee,
  AlertCircle,
  Shield,
} from 'lucide-react';

export const AttendanceView = () => {
  const { attendance, setAttendance, currentUser } = useApp();
  const [syncingBlue, setSyncingBlue] = useState(false);
  const [filterShift, setFilterShift] = useState('ALL');

  const handleSyncBlueSystem = () => {
    setSyncingBlue(true);
    setTimeout(() => {
      setSyncingBlue(false);
    }, 1200);
  };

  const handleStatusChange = (id, newStatus) => {
    setAttendance((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filteredAttendance = attendance.filter((a) => {
    return filterShift === 'ALL' || a.shift.includes(filterShift);
  });

  const activeCount = attendance.filter((a) => a.status === 'Active').length;
  const breakCount = attendance.filter((a) => a.status === 'On Break').length;
  const leaveCount = attendance.filter((a) => a.status.includes('Leave')).length;

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
            <UserCheck size={20} style={{ color: 'var(--ddd-blue)' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Floor 3 Workstation Attendance Roster</h2>
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Track station check-ins, break rotations, and live leaves synchronized with the internal Blue System.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleSyncBlueSystem}
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--ddd-blue)', borderColor: 'var(--ddd-blue-border)', gap: '6px' }}
          >
            <RefreshCw size={13} className={syncingBlue ? 'animate-spin' : ''} />
            {syncingBlue ? 'Syncing Blue System...' : 'Sync Blue System (Leave API)'}
          </button>
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div className="panel-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active On Stations</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
            {activeCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Connected via Ethernet LAN
          </div>
        </div>

        <div className="panel-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>On Break / Rest</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
            {breakCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            1-hour shift break rotation
          </div>
        </div>

        <div className="panel-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Blue System Leave</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>
            {leaveCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Verified approved leave requests
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="panel-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: 'var(--ddd-input)', borderBottom: '1px solid var(--border-card)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 14px' }}>Station ID</th>
                <th style={{ padding: '10px 14px' }}>Staff Name</th>
                <th style={{ padding: '10px 14px' }}>Role</th>
                <th style={{ padding: '10px 14px' }}>Shift</th>
                <th style={{ padding: '10px 14px' }}>Check-in</th>
                <th style={{ padding: '10px 14px' }}>Status</th>
                <th style={{ padding: '10px 14px' }}>Current Activity</th>
                <th style={{ padding: '10px 14px', textAlign: 'right' }}>Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <td style={{ padding: '10px 14px' }}>
                    <span className="mono" style={{ color: 'var(--ddd-blue)', fontWeight: 600 }}>{item.pc}</span>
                  </td>
                  <td style={{ padding: '10px 14px', fontWeight: 600, color: '#f8fafc' }}>{item.name}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{item.role}</td>
                  <td style={{ padding: '10px 14px' }}>{item.shift}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{item.checkIn}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span className={`badge ${
                      item.status === 'Active' ? 'badge-green' :
                      item.status === 'On Break' ? 'badge-amber' : 'badge-purple'
                    }`} style={{ fontSize: '0.7rem' }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#cbd5e1' }}>{item.taskCurrent}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      className="form-select"
                      style={{ width: 'auto', padding: '2px 8px', fontSize: '0.72rem' }}
                    >
                      <option value="Active">Active</option>
                      <option value="On Break">On Break</option>
                      <option value="Leave (Blue System)">Leave</option>
                    </select>
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
