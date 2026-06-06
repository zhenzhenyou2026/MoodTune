import {
  getMusicTrackForMood,
  homeMusicTrack,
  musicTracks,
  type MusicTrack,
  type MusicTrackKey,
} from '../data/musicTracks'
import type { Mood } from '../types/mood'

export type AudioStatus = 'idle' | 'playing' | 'paused' | 'blocked' | 'missing'

export type AudioState = {
  currentKey: MusicTrackKey
  currentTrack: MusicTrack
  isEnabled: boolean
  isMissing: boolean
  isPlaying: boolean
  message: string
  status: AudioStatus
}

type AudioListener = (state: AudioState) => void

const FADE_DURATION = 1400

let currentAudio: HTMLAudioElement | null = null
let currentKey: MusicTrackKey = 'home'
let currentTrack: MusicTrack = homeMusicTrack
const fadeTimers = new WeakMap<HTMLAudioElement, number>()
let isEnabled = true
let isMissing = false
let isPlaying = false
let status: AudioStatus = 'idle'
let transitionId = 0

const listeners = new Set<AudioListener>()

function canUseAudio() {
  return typeof window !== 'undefined' && typeof Audio !== 'undefined'
}

function getMessage(nextStatus = status, track = currentTrack) {
  if (nextStatus === 'missing') {
    return `音乐素材待补充：${track.title}`
  }

  if (nextStatus === 'blocked') {
    return '点击开启今日的声音'
  }

  if (nextStatus === 'playing') {
    return `正在播放：${track.title} · ${track.moodLabel}`
  }

  return `已暂停：${track.title}`
}

export function getAudioState(): AudioState {
  return {
    currentKey,
    currentTrack,
    isEnabled,
    isMissing,
    isPlaying,
    message: getMessage(),
    status,
  }
}

function emit() {
  const nextState = getAudioState()
  listeners.forEach((listener) => listener(nextState))
}

export function subscribeAudio(listener: AudioListener) {
  listeners.add(listener)
  listener(getAudioState())

  return () => {
    listeners.delete(listener)
  }
}

function clearFadeTimer(audio: HTMLAudioElement) {
  const timer = fadeTimers.get(audio)
  if (timer !== undefined) {
    window.clearInterval(timer)
    fadeTimers.delete(audio)
  }
}

function updateState(nextStatus: AudioStatus, missing = false) {
  status = nextStatus
  isMissing = missing
  isPlaying = nextStatus === 'playing'
  emit()
}

function fadeAudio(
  audio: HTMLAudioElement,
  targetVolume: number,
  duration = FADE_DURATION,
  onComplete?: () => void,
) {
  clearFadeTimer(audio)

  const startVolume = audio.volume
  const startedAt = Date.now()

  const timer = window.setInterval(() => {
    const progress = Math.min((Date.now() - startedAt) / duration, 1)
    audio.volume = startVolume + (targetVolume - startVolume) * progress

    if (progress >= 1) {
      clearFadeTimer(audio)
      audio.volume = targetVolume
      onComplete?.()
    }
  }, 34)
  fadeTimers.set(audio, timer)
}

function fadeOutAndPause(audio: HTMLAudioElement | null, duration = FADE_DURATION) {
  if (!audio) {
    return
  }

  fadeAudio(audio, 0, duration, () => {
    audio.pause()
  })
}

async function fileExists(track: MusicTrack) {
  if (typeof fetch === 'undefined') {
    return true
  }

  try {
    const response = await fetch(track.localUrl, {
      cache: 'no-store',
      method: 'HEAD',
    })
    const contentType = response.headers.get('content-type') || ''
    return response.ok && !contentType.includes('text/html')
  } catch {
    return true
  }
}

function createAudio(track: MusicTrack) {
  const audio = new Audio(track.localUrl)
  audio.loop = true
  audio.preload = 'auto'
  audio.volume = 0

  audio.addEventListener('error', () => {
    if (audio === currentAudio) {
      updateState('missing', true)
    }
  })

  audio.addEventListener('pause', () => {
    if (audio === currentAudio && status !== 'missing') {
      updateState('paused')
    }
  })

  audio.addEventListener('play', () => {
    if (audio === currentAudio) {
      updateState('playing')
    }
  })

  return audio
}

async function playCurrentAudio() {
  if (!currentAudio) {
    currentAudio = createAudio(currentTrack)
  }

  try {
    await currentAudio.play()
    fadeAudio(currentAudio, currentTrack.suggestedVolume)
    updateState('playing')
    return getAudioState()
  } catch (error) {
    const name = error instanceof DOMException ? error.name : ''
    updateState(name === 'NotAllowedError' ? 'blocked' : 'missing', name !== 'NotAllowedError')
    return getAudioState()
  }
}

async function switchToTrack(nextKey: MusicTrackKey) {
  const nextTrack = musicTracks[nextKey]
  const token = transitionId + 1
  transitionId = token

  if (currentKey === nextKey && currentAudio) {
    currentTrack = nextTrack

    if (!isEnabled) {
      updateState('paused')
      return getAudioState()
    }

    if (!currentAudio.paused) {
      fadeAudio(currentAudio, nextTrack.suggestedVolume)
      updateState('playing')
      return getAudioState()
    }

    return playCurrentAudio()
  }

  const previousAudio = currentAudio
  currentKey = nextKey
  currentTrack = nextTrack

  const available = await fileExists(nextTrack)
  if (transitionId !== token) {
    return getAudioState()
  }

  if (!available) {
    fadeOutAndPause(previousAudio, 900)
    currentAudio = null
    updateState('missing', true)
    return getAudioState()
  }

  const nextAudio = createAudio(nextTrack)
  currentAudio = nextAudio

  if (!isEnabled) {
    updateState('paused')
    return getAudioState()
  }

  try {
    await nextAudio.play()
  } catch (error) {
    fadeOutAndPause(previousAudio, 900)
    currentAudio = null
    const name = error instanceof DOMException ? error.name : ''
    updateState(name === 'NotAllowedError' ? 'blocked' : 'missing', name !== 'NotAllowedError')
    return getAudioState()
  }

  if (transitionId !== token) {
    nextAudio.pause()
    return getAudioState()
  }

  fadeOutAndPause(previousAudio)
  fadeAudio(nextAudio, nextTrack.suggestedVolume)
  updateState('playing')
  return getAudioState()
}

export async function startAmbient(nextMood?: Mood) {
  const nextKey = nextMood ? getMusicTrackForMood(nextMood).key : currentKey

  if (!canUseAudio()) {
    updateState('missing', true)
    return getAudioState()
  }

  isEnabled = true
  return switchToTrack(nextKey)
}

export async function setMoodSound(nextMood: Mood) {
  return switchToTrack(getMusicTrackForMood(nextMood).key)
}

export async function setMuted(nextMuted: boolean) {
  isEnabled = !nextMuted

  if (nextMuted) {
    fadeOutAndPause(currentAudio, 700)
    updateState('paused')
    return getAudioState()
  }

  return startAmbient()
}

export function stopAmbient() {
  if (currentAudio) {
    clearFadeTimer(currentAudio)
    currentAudio.pause()
    currentAudio = null
  }
  updateState('idle')
}
