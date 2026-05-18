/*
  Multipage academic homepage data file.
  Edit this file for your personal information, news, publications, software, and other academic content.
*/
const siteData = {
  lang: "en-US",
  siteUrl: "https://jiamengliu-prc.github.io",       // Change this to your live URL, e.g. https://jiamengliu-prc.github.io
  baseUrl: "",                                 // Keep empty for a user homepage; use the repository name for a project site.
  name: "Jiameng Liu",
  shortName: "Jiameng Liu",
  title: "PostDoc Researcher",
  affiliation: "UNC at Chapel Hill",
  location: "Chapel Hill, US",
  email: "jiamengliu.prc@gmail.com",
  description: "Jiameng Liu's academic homepage",
  keywords: ["Medical Image Analysis", "Structural MRI", "Brain Structure Delineation"],
  profilePhoto: "assets/img/persona.jpg",
  profilePhotoAlt: "Jiameng",
  ogImage: "assets/img/og-default.svg",
  intro: "I am interested in building reliable, reproducible, and universal algorithms for accurate brain sturcture delineation from MRI data.",
  interests: ["Medical Image Analysis", "Structural MRI", "Brain Structure Delineation"],
  links: [
    { label: "Email", url: "mailto:jiamengliu.prc@gmail.com", primary: true },
    { label: "Google Scholar", url: "https://scholar.google.com/citations?user=sEX4njEAAAAJ&hl=en" },
    { label: "GitHub", url: "https://github.com/SaberPRC" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/jiameng-liu-b1652b2a6/" }
  ],
  profileMeta: [
    { label: "Affiliation", value: "University of North Carolina at Chapel Hill" },
  ],
  about: [
    "I am currently a PostDoc researcher at <strong>UNC at Chapel Hill</strong>. My research interests include <strong>Medical Image Analysis</strong>, <strong>Structural MRI Processing</strong>, and <strong>Brain Sturctural Delineation</strong>.",

    "Previously my research focuses on brain extraction, tissue segmentation, regional parcellation, and surface parcellation across the lifespan via structural MRI (<strong>sMRI</strong>) data"
  ],
  education: [
    { period: "2025–Present", title: "UNC at Chapel Hill", detail: "PostDoc Researcher" },
    { period: "2023–2024", title: "Imperial College London", detail: "Visiting Scholar" },
    { period: "2019–2025", title: "ShanghaiTech University", detail: "Ph.D. Computer Science and Technology" },
    { period: "2015–2019", title: "Hefei University of Technology", detail: "B.S. Electronic and Information Engineering"}
  ],
  news: [
    { date: "2026-04-17", text: "One co-first author paper accepted bt MIA", url: "https://www.sciencedirect.com/science/article/abs/pii/S1361841526001593" },
    { date: "2026-03-11", text: "One first author paper accepted by Nature Computational Science", url: "https://www.nature.com/articles/s43588-026-00963-5" },
    { date: "2026-02-25", text: "One paper acceped by Psychiatry and Clinical Neurosciences", url: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sEX4njEAAAAJ&sortby=pubdate&citation_for_view=sEX4njEAAAAJ:qxL8FJ1GzNcC"},
    { date: "2026-02-12", text: "One first author abstract paper acceped by OHBM", url: "https://www.researchgate.net/publication/400734810_Preterm_Birth_Associated_Structure_Alterations_in_Cerebellum_Lobules_in_Children"},
  ],

  publications: [
    {
      id: "liu-2026-UniSurf",
      slug: "2026-UniSurf",
      path: "publications/2026-graph-robustness.html",
      title: "UniSurf: Universal lifespan cortical surface reconstruction",
      authors: [
        { name: "Zifeng Lian"},
        { name: "Jiameng Liu", url: "https://username.github.io"  },
        { name: "..." },
        { name: "Dinggang Shen" }
      ],
      venue: "Medical Image Analysis",
      venueShort: "MIA 2026",
      venueType: "Journal",
      year: 2026,
      month: "08",
      pages: "1–14",
      selected: true,
      featured: true,
      status: "Accepted",
      summary: "A probabilistic evaluation framework for graph representation learning under structural perturbations.",
      abstract: "Graph learning models often face edge deletion, spurious edge injection, and local structural corruption in real-world deployments. This example paper proposes a probabilistic robustness evaluation framework that explicitly models structural perturbations as random variables and reports performance, confidence intervals, and robustness degradation curves. Replace this example abstract with the abstract of your real paper.",
      doi: "",
      doiUrl: "",
      pdf: "#",
      project: "#",
      code: "https://github.com/jiamengliu-prc/example-project",
      data: "#",
      software: ["robustbench-graphs"],
      notes: ["This is an example entry. Replace it with your actual paper.", "To add a new paper detail page, copy templates/publication-template.html and update data-publication-id."],
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
      summary: "A reproducible benchmarking workflow for multimodal research software, including configuration snapshots, environment records, result tracking, and paper-ready exports.",
      abstract: "Reproducing research software is difficult not only because of model complexity, but also because of fragmented environments, data versions, experiment configurations, and result reporting. This example paper presents a lightweight benchmarking pipeline that integrates configuration tracking, environment capture, dataset versioning, and figure export. Replace this example abstract with the abstract of your real paper.",
      doi: "",
      doiUrl: "",
      pdf: "#",
      code: "https://github.com/jiamengliu-prc/research-pipeline",
      data: "#",
      software: ["research-pipeline"],
      notes: ["This example shows how a software project can be linked to a publication."],
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
      summary: "Efficient calibration strategies for scientific classifiers when labeled data are expensive and scarce.",
      abstract: "Many scientific applications require classifiers that output trustworthy probabilities, yet high-quality labels are often expensive and sparse. This example paper studies calibration under extremely small label budgets and proposes a lightweight workflow combining temperature scaling, stratified reweighting, and uncertainty priors. Replace this example abstract with the abstract of your real paper.",
      pdf: "#",
      poster: "#",
      project: "#",
      software: ["calib-lite"],
      notes: ["You can attach a workshop poster, slides, or extended experiment notes on this detail page."],
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
      description: "A robustness benchmarking toolkit for graph learning, with perturbation scripts, result aggregation, and visualization exports.",
      tech: ["Python", "PyTorch", "Benchmarking"],
      links: [
        { label: "GitHub", url: "https://github.com/jiamengliu-prc" },
        { label: "Docs", url: "#" }
      ]
    },
    {
      id: "research-pipeline",
      name: "Research Pipeline",
      description: "A reproducible experiment template for research projects, supporting configuration snapshots, result logging, and publication-ready figure export.",
      tech: ["Python", "CLI", "Reproducibility"],
      links: [
        { label: "GitHub", url: "https://github.com/jiamengliu-prc" }
      ]
    },
    {
      id: "calib-lite",
      name: "Calib-Lite",
      description: "A small-sample probability calibration toolkit for research prototypes and teaching demonstrations.",
      tech: ["Python", "Calibration", "Statistics"],
      links: [
        { label: "GitHub", url: "https://github.com/jiamengliu-prc" }
      ]
    }
  ],
  others: [
    {
      title: "Teaching",
      description: "Courses, teaching assistantships, mentoring, and student supervision.",
      items: ["Introduction to Machine Learning, Fall 2025", "Data Mining, Fall 2024"]
    },
    {
      title: "Service",
      description: "Reviewing, program committees, workshop organization, and community service.",
      items: ["Reviewer: NeurIPS / ICML / ICLR", "Program Committee: Example Workshop 2025"]
    },
    {
      title: "Awards & Talks",
      description: "Awards, invited talks, scholarships, grants, and academic visits.",
      items: ["Outstanding Student Scholarship, 2025", "Invited Talk at Example Lab, 2024"]
    }
  ]
};
window.siteData = siteData;
