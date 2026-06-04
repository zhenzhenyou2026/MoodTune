# 01prompt.md

请你作为本项目的开发智能体，帮助我完成 MoodTune 情绪音乐日记网页应用的第一版 MVP。

## 最高优先级要求

项目唯一工作目录是：

```txt
/Users/youzhenzhen/Downloads/MoodTune
```

你必须保证所有操作都只发生在这个目录内部。

请严格遵守：

1. 不要修改该目录以外的任何文件。
2. 不要在其他目录创建项目。
3. 不要创建嵌套项目目录，例如不要创建 `/Users/youzhenzhen/Downloads/MoodTune/moodtune`。
4. 不要使用 sudo。
5. 不要全局安装任何工具或库。
6. 不要修改系统配置、shell 配置、Git 全局配置。
7. 不要删除项目目录本身。
8. 如果不能确认当前目录就是 `/Users/youzhenzhen/Downloads/MoodTune`，请停止并说明。

## 第一步必须执行

请先进入并确认工作目录：

```bash
cd /Users/youzhenzhen/Downloads/MoodTune
pwd
ls -la
```

只有当 `pwd` 输出为：

```txt
/Users/youzhenzhen/Downloads/MoodTune
```

才可以继续。

## 第二步必须阅读

请先阅读项目根目录下的：

```txt
AGENT.md
```

然后根据 AGENT.md 的要求开发项目。

AGENT.md 是本项目的主要规格说明，尤其要遵守其中关于：

* 工作目录边界
* 安全安装依赖
* 不调用 API
* 视觉审美
* 页面结构
* 情绪推荐规则
* localStorage
* 验收标准

的要求。

## 本次任务目标

请完成 MoodTune 的第一版可运行 MVP。

MoodTune 是一个情绪音乐日记网页应用。

核心目标不是复杂功能，而是：

```txt
页面漂亮。
颜色有艺术审美。
交互轻盈。
功能完整但简单。
不调用任何 API。
不使用后端。
适合作为课程期末项目展示。
```

## 技术要求

优先使用：

* React
* Vite
* TypeScript
* CSS
* localStorage

如果当前目录还不是 Vite React 项目，请直接在当前目录初始化项目，不要创建嵌套文件夹。

如果需要安装依赖，请以最安全方式在当前目录本地安装。

允许安装：

* react
* react-dom
* vite
* typescript
* @vitejs/plugin-react
* lucide-react

不要安装不必要的复杂库。

## 功能范围

请实现 4 个主要视图：

1. Landing 首页
2. Entry 记录页
3. Result 结果页
4. History 历史页

可以使用 React 状态切换视图，不需要引入 react-router。

## 页面要求

### 1. Landing 首页

首页必须是视觉重点。

包含：

* MoodTune
* 情绪音乐日记
* 今天的情绪，适合什么声音？
* 简短说明文案
* “开始记录”按钮
* “查看历史”按钮
* 艺术化渐变背景
* 玻璃拟态主卡片
* 抽象唱片或音乐波纹装饰

首页不要做成普通工具页，要有独立音乐专辑封面、艺术展览海报、夜晚听歌屏幕光的感觉。

### 2. Entry 记录页

用户可以填写：

* 今日心情：开心、平静、焦虑、疲惫、低落、兴奋
* 能量值：1-10
* 压力值：1-10
* 天气：晴天、阴天、雨天、夜晚
* 今日关键词
* 一句话日记

要求：

* 心情不要用普通 select，要做成漂亮卡片或胶囊按钮。
* 能量和压力使用 range slider。
* 天气做成美观按钮。
* 提交按钮文案为“生成今日情绪卡片”。

### 3. Result 结果页

用户提交后，生成一张“今日情绪音乐卡片”。

展示：

* 日期
* 心情
* 能量值
* 压力值
* 天气
* 今日关键词
* 一句话日记
* 推荐音乐氛围
* 推荐音乐风格
* 推荐理由

结果页要提供：

* 保存记录
* 再记一次
* 查看历史
* 返回首页

情绪卡片必须漂亮，适合截图展示。

### 4. History 历史页

展示 localStorage 中保存的记录。

包含：

* 已记录天数
* 平均能量值
* 平均压力值
* 最常出现的心情
* 历史记录卡片列表
* 删除单条记录
* 清空所有记录
* 返回首页

历史记录不要用普通表格，用卡片网格展示。

## 推荐规则

不调用任何 API。

请用本地规则函数实现推荐逻辑。

规则请以 AGENT.md 中的规则为准，至少覆盖：

* 压力高且能量低
* 压力低且能量高
* 心情低落且雨天
* 心情平静
* 焦虑且压力高
* 兴奋且能量高
* 疲惫
* 默认规则

## 文件结构建议

请尽量采用以下结构：

```txt
src/
  main.tsx
  App.tsx
  styles/
    global.css
  types/
    mood.ts
  utils/
    recommendation.ts
    storage.ts
  components/
    LandingView.tsx
    EntryView.tsx
    ResultView.tsx
    HistoryView.tsx
    MoodCard.tsx
    StatCard.tsx
    PillButton.tsx
    RangeControl.tsx
```

如果为了简化而合并少量组件，可以接受，但代码必须清晰。

## 视觉要求

这是最重要的部分。

请优先保证：

* 首页漂亮
* 结果卡片漂亮
* 配色有艺术感
* 不像后台系统
* 不像普通蓝白网页
* 动效克制但有氛围
* 移动端能正常展示

设计风格关键词：

* Dreamy
* Soft
* Atmospheric
* Indie music poster
* Modern Gallery
* Glassmorphism
* 柔和渐变
* 夜晚听歌时的屏幕光
* 私人情绪展厅

可以使用 CSS 实现：

* radial-gradient 光斑
* glass card
* blur
* box-shadow
* hover 上浮
* 页面淡入
* 唱片圆形装饰
* 音乐波纹

## 数据存储

所有记录保存在 localStorage。

key 使用：

```txt
moodtune_entries
```

刷新页面后记录仍应存在。

## README

请创建或更新 README.md，内容包括：

* 项目简介
* 设计理念
* 核心功能
* 技术栈
* 本地运行方式
* 情绪推荐规则说明
* 后续可扩展方向

## 自测要求

开发完成后请运行：

```bash
npm run build
```

如果失败，请修复直到通过。

最后请向我汇报：

1. 你确认操作只发生在 `/Users/youzhenzhen/Downloads/MoodTune` 内。
2. 你创建或修改了哪些主要文件。
3. 你安装了哪些依赖，为什么需要。
4. `npm run build` 是否通过。
5. 如何本地启动项目。
6. 项目当前实现了哪些功能。
