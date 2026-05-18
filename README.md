# GitHub Pages Academic Homepage Template: Multipage Version

This is a pure static academic homepage template. It requires no build tool, no Jekyll, and no Node/npm. All major sections are split into separate pages, so the homepage stays concise.

## Page Structure

```text
.
├── index.html                  # Homepage: profile + latest News / Publications / Software highlights
├── about.html                  # About page
├── news.html                   # News page
├── publications.html           # Publications list page
├── software.html               # Software page
├── others.html                 # Others page
├── contact.html                # Contact page
├── 404.html
├── .nojekyll
├── assets/
│   ├── css/style.css
│   ├── js/data.js              # Main content file to edit
│   ├── js/site.js              # Rendering and interaction logic
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

## Features

- Multipage navigation: Home / About / News / Publications / Software / Others / Contact.
- A concise homepage with summaries and links to full pages.
- Publication list page with filters.
- A dedicated detail page for each publication.
- Publication detail pages include abstract, authors, venue, citation, BibTeX, PDF/code/data links, and copy buttons.
- Responsive layout, dark mode, and mobile navigation.
- SEO basics: title, description, canonical URL, Open Graph, and JSON-LD.

## How to Edit Personal Information

Open:

```text
assets/js/data.js
```

Edit these fields first:

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

After deployment, change `siteUrl` to your real GitHub Pages URL, for example:

```js
siteUrl: "https://jiamengliu-prc.github.io"
```

## How to Replace the Profile Photo

Put your photo here:

```text
assets/img/profile.jpg
```

Then update `assets/js/data.js`:

```js
profilePhoto: "assets/img/profile.jpg",
profilePhotoAlt: "Portrait of Jiameng Liu"
```

A square image, such as 800 × 800 pixels, is recommended.

## How to Add a Publication

### Step 1: Add the publication data

Add a new object to the `publications` array in `assets/js/data.js`:

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
  summary: "Short summary for the publication list page.",
  abstract: "Full abstract for the detail page.",
  tags: ["Machine Learning", "Evaluation"],
  citation: "...",
  bibtex: `@inproceedings{...}`
}
```

### Step 2: Create the publication detail page

Copy:

```text
templates/publication-template.html
```

To:

```text
publications/2026-new-paper.html
```

Then update the new HTML file:

```html
<body data-publication-id="CHANGE-ME-PUBLICATION-ID">
```

Change `CHANGE-ME-PUBLICATION-ID` to the `id` from `assets/js/data.js`, for example:

```html
<body data-publication-id="liu-2026-new-paper">
```

You should also update `<title>` and `<meta name="description">` so each publication has an accurate browser title and social preview.

## How to Deploy

1. Unzip the package.
2. Upload all files inside `academic-githubio-multipage-en/` to the root of your `username.github.io` repository.
3. Edit `assets/js/data.js`.
4. Commit and push.
5. Wait for GitHub Pages to publish the site.

## Local Preview

Run this command in the unzipped folder:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Avoid previewing by double-clicking HTML files, because absolute paths, browser security rules, and local file loading behavior may differ from GitHub Pages.
