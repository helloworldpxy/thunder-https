# Thunder-HTTPS v2.0

[English](#english) | [中文](#中文)

---

<a name="中文"></a>

## 项目简介

专业的下载链接转换工具，支持多种协议的解码和转换。基于 Electron + Vue 3 构建，提供优雅的现代化界面和高效稳定的转换服务。

## 核心功能

### 多协议支持
- **迅雷** (`thunder://`) - Base64 + AA/ZZ 包裹
- **QQ旋风** (`qqdl://`) - Base64 编码
- **快车** (`flashget://`) - Base64 + [FLASHGET] 标记
- **电驴** (`ed2k://`) - 标准协议字段解析
- **磁力链接** (`magnet:?xt=`) - URI 参数解析

### 智能链接识别
- 自动检测输入中的所有链接
- 智能识别协议类型
- 自动修复常见问题（如 Base64 padding 不足、缺少协议前缀等）

### 用户体验
- 转换结果自动复制到剪贴板
- 浏览器直接打开验证链接
- 批量保存转换结果
- 中英文双语支持

## 下载安装

### 安装版（推荐）
1. 下载 `Thunder HTTPS Setup 2.0.0.exe`
2. 双击运行安装程序
3. 按提示完成安装，桌面会自动创建快捷方式

### 便携版
1. 下载 `Thunder HTTPS` 压缩包
2. 解压到任意目录
3. 双击 `Thunder HTTPS.exe` 即可运行

> 便携版无需安装，解压即用。请确保文件夹内所有文件保持完整。

## 使用教程

1. 复制下载链接（支持任意协议）
2. 粘贴到输入框（支持 Ctrl+V）
3. 点击"转换链接"按钮
4. 操作转换结果：
   - 点击"复制链接"保存到剪贴板
   - 点击"打开链接"用浏览器验证
   - 点击"保存结果"导出到文件

## 开发指南

### 环境要求
- Node.js 18+
- npm 或 yarn
- Git

### 获取源码
```bash
git clone https://github.com/helloworldpxy/thunder-https.git
cd thunder-https
```

### 开发运行
```bash
# 安装依赖（node_modules 不在仓库中，需要手动安装）
npm install

# 启动开发服务器
npm run dev
```

> 注意：node_modules 和 dist 目录已在 .gitignore 中排除，不会提交到 GitHub。

### 打包构建
```bash
# 构建 Windows 版本
npm run electron:build:win

# 生成安装包和便携版
node set-icon.js
```

## 项目结构

```
thunder-https/
├── src/
│   ├── main/              # Electron 主进程
│   │   ├── index.js       # 主进程入口
│   │   └── ipc.js         # IPC 通信
│   ├── preload/           # 预加载脚本
│   │   └── index.js
│   ├── renderer/          # Vue 前端源码
│   │   ├── components/    # UI 组件
│   │   ├── composables/   # 组合式函数
│   │   ├── i18n/          # 国际化
│   │   └── styles/        # 样式
│   └── core/              # 核心转换引擎
│       ├── protocols/     # 各协议解码器
│       └── utils/         # 工具函数
├── build/                 # 构建资源（图标等）
├── dist/                  # 构建输出
├── installer.nsi          # NSIS 安装脚本
├── package.json
├── electron-builder.yml
└── set-icon.js            # 图标设置脚本
```

## 技术栈

| 技术 | 说明 |
|------|------|
| Vue 3 | 前端框架 |
| Electron 33+ | 桌面应用框架 |
| Vite | 构建工具 |
| vue-i18n | 国际化方案 |
| electron-builder | 应用打包 |
| rcedit | 图标设置 |
| NSIS | 安装程序打包 |

## 版权声明

**本项目采用 PolyForm Noncommercial License 许可证。**

**未经作者书面授权，禁止将本项目用于任何比赛、竞赛、黑客松等竞技活动。**

Copyright (c) 2025 HelloWorld05. All rights reserved.

## 联系方式

- 开发者: HelloWorld05
- 开发者主页: https://github.com/helloworldpxy
- 项目主页: https://github.com/helloworldpxy/thunder-https

## 许可证

本项目采用 [PolyForm Noncommercial License 1.0.0](LICENSE) 许可证。

---

<a name="english"></a>

# Thunder-HTTPS v2.0

## Introduction

A professional download link conversion tool that supports decoding and conversion of multiple protocols. Built with Electron + Vue 3, it provides an elegant modern interface and efficient, stable conversion services.

## Core Features

### Multi-Protocol Support
- **Thunder** (`thunder://`) - Base64 + AA/ZZ wrapping
- **QQ旋风** (`qqdl://`) - Base64 encoding
- **FlashGet** (`flashget://`) - Base64 + [FLASHGET] markers
- **eDonkey** (`ed2k://`) - Standard protocol field parsing
- **Magnet** (`magnet:?xt=`) - URI parameter parsing

### Smart Link Recognition
- Automatically detect all links in input
- Intelligently identify protocol types
- Auto-fix common issues (e.g., insufficient Base64 padding, missing protocol prefix)

### User Experience
- Auto-copy converted results to clipboard
- Open verification links directly in browser
- Batch save conversion results
- Chinese/English bilingual support

## Download & Install

### Installer (Recommended)
1. Download `Thunder HTTPS Setup 2.0.0.exe`
2. Double-click to run the installer
3. Follow the prompts to complete installation

### Portable Version
1. Download the `Thunder HTTPS` archive
2. Extract to any directory
3. Double-click `Thunder HTTPS.exe` to run

> Portable version requires no installation. Keep all files in the folder intact.

## Usage Guide

1. Copy download link (supports any protocol)
2. Paste into input box (supports Ctrl+V)
3. Click "Convert Links" button
4. Handle conversion results:
   - Click "Copy Links" to save to clipboard
   - Click "Open Links" to verify in browser
   - Click "Save Results" to export to file

## Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Get Source Code
```bash
git clone https://github.com/helloworldpxy/thunder-https.git
cd thunder-https
```

### Run in Development
```bash
# Install dependencies (node_modules is not in repo, install manually)
npm install

# Start dev server
npm run dev
```

> Note: node_modules and dist directories are excluded via .gitignore and not included in the repository.

### Build
```bash
# Build for Windows
npm run electron:build:win

# Generate installer and portable version
node set-icon.js
```

## Project Structure

```
thunder-https/
├── src/
│   ├── main/              # Electron main process
│   │   ├── index.js       # Main entry
│   │   └── ipc.js         # IPC communication
│   ├── preload/           # Preload scripts
│   │   └── index.js
│   ├── renderer/          # Vue frontend source
│   │   ├── components/    # UI components
│   │   ├── composables/   # Composable functions
│   │   ├── i18n/          # Internationalization
│   │   └── styles/        # Styles
│   └── core/              # Core conversion engine
│       ├── protocols/     # Protocol decoders
│       └── utils/         # Utilities
├── build/                 # Build resources (icons)
├── dist/                  # Build output
├── installer.nsi          # NSIS installer script
├── package.json
├── electron-builder.yml
└── set-icon.js            # Icon setup script
```

## Tech Stack

| Technology | Description |
|------------|-------------|
| Vue 3 | Frontend framework |
| Electron 33+ | Desktop app framework |
| Vite | Build tool |
| vue-i18n | Internationalization |
| electron-builder | App packaging |
| rcedit | Icon setup |
| NSIS | Installer packaging |

## Copyright Notice

**This project uses the PolyForm Noncommercial License.**

**Unauthorized use in any competition, contest, or hackathon is prohibited without written authorization from the author.**

Copyright (c) 2025 HelloWorld05. All rights reserved.

## Contact

- Developer: HelloWorld05
- Developer Homepage: https://github.com/helloworldpxy
- Project Homepage: https://github.com/helloworldpxy/thunder-https

## License

This project is licensed under the [PolyForm Noncommercial License 1.0.0](LICENSE).
