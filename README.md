# MoodTune 情绪音乐日记

MoodTune 是一个前端单页网页应用，面向大学生、年轻创作者和音乐爱好者。用户用 60 秒记录心情、能量、压力、天气和一句话日记，应用通过本地规则生成一张具有艺术感的“情绪音乐卡片”。

## 目标用户

- 希望轻量记录情绪的大学生和年轻创作者。
- 喜欢音乐、日记、色彩和氛围化数字工具的人。
- 需要一个可展示、可运行、无后端依赖课程项目的学习者。

## 设计理念

项目追求“少功能，高完成度”：不接入后端、不调用外部 API，把记录流程、情绪推荐、视觉卡片、本地历史和轻柔音乐氛围做完整。整体视觉参考温柔唱片封面、私人情绪档案、夜晚听歌时的屏幕光与柔和玻璃拟态。

## 核心功能

- Landing 首页：艺术化渐变背景、玻璃主卡片、抽象唱片和音乐波纹。
- Entry 记录页：心情卡片、能量与压力滑杆、天气按钮和一句话日记。
- Result 结果页：生成适合截图展示的今日情绪音乐卡片。
- History 历史页：读取 `moodtune_entries`，展示统计、卡片列表、删除单条和清空全部。
- 轻音乐氛围：第四版已改为本地 MP3 播放器，支持首页默认音乐、按心情切换、1.4 秒淡入淡出、循环播放和素材缺失提示。
- 音频授权留档：见 `public/audio/audio-credits.md`，代码不热链接外部音频。

## 第四版音频文件

请将 6 首官方来源曲目手动放入以下路径：

- `public/audio/home-ambient-piano.mp3`
- `public/audio/mood-happy-sweet-light.mp3`
- `public/audio/mood-calm-soft-calm-piano.mp3`
- `public/audio/mood-anxious-please-calm-my-mind.mp3`
- `public/audio/mood-tired-piano-background.mp3`
- `public/audio/mood-low-gymnopedies.mp3`

当前自动下载受到官方页面访问控制限制，播放器会在素材缺失时显示“音乐素材待补充”，其他记录功能照常可用。

## 情绪推荐规则

应用使用 `generateRecommendation` 本地函数，不调用任何 API。规则覆盖压力高且能量低、压力低且能量高、低落雨天、平静、焦虑高压、兴奋高能量、疲惫和默认状态，并输出音乐氛围、推荐风格、推荐理由和视觉颜色。

## 技术栈

- React
- Vite
- TypeScript
- CSS
- lucide-react
- localStorage

## 本地运行

```bash
npm install
npm run dev
```

构建检查：

```bash
npm run build
```

## 后续可扩展方向

- 增加月份视图或简单趋势图。
- 为不同心情增加更多视觉模板。
- 支持导出情绪卡片图片。
- 增加自定义音乐风格偏好。
