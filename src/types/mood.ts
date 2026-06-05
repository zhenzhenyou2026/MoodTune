export const moods = ['开心', '平静', '焦虑', '疲惫', '低落', '兴奋'] as const
export const weathers = ['晴天', '阴天', '雨天', '夜晚'] as const

export type Mood = (typeof moods)[number]
export type Weather = (typeof weathers)[number]

export interface MoodInput {
  mood: Mood
  energy: number
  stress: number
  weather: Weather
  note: string
}

export interface MoodRecommendation {
  moodColor: string
  gradient: string
  musicMood: string
  genres: string[]
  reason: string
  visualLabel: string
}

export interface MoodEntry extends MoodInput {
  id: string
  createdAt: string
  recommendation: MoodRecommendation
}
