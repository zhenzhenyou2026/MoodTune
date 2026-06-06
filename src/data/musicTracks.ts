import type { Mood } from '../types/mood'

export type MusicTrackKey =
  | 'home'
  | 'happy'
  | 'calm'
  | 'anxious'
  | 'tired'
  | 'sad'
  | 'hopeful'

export type MusicTrack = {
  artist: string
  contentIdRegistered: boolean
  description: string
  key: MusicTrackKey
  licenseLabel: string
  licenseNote: string
  localUrl: string
  moodLabel: string
  requiresAttribution: boolean
  source: 'Pixabay' | 'Musopen'
  sourceUrl: string
  suggestedVolume: number
  title: string
}

export const musicTracks: Record<MusicTrackKey, MusicTrack> = {
  home: {
    artist: 'Alex_MakeMusic',
    contentIdRegistered: true,
    description: '柔和、轻盈，适合作为进入 MoodTune 的默认氛围。',
    key: 'home',
    licenseLabel: 'Pixabay Content License',
    licenseNote: '根据 2026-06-06 页面检索结果，曲目页面显示可在 Pixabay Content License 下使用。',
    localUrl: 'audio/home-ambient-piano.mp3',
    moodLabel: '首页氛围',
    requiresAttribution: false,
    source: 'Pixabay',
    sourceUrl: 'https://pixabay.com/music/modern-classical-ambient-piano-10781/',
    suggestedVolume: 0.42,
    title: 'Ambient Piano',
  },
  happy: {
    artist: 'LiteSaturation',
    contentIdRegistered: false,
    description: '明亮、轻盈、温暖，像阳光和微笑。',
    key: 'happy',
    licenseLabel: 'Pixabay Content License',
    licenseNote: '根据 2026-06-06 页面检索结果，曲目页面显示可在 Pixabay Content License 下使用。',
    localUrl: 'audio/mood-happy-sweet-light.mp3',
    moodLabel: '开心',
    requiresAttribution: false,
    source: 'Pixabay',
    sourceUrl:
      'https://pixabay.com/music/modern-classical-sweet-light-background-piano-instrumental-370361/',
    suggestedVolume: 0.46,
    title: 'Sweet Light (Background Piano Instrumental)',
  },
  calm: {
    artist: 'SigmaMusicArt',
    contentIdRegistered: true,
    description: '舒缓、安静、柔和，适合稳定呼吸。',
    key: 'calm',
    licenseLabel: 'Pixabay Content License',
    licenseNote: '根据 2026-06-06 页面检索结果，曲目页面显示可在 Pixabay Content License 下使用。',
    localUrl: 'audio/mood-calm-soft-calm-piano.mp3',
    moodLabel: '平静',
    requiresAttribution: false,
    source: 'Pixabay',
    sourceUrl: 'https://pixabay.com/music/modern-classical-soft-calm-piano-music-405074/',
    suggestedVolume: 0.4,
    title: 'Soft Calm Piano Music',
  },
  anxious: {
    artist: 'music_for_video',
    contentIdRegistered: true,
    description: '安抚、规律、放慢情绪，不制造紧张感。',
    key: 'anxious',
    licenseLabel: 'Pixabay Content License',
    licenseNote: '根据 2026-06-06 页面检索结果，曲目页面显示可在 Pixabay Content License 下使用。',
    localUrl: 'audio/mood-anxious-please-calm-my-mind.mp3',
    moodLabel: '焦虑',
    requiresAttribution: false,
    source: 'Pixabay',
    sourceUrl: 'https://pixabay.com/music/beautiful-plays-please-calm-my-mind-125566/',
    suggestedVolume: 0.38,
    title: 'Please Calm My Mind',
  },
  tired: {
    artist: 'The_Mountain',
    contentIdRegistered: true,
    description: '低能量、温柔、适合慢慢休息。',
    key: 'tired',
    licenseLabel: 'Pixabay Content License',
    licenseNote: '根据 2026-06-06 页面检索结果，曲目页面显示可在 Pixabay Content License 下使用。',
    localUrl: 'audio/mood-tired-piano-background.mp3',
    moodLabel: '疲惫',
    requiresAttribution: false,
    source: 'Pixabay',
    sourceUrl: 'https://pixabay.com/music/solo-piano-piano-background-487020/',
    suggestedVolume: 0.36,
    title: 'Piano Background',
  },
  sad: {
    artist: 'Erik Satie / Musopen',
    contentIdRegistered: false,
    description: '克制、淡淡忧伤、有陪伴感。',
    key: 'sad',
    licenseLabel: 'Musopen public-domain style resource; verify recording page before public release',
    licenseNote:
      '根据 2026-06-06 官方资料检索，Musopen 提供免版权限制的公开音乐资源，但也建议用户自行核验具体录音的 public domain 状态。',
    localUrl: 'audio/mood-low-gymnopedies.mp3',
    moodLabel: '低落',
    requiresAttribution: false,
    source: 'Musopen',
    sourceUrl: 'https://musopen.org/music/8010-3-gymnopedies/',
    suggestedVolume: 0.34,
    title: 'Gymnopédies',
  },
  hopeful: {
    artist: 'Alex_MakeMusic',
    contentIdRegistered: true,
    description: '轻盈、有上升感，但不吵闹。',
    key: 'hopeful',
    licenseLabel: 'Pixabay Content License',
    licenseNote: '兴奋心情复用首页默认曲目；根据 2026-06-06 页面检索结果，页面显示可在 Pixabay Content License 下使用。',
    localUrl: 'audio/home-ambient-piano.mp3',
    moodLabel: '兴奋',
    requiresAttribution: false,
    source: 'Pixabay',
    sourceUrl: 'https://pixabay.com/music/modern-classical-ambient-piano-10781/',
    suggestedVolume: 0.42,
    title: 'Ambient Piano',
  },
}

export const homeMusicTrack = musicTracks.home

export const moodToMusicTrackKey: Record<Mood, MusicTrackKey> = {
  开心: 'happy',
  平静: 'calm',
  焦虑: 'anxious',
  疲惫: 'tired',
  低落: 'sad',
  兴奋: 'hopeful',
}

export function getMusicTrack(key: string | undefined): MusicTrack | undefined {
  if (!key) {
    return undefined
  }

  return musicTracks[key as MusicTrackKey]
}

export function getMusicTrackForMood(mood: Mood): MusicTrack {
  return musicTracks[moodToMusicTrackKey[mood]]
}

export function getMusicTrackForEntry(mood: Mood, musicKey?: string): MusicTrack {
  return getMusicTrack(musicKey) ?? getMusicTrackForMood(mood)
}
