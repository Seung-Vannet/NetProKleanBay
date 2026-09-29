import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  MessageSquare,
  Send,
  Bot,
  Hash,
  Sparkles,
} from 'lucide-react';

export const GoogleChatDrawer = () => {
  const { showChatDrawer, setShowChatDrawer, chatMessages, currentUser } = useApp();
  const [newMsg, setNewMsg] = useState('');
  const [localMessages, setLocalMessages] = useState(chatMessages);

  // Sync whenever chatMessages in context updates
  React.useEffect(() => {
    setLocalMessages(chatMessages);
  }, [chatMessages]);

  if (!showChatDrawer) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const userMessage = {
      id: `chat_${Date.now()}`,
      channel: '#car-labeling-floor3',
      sender: currentUser.name,
      isBot: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newMsg,
    };

    setLocalMessages([userMessage, ...localMessages]);
    setNewMsg('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '420px',
        maxWidth: '92vw',
        height: '100vh',
        background: '#0e1526',
        borderLeft: '1px solid var(--border-card)',
        boxShadow: 'var(--shadow-lg)',
        zIndex: 1100,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: '#090e1a',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00ac47 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}>
            <MessageSquare size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>Google Chat Webhooks</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>#car-labeling-floor3 • Live Bot Feed</div>
          </div>
        </div>

        <button
          onClick={() => setShowChatDrawer(false)}
          className="btn btn-ghost btn-sm"
          style={{ padding: '4px' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Notice Banner */}
      <div style={{ padding: '8px 16px', background: 'rgba(56, 189, 248, 0.08)', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.72rem', color: '#93c5fd' }}>
        FlowHub automatically broadcasts critical alerts & auto-turnover events into Google Chat.
      </div>

      {/* Messages list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column-reverse', gap: '12px' }}>
        {localMessages.map((msg) => (
          <div
            key={msg.id}
            style={{
              background: msg.isBot ? 'rgba(56, 189, 248, 0.06)' : 'rgba(255, 255, 255, 0.03)',
              border: `1px solid ${msg.isBot ? 'rgba(56, 189, 248, 0.2)' : 'var(--border-subtle)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {msg.isBot ? (
                  <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                    <Bot size={11} /> BOT
                  </span>
                ) : (
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f8fafc' }}>{msg.sender}</span>
                )}
                <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{msg.channel}</span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{msg.time}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#e2e8f0', lineHeight: 1.45 }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} style={{ padding: '12px 16px', background: '#090e1a', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Send message to #car-labeling..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="form-input"
          style={{ fontSize: '0.8rem', padding: '8px 12px' }}
        />
        <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '8px 12px' }}>
          <Send size={14} />
        </button>
      </form>
    </div>
  );
};
