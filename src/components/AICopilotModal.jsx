import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  X,
  Send,
  ShieldCheck,
  BookOpen,
  Wrench,
  Bot,
  User,
  ArrowRight,
} from 'lucide-react';

export const AICopilotModal = () => {
  const { showAICopilot, setShowAICopilot, rulings, knownIssues, fallbackInstruction, queueCount } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg_welcome',
      sender: 'bot',
      text: "Hello! I am your DDD FlowHub Copilot. I only index DDD-written client rulings and workstation known-issues. Client raw image data is strictly isolated and never leaves the workstation.",
      citations: [],
    },
  ]);

  if (!showAICopilot) return null;

  const handleAsk = (queryText) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: q,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');

    // Formulate response strictly from DDD rulings, issues, and fallback instructions
    setTimeout(() => {
      let botResponse = '';
      const citations = [];
      const lower = q.toLowerCase();

      if (lower.includes('suv') || lower.includes('roof') || lower.includes('rack') || lower.includes('modified') || lower.includes('light')) {
        const ruling = rulings.find((r) => r.id === 'CR-2026-881');
        botResponse = `According to Client Ruling CR-2026-881:
1. Draw the primary cyan bounding box tightly around the vehicle chassis and wheels (excluding roof accessories).
2. Rooftop accessories (light bars, cargo boxes, spare wheels) projecting >15cm must be labeled with the accessory class [roof_rack_acc].
3. Fixed emergency strobe lights (police/ambulance) ARE included inside the main vehicle box (CR-2026-865).`;
        citations.push({ title: 'CR-2026-881: Modified SUV Guidelines', type: 'ruling' });
      } else if (lower.includes('occlu') || lower.includes('skip') || lower.includes('pillar') || lower.includes('70%') || lower.includes('hide')) {
        const ruling = rulings.find((r) => r.id === 'CR-2026-874');
        botResponse = `According to Client Ruling CR-2026-874 (Occlusion Threshold):
If more than 70% of a vehicle's body is obscured by concrete pillars, walls, or trees, do NOT guess vehicle boundaries. Mark the frame as "REVIEW SKIP" with tag #severe_occlusion.`;
        citations.push({ title: 'CR-2026-874: Occlusion Threshold (>70% Rule)', type: 'ruling' });
      } else if (lower.includes('ram') || lower.includes('slow') || lower.includes('freeze') || lower.includes('lag') || lower.includes('chrome')) {
        botResponse = `According to Senior Fix Guide ISS-041:
1. Press Shift + Esc inside Chrome to open Chrome Task Manager.
2. Kill 'GPU Process' and 'Subframe: Labeling Canvas'.
3. In tool settings, lower undo history from 50 to 15.
4. Run 'Purge_RAM.bat' on your Windows desktop.`;
        citations.push({ title: 'ISS-041: Chrome WebGL Memory Freezing', type: 'issue' });
      } else if (lower.includes('queue') || lower.includes('empty') || lower.includes('zero') || lower.includes('what do i do')) {
        botResponse = `Current Queue Status: ${queueCount} tasks remaining.
TL Fallback Protocol:
"${fallbackInstruction.instruction}"
Steps:
${fallbackInstruction.steps.join('\n')}`;
        citations.push({ title: 'TL Empty Queue Protocol', type: 'protocol' });
      } else {
        botResponse = `I found matching references in your DDD workspace. Please review the official Rulings Board (CR-2026-881, CR-2026-874) or check the Known-Issues troubleshooting catalog. Remember to follow TL fallback protocol if your queue drops below 5.`;
        citations.push({ title: 'DDD Knowledge Base Search', type: 'kb' });
      }

      const botMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botResponse,
        citations,
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={() => setShowAICopilot(false)}>
      <div
        className="ai-copilot-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '90%',
          maxWidth: '680px',
          height: '75vh',
          background: 'var(--ddd-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 20px',
          background: '#0d131f',
          borderBottom: '1px solid var(--border-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--ddd-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Sparkles size={17} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.02rem', fontWeight: 700, color: '#fff' }}>DDD Copilot</span>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Confidentiality Safe</span>
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Powered by DDD Workspace Rulings & Known-Issues (Zero Client Data Leakage)
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAICopilot(false)}
            className="btn btn-ghost btn-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Security / Confidentiality Guarantee Banner */}
        <div style={{
          padding: '8px 18px',
          background: 'var(--color-green-bg)',
          borderBottom: '1px solid var(--color-green-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.72rem',
          color: '#34d399',
        }}>
          <ShieldCheck size={14} />
          <span>Client Confidentiality Guard: Operates strictly within DDD policies; no client images processed.</span>
        </div>

        {/* Suggested Quick Prompts */}
        <div style={{ padding: '10px 18px', borderBottom: '1px solid var(--border-card)', display: 'flex', gap: '6px', overflowX: 'auto' }}>
          <button
            onClick={() => handleAsk('How do I label a modified SUV roof rack?')}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}
          >
            🚙 Modified SUV Roof Racks?
          </button>
          <button
            onClick={() => handleAsk('When should I apply Review Skip for occluded cars?')}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}
          >
            🛑 Occlusion &gt;70% Skip?
          </button>
          <button
            onClick={() => handleAsk('Chrome browser is lagging and using 90% RAM')}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}
          >
            💻 Chrome High RAM Freezing?
          </button>
          <button
            onClick={() => handleAsk('What is the fallback instruction when the queue is 0?')}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: '0.72rem', whiteSpace: 'nowrap' }}
          >
            📋 Empty Queue Fallback?
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {messages.map((m) => (
            <div
              key={m.id}
              style={{
                display: 'flex',
                gap: '10px',
                alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
              }}
            >
              {m.sender === 'bot' && (
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--ddd-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px',
                }}>
                  <Bot size={15} color="#fff" />
                </div>
              )}

              <div style={{
                background: m.sender === 'user' ? 'var(--ddd-blue)' : 'var(--ddd-input)',
                border: `1px solid ${m.sender === 'user' ? 'var(--ddd-blue-dark)' : 'var(--border-card)'}`,
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                color: '#f8fafc',
                fontSize: '0.84rem',
                lineHeight: 1.5,
                whiteSpace: 'pre-line',
              }}>
                {m.text}

                {m.citations && m.citations.length > 0 && (
                  <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    <div style={{ fontWeight: 600, color: 'var(--ddd-blue)', marginBottom: '4px' }}>VERIFIED SOURCES:</div>
                    {m.citations.map((c, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <ArrowRight size={10} color="var(--ddd-blue)" />
                        <span>{c.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); handleAsk(); }} style={{ padding: '12px 16px', background: '#0d131f', borderTop: '1px solid var(--border-card)', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Ask about car labeling rulings, PC fixes, or fallback protocol..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="form-input"
            style={{ fontSize: '0.84rem' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px' }}>
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
};
