(function () {
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));
  const state = { pubFilter: "全部" };

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getBasePrefix() {
    const raw = window.siteData?.baseUrl || "";
    return raw ? `/${raw.replace(/^\/+|\/+$/g, "")}` : "";
  }

  function withBase(path) {
    if (!path) return "#";
    if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
    const cleaned = String(path).replace(/^\/+/, "");
    return `${getBasePrefix()}/${cleaned}`;
  }

  function absoluteUrl(path) {
    if (!path) return siteData.siteUrl || window.location.origin;
    if (/^https?:/.test(path)) return path;
    const base = (siteData.siteUrl || window.location.origin).replace(/\/$/, "");
    return `${base}${withBase(path)}`;
  }

  function setText(selector, value) {
    const node = $(selector);
    if (node) node.textContent = value ?? "";
  }

  function setHTML(selector, value) {
    const node = $(selector);
    if (node) node.innerHTML = value ?? "";
  }

  function setMeta(name, content) {
    const node = document.querySelector(`meta[name="${name}"]`);
    if (node && content) node.setAttribute("content", content);
  }

  function setPropertyMeta(property, content) {
    const node = document.querySelector(`meta[property="${property}"]`);
    if (node && content) node.setAttribute("content", content);
  }

  function setCanonical(path) {
    const node = document.querySelector('link[rel="canonical"]');
    if (node) node.setAttribute("href", absoluteUrl(path));
  }

  function shouldOpenNewTab(url) {
    return /^https?:/.test(url) && !url.includes(window.location.hostname);
  }

  function createAnchor(link, className = "button secondary") {
    const a = document.createElement("a");
    a.className = className;
    a.href = withBase(link.url || "#");
    a.textContent = link.label || "链接";
    if (shouldOpenNewTab(a.href)) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    return a;
  }

  function formatIsoDate(value) {
    if (!value) return "";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat(siteData.lang || "zh-CN", { year: "numeric", month: "short", day: "numeric" }).format(date);
  }

  function getAuthorString(pub) {
    return (pub.authors || []).map((author) => author.name).join(", ");
  }

  function applyCommonMeta(pagePath, pageTitle, description) {
    const title = pageTitle ? `${pageTitle} | ${siteData.name}` : `${siteData.name} | Academic Homepage`;
    document.title = title;
    setMeta("description", description || siteData.description || siteData.intro);
    setMeta("keywords", (siteData.keywords || []).join(", "));
    setMeta("author", siteData.name);
    setPropertyMeta("og:title", title);
    setPropertyMeta("og:description", description || siteData.description || siteData.intro);
    setPropertyMeta("og:url", absoluteUrl(pagePath || "/"));
    setPropertyMeta("og:image", absoluteUrl(siteData.ogImage || siteData.profilePhoto));
    setCanonical(pagePath || "/");
  }

  function setupNavigation() {
    const navToggle = $("#nav-toggle");
    const navLinks = $("#nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(open));
      });
      $$(".nav-links a").forEach((link) => link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }));
    }

    const page = document.body.dataset.page || "home";
    $$(`.nav-links a[data-nav]`).forEach((link) => {
      if (link.dataset.nav === page) link.setAttribute("aria-current", "page");
    });
  }

  function setupTheme() {
    const root = document.documentElement;
    const button = $("#theme-toggle");
    const saved = localStorage.getItem("theme");
    if (saved === "dark") root.dataset.theme = "dark";
    if (button) {
      button.addEventListener("click", () => {
        const isDark = root.dataset.theme === "dark";
        root.dataset.theme = isDark ? "" : "dark";
        localStorage.setItem("theme", isDark ? "light" : "dark");
      });
    }
  }

  function renderProfileBits() {
    setText("#nav-name", siteData.shortName || siteData.name);
    setText("#hero-name", siteData.name);
    setText("#hero-title", siteData.title);
    setText("#hero-affiliation", siteData.affiliation);
    setText("#hero-bio", siteData.intro);
    const photo = $("#profile-photo");
    if (photo) {
      photo.src = withBase(siteData.profilePhoto);
      photo.alt = siteData.profilePhotoAlt || `${siteData.name} 的照片`;
    }
    setHTML("#interest-list", (siteData.interests || []).map((item) => `<li class="chip">${escapeHtml(item)}</li>`).join(""));

    const heroButtons = $("#hero-buttons");
    if (heroButtons) {
      heroButtons.innerHTML = "";
      (siteData.links || []).forEach((link) => heroButtons.appendChild(createAnchor(link, link.primary ? "button primary" : "button secondary")));
    }

    const profileMeta = $("#profile-meta");
    if (profileMeta) {
      const rows = [
        { label: "Location", value: siteData.location },
        { label: "Email", value: siteData.email },
        ...(siteData.profileMeta || [])
      ];
      profileMeta.innerHTML = rows.map((item) => `
        <div class="meta-row"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong></div>
      `).join("");
    }
  }

  function renderFooter() {
    setText("#footer-text", `© ${new Date().getFullYear()} ${siteData.name} · Hosted on GitHub Pages`);
  }

  function renderNewsList(limit) {
    const container = $("#news-list");
    if (!container) return;
    const items = [...(siteData.news || [])].slice(0, limit || siteData.news.length);
    container.innerHTML = items.map((item) => {
      const body = item.url ? `<a href="${withBase(item.url)}">${escapeHtml(item.text)}</a>` : escapeHtml(item.text);
      return `<li><time datetime="${escapeHtml(item.date)}">${escapeHtml(formatIsoDate(item.date))}</time><div>${body}</div></li>`;
    }).join("");
  }

  function renderPublicationFilters() {
    const container = $("#publication-filters");
    if (!container) return;
    const types = ["全部", "精选", ...new Set((siteData.publications || []).map((item) => item.venueType).filter(Boolean))];
    container.innerHTML = "";
    types.forEach((type) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `pill-toggle ${state.pubFilter === type ? "is-active" : ""}`;
      button.textContent = type;
      button.setAttribute("aria-pressed", String(state.pubFilter === type));
      button.addEventListener("click", () => {
        state.pubFilter = type;
        renderPublicationFilters();
        renderPublicationList();
      });
      container.appendChild(button);
    });
  }

  function visiblePublications(limit) {
    let pubs = [...(siteData.publications || [])].sort((a, b) => b.year - a.year || String(b.month || "").localeCompare(String(a.month || "")));
    if (state.pubFilter === "精选") pubs = pubs.filter((item) => item.selected || item.featured);
    else if (state.pubFilter !== "全部") pubs = pubs.filter((item) => item.venueType === state.pubFilter);
    return limit ? pubs.slice(0, limit) : pubs;
  }

  function publicationCard(pub, compact = false) {
    const article = document.createElement("article");
    article.className = `pub-card surface-card ${pub.featured ? "is-featured" : ""}`;
    const actionLinks = [{ label: "详情", url: pub.path || `publications/${pub.slug}.html` }];
    if (pub.pdf) actionLinks.push({ label: "PDF", url: pub.pdf });
    if (pub.code) actionLinks.push({ label: "代码", url: pub.code });
    if (!compact && pub.data) actionLinks.push({ label: "数据", url: pub.data });
    article.innerHTML = `
      <div class="pub-meta-line">
        <div class="chip-row">
          <span class="chip chip-accent">${escapeHtml(pub.venueType || "Publication")}</span>
          ${pub.selected ? '<span class="chip chip-soft">Selected</span>' : ''}
          ${pub.status ? `<span class="chip chip-soft">${escapeHtml(pub.status)}</span>` : ''}
        </div>
        <span class="pub-year">${escapeHtml(pub.year)}</span>
      </div>
      <h3 class="pub-title"><a href="${withBase(pub.path || `publications/${pub.slug}.html`)}">${escapeHtml(pub.title)}</a></h3>
      <p class="pub-authors">${escapeHtml(getAuthorString(pub))}</p>
      <p class="pub-venue">${escapeHtml(pub.venueShort || pub.venue)}</p>
      <p class="pub-summary">${escapeHtml(pub.summary || "")}</p>
      ${compact ? "" : `<ul class="chip-row">${(pub.tags || []).map((tag) => `<li class="chip">${escapeHtml(tag)}</li>`).join("")}</ul>`}
      <div class="action-row"></div>
    `;
    const row = article.querySelector(".action-row");
    actionLinks.forEach((link, index) => row.appendChild(createAnchor(link, index === 0 ? "button secondary button-small" : "button ghost button-small")));
    return article;
  }

  function renderPublicationList(limit, compact = false) {
    const container = $("#publication-list");
    if (!container) return;
    container.innerHTML = "";
    visiblePublications(limit).forEach((pub) => container.appendChild(publicationCard(pub, compact)));
  }

  function renderSoftware(limit) {
    const container = $("#software-list");
    if (!container) return;
    const items = [...(siteData.software || [])].slice(0, limit || siteData.software.length);
    container.innerHTML = "";
    items.forEach((item) => {
      const article = document.createElement("article");
      article.className = "surface-card info-card";
      article.innerHTML = `
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <ul class="chip-row">${(item.tech || []).map((tech) => `<li class="chip">${escapeHtml(tech)}</li>`).join("")}</ul>
        <div class="action-row"></div>
      `;
      const actions = article.querySelector(".action-row");
      (item.links || []).forEach((link) => actions.appendChild(createAnchor(link, "button ghost button-small")));
      container.appendChild(article);
    });
  }

  function renderOthers() {
    const container = $("#others-list");
    if (!container) return;
    container.innerHTML = "";
    (siteData.others || []).forEach((item) => {
      const article = document.createElement("article");
      article.className = "surface-card info-card";
      article.innerHTML = `
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <ul class="plain-list">${(item.items || []).map((entry) => `<li>${escapeHtml(entry)}</li>`).join("")}</ul>
      `;
      container.appendChild(article);
    });
  }

  function renderAboutPage() {
    setHTML("#about-content", (siteData.about || []).map((paragraph) => `<p>${paragraph}</p>`).join(""));
    const education = $("#education-list");
    if (education) {
      education.innerHTML = (siteData.education || []).map((item) => `
        <li><time>${escapeHtml(item.period)}</time><div><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.place)}</span><p>${escapeHtml(item.detail || "")}</p></div></li>
      `).join("");
    }
  }

  function renderContactPage() {
    setText("#contact-email", siteData.email);
    setText("#contact-text", `欢迎就合作、交流、学生申请或学术讨论写信至 ${siteData.email}。`);
    const box = $("#contact-links");
    if (box) {
      box.innerHTML = "";
      (siteData.links || []).forEach((link) => box.appendChild(createAnchor(link, link.primary ? "button primary" : "button secondary")));
    }
  }

  function renderHomeJsonLd() {
    const script = $("#page-jsonld");
    if (!script) return;
    const payload = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: siteData.name,
      url: siteData.siteUrl,
      image: absoluteUrl(siteData.profilePhoto),
      email: `mailto:${siteData.email}`,
      jobTitle: siteData.title,
      affiliation: { "@type": "Organization", name: siteData.affiliation },
      knowsAbout: siteData.interests,
      sameAs: (siteData.links || []).map((item) => item.url).filter((url) => /^https?:/.test(url))
    };
    script.textContent = JSON.stringify(payload, null, 2);
  }

  function createCopyButton(text, label = "复制") {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button ghost button-small";
    button.textContent = label;
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "已复制";
        setTimeout(() => (button.textContent = label), 1200);
      } catch (error) {
        window.prompt("请手动复制以下内容：", text);
      }
    });
    return button;
  }

  function renderPublicationDetail() {
    const pubId = document.body.dataset.publicationId;
    if (!pubId) return;
    const pub = (siteData.publications || []).find((item) => item.id === pubId || item.slug === pubId);
    const detail = $("#publication-detail");
    const sidebar = $("#publication-sidebar");
    if (!pub || !detail) {
      if (detail) detail.innerHTML = `<article class="surface-card detail-block"><h1>未找到论文条目</h1><p>请检查 data-publication-id 是否和 assets/js/data.js 中的 publication id 一致。</p><p><a href="${withBase('publications.html')}">返回论文列表</a></p></article>`;
      return;
    }

    const pageTitle = `${pub.title} | Publications`;
    applyCommonMeta(pub.path, pageTitle, pub.summary || pub.abstract || siteData.description);
    setPropertyMeta("og:type", "article");

    const jsonLd = $("#page-jsonld");
    if (jsonLd) {
      jsonLd.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        headline: pub.title,
        name: pub.title,
        description: pub.summary || pub.abstract,
        abstract: pub.abstract,
        author: (pub.authors || []).map((author) => ({ "@type": "Person", name: author.name, url: author.url })),
        datePublished: `${pub.year}${pub.month ? `-${pub.month}` : ""}`,
        url: absoluteUrl(pub.path),
        isPartOf: pub.venue ? { "@type": pub.venueType === "Journal" ? "Periodical" : "CreativeWorkSeries", name: pub.venue } : undefined,
        keywords: (pub.tags || []).join(", "),
        identifier: pub.doi ? { "@type": "PropertyValue", propertyID: "DOI", value: pub.doi } : undefined
      }, null, 2);
    }

    detail.innerHTML = `
      <nav class="breadcrumb" aria-label="面包屑导航"><a href="${withBase('publications.html')}">Publications</a><span aria-hidden="true">/</span><span>${escapeHtml(pub.year)}</span></nav>
      <header class="article-header">
        <div class="chip-row top-gap-small">
          <span class="chip chip-accent">${escapeHtml(pub.venueType || "Publication")}</span>
          ${pub.status ? `<span class="chip chip-soft">${escapeHtml(pub.status)}</span>` : ""}
          ${pub.selected ? '<span class="chip chip-soft">Selected</span>' : ""}
        </div>
        <h1 id="pub-title">${escapeHtml(pub.title)}</h1>
        <p class="lead-tight">${escapeHtml(getAuthorString(pub))}</p>
        <p class="meta-inline">${escapeHtml(pub.venue)} · ${escapeHtml(pub.month ? `${pub.year}.${pub.month}` : pub.year)}${pub.pages ? ` · pp. ${escapeHtml(pub.pages)}` : ""}</p>
      </header>
      <div class="action-row detail-action-row" id="detail-actions"></div>
      <section class="surface-card detail-block"><h2>摘要</h2><p>${escapeHtml(pub.abstract || pub.summary || "")}</p></section>
      <section class="surface-card detail-block" id="citation-block"><div class="section-row"><h2>引用格式</h2></div><pre class="code-block">${escapeHtml(pub.citation || "")}</pre></section>
      ${pub.bibtex ? `<section class="surface-card detail-block" id="bibtex-block"><div class="section-row"><h2>BibTeX</h2></div><pre class="code-block">${escapeHtml(pub.bibtex)}</pre></section>` : ""}
      <section class="surface-card detail-block"><h2>补充信息</h2>${pub.notes?.length ? `<ul class="plain-list">${pub.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}</ul>` : "<p>暂无补充信息。</p>"}<ul class="chip-row top-gap">${(pub.tags || []).map((tag) => `<li class="chip">${escapeHtml(tag)}</li>`).join("")}</ul></section>
    `;

    const actions = $("#detail-actions");
    [
      pub.pdf ? { label: "PDF", url: pub.pdf } : null,
      pub.doiUrl || pub.doi ? { label: "DOI", url: pub.doiUrl || `https://doi.org/${pub.doi}` } : null,
      pub.code ? { label: "代码", url: pub.code } : null,
      pub.data ? { label: "数据", url: pub.data } : null,
      pub.project ? { label: "项目", url: pub.project } : null,
      pub.poster ? { label: "Poster", url: pub.poster } : null,
      pub.slides ? { label: "Slides", url: pub.slides } : null
    ].filter(Boolean).forEach((link, index) => actions.appendChild(createAnchor(link, index === 0 ? "button primary button-small" : "button ghost button-small")));

    const citationHeader = $("#citation-block .section-row");
    if (citationHeader) citationHeader.appendChild(createCopyButton(pub.citation || "", "复制引用"));
    const bibHeader = $("#bibtex-block .section-row");
    if (bibHeader) bibHeader.appendChild(createCopyButton(pub.bibtex || "", "复制 BibTeX"));

    if (sidebar) {
      sidebar.innerHTML = `
        <div class="surface-card sidebar-card sticky-card">
          <h2>论文信息</h2>
          <dl class="meta-list">
            <div><dt>年份</dt><dd>${escapeHtml(pub.year)}</dd></div>
            <div><dt>类型</dt><dd>${escapeHtml(pub.venueType || "Publication")}</dd></div>
            <div><dt>Venue</dt><dd>${escapeHtml(pub.venueShort || pub.venue)}</dd></div>
            ${pub.doi ? `<div><dt>DOI</dt><dd>${escapeHtml(pub.doi)}</dd></div>` : ""}
            ${pub.pages ? `<div><dt>页码</dt><dd>${escapeHtml(pub.pages)}</dd></div>` : ""}
          </dl>
          <div class="stack-actions"><a class="button secondary button-small button-block" href="${withBase('publications.html')}">返回论文列表</a></div>
        </div>`;
    }
  }

  function renderCurrentPage() {
    const page = document.body.dataset.page || "home";
    const pageTitles = {
      home: ["", siteData.description],
      about: ["About", "个人简介、研究方向和教育经历。"],
      news: ["News", "近期研究动态、论文消息和学术活动。"],
      publications: ["Publications", "论文列表与研究成果。"],
      software: ["Software", "开源软件、研究工具和代码项目。"],
      others: ["Others", "教学、服务、报告、获奖等其他学术信息。"],
      contact: ["Contact", "联系方式与学术交流入口。"]
    };
    if (!document.body.dataset.publicationId) {
      const path = page === "home" ? "/" : `${page}.html`;
      applyCommonMeta(path, ...(pageTitles[page] || [page, siteData.description]));
    }

    renderProfileBits();
    renderFooter();
    renderHomeJsonLd();

    if (page === "home") {
      renderNewsList(3);
      renderPublicationList(2, true);
      renderSoftware(2);
    }
    if (page === "about") renderAboutPage();
    if (page === "news") renderNewsList();
    if (page === "publications") { renderPublicationFilters(); renderPublicationList(); }
    if (page === "software") renderSoftware();
    if (page === "others") renderOthers();
    if (page === "contact") renderContactPage();
    renderPublicationDetail();
  }

  function init() {
    if (!window.siteData) return;
    setupNavigation();
    setupTheme();
    renderCurrentPage();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
