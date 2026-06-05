import type { MoodInput, MoodRecommendation } from '../types/mood'

const recommendations = {
  soothe: {
    moodColor: '#667da0',
    gradient: 'linear-gradient(135deg, #1b2235 0%, #5c6b8a 48%, #b8a9c9 100%)',
    musicMood: '低频安抚',
    genres: ['Ambient', 'Minimal Piano', 'Lo-fi'],
    reason: '今天的你可能需要降低外界噪音，让缓慢的声音帮你恢复呼吸节奏。',
    visualLabel: '深蓝 / 雾紫 / 灰蓝',
  },
  bright: {
    moodColor: '#ffb45f',
    gradient: 'linear-gradient(135deg, #fff0b8 0%, #ffb996 52%, #f4a7b9 100%)',
    musicMood: '明亮律动',
    genres: ['Indie Pop', 'Funk', 'City Pop'],
    reason: '你的状态轻快而有弹性，适合一点带有阳光感和律动感的音乐。',
    visualLabel: '暖橙 / 奶黄 / 珊瑚粉',
  },
  rainy: {
    moodColor: '#6c7096',
    gradient: 'linear-gradient(135deg, #303a5f 0%, #81779d 52%, #d3aebc 100%)',
    musicMood: '雨夜漫游',
    genres: ['Dream Pop', 'Slowcore', 'Shoegaze'],
    reason: '低落并不一定需要被立刻修复，有些声音适合陪你慢慢穿过雨天。',
    visualLabel: '靛蓝 / 灰紫 / 冷粉',
  },
  calm: {
    moodColor: '#c9d8a6',
    gradient: 'linear-gradient(135deg, #fff7ea 0%, #dfe8cc 50%, #a8d8c1 100%)',
    musicMood: '柔和留白',
    genres: ['Jazz', 'Acoustic', 'Neo-Classical'],
    reason: '今天的情绪像一块安静的水面，适合留白感更强的声音。',
    visualLabel: '米白 / 浅绿 / 淡金',
  },
  quiet: {
    moodColor: '#8aa39b',
    gradient: 'linear-gradient(135deg, #17302f 0%, #9fb7b3 52%, #f3f1e9 100%)',
    musicMood: '降噪空间',
    genres: ['White Noise', 'Minimal Piano', 'Ambient'],
    reason: '焦虑时不需要更多刺激，稳定、重复、低起伏的声音会更友好。',
    visualLabel: '墨绿 / 冷灰 / 雾白',
  },
  dance: {
    moodColor: '#c15ff2',
    gradient: 'linear-gradient(135deg, #4d3a8b 0%, #b8a7ff 45%, #ff8aa6 100%)',
    musicMood: '闪光舞池',
    genres: ['Electronic', 'Synth Pop', 'Disco'],
    reason: '今天的能量适合被放大，用更明亮的节拍保存这份兴奋感。',
    visualLabel: '电光紫 / 亮蓝 / 玫红',
  },
  soft: {
    moodColor: '#c9ada7',
    gradient: 'linear-gradient(135deg, #7f6f72 0%, #c9ada7 50%, #f2e9e4 100%)',
    musicMood: '柔软降速',
    genres: ['Lo-fi', 'Bedroom Pop', 'Soft Folk'],
    reason: '疲惫的时候，音乐不必推动你前进，只需要轻轻托住你。',
    visualLabel: '奶茶色 / 灰粉 / 浅棕',
  },
  daily: {
    moodColor: '#efa7aa',
    gradient: 'linear-gradient(135deg, #f8c9b5 0%, #ffd6a5 48%, #c8b6ff 100%)',
    musicMood: '日常微光',
    genres: ['Indie Folk', 'Chill Pop', 'Acoustic'],
    reason: '今天的状态适合温和、不过度打扰的声音，让日常保持一点微光。',
    visualLabel: '柔粉 / 浅橙 / 淡紫',
  },
} satisfies Record<string, MoodRecommendation>

export function generateRecommendation(input: MoodInput): MoodRecommendation {
  if (input.stress >= 7 && input.energy <= 4) {
    return recommendations.soothe
  }

  if (input.stress <= 4 && input.energy >= 7) {
    return recommendations.bright
  }

  if (input.mood === '低落' && input.weather === '雨天') {
    return recommendations.rainy
  }

  if (input.mood === '焦虑' && input.stress >= 7) {
    return recommendations.quiet
  }

  if (input.mood === '兴奋' && input.energy >= 7) {
    return recommendations.dance
  }

  if (input.mood === '疲惫') {
    return recommendations.soft
  }

  if (input.mood === '平静') {
    return recommendations.calm
  }

  if (input.mood === '开心') {
    return recommendations.bright
  }

  if (input.mood === '焦虑') {
    return recommendations.quiet
  }

  if (input.mood === '低落') {
    return recommendations.rainy
  }

  if (input.mood === '兴奋') {
    return recommendations.dance
  }

  return recommendations.daily
}
