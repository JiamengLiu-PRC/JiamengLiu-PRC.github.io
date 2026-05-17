# Optimized Jiameng Liu GitHub Pages homepage

Copy these files into the root of `JiamengLiu-PRC/JiamengLiu-PRC.github.io`:

- `index.html`
- `static/js/scripts.js`
- `static/css/main.css`
- `contents/config.yml`
- `contents/publications.yml`
- `contents/awards.md`

## How to edit publications

Edit `contents/publications.yml`.

Each publication supports:

```yaml
- id: unique-id
  year: 2026
  title: "Paper title"
  authors: "<strong>Jiameng Liu</strong>*, <em>et al.</em>"
  venue: "Journal or conference"
  note: "Journal article / Conference paper"
  status: "2026"
  keywords:
    - keyword
  summary: "Short public-facing summary."
  contribution: "Your technical contribution / method / results."
  links:
    Paper: "https://..."
    Code: "https://..."
  bibtex: ""
```

The page will render publication cards grouped by year. Each card has a Details disclosure and an Edit link to GitHub's web editor.
