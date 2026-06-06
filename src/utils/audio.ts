import type { MusicKey } from '../data/moodThemes'
import type { Mood } from '../types/mood'

type MusicPreset = {
  bellGain: number
  bellWave: OscillatorType
  bpm: number
  cutoff: number
  notes: number[]
  pad: [number, number, number]
  padGain: number
  pulseGain: number
}

const moodToMusicKey: Record<Mood, MusicKey> = {
  开心: 'happy',
  平静: 'calm',
  焦虑: 'anxious',
  疲惫: 'tired',
  低落: 'sad',
  兴奋: 'hopeful',
}

const presets: Record<MusicKey, MusicPreset> = {
  home: {
    bellGain: 0.034,
    bellWave: 'triangle',
    bpm: 78,
    cutoff: 1450,
    notes: [392, 493.88, 587.33, 659.25, 587.33, 493.88],
    pad: [196, 293.66, 392],
    padGain: 0.034,
    pulseGain: 0.015,
  },
  happy: {
    bellGain: 0.042,
    bellWave: 'triangle',
    bpm: 96,
    cutoff: 1900,
    notes: [523.25, 659.25, 783.99, 880, 783.99, 659.25],
    pad: [261.63, 329.63, 392],
    padGain: 0.03,
    pulseGain: 0.02,
  },
  calm: {
    bellGain: 0.026,
    bellWave: 'sine',
    bpm: 68,
    cutoff: 980,
    notes: [392, 493.88, 587.33, 493.88],
    pad: [196, 293.66, 392],
    padGain: 0.04,
    pulseGain: 0.006,
  },
  anxious: {
    bellGain: 0.02,
    bellWave: 'sine',
    bpm: 72,
    cutoff: 720,
    notes: [220, 261.63, 329.63, 261.63],
    pad: [110, 220, 261.63],
    padGain: 0.042,
    pulseGain: 0.012,
  },
  tired: {
    bellGain: 0.018,
    bellWave: 'triangle',
    bpm: 58,
    cutoff: 760,
    notes: [246.94, 293.66, 369.99, 293.66],
    pad: [123.47, 246.94, 293.66],
    padGain: 0.038,
    pulseGain: 0.006,
  },
  sad: {
    bellGain: 0.022,
    bellWave: 'sine',
    bpm: 62,
    cutoff: 690,
    notes: [196, 246.94, 293.66, 329.63, 293.66, 246.94],
    pad: [98, 196, 246.94],
    padGain: 0.04,
    pulseGain: 0.005,
  },
  hopeful: {
    bellGain: 0.034,
    bellWave: 'triangle',
    bpm: 88,
    cutoff: 1700,
    notes: [440, 554.37, 659.25, 739.99, 830.61, 739.99],
    pad: [220, 329.63, 440],
    padGain: 0.032,
    pulseGain: 0.017,
  },
}

let audioContext: AudioContext | null = null
let masterGain: GainNode | null = null
let padGain: GainNode | null = null
let padFilter: BiquadFilterNode | null = null
let padOscillators: OscillatorNode[] = []
let activeKey: MusicKey = 'home'
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

function rampGain(node: GainNode, value: number, duration = 1.2) {
  const context = getAudioContext()
  node.gain.cancelScheduledValues(context.currentTime)
  node.gain.setTargetAtTime(value, context.currentTime, duration / 4)
}

function clearMusicTimer() {
  if (timer !== null) {
    window.clearInterval(timer)
    timer = null
  }
}

function stopPad(delay = 0.4) {
  if (!audioContext) {
    return
  }

  padOscillators.forEach((oscillator) => {
    try {
      oscillator.stop(audioContext!.currentTime + delay)
    } catch {
      // Fast mood switching can try to stop an oscillator twice.
    }
  })
  padOscillators = []
}

function playBell(preset: MusicPreset) {
  const context = getAudioContext()

  if (!masterGain || muted || context.state !== 'running') {
    return
  }

  const note = preset.notes[noteIndex % preset.notes.length]
  noteIndex += 1

  const oscillator = context.createOscillator()
  const gain = context.createGain()
  const filter = context.createBiquadFilter()

  oscillator.type = preset.bellWave
  oscillator.frequency.value = note
  filter.type = 'lowpass'
  filter.frequency.value = preset.cutoff
  gain.gain.value = 0.0001

  oscillator.connect(filter)
  filter.connect(gain)
  gain.connect(masterGain)

  const now = context.currentTime
  gain.gain.linearRampToValueAtTime(preset.bellGain, now + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.7)

  oscillator.start(now)
  oscillator.stop(now + 1.85)
}

function playPulse(preset: MusicPreset) {
  const context = getAudioContext()

  if (!masterGain || muted || context.state !== 'running' || preset.pulseGain <= 0) {
    return
  }

  const oscillator = context.createOscillator()
  const gain = context.createGain()
  oscillator.type = 'sine'
  oscillator.frequency.value = activeKey === 'happy' || activeKey === 'hopeful' ? 82 : 58
  gain.gain.value = 0.0001
  oscillator.connect(gain)
  gain.connect(masterGain)

  const now = context.currentTime
  gain.gain.linearRampToValueAtTime(preset.pulseGain, now + 0.025)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)
  oscillator.start(now)
  oscillator.stop(now + 0.2)
}

function startPad(preset: MusicPreset) {
  const context = getAudioContext()

  if (!masterGain) {
    return
  }

  if (padGain) {
    rampGain(padGain, 0, 0.9)
  }
  stopPad(0.9)

  padGain = context.createGain()
  padGain.gain.value = 0
  padFilter = context.createBiquadFilter()
  padFilter.type = 'lowpass'
  padFilter.frequency.value = preset.cutoff
  padFilter.Q.value = 0.48

  padGain.connect(padFilter)
  padFilter.connect(masterGain)

  padOscillators = preset.pad.map((frequency, index) => {
    const oscillator = context.createOscillator()
    oscillator.type = index === 1 ? 'triangle' : 'sine'
    oscillator.frequency.value = frequency
    oscillator.detune.value = [-5, 6, -2][index]
    oscillator.connect(padGain as GainNode)
    oscillator.start()
    return oscillator
  })

  rampGain(padGain, preset.padGain, 1.3)
}

function applyMusicKey(nextKey: MusicKey) {
  activeKey = nextKey
  const preset = presets[activeKey]

  if (padFilter && audioContext) {
    padFilter.frequency.setTargetAtTime(preset.cutoff, audioContext.currentTime, 0.5)
  }

  startPad(preset)
  clearMusicTimer()

  const beatMs = (60 / preset.bpm) * 1000
  timer = window.setInterval(() => {
    playPulse(preset)
    if (noteIndex % 2 === 0) {
      playBell(preset)
    }
  }, beatMs)

  playBell(preset)
}

export async function startAmbient(nextMood?: Mood) {
  const context = getAudioContext()

  try {
    if (context.state !== 'running') {
      await context.resume()
    }
  } catch {
    return false
  }

  muted = false
  applyMusicKey(nextMood ? moodToMusicKey[nextMood] : activeKey)

  if (masterGain) {
    rampGain(masterGain, 0.18, 1.4)
  }

  return context.state === 'running'
}

export function setMoodSound(nextMood: Mood) {
  const nextKey = moodToMusicKey[nextMood]
  activeKey = nextKey

  if (!audioContext || muted) {
    return
  }

  if (masterGain) {
    rampGain(masterGain, 0.04, 0.45)
    window.setTimeout(() => {
      applyMusicKey(nextKey)
      if (masterGain && !muted) {
        rampGain(masterGain, 0.18, 1.2)
      }
    }, 480)
    return
  }

  applyMusicKey(nextKey)
}

export async function setMuted(nextMuted: boolean) {
  muted = nextMuted

  if (nextMuted) {
    if (masterGain) {
      rampGain(masterGain, 0, 0.8)
    }
    clearMusicTimer()
    return false
  }

  return startAmbient()
}

export function stopAmbient() {
  if (masterGain) {
    rampGain(masterGain, 0, 0.4)
  }
  clearMusicTimer()
  stopPad()
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}
