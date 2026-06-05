import type { Mood } from '../types/mood'

type MoodPreset = {
  bellWave: OscillatorType
  cutoff: number
  notes: number[]
  pad: [number, number]
  pulseMs: number
}

const presets: Record<Mood, MoodPreset> = {
  开心: {
    bellWave: 'triangle',
    cutoff: 1600,
    notes: [523.25, 659.25, 783.99, 659.25],
    pad: [261.63, 329.63],
    pulseMs: 2600,
  },
  平静: {
    bellWave: 'sine',
    cutoff: 1050,
    notes: [392, 493.88, 587.33, 493.88],
    pad: [196, 293.66],
    pulseMs: 3600,
  },
  焦虑: {
    bellWave: 'sine',
    cutoff: 760,
    notes: [220, 261.63, 329.63, 261.63],
    pad: [110, 220],
    pulseMs: 3200,
  },
  疲惫: {
    bellWave: 'triangle',
    cutoff: 820,
    notes: [246.94, 293.66, 369.99, 293.66],
    pad: [123.47, 246.94],
    pulseMs: 4200,
  },
  低落: {
    bellWave: 'sine',
    cutoff: 680,
    notes: [196, 246.94, 293.66, 246.94],
    pad: [98, 196],
    pulseMs: 3900,
  },
  兴奋: {
    bellWave: 'triangle',
    cutoff: 1900,
    notes: [440, 554.37, 659.25, 830.61],
    pad: [220, 329.63],
    pulseMs: 2200,
  },
}

let audioContext: AudioContext | null = null
let masterGain: GainNode | null = null
let padGain: GainNode | null = null
let filter: BiquadFilterNode | null = null
let padOscillators: OscillatorNode[] = []
let mood: Mood = '平静'
let muted = false
let timer: number | null = null
let noteIndex = 0

function getAudioContext() {
  if (audioContext) {
    return audioContext
  }

  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext
  if (!AudioContextConstructor) {
    throw new Error('Web Audio API is not supported in this browser.')
  }

  audioContext = new AudioContextConstructor()
  masterGain = audioContext.createGain()
  masterGain.gain.value = 0
  masterGain.connect(audioContext.destination)

  return audioContext
}

function rampGain(node: GainNode, value: number, duration = 0.5) {
  const context = getAudioContext()
  node.gain.cancelScheduledValues(context.currentTime)
  node.gain.setTargetAtTime(value, context.currentTime, duration)
}

function clearMoodTimer() {
  if (timer !== null) {
    window.clearInterval(timer)
    timer = null
  }
}

function stopPad() {
  const context = getAudioContext()
  padOscillators.forEach((oscillator) => {
    try {
      oscillator.stop(context.currentTime + 0.12)
    } catch {
      // The oscillator may already be stopped during fast mood switching.
    }
  })
  padOscillators = []
}

function playBell(preset: MoodPreset) {
  const context = getAudioContext()

  if (!masterGain || muted || context.state !== 'running') {
    return
  }

  const note = preset.notes[noteIndex % preset.notes.length]
  noteIndex += 1

  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const noteFilter = context.createBiquadFilter()

  oscillator.type = preset.bellWave
  oscillator.frequency.value = note
  noteFilter.type = 'lowpass'
  noteFilter.frequency.value = preset.cutoff
  gain.gain.value = 0

  oscillator.connect(noteFilter)
  noteFilter.connect(gain)
  gain.connect(masterGain)

  const now = context.currentTime
  gain.gain.linearRampToValueAtTime(0.035, now + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8)

  oscillator.start(now)
  oscillator.stop(now + 1.9)
}

function startPad(preset: MoodPreset) {
  const context = getAudioContext()

  if (!masterGain) {
    return
  }

  stopPad()

  padGain = context.createGain()
  padGain.gain.value = 0
  filter = context.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = preset.cutoff
  filter.Q.value = 0.55

  padGain.connect(filter)
  filter.connect(masterGain)

  padOscillators = preset.pad.map((frequency, index) => {
    const oscillator = context.createOscillator()
    oscillator.type = index === 0 ? 'sine' : 'triangle'
    oscillator.frequency.value = frequency
    oscillator.detune.value = index === 0 ? -4 : 6
    oscillator.connect(padGain as GainNode)
    oscillator.start()
    return oscillator
  })

  rampGain(padGain, 0.035, 0.8)
}

function applyMood(nextMood: Mood) {
  mood = nextMood
  const preset = presets[mood]

  if (filter) {
    const context = getAudioContext()
    filter.frequency.setTargetAtTime(preset.cutoff, context.currentTime, 0.6)
  }

  startPad(preset)
  clearMoodTimer()
  timer = window.setInterval(() => playBell(preset), preset.pulseMs)
  playBell(preset)
}

export async function startAmbient(nextMood: Mood = mood) {
  const context = getAudioContext()

  try {
    if (context.state !== 'running') {
      await context.resume()
    }
  } catch {
    return false
  }

  muted = false
  applyMood(nextMood)

  if (masterGain) {
    rampGain(masterGain, 0.16, 0.7)
  }

  return context.state === 'running'
}

export function setMoodSound(nextMood: Mood) {
  mood = nextMood

  if (!audioContext || muted) {
    return
  }

  applyMood(nextMood)
}

export async function setMuted(nextMuted: boolean) {
  muted = nextMuted

  if (nextMuted) {
    if (masterGain) {
      rampGain(masterGain, 0, 0.35)
    }
    clearMoodTimer()
    return false
  }

  return startAmbient(mood)
}

export function stopAmbient() {
  if (masterGain) {
    rampGain(masterGain, 0, 0.2)
  }
  clearMoodTimer()
  stopPad()
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}
