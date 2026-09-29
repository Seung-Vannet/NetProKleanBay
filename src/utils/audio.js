// Audio alert synthesizer using Web Audio API
class SoundFX {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Dual-tone urgent alert chime
  playAlert(urgent = true) {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = urgent ? 'sawtooth' : 'sine';
      osc2.type = 'triangle';

      if (urgent) {
        osc1.frequency.setValueAtTime(880, now); // A5
        osc1.frequency.setValueAtTime(659.25, now + 0.15); // E5
        osc1.frequency.setValueAtTime(880, now + 0.3); // A5
        osc1.frequency.setValueAtTime(1046.5, now + 0.45); // C6

        osc2.frequency.setValueAtTime(440, now);
        osc2.frequency.setValueAtTime(523.25, now + 0.2);
      } else {
        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.setValueAtTime(880, now + 0.15); // A5
      }

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (urgent ? 0.75 : 0.4));

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + (urgent ? 0.8 : 0.45));
      osc2.stop(now + (urgent ? 0.8 : 0.45));
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Soft notification chime
  playNotify() {
    this.playAlert(false);
  }

  // Success / Acknowledged chime
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
}

export const soundFX = new SoundFX();
