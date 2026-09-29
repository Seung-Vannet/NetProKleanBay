import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Presentation,
  CheckCircle,
  AlertTriangle,
  Layers,
  Shield,
  Zap,
  Radio,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const PitchDeckModal = () => {
  const { showPitchDeck, setShowPitchDeck, switchUser, sendAlert, setQueueCount } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!showPitchDeck) return null;

  const slides = [
    {
      title: 'DDD FlowHub',
      subtitle: 'Fixing the Gaps Between Google Chat and Google Sheets',
      badge: 'Hackathon Project Pitch',
      content: (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 24px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            border: '1px solid var(--border-card)',
          }}>
            <img
              src="/assets/ddd_logo.png"
              alt="Digital Divide Data Official Logo"
              style={{ height: '72px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <h1 style={{ fontSize: '2.2rem', color: '#fff', fontWeight: 800, marginBottom: '8px' }}>
            FlowHub
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--ddd-blue)', fontWeight: 600, marginBottom: '20px' }}>
            Tagline: Right info, right person, right time.
          </p>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            background: 'var(--ddd-input)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            fontSize: '1.05rem',
            color: '#e2e8f0',
            fontStyle: 'italic',
          }}>
            "We did not replace the tools. We fixed the gaps between them."
          </div>
          <div style={{ marginTop: '20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Designed for Digital Divide Data (DDD) Car Labeling Operations
          </div>
        </div>
      ),
    },
    {
      title: 'How DDD Works Today',
      subtitle: 'Operations, Setup & Constraints',
      badge: 'Context & Baseline',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '10px 0' }}>
          <div style={{ background: 'var(--ddd-input)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <h4 style={{ color: 'var(--ddd-blue)', marginBottom: '12px', fontSize: '0.98rem' }}>People & Roles</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: '#cbd5e1' }}>
              <li>• <strong>Associates:</strong> Label data (Review Skip, First Pass, QA).</li>
              <li>• <strong>Seniors:</strong> Support TLs, track station attendance & PC fixes.</li>
              <li>• <strong>Team Leaders (TLs):</strong> Manage teams, queues & turnover.</li>
              <li>• <strong>Project Managers (PMs):</strong> Only communication channel with client.</li>
            </ul>
          </div>

          <div style={{ background: 'var(--ddd-input)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <h4 style={{ color: '#10b981', marginBottom: '12px', fontSize: '0.98rem' }}>Tools & Shifts</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem', color: '#cbd5e1' }}>
              <li>• <strong>3 Daily Shifts (8 working hours each):</strong> 6 AM - 3 PM, 1 PM - 10 PM, and 9 PM Night Shift.</li>
              <li>• <strong>Workstations:</strong> Company PCs on local ethernet.</li>
              <li>• <strong>Core Tools:</strong> Google Workspace (Chat, Sheets, Drive) + Client raw web queue.</li>
              <li>• <strong>Internal HR:</strong> Blue System for employee leave.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: 'The 4 Major Pain Points',
      subtitle: 'What breaks down every single day on the labeling floor',
      badge: 'The Problem',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '10px 0' }}>
          <div style={{ background: 'var(--ddd-input)', border: '1px solid var(--color-red-border)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #ef4444' }}>
            <div style={{ color: '#f87171', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>1. Missed Important Messages</div>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>
              People mute Google Chat or ignore @all. Seniors shout across the floor to reach everyone.
            </p>
          </div>

          <div style={{ background: 'var(--ddd-input)', border: '1px solid var(--color-amber-border)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #f59e0b' }}>
            <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>2. "What do I do now?"</div>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>
              When the task queue runs out, nobody knows what to do and associates sit idle waiting for instructions.
            </p>
          </div>

          <div style={{ background: 'var(--ddd-input)', border: '1px solid var(--color-purple-border)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #8b5cf6' }}>
            <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>3. Repeated Questions in Chat</div>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>
              The same car-type questions & PC crashes are asked again and again. Client answers get buried in chat history.
            </p>
          </div>

          <div style={{ background: 'var(--ddd-input)', border: '1px solid var(--ddd-blue-border)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--ddd-blue)' }}>
            <div style={{ color: 'var(--ddd-blue)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '6px' }}>4. Manual Turnover & Lost History</div>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>
              TL manually cuts and pastes links; submitted tasks are deleted by hand from the sheet, losing all audit trails.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Solution 1: Unmissable Alerts with Acknowledgment',
      subtitle: 'Zero shouting across the floor — 100% verified receipt',
      badge: 'Feature Spotlight',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', padding: '10px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--ddd-input)', border: '1px solid var(--color-red-border)', borderRadius: 'var(--radius-md)', padding: '16px', borderLeft: '4px solid #dc2626' }}>
              <h4 style={{ color: '#fff', fontSize: '0.95rem', marginBottom: '8px' }}>How It Solves Problem #1:</h4>
              <p style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                • Sender picks audience (whole floor, one shift, one team).<br />
                • Recipients get a full-screen alert with synthesized sound on their PC.<br />
                • Cannot be muted or bypassed like Google Chat.<br />
                • Stays on screen until the associate clicks <strong>"I have seen this"</strong>.<br />
                • The sender sees a live roster of who has and has not acknowledged.
              </p>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Caveat tested: Browser notifications can be restricted by IT policies; DDD FlowHub renders in-app with Web Audio API.
            </div>
          </div>

          <div style={{ background: 'var(--ddd-input)', borderRadius: 'var(--radius-md)', padding: '16px', border: '1px solid var(--border-card)', textAlign: 'center' }}>
            <Radio size={36} style={{ color: '#ef4444', margin: '0 auto 10px' }} />
            <h5 style={{ color: '#fff', marginBottom: '6px', fontSize: '0.92rem' }}>Interactive Demonstration</h5>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Click below to broadcast a sample alert and test the full-screen modal lock:
            </p>
            <button
              onClick={() => {
                setShowPitchDeck(false);
                sendAlert({
                  title: 'PRESENTATION DEMO ALERT: Immediate QA Sync',
                  message: 'This demonstrates the full-screen lock and mandatory acknowledgment required by DDD staff.',
                  audience: 'All Shift 1 Staff',
                  urgent: true,
                });
              }}
              className="btn btn-danger btn-sm"
              style={{ width: '100%' }}
            >
              Test Alert Right Now
            </button>
          </div>
        </div>
      ),
    },
    {
      title: 'Solution 2: "What Do I Do Now" & Fallback Engine',
      subtitle: 'Eliminating idle wait time when the client queue is depleted',
      badge: 'Feature Spotlight',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', padding: '10px 0' }}>
          <div>
            <h4 style={{ color: 'var(--ddd-blue)', marginBottom: '8px', fontSize: '0.95rem' }}>Dynamic Role & Shift Screen</h4>
            <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.6 }}>
              Instead of browsing scattered documents, an Associate sees only what is relevant to their role (Review Skip, First Pass, QA) and shift.
            </p>
            <div style={{ background: 'var(--ddd-input)', border: '1px solid var(--border-card)', padding: '14px', borderRadius: 'var(--radius-md)', marginTop: '12px' }}>
              <strong style={{ color: '#fff', display: 'block', marginBottom: '6px', fontSize: '0.84rem' }}>Pre-configured Fallback Protocol:</strong>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                When the queue hits 0, the system automatically replaces the task view with the TL's pre-assigned tasks (e.g. secondary QA review or safety refresher).
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--ddd-input)', borderRadius: 'var(--radius-md)', padding: '16px', border: '1px solid var(--border-card)', textAlign: 'center' }}>
            <Zap size={36} style={{ color: '#f59e0b', margin: '0 auto 10px' }} />
            <h5 style={{ color: '#fff', marginBottom: '6px', fontSize: '0.92rem' }}>Test Empty Queue</h5>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Simulate the queue running out to 0 tasks to see the fallback screen trigger:
            </p>
            <button
              onClick={() => {
                setQueueCount(0);
                switchUser('user_sophea');
                setShowPitchDeck(false);
              }}
              className="btn btn-amber btn-sm"
              style={{ width: '100%' }}
            >
              Set Queue = 0 & Switch to Associate
            </button>
          </div>
        </div>
      ),
    },
    {
      title: 'Solution 3: Rulings Board & Known Issues',
      subtitle: 'Single source of truth with visual cards & step-by-step PC fixes',
      badge: 'Feature Spotlight',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '10px 0' }}>
          <div style={{ background: 'var(--ddd-input)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <h4 style={{ color: 'var(--ddd-blue)', marginBottom: '8px', fontSize: '0.92rem' }}>Rulings Board (PM Exclusive)</h4>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              • Only Project Managers can talk to the client.<br />
              • Clarifications posted once with high-res annotated vehicle images, tags, and DO/DON'T rules.<br />
              • Associates search by tag (e.g. #SUV, #roof_rack) instead of re-asking in chat.
            </p>
          </div>

          <div style={{ background: 'var(--ddd-input)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '8px', fontSize: '0.92rem' }}>Known-Issues Board (Seniors)</h4>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              • Chrome WebGL memory freezing on 8GB PCs.<br />
              • Local Ethernet connection drops.<br />
              • Each problem has numbered, copyable steps so seniors do not have to repeat themselves.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Solution 4: Auto-Turnover & Auto-Archive',
      subtitle: 'Google Sheets stays the database — FlowHub automates the friction',
      badge: 'Feature Spotlight',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '10px 0' }}>
          <div style={{ background: 'var(--ddd-input)', border: '1px solid var(--color-green-border)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid #10b981' }}>
            <h4 style={{ color: '#10b981', marginBottom: '6px', fontSize: '0.92rem' }}>Auto-Turnover</h4>
            <p style={{ fontSize: '0.82rem', color: '#e2e8f0', margin: 0, lineHeight: 1.5 }}>
              When the queue count is low, the system provisions task links, adds them directly to the sheet, and broadcasts a webhook notification to Google Chat.
            </p>
          </div>

          <div style={{ background: 'var(--ddd-input)', border: '1px solid var(--ddd-blue-border)', padding: '16px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--ddd-blue)' }}>
            <h4 style={{ color: 'var(--ddd-blue)', marginBottom: '6px', fontSize: '0.92rem' }}>Auto-Archive</h4>
            <p style={{ fontSize: '0.82rem', color: '#e2e8f0', margin: 0, lineHeight: 1.5 }}>
              When an Associate hits "Submit", the task automatically moves to a separate "Submitted" tab. The team maintains a 100% complete audit history without manual deletion.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Limits & Honest Workarounds',
      subtitle: 'Judges trust a team that is upfront about technical boundaries',
      badge: 'Transparency',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', padding: '10px 0' }}>
          <div style={{ background: 'var(--ddd-input)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <h5 style={{ color: '#f59e0b', marginBottom: '4px', fontSize: '0.84rem' }}>Boundary 1: Client Website Queue</h5>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
              The client's labeling queue lives on their own closed website. Our app cannot scrape it directly without client API approval.
            </p>
            <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600 }}>
              Workaround: TL or Senior inputs the observed count, or system simulates it.
            </div>
          </div>

          <div style={{ background: 'var(--ddd-input)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <h5 style={{ color: '#f59e0b', marginBottom: '4px', fontSize: '0.84rem' }}>Boundary 2: Client Data Confidentiality</h5>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
              Client proprietary images cannot be fed into third-party AI models.
            </p>
            <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600 }}>
              Workaround: The DDD Copilot indexes ONLY internal DDD rulings & PC fixes. Zero raw client data is touched.
            </div>
          </div>

          <div style={{ background: 'var(--ddd-input)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <h5 style={{ color: '#f59e0b', marginBottom: '4px', fontSize: '0.84rem' }}>Boundary 3: Company PC Audio Restrictions</h5>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
              IT policies might restrict desktop system notifications or muted speakers.
            </p>
            <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: 600 }}>
              Workaround: Full-screen visual lock banner + in-browser Web Audio synthesized chime.
            </div>
          </div>

          <div style={{ background: 'var(--ddd-input)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-card)' }}>
            <h5 style={{ color: '#10b981', marginBottom: '4px', fontSize: '0.84rem' }}>Core Philosophy: Not Replacing Tools</h5>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
              Google Sheets and Google Chat stay as the company backbone. Staff do not have to abandon their muscle memory.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: 'Closing & Summary',
      subtitle: 'Right Info, Right Person, Right Time',
      badge: 'Pitch Wrap-up',
      content: (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '14px' }}>
            Thank You!
          </h2>
          <div style={{
            maxWidth: '540px',
            margin: '0 auto 20px',
            background: 'var(--ddd-input)',
            border: '1px solid var(--ddd-blue)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            fontSize: '1.15rem',
            color: '#fff',
            fontWeight: 700,
          }}>
            "We did not replace the tools.<br />We fixed the gaps between them."
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
            Explore the live dashboard by switching between Associate, Senior, Team Leader, and Project Manager roles.
          </p>
          <button
            onClick={() => setShowPitchDeck(false)}
            className="btn btn-primary btn-lg"
            style={{ marginTop: '16px' }}
          >
            Launch Live Interactive App
          </button>
        </div>
      ),
    },
  ];

  const slide = slides[currentSlide];

  return (
    <div className="modal-overlay" onClick={() => setShowPitchDeck(false)}>
      <div
        className="pitch-deck-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '92%',
          maxWidth: '860px',
          minHeight: '540px',
          background: 'var(--ddd-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px',
          position: 'relative',
        }}
      >
        {/* Top Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>{slide.badge}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>

          <button
            onClick={() => setShowPitchDeck(false)}
            className="btn btn-ghost btn-sm"
          >
            <X size={18} />
          </button>
        </div>

        {/* Slide Title & Subtitle */}
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', color: '#fff', fontWeight: 800, margin: 0 }}>
            {slide.title}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
            {slide.subtitle}
          </p>
        </div>

        {/* Slide Body */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {slide.content}
        </div>

        {/* Footer Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '18px',
          marginTop: '16px',
        }}>
          <button
            onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
            disabled={currentSlide === 0}
            className="btn btn-ghost btn-sm"
            style={{ opacity: currentSlide === 0 ? 0.4 : 1 }}
          >
            <ChevronLeft size={16} /> Previous
          </button>

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {slides.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: idx === currentSlide ? '20px' : '7px',
                  height: '7px',
                  borderRadius: '3px',
                  background: idx === currentSlide ? 'var(--ddd-blue)' : 'rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
            disabled={currentSlide === slides.length - 1}
            className="btn btn-primary btn-sm"
            style={{ opacity: currentSlide === slides.length - 1 ? 0.4 : 1 }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
