# AGENT.md

# MoodTune 项目智能体开发说明

## 0. 最高优先级指令：工作目录边界

本项目的唯一工作目录是：

```txt
/Users/youzhenzhen/Downloads/MoodTune
```

智能体必须严格遵守以下规则：

1. 所有文件创建、修改、删除、安装依赖、运行命令，都必须只发生在该目录内部。
2. 不得修改该目录以外的任何文件。
3. 不得在 `/Users/youzhenzhen/Downloads/` 下创建其他项目文件夹。
4. 不得在用户主目录、桌面、下载目录的其他位置创建、移动或删除文件。
5. 不得使用 `cd ..` 后继续执行文件写入、删除或安装命令。
6. 不得使用 `sudo`。
7. 不得进行全局安装，例如不得使用 `npm install -g`。
8. 不得修改 shell 配置文件，例如 `.zshrc`、`.bashrc`、`.profile`。
9. 不得修改 Git 全局配置。
10. 不得删除项目目录本身。
11. 不得执行危险删除命令，例如 `rm -rf /`、`rm -rf ~`、`rm -rf ..`、`rm -rf *`。
12. 如果无法确认当前目录就是项目目录，必须停止并向用户说明情况。

在执行任何开发操作前，必须先确认当前路径：

```bash
pwd
```

只有当输出为：

```txt
/Users/youzhenzhen/Downloads/MoodTune
```

才可以继续。

如果使用支持 `workdir` 的执行环境，所有命令都必须显式指定工作目录为：

```txt
/Users/youzhenzhen/Downloads/MoodTune
```

---

## 1. 项目一句话

MoodTune 是一个面向大学生和年轻创作者的情绪音乐日记网页应用。用户每天记录自己的心情、能量、压力、天气和一句话日记，系统通过本地规则生成一张具有艺术感的“情绪音乐卡片”，帮助用户把抽象情绪转化为颜色、声音氛围和视觉记忆。

本项目的核心不是复杂功能，而是：

```txt
少功能，高完成度。
轻交互，强视觉。
不调用 API，但要有完整产品体验。
页面必须漂亮，尤其是首页和结果卡片。
```

---

## 2. 项目定位

### 2.1 项目名称

MoodTune

### 2.2 中文名称

情绪音乐日记

### 2.3 项目口号

今天的情绪，适合什么声音？

### 2.4 项目类型

前端单页网页应用，适合课程期末项目展示和作品集展示。

### 2.5 核心用户

主要面向：

* 大学生
* 年轻创作者
* 音乐爱好者
* 情绪记录习惯较弱但愿意做轻量自我观察的人
* 喜欢美学化数字工具的人

### 2.6 设计关键词

* 情绪
* 音乐
* 日记
* 色彩
* 氛围
* 轻量记录
* 艺术化可视化
* 自我观察
* 私人展厅
* 独立音乐海报

---

## 3. 项目目标

本项目不做真正的音乐播放器，不接入 Spotify、网易云音乐、QQ 音乐或任何大模型 API。

项目目标是做一个“美观、完整、可演示”的情绪记录工具。

用户完成一次记录后，应用根据本地规则生成：

* 今日情绪颜色
* 今日音乐氛围
* 推荐音乐风格
* 推荐理由
* 一张适合截图展示的情绪音乐卡片
* 本地保存的历史记录

---

## 4. 技术要求

### 4.1 推荐技术栈

优先使用：

* React
* Vite
* TypeScript
* CSS Modules 或普通 CSS
* localStorage

允许使用：

* lucide-react：用于图标
* nanoid 或 crypto.randomUUID：用于生成本地记录 ID

不强制使用 UI 组件库。

### 4.2 禁止项

不得使用：

* 任何付费 API
* 任何 LLM API
* 任何音乐 API
* 后端服务
* 数据库
* 登录注册
* 云端同步
* 复杂权限系统
* 复杂路由系统
* Redux、MobX 等复杂状态管理库
* Tailwind 配置复杂化，除非项目已经存在并适合继续使用

### 4.3 依赖安装规则

如果项目缺少必要依赖，智能体可以自行以最安全方式安装，但必须遵守以下规则：

1. 只能在 `/Users/youzhenzhen/Downloads/MoodTune` 内安装。
2. 优先读取当前目录是否已有 `package.json`。
3. 如果已有 `package-lock.json`，优先使用 npm。
4. 如果已有 `pnpm-lock.yaml`，优先使用 pnpm。
5. 如果已有 `yarn.lock`，优先使用 yarn。
6. 如果没有任何 lockfile，默认使用 npm。
7. 只安装项目必要依赖。
8. 不得全局安装。
9. 不得使用 sudo。
10. 不得安装来源不明、用途不明的包。
11. 安装前应说明将安装哪些依赖以及用途。
12. 安装完成后运行构建检查。

推荐最小依赖：

```bash
npm install react react-dom
npm install -D vite typescript @vitejs/plugin-react
npm install lucide-react
```

如果项目已经存在这些依赖，不要重复安装。

### 4.4 初始化规则

如果当前目录是空目录，或还不是一个 Vite React 项目，可以在当前目录中初始化项目。

注意：

不得创建嵌套目录，例如不得生成：

```txt
/Users/youzhenzhen/Downloads/MoodTune/moodtune
```

项目文件必须直接位于：

```txt
/Users/youzhenzhen/Downloads/MoodTune
```

如果需要初始化，请在当前目录内创建：

```txt
package.json
index.html
vite.config.ts
tsconfig.json
src/
```

---

## 5. 数据存储

所有用户数据必须保存在浏览器 localStorage。

localStorage key 使用：

```ts
moodtune_entries
```

不得使用数据库。
不得写入用户系统目录。
不得把用户数据上传到任何外部服务。

---

## 6. 功能优先级

本项目优先级如下：

1. 视觉审美
2. 页面完整度
3. 用户流程顺滑
4. 情绪卡片展示效果
5. 本地数据保存
6. 简单统计
7. 代码结构清晰

不要为了增加复杂功能牺牲页面美感。

---

## 7. 页面结构

项目建议做成 4 个主要视图。

可以使用 React 状态切换视图，不一定需要 react-router。

### 7.1 Landing 首页

首页是项目视觉门面，必须做得漂亮。

#### 页面内容

包含：

* 项目名：MoodTune
* 中文副标题：情绪音乐日记
* Slogan：今天的情绪，适合什么声音？
* 简短说明文案：
  “用一分钟记录此刻的心情，让颜色、文字和音乐氛围为你保存今天。”
* 主按钮：开始记录
* 次按钮：查看历史
* 装饰性视觉元素：

  * 柔和渐变背景
  * 浮动色块
  * 光晕
  * 玻璃拟态卡片
  * 音乐波纹
  * 抽象唱片元素

#### 首页视觉要求

首页不应像普通表单工具，要更像一个艺术化的情绪空间。

整体感觉应接近：

* Dreamy
* Soft
* Atmospheric
* Editorial
* Modern Gallery
* Indie music poster
* 夜晚听歌时的屏幕光

---

### 7.2 Entry 记录页

用户填写今日情绪。

#### 输入字段

需要包含：

1. 今日心情 mood

可选项：

* 开心
* 平静
* 焦虑
* 疲惫
* 低落
* 兴奋

2. 能量值 energy

范围：1 到 10

3. 压力值 stress

范围：1 到 10

4. 天气 weather

可选项：

* 晴天
* 阴天
* 雨天
* 夜晚

5. 今日关键词 keywords

用户可输入简短关键词，例如：

* 考试
* 散步
* 失眠
* 朋友
* 海边

6. 一句话日记 note

用户输入一段短文本。

#### 交互要求

* 心情选择必须做成漂亮卡片或胶囊按钮，不要使用普通 select。
* 能量值和压力值使用 range slider，并显示当前数值。
* 天气选择做成图标卡片或美观按钮。
* 表单整体应轻盈，不要像后台管理系统。
* 提交按钮文案：
  “生成今日情绪卡片”

---

### 7.3 Result 结果页

用户提交后，生成今日情绪音乐卡片。

#### 展示内容

需要展示：

* 今日日期
* 心情
* 能量值
* 压力值
* 天气
* 今日关键词
* 一句话日记
* 今日情绪颜色
* 推荐音乐氛围
* 推荐音乐风格
* 推荐理由

#### 情绪卡片

结果页核心是情绪卡片。

情绪卡片必须做得美观，适合截图展示。

卡片建议包含：

* 大面积渐变背景
* 情绪名称
* 音乐氛围名称
* 简短推荐理由
* 用户的一句话日记
* 装饰性音乐波纹
* 日期
* MoodTune 标识

#### 按钮

结果页提供：

* 保存记录
* 再记一次
* 查看历史
* 返回首页

保存后写入 localStorage。

---

### 7.4 History 历史页

展示用户过往记录。

#### 页面内容

包含：

* 历史记录列表
* 每条记录以小卡片展示
* 每条卡片显示：

  * 日期
  * 心情
  * 音乐风格
  * 压力值
  * 能量值
  * 日记摘要
* 删除单条记录按钮
* 清空所有记录按钮
* 返回首页按钮

#### 简单统计

历史页顶部展示 3 到 4 个统计卡片：

1. 已记录天数
2. 平均能量值
3. 平均压力值
4. 最常出现的心情

统计功能不需要复杂图表，漂亮的小卡片即可。

---

## 8. 情绪推荐规则

不得调用 API。
推荐逻辑使用本地规则函数完成。

请实现一个函数：

```ts
function generateRecommendation(input: MoodInput): MoodRecommendation
```

### 8.1 输入类型示例

```ts
type Mood = '开心' | '平静' | '焦虑' | '疲惫' | '低落' | '兴奋'
type Weather = '晴天' | '阴天' | '雨天' | '夜晚'

interface MoodInput {
  mood: Mood
  energy: number
  stress: number
  weather: Weather
  keywords: string
  note: string
}
```

### 8.2 输出类型示例

```ts
interface MoodRecommendation {
  moodColor: string
  gradient: string
  musicMood: string
  genres: string[]
  reason: string
  visualLabel: string
}
```

### 8.3 推荐规则

#### 规则 1：压力高且能量低

条件：

```ts
stress >= 7 && energy <= 4
```

输出：

* 音乐氛围：低频安抚
* 风格：Ambient / Minimal Piano / Lo-fi
* 推荐理由：
  “今天的你可能需要降低外界噪音，让缓慢的声音帮你恢复呼吸节奏。”
* 颜色方向：
  深蓝、雾紫、灰蓝

#### 规则 2：压力低且能量高

条件：

```ts
stress <= 4 && energy >= 7
```

输出：

* 音乐氛围：明亮律动
* 风格：Indie Pop / Funk / City Pop
* 推荐理由：
  “你的状态轻快而有弹性，适合一点带有阳光感和律动感的音乐。”
* 颜色方向：
  暖橙、奶黄、珊瑚粉

#### 规则 3：心情低落且雨天

条件：

```ts
mood === '低落' && weather === '雨天'
```

输出：

* 音乐氛围：雨夜漫游
* 风格：Dream Pop / Slowcore / Shoegaze
* 推荐理由：
  “低落并不一定需要被立刻修复，有些声音适合陪你慢慢穿过雨天。”
* 颜色方向：
  靛蓝、灰紫、冷粉

#### 规则 4：心情平静

条件：

```ts
mood === '平静'
```

输出：

* 音乐氛围：柔和留白
* 风格：Jazz / Acoustic / Neo-Classical
* 推荐理由：
  “今天的情绪像一块安静的水面，适合留白感更强的声音。”
* 颜色方向：
  米白、浅绿、淡金

#### 规则 5：焦虑且压力高

条件：

```ts
mood === '焦虑' && stress >= 7
```

输出：

* 音乐氛围：降噪空间
* 风格：White Noise / Minimal Piano / Ambient
* 推荐理由：
  “焦虑时不需要更多刺激，稳定、重复、低起伏的声音会更友好。”
* 颜色方向：
  墨绿、冷灰、雾白

#### 规则 6：兴奋且能量高

条件：

```ts
mood === '兴奋' && energy >= 7
```

输出：

* 音乐氛围：闪光舞池
* 风格：Electronic / Synth Pop / Disco
* 推荐理由：
  “今天的能量适合被放大，用更明亮的节拍保存这份兴奋感。”
* 颜色方向：
  电光紫、亮蓝、玫红

#### 规则 7：疲惫

条件：

```ts
mood === '疲惫'
```

输出：

* 音乐氛围：柔软降速
* 风格：Lo-fi / Bedroom Pop / Soft Folk
* 推荐理由：
  “疲惫的时候，音乐不必推动你前进，只需要轻轻托住你。”
* 颜色方向：
  奶茶色、灰粉、浅棕

#### 默认规则

如果没有命中特定规则：

* 音乐氛围：日常微光
* 风格：Indie Folk / Chill Pop / Acoustic
* 推荐理由：
  “今天的状态适合温和、不过度打扰的声音，让日常保持一点微光。”
* 颜色方向：
  柔粉、浅橙、淡紫

---

## 9. 视觉设计要求

这是本项目最重要的部分。

请优先保证页面漂亮，不要只做功能。

### 9.1 整体美术方向

MoodTune 应该像一个“情绪与音乐的私人展厅”。

整体风格参考：

* 独立音乐专辑封面
* 艺术展览海报
* 柔和渐变玻璃拟态
* 夜晚听歌时的屏幕光
* 日记本与唱片封面的结合
* 轻微胶片感
* 现代音乐杂志版式

### 9.2 避免的风格

不要做成：

* 企业 SaaS 后台
* 普通蓝白管理系统
* 默认 Bootstrap 页面
* 低审美渐变色堆叠
* 复杂但廉价的特效页面
* 游戏化积分打卡工具

### 9.3 颜色系统

推荐基础背景：

```css
--bg-deep: #16151f;
--bg-night: #211b2d;
--bg-soft: #f7efe6;
--ink: #24212b;
--muted: #7d7586;
--paper: rgba(255, 255, 255, 0.72);
--glass: rgba(255, 255, 255, 0.16);
--glass-border: rgba(255, 255, 255, 0.32);
```

推荐情绪色板：

```css
--calm-a: #dfe8cc;
--calm-b: #f7e7b4;

--happy-a: #ffd166;
--happy-b: #ff9f7a;

--anxious-a: #9fb7b3;
--anxious-b: #d8d2c4;

--tired-a: #c9ada7;
--tired-b: #f2e9e4;

--sad-a: #5c6b8a;
--sad-b: #b8a9c9;

--excited-a: #8a5cf6;
--excited-b: #ff5d8f;
```

### 9.4 背景渐变建议

大量使用柔和渐变，但必须克制。

示例：

```css
background:
  radial-gradient(circle at 20% 20%, rgba(255, 209, 102, 0.28), transparent 30%),
  radial-gradient(circle at 80% 10%, rgba(138, 92, 246, 0.24), transparent 28%),
  linear-gradient(135deg, #16151f 0%, #2a2238 50%, #f4d7b5 100%);
```

### 9.5 玻璃拟态建议

主要内容卡片建议使用：

```css
background: rgba(255, 255, 255, 0.14);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.28);
box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24);
```

### 9.6 字体

优先使用系统字体，不引入外部字体。

推荐：

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "PingFang SC",
  "Microsoft YaHei",
  sans-serif;
```

标题可以使用更大字号、更高字重、更宽松字距。

### 9.7 动效

动效要克制、柔和。

建议实现：

* 首页光斑缓慢漂浮
* 卡片 hover 轻微上浮
* 页面切换淡入
* 结果卡片生成时轻微 scale in
* 按钮 hover 出现细微光晕
* 唱片元素缓慢旋转或悬浮

不要做过度夸张动画。
不要让动画影响阅读和操作。

### 9.8 响应式

必须适配：

* 桌面端
* 笔记本
* 手机端

移动端要求：

* 表单一列展示
* 卡片宽度撑满
* 按钮更大
* 文字不要过小
* 页面不横向溢出

---

## 10. 数据结构

### 10.1 日记记录类型

```ts
interface MoodEntry {
  id: string
  createdAt: string
  mood: Mood
  energy: number
  stress: number
  weather: Weather
  keywords: string
  note: string
  recommendation: MoodRecommendation
}
```

### 10.2 本地存储函数

建议实现：

```ts
function getEntries(): MoodEntry[]
function saveEntry(entry: MoodEntry): void
function deleteEntry(id: string): void
function clearEntries(): void
```

---

## 11. 推荐项目结构

推荐文件结构：

```txt
MoodTune/
  AGENT.md
  01prompt.md
  README.md
  package.json
  index.html
  vite.config.ts
  tsconfig.json
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

如果为了简单减少组件数量，也可以，但必须保持代码清晰。

---

## 12. 页面文案

### 12.1 首页文案

主标题：

```txt
MoodTune
```

副标题：

```txt
情绪音乐日记
```

Slogan：

```txt
今天的情绪，适合什么声音？
```

说明文案：

```txt
用一分钟记录此刻的心情，让颜色、文字和音乐氛围为你保存今天。
```

按钮：

```txt
开始记录
查看历史
```

### 12.2 记录页文案

标题：

```txt
记录今天的情绪
```

说明：

```txt
不用写很多，只要留下几个线索。MoodTune 会把它们转化成一张属于今天的情绪音乐卡片。
```

字段：

```txt
今日心情
能量值
压力值
天气
今日关键词
一句话日记
```

提交按钮：

```txt
生成今日情绪卡片
```

### 12.3 结果页文案

标题：

```txt
今日情绪卡片
```

按钮：

```txt
保存记录
再记一次
查看历史
返回首页
```

### 12.4 历史页文案

标题：

```txt
情绪回声
```

说明：

```txt
这些记录像一组私人歌单，保存着你曾经经过的状态。
```

空状态：

```txt
还没有记录。先为今天生成一张情绪音乐卡片吧。
```

---

## 13. 交互流程

### 13.1 标准流程

1. 用户进入首页
2. 点击“开始记录”
3. 进入记录页
4. 选择心情、能量、压力、天气
5. 输入关键词和一句话日记
6. 点击“生成今日情绪卡片”
7. 进入结果页
8. 查看情绪卡片
9. 点击“保存记录”
10. 数据保存到 localStorage
11. 用户可进入历史页查看记录

### 13.2 数据校验

最低限度校验即可：

* 必须选择心情
* 必须选择天气
* note 可以为空
* keywords 可以为空
* energy 默认 5
* stress 默认 5

如果未选择必要信息，用温和提示展示，不要使用浏览器 alert。

---

## 14. 视觉细节建议

### 14.1 首页视觉

首页可使用一个大型玻璃卡片，卡片内放标题和按钮。
背景放 3 到 5 个模糊光斑。
右侧可放一个抽象唱片圆形元素。

唱片元素可以用 CSS 实现：

* 大圆
* 内圈
* 半透明边框
* 渐变阴影
* 中心小孔

不需要真实图片。

### 14.2 记录页视觉

记录页应像填写一张精致的私人卡片。
可以使用两栏布局：

* 左侧：表单
* 右侧：实时预览小卡片

如果实现成本较高，可以只做单栏表单，但表单必须美观。

### 14.3 结果页视觉

结果页是展示重点。

情绪卡片建议居中，宽度约 420px 到 560px。
卡片使用当前情绪对应的渐变背景。
卡片底部显示 MoodTune 字样。

### 14.4 历史页视觉

历史记录不要做成普通表格。
使用卡片网格。
每张卡片使用当日情绪渐变色作为顶部色带或背景光晕。

---

## 15. 代码质量要求

必须保证：

* TypeScript 类型清晰
* 不出现大量重复代码
* 样式命名清楚
* 组件职责清晰
* 不写无用复杂功能
* 不留下 console.log
* 不留下未使用变量
* 不出现明显报错
* `npm run build` 可以通过

---

## 16. 可访问性要求

最低限度实现：

* 按钮使用 button 元素
* input 和 textarea 有 label
* 颜色对比度尽量可读
* 不仅依赖颜色传递信息
* 手机端可正常点击

---

## 17. 开发步骤

请按以下步骤执行。

### Step 1：确认目录

先确认当前目录：

```bash
pwd
```

必须是：

```txt
/Users/youzhenzhen/Downloads/MoodTune
```

再查看目录内容：

```bash
ls -la
```

### Step 2：检查项目状态

检查是否存在：

* package.json
* src/
* index.html
* vite.config.ts
* tsconfig.json

如果已有项目结构，尽量在现有结构上开发。
如果目录为空或没有前端项目，直接在当前目录初始化项目，不要创建嵌套目录。

### Step 3：安装必要依赖

以最安全方式安装本地依赖。

如果没有 package.json，创建最小 package.json。
如果已有 package.json，先读取再决定是否补充依赖。

### Step 4：建立基础结构

创建或整理：

* types
* utils
* components
* styles

### Step 5：完成推荐规则

实现 recommendation.ts。

### Step 6：完成 localStorage

实现 storage.ts。

### Step 7：完成页面

依次实现：

1. LandingView
2. EntryView
3. ResultView
4. HistoryView

### Step 8：完成视觉样式

重点处理：

* 背景
* 卡片
* 按钮
* 情绪卡片
* 光斑
* 唱片元素
* 动效
* 响应式

### Step 9：自测

必须测试：

* 首次打开首页正常
* 进入记录页正常
* 生成情绪卡片正常
* 保存记录正常
* 历史页能看到记录
* 删除记录正常
* 清空记录正常
* 刷新页面后记录仍存在
* 手机端布局正常
* `npm run build` 通过

---

## 18. 验收标准

### 18.1 功能验收

* 可以完成一次完整情绪记录
* 可以生成情绪音乐卡片
* 可以保存到本地
* 可以查看历史
* 可以删除历史
* 可以清空历史
* 不调用任何外部 API

### 18.2 视觉验收

* 首页有明确视觉记忆点
* 情绪卡片适合截图展示
* 色彩不廉价
* 页面不像普通后台系统
* 移动端不崩坏
* 整体有艺术感和音乐氛围

### 18.3 工程验收

* 项目能正常安装依赖
* 项目能正常运行
* 项目能正常 build
* 没有明显 TypeScript 错误
* 没有明显布局错位
* 没有越界修改项目外文件

---

## 19. 非目标

不要实现以下功能：

* 登录注册
* 云端同步
* 音乐播放
* 真实音乐推荐
* 真实音乐搜索
* AI 生成日记
* AI 生成推荐
* 社交分享
* 评论系统
* 复杂图表
* 复杂日历
* 多语言系统

这些功能不属于本课程项目 MVP。

---

## 20. README 要求

项目完成后创建或更新 README.md，包含：

1. 项目名称
2. 项目简介
3. 目标用户
4. 设计理念
5. 核心功能
6. 情绪推荐规则
7. 技术栈
8. 本地运行方式
9. 后续可扩展方向

README 不需要很长，但要适合期末项目提交。

---

## 21. 最终提醒

MoodTune 的开发目标不是“功能很多”，而是“打开页面就好看，操作起来轻盈，结果卡片适合展示”。

最终成果应满足：

```txt
能运行。
能记录。
能生成卡片。
能保存历史。
页面有艺术审美。
不调用任何 API。
所有操作只发生在 /Users/youzhenzhen/Downloads/MoodTune。
```
