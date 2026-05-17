

const content_dir = 'contents/';
const config_file = 'config.yml';
const markdown_sections = ['home', 'awards'];
const publications_data_file = 'publications.yml';
const publications_markdown_fallback = 'publications.md';
const repo_edit_base = 'https://github.com/JiamengLiu-PRC/JiamengLiu-PRC.github.io/edit/main/contents/';

window.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    loadConfig();
    loadMarkdownSections();
    loadPublications();
});

function initNavigation() {
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.forEach((responsiveNavItem) => {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
}

function loadConfig() {
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    const element = document.getElementById(key);
                    if (!element) {
                        console.log('Unknown id and value: ' + key + ',' + yml[key].toString());
                        return;
                    }
                    element.innerHTML = yml[key];
                } catch (error) {
                    console.log(error);
                }
            });
        })
        .catch(error => console.log(error));
}

function loadMarkdownSections() {
    marked.use({ mangle: false, headerIds: false });

    markdown_sections.forEach((name) => {
        fetch(content_dir + name + '.md')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${name}.md not found`);
                }
                return response.text();
            })
            .then(markdown => {
                const target = document.getElementById(name + '-md');
                if (target) {
                    target.innerHTML = marked.parse(markdown);
                }
            })
            .then(renderMath)
            .catch(error => console.log(error));
    });
}

function loadPublications() {
    fetch(content_dir + publications_data_file)
        .then(response => {
            if (!response.ok) {
                throw new Error('Structured publications YAML not found');
            }
            return response.text();
        })
        .then(text => {
            const publications = jsyaml.load(text) || [];
            renderPublications(publications);
        })
        .catch(error => {
            console.log(error);
            renderPublicationMarkdownFallback();
        });
}

function renderPublicationMarkdownFallback() {
    fetch(content_dir + publications_markdown_fallback)
        .then(response => response.text())
        .then(markdown => {
            const target = document.getElementById('publications-md');
            if (target) {
                target.innerHTML = marked.parse(markdown);
            }
        })
        .then(renderMath)
        .catch(error => console.log(error));
}

function renderPublications(publications) {
    const target = document.getElementById('publications-md');
    if (!target) {
        return;
    }

    const grouped = publications.reduce((acc, pub) => {
        const year = pub.year || 'Other';
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(pub);
        return acc;
    }, {});

    const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));
    target.innerHTML = years.map(year => `
        <div class="publication-year-group">
            <h3 class="publication-year">${escapeHtml(year)}</h3>
            <div class="publication-list">
                ${grouped[year].map(renderPublicationCard).join('')}
            </div>
        </div>
    `).join('');

    renderMath();
}

function renderPublicationCard(pub) {
    const title = escapeHtml(pub.title || 'Untitled publication');
    const authors = pub.authors || '';
    const venue = pub.venue ? `<span class="pub-venue">${escapeHtml(pub.venue)}</span>` : '';
    const note = pub.note ? `<span class="pub-note">${escapeHtml(pub.note)}</span>` : '';
    const status = pub.status ? `<span class="pub-status">${escapeHtml(pub.status)}</span>` : '';
    const badges = [venue, note, status].filter(Boolean).join('');
    const links = renderLinks(pub.links || {});
    const keywords = Array.isArray(pub.keywords)
        ? pub.keywords.map(keyword => `<span class="pub-keyword">${escapeHtml(keyword)}</span>`).join('')
        : '';

    const detailBlocks = [
        pub.summary ? `<div class="pub-detail-block"><strong>Summary</strong><p>${inlineMarkdown(pub.summary)}</p></div>` : '',
        pub.contribution ? `<div class="pub-detail-block"><strong>Contribution</strong><p>${inlineMarkdown(pub.contribution)}</p></div>` : '',
        pub.bibtex ? `<div class="pub-detail-block"><strong>BibTeX</strong><pre><code>${escapeHtml(pub.bibtex)}</code></pre></div>` : '',
        keywords ? `<div class="pub-keywords">${keywords}</div>` : ''
    ].filter(Boolean).join('');

    return `
        <article class="publication-card" id="${escapeHtml(pub.id || slugify(title))}">
            <div class="publication-card-main">
                <div class="publication-content">
                    <h4 class="publication-title">${title}</h4>
                    <p class="publication-authors">${authors}</p>
                    <div class="publication-meta">${badges}</div>
                    <div class="publication-links">${links}</div>
                </div>
            </div>
            <details class="publication-details">
                <summary><i class="bi bi-chevron-down"></i> Details</summary>
                <div class="publication-detail-body">
                    ${detailBlocks || '<p class="muted">Add summary, contribution, keywords, or BibTeX in <code>contents/publications.yml</code>.</p>'}
                    <a class="edit-publication-link" href="${repo_edit_base + publications_data_file}" target="_blank" rel="noopener">
                        <i class="bi bi-pencil-square"></i> Edit this publication details
                    </a>
                </div>
            </details>
        </article>
    `;
}

function renderLinks(links) {
    return Object.keys(links)
        .filter(label => links[label])
        .map(label => `<a class="pub-link" href="${escapeAttribute(links[label])}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`)
        .join('');
}

function inlineMarkdown(text) {
    return marked.parseInline(String(text || ''));
}

function renderMath() {
    if (window.MathJax && MathJax.typeset) {
        MathJax.typeset();
    }
}

function slugify(text) {
    return String(text)
        .toLowerCase()
        .replace(/<[^>]*>/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

function escapeHtml(value) {
    return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
    return escapeHtml(value).replaceAll('`', '&#096;');
}
