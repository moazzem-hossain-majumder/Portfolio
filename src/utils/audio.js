// Web Audio API Mechanical Keyboard & Comic Sound Synthesizer
// Provides realistic Graphite Scribble, Clicky (Blue), Tactile (Brown), and Linear (Red) sounds + Latch effects

class MechanicalAudioEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.switchType = "graphite"; // 'graphite' | 'clicky' | 'tactile' | 'linear'
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  setMuted(m) {
    this.muted = m;
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  setSwitchType(type) {
    if (["graphite", "clicky", "tactile", "linear"].includes(type)) {
      this.switchType = type;
    }
  }

  playLatch(open = true) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    // Heavy briefcase / console mechanical latch sound
    this.createNoiseBurst(t, 0.04, open ? 2400 : 1800, 0.4);
    this.createThump(t + 0.01, open ? 320 : 180, 0.08, 0.5);

    // Spring release metallic ring
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(open ? 880 : 440, t + 0.015);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.09);
    gain.gain.setValueAtTime(0.25, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t + 0.015);
    osc.stop(t + 0.1);
  }

  playDown() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    if (this.switchType === "graphite") {
      // Crisp graphite tap + tactile comic sound
      this.createNoiseBurst(t, 0.012, 3200, 0.35);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1450, t);
      osc.frequency.exponentialRampToValueAtTime(420, t + 0.02);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.025);

      this.createThump(t + 0.002, 190, 0.03, 0.25);
    } else if (this.switchType === "clicky") {
      // Blue switch: high-pitched crisp click + tactile pop
      this.createNoiseBurst(t, 0.007, 4500, 0.35);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1900, t);
      osc.frequency.exponentialRampToValueAtTime(320, t + 0.025);

      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.03);

      this.createThump(t + 0.003, 140, 0.04, 0.3);
    } else if (this.switchType === "tactile") {
      // Brown switch: rounded tactile bump + solid thock
      this.createNoiseBurst(t, 0.012, 1800, 0.2);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(820, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.035);

      gain.gain.setValueAtTime(0.35, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);

      this.createThump(t + 0.005, 120, 0.05, 0.35);
    } else {
      // Linear (Red) switch: smooth deep bottom-out clack
      this.createNoiseBurst(t, 0.009, 1200, 0.15);
      this.createThump(t, 160, 0.035, 0.4);
    }
  }

  playUp() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    if (this.switchType === "graphite") {
      this.createNoiseBurst(t, 0.008, 2800, 0.15);
    } else if (this.switchType === "clicky") {
      this.createNoiseBurst(t, 0.005, 3800, 0.18);
    } else {
      this.createNoiseBurst(t, 0.006, 2100, 0.12);
    }
  }

  createNoiseBurst(time, duration, filterFreq, volume) {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(filterFreq, time);
    filter.Q.setValueAtTime(2.5, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
    noise.stop(time + duration);
  }

  createThump(time, startFreq, duration, volume) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(45, time + duration);

    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }
}

let audioEngineInstance = null;
export function getAudioEngine() {
  if (!audioEngineInstance) {
    audioEngineInstance = new MechanicalAudioEngine();
  }
  return audioEngineInstance;
}
