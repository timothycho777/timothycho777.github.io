/* ==========================================================================
   Main site logic: rendering, filtering, accordion detail panels,
   lightbox, theme toggle, nav behavior, scroll reveal.
   ========================================================================== */

const ICONS = {
  cube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`,
  wrench: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.77z"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  chip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  github: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  sun: `<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
};

const SECTION_LABELS = {
  problem: 'Problem / Motivation',
  contribution: 'My Role & Contribution',
  approach: 'Technical Approach',
  challenges: 'Challenges & Solutions',
  results: 'Results & Impact',
  takeaways: 'Key Takeaways',
};

let activeFilter = 'All';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  populateSiteText();
  renderSkills();
  renderFilters();
  renderProjects();
  initHeroLinkage();
  initLightbox();
  initScrollSpy();
  initRevealObserver();
});

/* ---------- Theme ---------- */
function initTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
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

/* ---------- Nav ---------- */
function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  toggle.innerHTML = ICONS.menu;
  toggle.addEventListener('click', () => links.classList.toggle('mobile-open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('mobile-open')));
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => spy.observe(s));
}

/* ---------- Static text from SITE ---------- */
function populateSiteText() {
  document.getElementById('hero-name').textContent = SITE.name;
  document.getElementById('hero-role').textContent = `${SITE.role} · ${SITE.school}`;
  document.getElementById('hero-tagline').textContent = SITE.tagline;
  document.getElementById('about-text').innerHTML = SITE.about.split('\n\n').map(p => `<p>${p.trim()}</p>`).join('');

  const mailLink = document.getElementById('contact-mail');
  mailLink.href = `mailto:${SITE.email}`;
  mailLink.innerHTML = ICONS.mail + `<span>${SITE.email}</span>`;

  const liLink = document.getElementById('contact-linkedin');
  liLink.href = SITE.linkedin;
  liLink.innerHTML = ICONS.linkedin + '<span>LinkedIn Profile</span>';

  const ghLink = document.getElementById('contact-github');
  ghLink.href = SITE.github;
  ghLink.innerHTML = ICONS.github + '<span>GitHub Profile</span>';

  document.getElementById('footer-year').textContent = new Date().getFullYear();

  const total = PROJECTS.filter(p => !p.isSubProject).length;
  const featuredCount = PROJECTS.filter(p => p.featured).length;
  const categories = new Set(PROJECTS.filter(p => !p.isSubProject).map(p => p.category)).size;
  document.getElementById('stat-projects').textContent = total;
  document.getElementById('stat-featured').textContent = featuredCount;
  document.getElementById('stat-categories').textContent = categories;
}

/* ---------- Skills ---------- */
function renderSkills() {
  const grid = document.getElementById('skills-grid');
  grid.innerHTML = SKILL_GROUPS.map(g => `
    <div class="skill-card" data-reveal>
      <div class="icon">${ICONS[g.icon] || ''}</div>
      <h4>${g.label}</h4>
      <div class="skill-tags">
        ${g.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* ---------- Filters ---------- */
function renderFilters() {
  const bar = document.getElementById('filter-bar');
  bar.innerHTML = CATEGORIES.map(cat => `
    <button class="filter-btn ${cat === activeFilter ? 'active' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');
  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.cat;
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b === btn));
      applyFilter();
    });
  });
}

function applyFilter() {
  document.querySelectorAll('.project-card').forEach(card => {
    const cat = card.dataset.category;
    const show = activeFilter === 'All' || cat === activeFilter;
    card.classList.toggle('hidden-by-filter', !show);
  });
}

/* ---------- Projects ---------- */
function statusPillHTML(status) {
  if (!status || status === 'Draft Written' || status === 'Polished') return '';
  const cls = status === 'In Progress' ? 'in-progress' : 'not-started';
  return `<span class="status-pill ${cls}">${status}</span>`;
}

function mediaHTML(project) {
  if (!project.media) return diagramSVG('fourbar');
  if (project.media.type === 'photos') {
    const first = project.media.items[0];
    return `<img src="${first.src}" alt="${first.alt}" loading="lazy">`;
  }
  return diagramSVG(project.media.key);
}

function detailSectionsHTML(project) {
  const order = ['problem', 'contribution', 'approach', 'challenges', 'results', 'takeaways'];
  return order
    .filter(key => project.sections && project.sections[key])
    .map(key => `
      <div class="detail-section">
        <h5>${SECTION_LABELS[key]}</h5>
        <div>${project.sections[key]}</div>
      </div>
    `).join('');
}

function photosHTML(project) {
  if (!project.media || project.media.type !== 'photos') return '';
  return `
    <div class="detail-section">
      <h5>Photos</h5>
      <div class="detail-photos">
        ${project.media.items.map(img => `
          <figure>
            <img src="${img.src}" alt="${img.alt}" loading="lazy" data-lightbox="${img.src}" data-alt="${img.alt}">
            <figcaption>${img.caption}</figcaption>
          </figure>
        `).join('')}
      </div>
    </div>
  `;
}

function subProjectLinksHTML(project) {
  if (!project.subProjects || !project.subProjects.length) return '';
  const links = project.subProjects.map(id => {
    const sub = PROJECTS.find(p => p.id === id);
    if (!sub) return '';
    return `<button class="sub-link" data-sub-toggle="${project.id}-${id}">${ICONS.external}${sub.name}</button>`;
  }).join('');
  return `
    <div class="detail-section">
      <h5>Component Write-ups</h5>
      <p style="margin-bottom:0.6rem;">This entry consolidates two more detailed component write-ups:</p>
      <div class="sub-links">${links}</div>
      ${project.subProjects.map(id => subProjectPanelHTML(project.id, id)).join('')}
    </div>
  `;
}

function subProjectPanelHTML(parentId, subId) {
  const sub = PROJECTS.find(p => p.id === subId);
  if (!sub) return '';
  return `
    <div class="sub-project-panel" id="panel-${parentId}-${subId}">
      <div class="sub-project-panel-inner">
        <h6>${ICONS.chevron.replace('viewBox', 'style="width:12px;height:12px;transform:rotate(-90deg)" viewBox')}${sub.name}</h6>
        <div class="card-meta"><span>${sub.role}</span><span>${sub.timeframe}</span></div>
        <p style="font-size:0.88rem;color:var(--ink-soft);margin:0.5rem 0;">${sub.oneLiner}</p>
        ${detailSectionsHTML(sub)}
      </div>
    </div>
  `;
}

function projectCardHTML(project, index) {
  const tags = project.tags.map(t => `<span class="card-tag">${t}</span>`).join('');
  return `
    <article class="project-card" data-category="${project.category}" id="project-${project.id}" style="transition-delay:${Math.min(index * 60, 300)}ms">
      <div class="card-media">
        ${mediaHTML(project)}
        ${project.featured ? '<span class="featured-badge">Featured</span>' : ''}
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span>${project.course || ''}</span>
          <span>${project.timeframe}</span>
        </div>
        <h3>${project.name}</h3>
        ${statusPillHTML(project.status)}
        <p class="card-oneliner">${project.oneLiner}</p>
        <div class="card-tags">${tags}</div>
        <button class="card-expand" data-toggle="project-${project.id}">
          View full write-up ${ICONS.chevron}
        </button>
      </div>
      <div class="card-detail">
        <div class="card-detail-inner">
          <div class="detail-section">
            <h5>My Role</h5>
            <p>${project.role}</p>
          </div>
          ${detailSectionsHTML(project)}
          ${photosHTML(project)}
          ${subProjectLinksHTML(project)}
          ${project.resumeBullet ? `
            <div class="detail-section">
              <h5>Resume Bullet</h5>
              <div class="resume-bullet">${project.resumeBullet}</div>
            </div>` : ''}
        </div>
      </div>
    </article>
  `;
}

function renderProjects() {
  const grid = document.getElementById('project-grid');
  const visible = PROJECTS.filter(p => !p.isSubProject);
  grid.innerHTML = visible.map((p, i) => projectCardHTML(p, i)).join('');

  // Expand/collapse
  grid.querySelectorAll('.card-expand').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = document.getElementById(btn.dataset.toggle);
      card.classList.toggle('open');
      btn.firstChild.textContent = card.classList.contains('open') ? 'Hide write-up ' : 'View full write-up ';
    });
  });

  // Sub-project inline toggles
  grid.querySelectorAll('[data-sub-toggle]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const panel = document.getElementById(`panel-${btn.dataset.subToggle}`);
      panel.classList.toggle('open');
    });
  });

  // Reveal stagger
  requestAnimationFrame(() => {
    grid.querySelectorAll('.project-card').forEach(card => card.classList.add('reveal'));
  });
}

/* ---------- Lightbox ---------- */
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

/* ---------- Reveal on scroll ---------- */
function initRevealObserver() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}
