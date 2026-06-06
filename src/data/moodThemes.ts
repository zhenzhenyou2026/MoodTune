import type { Mood } from '../types/mood'
import type { MusicTrackKey } from './musicTracks'

export type MusicKey = MusicTrackKey

export type MoodTheme = {
  archiveAccent: string
  archivePaper: string
  buttonTone: string
  cardGradient: string
  decorationTone: string
  iconKey: MusicKey
  key: MusicKey
  label: Mood
  musicKey: MusicKey
  quotePool: string[]
  textColor: string
}

export const moodThemes: Record<Mood, MoodTheme> = {
  开心: {
    archiveAccent: '#ffb875',
    archivePaper: 'linear-gradient(135deg, rgba(255, 246, 224, 0.94), rgba(255, 210, 168, 0.76))',
    buttonTone: 'happy',
    cardGradient: 'linear-gradient(135deg, #fff3c6 0%, #ffbd8f 52%, #f5a9b9 100%)',
    decorationTone: '#a95e42',
    iconKey: 'happy',
    key: 'happy',
    label: '开心',
    musicKey: 'happy',
    quotePool: [
      '愿你把细小的快乐，也认真收藏。',
      '今天的光落得刚好，像一段轻快的副歌。',
      '把这份明亮留在口袋里，明天也能摸到一点暖。',
    ],
    textColor: '#3f2a25',
  },
  平静: {
    archiveAccent: '#8bcfb6',
    archivePaper: 'linear-gradient(135deg, rgba(250, 255, 244, 0.94), rgba(186, 224, 206, 0.76))',
    buttonTone: 'calm',
    cardGradient: 'linear-gradient(135deg, #fff8e8 0%, #dfe8cc 50%, #a8d8c1 100%)',
    decorationTone: '#51786e',
    iconKey: 'calm',
    key: 'calm',
    label: '平静',
    musicKey: 'calm',
    quotePool: [
      '今天的风很轻，适合把心事慢慢放下。',
      '平静不是空白，是心里有一片柔软的水面。',
      '让呼吸慢一点，日子也会跟着安静下来。',
    ],
    textColor: '#273f38',
  },
  焦虑: {
    archiveAccent: '#9fb7b3',
    archivePaper: 'linear-gradient(135deg, rgba(247, 248, 242, 0.94), rgba(184, 205, 201, 0.72))',
    buttonTone: 'anxious',
    cardGradient: 'linear-gradient(135deg, #f4f1e7 0%, #b9ccc8 54%, #d6cfdd 100%)',
    decorationTone: '#536b68',
    iconKey: 'anxious',
    key: 'anxious',
    label: '焦虑',
    musicKey: 'anxious',
    quotePool: [
      '有些急促可以慢下来，被一段稳定的声音接住。',
      '不用马上抵达，先把今天走成自己的节奏。',
      '心跳有点乱也没关系，声音会陪你重新排好队。',
    ],
    textColor: '#253b39',
  },
  疲惫: {
    archiveAccent: '#c9ada7',
    archivePaper: 'linear-gradient(135deg, rgba(255, 248, 239, 0.94), rgba(216, 190, 184, 0.72))',
    buttonTone: 'tired',
    cardGradient: 'linear-gradient(135deg, #fff4e8 0%, #d9bdb8 52%, #c9ada7 100%)',
    decorationTone: '#735b59',
    iconKey: 'tired',
    key: 'tired',
    label: '疲惫',
    musicKey: 'tired',
    quotePool: [
      '今天已经很努力了，剩下的交给柔软的夜。',
      '疲惫的时候，不必发光，也值得被温柔照看。',
      '把肩膀放低一点，慢慢回到自己的身体里。',
    ],
    textColor: '#4c3938',
  },
  低落: {
    archiveAccent: '#8c99c7',
    archivePaper: 'linear-gradient(135deg, rgba(245, 247, 255, 0.94), rgba(190, 184, 217, 0.72))',
    buttonTone: 'sad',
    cardGradient: 'linear-gradient(135deg, #eef3ff 0%, #aeb7dd 48%, #d8bfd0 100%)',
    decorationTone: '#56648d',
    iconKey: 'sad',
    key: 'sad',
    label: '低落',
    musicKey: 'sad',
    quotePool: [
      '有些情绪不必被解决，只需要被听见。',
      '低落也可以被轻轻保存，不必急着变晴。',
      '愿这段声音像小小的伞，陪你穿过今天。',
    ],
    textColor: '#33405f',
  },
  兴奋: {
    archiveAccent: '#e99bbc',
    archivePaper: 'linear-gradient(135deg, rgba(255, 246, 250, 0.94), rgba(218, 197, 255, 0.7))',
    buttonTone: 'excited',
    cardGradient: 'linear-gradient(135deg, #fff0f7 0%, #c8b6ff 46%, #ff9fba 100%)',
    decorationTone: '#734d93',
    iconKey: 'hopeful',
    key: 'hopeful',
    label: '兴奋',
    musicKey: 'hopeful',
    quotePool: [
      '像有好事情正在靠近，连空气都有一点闪光。',
      '把这份上扬的心情放进今天的唱片里。',
      '愿期待保持轻盈，也保持温柔。',
    ],
    textColor: '#3e2d58',
  },
}

export function getMoodTheme(mood: Mood) {
  return moodThemes[mood]
}

export function getMoodQuote(mood: Mood, seed = '') {
  const theme = getMoodTheme(mood)
  const pool = theme.quotePool
  const charTotal = seed.split('').reduce((total, char) => total + char.charCodeAt(0), 0)
  const index = Math.abs(charTotal || mood.charCodeAt(0)) % pool.length
  return pool[index]
}
