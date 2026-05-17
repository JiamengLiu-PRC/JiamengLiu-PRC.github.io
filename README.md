# GitHub Pages 个人学术主页模板：多页面版

这是一个无需构建工具、无需 Jekyll、无需 Node/npm 的纯静态个人学术主页模板。所有主要栏目已经拆成独立页面，避免单页过长。

## 页面结构

```text
.
├── index.html                  # 首页：简介 + 最新 News / Publications / Software 摘要
├── about.html                  # About 独立页
├── news.html                   # News 独立页
├── publications.html           # Publications 列表页
├── software.html               # Software 独立页
├── others.html                 # Others 独立页
├── contact.html                # Contact 独立页
├── 404.html
├── .nojekyll
├── assets/
│   ├── css/style.css
│   ├── js/data.js              # 主要编辑这里
│   ├── js/site.js              # 渲染与交互逻辑
│   ├── img/profile.svg
│   ├── img/favicon.svg
│   └── img/og-default.svg
├── publications/
│   ├── 2026-graph-robustness.html
│   ├── 2025-reproducible-benchmarking.html
│   └── 2024-efficient-calibration.html
└── templates/
    └── publication-template.html
```

## 已实现功能

- 多页面导航：Home / About / News / Publications / Software / Others / Contact。
- 首页不再放全部内容，只放摘要和入口。
- Publications 列表页支持筛选。
- 每篇论文都有独立详情页。
- 论文详情页支持摘要、作者、venue、引用格式、BibTeX、PDF/代码/数据链接、一键复制。
- 响应式设计、深色模式、移动端导航。
- SEO 基础：title、description、canonical、Open Graph、JSON-LD。

## 如何修改个人信息

打开：

```text
assets/js/data.js
```

重点修改：

```js
siteUrl: "https://username.github.io",
name: "Jiameng Liu",
title: "Ph.D. Student / Researcher",
affiliation: "Your University / Your Lab",
email: "jiamengliu.prc@gmail.com",
intro: "...",
interests: [...],
links: [...]
```

部署后请把 `siteUrl` 改成你的真实地址，例如：

```js
siteUrl: "https://jiamengliu-prc.github.io"
```

## 如何替换照片

把照片放到：

```text
assets/img/profile.jpg
```

然后在 `assets/js/data.js` 中修改：

```js
profilePhoto: "assets/img/profile.jpg",
profilePhotoAlt: "Jiameng Liu 的照片"
```

建议使用正方形头像，例如 800 × 800 像素。

## 如何新增论文

### 第一步：在 data.js 添加论文数据

在 `assets/js/data.js` 的 `publications` 数组中添加：

```js
{
  id: "liu-2026-new-paper",
  slug: "2026-new-paper",
  path: "publications/2026-new-paper.html",
  title: "Your Paper Title",
  authors: [{ name: "Jiameng Liu" }, { name: "Collaborator" }],
  venue: "Conference or Journal Name",
  venueShort: "CONF 2026",
  venueType: "Conference",
  year: 2026,
  summary: "列表页摘要",
  abstract: "详情页完整摘要",
  tags: ["Machine Learning", "Evaluation"],
  citation: "...",
  bibtex: `@inproceedings{...}`
}
```

### 第二步：创建论文详情页

复制：

```text
templates/publication-template.html
```

到：

```text
publications/2026-new-paper.html
```

然后修改新 HTML 文件中的：

```html
<body data-page="publications" data-publication-id="CHANGE-ME-PUBLICATION-ID">
```

把 `CHANGE-ME-PUBLICATION-ID` 改成 data.js 中的 `id`，例如：

```html
<body data-page="publications" data-publication-id="liu-2026-new-paper">
```

同时建议修改 `<title>` 和 `<meta name="description">`，这样每篇论文的浏览器标题和社交分享预览更准确。

## 如何部署

1. 解压 zip。
2. 把 `academic-githubio-multipage/` 里面的所有文件上传到你的 `username.github.io` 仓库根目录。
3. 修改 `assets/js/data.js`。
4. Commit 并 push。
5. 等待 GitHub Pages 自动发布。

## 本地预览

建议在解压后的目录运行：

```bash
python -m http.server 8000
```

然后打开：

```text
http://localhost:8000
```

不要直接双击 HTML 文件预览，因为绝对路径、浏览器安全策略和模块加载可能导致表现和 GitHub Pages 不一致。
