/* ==========================================================================
   Project page: renders one project (chosen by ?id=<project-id>) from the
   PROJECTS array in data.js. Projects that list `subProjects` get each
   component shown as its own area on the same page.
   ========================================================================== */

const ICONS = {
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  sun: `<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
};

const SECTION_LABELS = {
  problem: 'Problem / Motivation',
  contribution: 'My Role & Contribution',
  approach: 'Technical Approach',
  challenges: 'Challenges & Solutions',
  results: 'Results & Impact',
  takeaways: 'Key Takeaways',
};
const SECTION_ORDER = ['problem', 'contribution', 'approach', 'challenges', 'results', 'takeaways'];

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initLightbox();
  document.getElementById('footer-year').textContent = new Date().getFullYear();
  renderProject();
});

/* ---------- Theme / nav / lightbox ---------- */
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  btn.innerHTML = ICONS.sun + ICONS.moon;
  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.innerHTML = ICONS.menu;
  toggle.addEventListener('click', () => links.classList.toggle('mobile-open'));
}

function initLightbox() {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  closeBtn.innerHTML = ICONS.close;

  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-lightbox]');
    if (target) {
      img.src = target.dataset.lightbox;
      img.alt = target.dataset.alt || '';
      lb.classList.add('open');
    }
  });
  lb.addEventListener('click', () => lb.classList.remove('open'));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
}

/* ---------- Rendering helpers ---------- */
function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function statusPillHTML(status) {
  if (!status || status === 'Draft Written' || status === 'Polished') return '';
  const cls = status === 'In Progress' ? 'in-progress' : 'not-started';
  return `<span class="status-pill ${cls}">${status}</span>`;
}

function metaHTML(project) {
  const items = [
    ['Role', project.role],
    ['Timeframe', project.timeframe],
    ['Course / Context', project.course],
  ].filter(([, value]) => value);
  return `
    <dl class="proj-meta">
      ${items.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}
    </dl>`;
}

function tagsHTML(project) {
  if (!project.tags || !project.tags.length) return '';
  return `<div class="card-tags proj-tags">${project.tags.map(t => `<span class="card-tag">${t}</span>`).join('')}</div>`;
}

function sectionsHTML(project) {
  return SECTION_ORDER
    .filter(key => project.sections && project.sections[key])
    .map(key => `
      <div class="proj-section">
        <h3>${SECTION_LABELS[key]}</h3>
        <div class="proj-prose">${project.sections[key]}</div>
      </div>
    `).join('');
}

function galleryHTML(project, heading) {
  if (!project.media || project.media.type !== 'photos' || !project.media.items.length) return '';
  return `
    <div class="proj-section">
      <h3>${heading || 'Photos'}</h3>
      <div class="proj-gallery">
        ${project.media.items.map(img => `
          <figure>
            <img src="${img.src}" alt="${escapeAttr(img.alt)}" loading="lazy" data-lightbox="${img.src}" data-alt="${escapeAttr(img.alt)}">
            <figcaption>${img.caption}</figcaption>
          </figure>
        `).join('')}
      </div>
    </div>`;
}

function diagramHTML(project) {
  if (project.media && project.media.type === 'diagram') {
    return `<div class="proj-diagram">${diagramSVG(project.media.key)}</div>`;
  }
  return '';
}

/* One component area (used for subProjects shown on the parent's page). */
function areaHTML(sub, index, total) {
  return `
    <section class="proj-area" id="area-${sub.id}">
      <div class="eyebrow">Part ${index + 1} of ${total}${sub.course ? ' · ' + sub.course : ''}</div>
      <h2>${sub.name}</h2>
      ${statusPillHTML(sub.status)}
      <p class="proj-lede">${sub.oneLiner}</p>
      ${metaHTML(Object.assign({}, sub, { course: '' }))}
      ${tagsHTML(sub)}
      ${sectionsHTML(sub)}
      ${galleryHTML(sub, 'Photos & CAD')}
    </section>`;
}

function pagerHTML(project) {
  const list = PROJECTS.filter(p => !p.isSubProject);
  const i = list.findIndex(p => p.id === project.id);
  if (i === -1 || list.length < 2) return '';
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  return `
    <nav class="proj-pager" aria-label="Other projects">
      <a href="project.html?id=${prev.id}">${ICONS.arrowLeft}<span><small>Previous project</small>${prev.name}</span></a>
      <a href="project.html?id=${next.id}" class="next"><span><small>Next project</small>${next.name}</span>${ICONS.arrowRight}</a>
    </nav>`;
}

function backLinkHTML(extraClass) {
  return `<a class="back-home ${extraClass || ''}" href="index.html#projects">${ICONS.arrowLeft}Back to all projects</a>`;
}

/* ---------- Page ---------- */
function renderProject() {
  const root = document.getElementById('project-root');
  const id = new URLSearchParams(window.location.search).get('id');
  const project = PROJECTS.find(p => p.id === id && !p.isSubProject);

  if (!project) {
    document.title = 'Project not found | Timothy Cho';
    root.innerHTML = `
      ${backLinkHTML()}
      <h1 class="proj-title">Project not found</h1>
      <p class="proj-lede">That project doesn't exist (or its link has changed). <a href="index.html#projects">Head back to the project list</a>.</p>`;
    return;
  }

  document.title = `${project.name} | Timothy Cho`;
  document.getElementById('meta-description').setAttribute('content', project.oneLiner);

  const subs = (project.subProjects || [])
    .map(subId => PROJECTS.find(p => p.id === subId))
    .filter(Boolean);

  const hasOwnPhotos = project.media && project.media.type === 'photos';

  root.innerHTML = `
    ${backLinkHTML()}

    <header class="proj-header">
      <div class="eyebrow">${project.course || 'Project'}</div>
      <h1 class="proj-title">${project.name}</h1>
      ${statusPillHTML(project.status)}
      <p class="proj-lede">${project.oneLiner}</p>
      ${metaHTML(project)}
      ${tagsHTML(project)}
    </header>

    ${diagramHTML(project)}

    <div class="proj-body">
      ${sectionsHTML(project)}
      ${hasOwnPhotos ? galleryHTML(project, 'Photos') : ''}
    </div>

    ${subs.map((sub, i) => areaHTML(sub, i, subs.length)).join('')}

    ${pagerHTML(project)}
    <div class="proj-back-bottom">${backLinkHTML()}</div>
  `;

  window.scrollTo(0, 0);
}
