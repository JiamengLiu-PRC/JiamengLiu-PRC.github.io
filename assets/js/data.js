/*
  多页面个人学术主页数据文件
  主要编辑这里即可：个人信息、News、Publications、Software、Others。
*/
const siteData = {
  lang: "zh-CN",
  siteUrl: "https://username.github.io",       // 部署后改成真实地址，例如 https://jiamengliu-prc.github.io
  baseUrl: "",                                 // 用户主页仓库保持空；项目页可写成仓库名
  name: "Jiameng Liu",
  shortName: "Jiameng Liu",
  title: "Ph.D. Student / Researcher",
  affiliation: "Your University / Your Lab",
  location: "City, Country",
  email: "jiamengliu.prc@gmail.com",
  description: "Jiameng Liu 的个人学术主页，展示个人简介、研究动态、论文、软件和其他学术信息。",
  keywords: ["academic homepage", "research", "machine learning", "publications", "software"],
  profilePhoto: "assets/img/profile.svg",
  profilePhotoAlt: "Jiameng Liu 的照片",
  ogImage: "assets/img/og-default.svg",
  intro: "I am interested in building reliable, reproducible, and useful data-driven systems. My research focuses on machine learning, evaluation, and research software. 欢迎把这里改成 2–4 句最能代表你的研究简介。",
  interests: ["Machine Learning", "Reliable AI", "Graph Learning", "Research Software", "Reproducibility"],
  links: [
    { label: "Email", url: "mailto:jiamengliu.prc@gmail.com", primary: true },
    { label: "Google Scholar", url: "https://scholar.google.com/" },
    { label: "GitHub", url: "https://github.com/jiamengliu-prc" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" }
  ],
  profileMeta: [
    { label: "Affiliation", value: "Your University" },
    { label: "Research", value: "Reliable ML / Data Systems" },
    { label: "Status", value: "Open to collaboration" }
  ],
  about: [
    "我目前在 <strong>Your University</strong> 从事研究。我的研究兴趣包括 <strong>可靠机器学习</strong>、<strong>图学习</strong>、<strong>模型评估</strong> 与 <strong>可复现科研软件</strong>。",
    "这个多页面版本采用纯静态 HTML/CSS/JavaScript，可以直接部署到 GitHub Pages。你主要维护 <code>assets/js/data.js</code>，新增 publication 时复制 <code>templates/publication-template.html</code> 即可。",
    "建议把这里写成 2–3 段：第一段介绍身份和方向，第二段介绍研究问题，第三段介绍合作、招聘、开源或近期重点项目。"
  ],
  education: [
    { period: "2022–Present", title: "Ph.D. Student", place: "Your University", detail: "Advisor: Prof. Your Advisor" },
    { period: "2018–2022", title: "B.S. / M.S.", place: "Your Previous University", detail: "Major: Your Major" }
  ],
  news: [
    { date: "2026-05-12", text: "示例：一篇论文被会议接收。", url: "publications/2026-graph-robustness.html" },
    { date: "2026-04-01", text: "示例：发布开源软件 RobustBench-Graphs v1.0。", url: "https://github.com/jiamengliu-prc" },
    { date: "2026-02-17", text: "示例：获得奖学金、资助或学术服务邀请。" },
    { date: "2025-11-03", text: "示例：参加学术会议并做海报展示。" },
    { date: "2025-08-28", text: "示例：加入新的研究项目。" }
  ],
  publications: [
    {
      id: "liu-2026-graph-robustness",
      slug: "2026-graph-robustness",
      path: "publications/2026-graph-robustness.html",
      title: "Probabilistic Robustness Evaluation for Graph Representation Learning under Structural Perturbations",
      authors: [
        { name: "Jiameng Liu", url: "https://username.github.io" },
        { name: "Collaborator A" },
        { name: "Collaborator B" }
      ],
      venue: "Proceedings of the Example Conference on Data Mining",
      venueShort: "EXCONF 2026",
      venueType: "Conference",
      year: 2026,
      month: "08",
      pages: "1–14",
      publisher: "Example Publisher",
      selected: true,
      featured: true,
      status: "Accepted",
      summary: "提出一种面向图表示学习模型的概率鲁棒性评估框架，用于分析结构扰动下的性能退化与不确定性。",
      abstract: "图学习模型在真实部署中经常面对边缺失、伪边注入和局部结构破坏等扰动。本文提出一种概率鲁棒性评估框架，将扰动过程显式建模为结构随机变量，并通过分层估计同时输出模型性能、置信区间和鲁棒退化曲线。该示例摘要用于展示详情页样式；请替换为你的真实论文摘要。",
      doi: "",
      doiUrl: "",
      pdf: "#",
      project: "#",
      code: "https://github.com/jiamengliu-prc/example-project",
      data: "#",
      software: ["robustbench-graphs"],
      notes: ["这是示例条目，请替换为真实论文。", "新增论文详情页时，复制 templates/publication-template.html 并修改 data-publication-id。"],
      tags: ["Graph Learning", "Robustness", "Evaluation", "Uncertainty"],
      citation: "Jiameng Liu, Collaborator A, and Collaborator B. Probabilistic Robustness Evaluation for Graph Representation Learning under Structural Perturbations. In EXCONF 2026.",
      bibtex: `@inproceedings{liu2026graphrobustness,
  title     = {Probabilistic Robustness Evaluation for Graph Representation Learning under Structural Perturbations},
  author    = {Jiameng Liu and Collaborator A and Collaborator B},
  booktitle = {Proceedings of the Example Conference on Data Mining},
  year      = {2026}
}`
    },
    {
      id: "liu-2025-reproducible-benchmark",
      slug: "2025-reproducible-benchmarking",
      path: "publications/2025-reproducible-benchmarking.html",
      title: "Reproducible Benchmarking Pipelines for Multi-Modal Research Software",
      authors: [
        { name: "Jiameng Liu", url: "https://username.github.io" },
        { name: "Collaborator C" }
      ],
      venue: "Journal of Open Research Systems",
      venueShort: "JORS 2025",
      venueType: "Journal",
      year: 2025,
      month: "11",
      volume: "8",
      issue: "4",
      pages: "55–73",
      publisher: "Open Research Press",
      selected: true,
      featured: false,
      status: "Published",
      summary: "面向多模态研究软件提出可复现实验流水线，包括配置快照、环境声明、结果追踪和论文附录自动生成。",
      abstract: "研究软件的复现难点不仅来自模型本身，还来自环境依赖、数据版本、实验配置和结果整理过程的碎片化。本文总结并实现了一套轻量级基准流水线，把配置、环境、数据和图表导出整合为统一实践。该示例摘要用于展示详情页样式；请替换为你的真实论文摘要。",
      doi: "",
      doiUrl: "",
      pdf: "#",
      code: "https://github.com/jiamengliu-prc/research-pipeline",
      data: "#",
      software: ["research-pipeline"],
      notes: ["适合作为 software 栏目的关联论文示例。"],
      tags: ["Reproducibility", "Research Software", "Benchmarking"],
      citation: "Jiameng Liu and Collaborator C. Reproducible Benchmarking Pipelines for Multi-Modal Research Software. Journal of Open Research Systems, 8(4):55–73, 2025.",
      bibtex: `@article{liu2025reproducible,
  title   = {Reproducible Benchmarking Pipelines for Multi-Modal Research Software},
  author  = {Jiameng Liu and Collaborator C},
  journal = {Journal of Open Research Systems},
  volume  = {8},
  number  = {4},
  pages   = {55--73},
  year    = {2025}
}`
    },
    {
      id: "liu-2024-efficient-calibration",
      slug: "2024-efficient-calibration",
      path: "publications/2024-efficient-calibration.html",
      title: "Efficient Calibration of Scientific Classifiers with Sparse Label Budgets",
      authors: [
        { name: "Jiameng Liu", url: "https://username.github.io" },
        { name: "Collaborator D" },
        { name: "Collaborator E" }
      ],
      venue: "Workshop on Reliable and Responsible Machine Learning",
      venueShort: "RRML Workshop 2024",
      venueType: "Workshop",
      year: 2024,
      month: "12",
      pages: "1–9",
      selected: false,
      featured: false,
      status: "Published",
      summary: "在标注预算稀缺场景下，讨论科学分类器的高效校准策略，并给出小样本温度缩放与分层重加权方案。",
      abstract: "许多科学应用领域的模型需要输出可信概率，但高质量标签往往昂贵且稀缺。本文研究在极小标注预算下如何有效校准分类器置信度，提出结合温度缩放、分层重加权和不确定性先验的轻量流程。该示例摘要用于展示详情页样式；请替换为你的真实论文摘要。",
      pdf: "#",
      poster: "#",
      project: "#",
      software: ["calib-lite"],
      notes: ["可在详情页附 workshop poster、slides 或更长的实验笔记。"],
      tags: ["Calibration", "Scientific ML", "Small Data"],
      citation: "Jiameng Liu, Collaborator D, and Collaborator E. Efficient Calibration of Scientific Classifiers with Sparse Label Budgets. RRML Workshop 2024.",
      bibtex: `@inproceedings{liu2024calibration,
  title     = {Efficient Calibration of Scientific Classifiers with Sparse Label Budgets},
  author    = {Jiameng Liu and Collaborator D and Collaborator E},
  booktitle = {Workshop on Reliable and Responsible Machine Learning},
  year      = {2024}
}`
    }
  ],
  software: [
    {
      id: "robustbench-graphs",
      name: "RobustBench-Graphs",
      description: "图学习鲁棒性测试基准，集成扰动脚本、结果汇总与可视化导出。",
      tech: ["Python", "PyTorch", "Benchmarking"],
      links: [
        { label: "GitHub", url: "https://github.com/jiamengliu-prc" },
        { label: "Docs", url: "#" }
      ]
    },
    {
      id: "research-pipeline",
      name: "Research Pipeline",
      description: "面向研究项目的可复现实验模板，支持配置快照、结果落盘和论文图表导出。",
      tech: ["Python", "CLI", "Reproducibility"],
      links: [
        { label: "GitHub", url: "https://github.com/jiamengliu-prc" }
      ]
    },
    {
      id: "calib-lite",
      name: "Calib-Lite",
      description: "小样本概率校准工具箱，适合科研原型和教学演示。",
      tech: ["Python", "Calibration", "Statistics"],
      links: [
        { label: "GitHub", url: "https://github.com/jiamengliu-prc" }
      ]
    }
  ],
  others: [
    {
      title: "Teaching",
      description: "可放课程、助教、学生指导等信息。",
      items: ["Introduction to Machine Learning, Fall 2025", "Data Mining, Fall 2024"]
    },
    {
      title: "Service",
      description: "可放审稿、程序委员会、组织、志愿服务等。",
      items: ["Reviewer: NeurIPS / ICML / ICLR", "Program Committee: Example Workshop 2025"]
    },
    {
      title: "Awards & Talks",
      description: "可放奖项、邀请报告、访问经历等。",
      items: ["Outstanding Student Scholarship, 2025", "Invited Talk at Example Lab, 2024"]
    }
  ]
};
window.siteData = siteData;
