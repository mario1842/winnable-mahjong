/** Lightweight synthesized SFX via Web Audio API (no audio files). */

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  if (!ctx) ctx = new AC()
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function tone(
  audio: AudioContext,
  {
    frequency,
    duration,
    type = 'sine',
    gain = 0.12,
    fadeIn = 0.005,
    fadeOut,
    delay = 0,
    detune = 0,
  }: {
    frequency: number
    duration: number
    type?: OscillatorType
    gain?: number
    fadeIn?: number
    fadeOut?: number
    delay?: number
    detune?: number
  },
): void {
  const start = audio.currentTime + delay
  const end = start + duration
  const out = fadeOut ?? Math.min(0.08, duration * 0.45)

  const osc = audio.createOscillator()
  const amp = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, start)
  if (detune) osc.detune.setValueAtTime(detune, start)

  amp.gain.setValueAtTime(0.0001, start)
  amp.gain.exponentialRampToValueAtTime(gain, start + fadeIn)
  amp.gain.exponentialRampToValueAtTime(0.0001, end)

  osc.connect(amp)
  amp.connect(audio.destination)
  osc.start(start)
  osc.stop(end + out)
}

function noiseBurst(
  audio: AudioContext,
  {
    duration,
    gain = 0.06,
    delay = 0,
    bandHz = 1800,
  }: { duration: number; gain?: number; delay?: number; bandHz?: number },
): void {
  const start = audio.currentTime + delay
  const frames = Math.max(1, Math.floor(audio.sampleRate * duration))
  const buffer = audio.createBuffer(1, frames, audio.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < frames; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frames)
  }

  const src = audio.createBufferSource()
  src.buffer = buffer
  const filter = audio.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = bandHz
  filter.Q.value = 0.8
  const amp = audio.createGain()
  amp.gain.setValueAtTime(gain, start)
  amp.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  src.connect(filter)
  filter.connect(amp)
  amp.connect(audio.destination)
  src.start(start)
  src.stop(start + duration + 0.02)
}

/** Soft UI click for menu / HUD buttons. */
export function playUiClick(): void {
  const audio = getCtx()
  if (!audio) return
  tone(audio, { frequency: 620, duration: 0.045, type: 'triangle', gain: 0.07 })
  tone(audio, { frequency: 920, duration: 0.03, type: 'sine', gain: 0.04, delay: 0.012 })
}

/** Light tap when selecting a tile. */
export function playTileSelect(): void {
  const audio = getCtx()
  if (!audio) return
  tone(audio, { frequency: 480, duration: 0.04, type: 'triangle', gain: 0.06 })
  noiseBurst(audio, { duration: 0.025, gain: 0.035, bandHz: 2400 })
}

/** Satisfying wooden clack + chime when a pair clears. */
export function playMatchBurst(): void {
  const audio = getCtx()
  if (!audio) return

  // Wooden knock
  noiseBurst(audio, { duration: 0.05, gain: 0.09, bandHz: 900 })
  tone(audio, { frequency: 180, duration: 0.07, type: 'triangle', gain: 0.1 })
  tone(audio, { frequency: 240, duration: 0.05, type: 'square', gain: 0.03 })

  // Bright resolving chime
  tone(audio, {
    frequency: 523.25,
    duration: 0.18,
    type: 'sine',
    gain: 0.09,
    delay: 0.02,
  })
  tone(audio, {
    frequency: 659.25,
    duration: 0.22,
    type: 'sine',
    gain: 0.08,
    delay: 0.05,
  })
  tone(audio, {
    frequency: 783.99,
    duration: 0.28,
    type: 'triangle',
    gain: 0.06,
    delay: 0.09,
  })
}

/** Short flourish when the board is cleared. */
export function playWin(): void {
  const audio = getCtx()
  if (!audio) return
  const notes = [523.25, 659.25, 783.99, 1046.5]
  notes.forEach((frequency, i) => {
    tone(audio, {
      frequency,
      duration: 0.22,
      type: 'triangle',
      gain: 0.08,
      delay: i * 0.07,
    })
  })
}
