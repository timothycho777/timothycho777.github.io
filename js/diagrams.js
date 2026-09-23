/* ==========================================================================
   Inline SVG diagrams — used for project cards/details that don't have
   photos yet, and for the animated four-bar linkage in the hero.
   Kept as line-art in the site's blueprint palette via CSS variables.
   ========================================================================== */

const DIAGRAMS = {
  fourbar: `
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four-bar leg linkage schematic">
      <rect width="400" height="260" fill="var(--bg-inset)"/>
      <g stroke="var(--blue)" stroke-width="2.5" stroke-linecap="round">
        <line x1="90" y1="200" x2="90" y2="70" stroke-dasharray="1 7"/>
        <line x1="300" y1="200" x2="300" y2="70" stroke-dasharray="1 7"/>
        <line x1="90" y1="200" x2="300" y2="200" stroke="var(--ink-faint)" stroke-width="2"/>
        <line x1="90" y1="200" x2="150" y2="90"/>
        <line x1="150" y1="90" x2="280" y2="110"/>
        <line x1="300" y1="200" x2="280" y2="110"/>
      </g>
      <circle cx="90" cy="200" r="6" fill="var(--blue)"/>
      <circle cx="300" cy="200" r="6" fill="var(--blue)"/>
      <circle cx="150" cy="90" r="6" fill="var(--orange)"/>
      <circle cx="280" cy="110" r="6" fill="var(--orange)"/>
      <path d="M 150 90 Q 130 40 175 35" stroke="var(--orange)" stroke-width="1.6" fill="none" stroke-dasharray="3 4"/>
      <text x="90" y="222" text-anchor="middle" font-family="var(--font-mono)" font-size="9" fill="var(--ink-faint)">GROUND</text>
      <text x="300" y="222" text-anchor="middle" font-family="var(--font-mono)" font-size="9" fill="var(--ink-faint)">GROUND</text>
      <text x="215" y="30" text-anchor="middle" font-family="var(--font-mono)" font-size="9" fill="var(--orange)">FOOT PATH</text>
    </svg>`,

  quadrotor: `
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Quadrotor two-bus wiring schematic">
      <rect width="400" height="260" fill="var(--bg-inset)"/>
      <g stroke="var(--ink-faint)" stroke-width="2">
        <line x1="70" y1="70" x2="330" y2="190"/>
        <line x1="330" y1="70" x2="70" y2="190"/>
      </g>
      <g stroke="var(--orange)" stroke-width="3" stroke-linecap="round">
        <line x1="200" y1="130" x2="70" y2="70"/>
        <line x1="200" y1="130" x2="330" y2="70"/>
      </g>
      <g stroke="var(--blue)" stroke-width="1.6" stroke-dasharray="2 3">
        <line x1="200" y1="130" x2="70" y2="190"/>
        <line x1="200" y1="130" x2="330" y2="190"/>
      </g>
      <circle cx="70" cy="70" r="16" fill="none" stroke="var(--ink-faint)" stroke-width="2"/>
      <circle cx="330" cy="70" r="16" fill="none" stroke="var(--ink-faint)" stroke-width="2"/>
      <circle cx="70" cy="190" r="16" fill="none" stroke="var(--ink-faint)" stroke-width="2"/>
      <circle cx="330" cy="190" r="16" fill="none" stroke="var(--ink-faint)" stroke-width="2"/>
      <rect x="178" y="110" width="44" height="40" rx="5" fill="var(--bg-elevated)" stroke="var(--blue)" stroke-width="2"/>
      <text x="200" y="134" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="var(--blue)">FC</text>
      <text x="70" y="235" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="var(--orange)">POWER BUS</text>
      <text x="330" y="235" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="var(--blue)">SIGNAL BUS</text>
    </svg>`,

  heatsink: `
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Heat sink fin array with airflow">
      <rect width="400" height="260" fill="var(--bg-inset)"/>
      <g stroke="var(--blue)" stroke-width="2.5">
        ${[0,1,2,3,4,5,6].map(i => `<line x1="${100 + i*30}" y1="200" x2="${100 + i*30}" y2="90"/>`).join('')}
      </g>
      <rect x="90" y="200" width="220" height="16" fill="var(--blue)"/>
      <circle cx="200" cy="60" r="26" fill="none" stroke="var(--orange)" stroke-width="2.5"/>
      <g stroke="var(--orange)" stroke-width="2" stroke-linecap="round">
        <line x1="200" y1="42" x2="200" y2="78"/>
        <line x1="182" y1="60" x2="218" y2="60"/>
      </g>
      <g stroke="var(--ink-faint)" stroke-width="1.4" stroke-dasharray="3 4">
        <path d="M 200 90 L 195 105 M 200 90 L 205 105" />
      </g>
      <text x="200" y="240" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="var(--ink-faint)">FIN ARRAY</text>
    </svg>`,

  cubesat: `
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="CubeSat solar panel hinge, V1 to V2 iteration">
      <rect width="400" height="260" fill="var(--bg-inset)"/>
      <g>
        <rect x="40" y="110" width="90" height="14" rx="2" fill="var(--ink-faint)" opacity="0.5"/>
        <rect x="140" y="110" width="90" height="14" rx="2" fill="var(--ink-faint)" opacity="0.5"/>
        <circle cx="135" cy="117" r="9" fill="none" stroke="var(--orange)" stroke-width="2" stroke-dasharray="2 2"/>
        <text x="135" y="150" text-anchor="middle" font-family="var(--font-mono)" font-size="9" fill="var(--ink-faint)">V1 — pin shear fail</text>
      </g>
      <g transform="translate(30,0)">
        <rect x="230" y="70" width="90" height="14" rx="2" fill="var(--blue)"/>
        <rect x="230" y="94" width="90" height="14" rx="2" fill="var(--blue)" transform="rotate(18 230 94)"/>
        <circle cx="230" cy="88" r="10" fill="var(--orange)"/>
        <text x="270" y="140" text-anchor="middle" font-family="var(--font-mono)" font-size="9" fill="var(--blue)">V2 — reinforced hinge</text>
      </g>
      <path d="M 175 130 L 210 100" stroke="var(--ink-faint)" stroke-width="1.6" marker-end="url(#arrow)" fill="none"/>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--ink-faint)"/>
        </marker>
      </defs>
    </svg>`,

  bearwalker: `
    <svg viewBox="0 0 400 260" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Eight-leg rectilinear walking robot schematic">
      <rect width="400" height="260" fill="var(--bg-inset)"/>
      <rect x="80" y="100" width="240" height="30" rx="4" fill="var(--blue)"/>
      <g stroke="var(--orange)" stroke-width="2.5" stroke-linecap="round">
        ${[100,150,200,250,300].filter(x=>x!==200).map(x => `<line x1="${x}" y1="130" x2="${x-8}" y2="190"/><line x1="${x-8}" y1="190" x2="${x+14}" y2="210"/>`).join('')}
      </g>
      <text x="200" y="235" text-anchor="middle" font-family="var(--font-mono)" font-size="8" fill="var(--ink-faint)">8-LEG RECTILINEAR LINKAGE</text>
    </svg>`,
};

function diagramSVG(key) {
  return DIAGRAMS[key] || DIAGRAMS.fourbar;
}

/* ---------- Animated hero four-bar linkage ---------- */
function initHeroLinkage() {
  const mount = document.getElementById('hero-linkage');
  if (!mount) return;

  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 400 400');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Animated four-bar linkage mechanism');

  const groundA = { x: 130, y: 260 };
  const groundB = { x: 290, y: 260 };
  const crankLen = 70;
  const couplerLen = 150;
  const rockerLen = 120;

  function makeLine(stroke, width, dash) {
    const l = document.createElementNS(ns, 'line');
    l.setAttribute('stroke', stroke);
    l.setAttribute('stroke-width', width);
    l.setAttribute('stroke-linecap', 'round');
    if (dash) l.setAttribute('stroke-dasharray', dash);
    svg.appendChild(l);
    return l;
  }
  function makeCircle(r, fill) {
    const c = document.createElementNS(ns, 'circle');
    c.setAttribute('r', r);
    c.setAttribute('fill', fill);
    svg.appendChild(c);
    return c;
  }

  // ground rail
  const rail = makeLine('var(--ink-faint)', 2);
  rail.setAttribute('x1', groundA.x - 30);
  rail.setAttribute('y1', groundA.y);
  rail.setAttribute('x2', groundB.x + 30);
  rail.setAttribute('y2', groundB.y);

  const crank = makeLine('var(--blue)', 4);
  const coupler = makeLine('var(--orange)', 4);
  const rocker = makeLine('var(--blue)', 4);
  const trace = document.createElementNS(ns, 'path');
  trace.setAttribute('stroke', 'var(--orange)');
  trace.setAttribute('stroke-width', '1.4');
  trace.setAttribute('fill', 'none');
  trace.setAttribute('opacity', '0.35');
  trace.setAttribute('stroke-dasharray', '2 4');
  svg.appendChild(trace);

  const pivotA = makeCircle(6, 'var(--blue)'); pivotA.setAttribute('cx', groundA.x); pivotA.setAttribute('cy', groundA.y);
  const pivotB = makeCircle(6, 'var(--blue)'); pivotB.setAttribute('cx', groundB.x); pivotB.setAttribute('cy', groundB.y);
  const jointC = makeCircle(5.5, 'var(--orange)');
  const jointD = makeCircle(5.5, 'var(--orange)');

  mount.appendChild(svg);

  let t = 0;
  const tracePoints = [];
  function frame() {
    t += 0.012;
    const cx = groundA.x + crankLen * Math.cos(t);
    const cy = groundA.y - crankLen * Math.sin(t) * 0.75 - 20;

    // solve rocker joint D via circle intersection (approx, stable for this geometry)
    const dx = cx - groundB.x, dy = cy - groundB.y;
    const distCB = Math.sqrt(dx * dx + dy * dy);
    const a = (couplerLen ** 2 - rockerLen ** 2 + distCB ** 2) / (2 * distCB);
    const h = Math.sqrt(Math.max(couplerLen ** 2 - a ** 2, 1));
    const midx = cx - (a * dx) / distCB;
    const midy = cy - (a * dy) / distCB;
    const dxJoint = midx - (h * dy) / distCB;
    const dyJoint = midy + (h * dx) / distCB;

    crank.setAttribute('x1', groundA.x); crank.setAttribute('y1', groundA.y);
    crank.setAttribute('x2', cx); crank.setAttribute('y2', cy);

    coupler.setAttribute('x1', cx); coupler.setAttribute('y1', cy);
    coupler.setAttribute('x2', dxJoint); coupler.setAttribute('y2', dyJoint);

    rocker.setAttribute('x1', groundB.x); rocker.setAttribute('y1', groundB.y);
    rocker.setAttribute('x2', dxJoint); rocker.setAttribute('y2', dyJoint);

    jointC.setAttribute('cx', cx); jointC.setAttribute('cy', cy);
    jointD.setAttribute('cx', dxJoint); jointD.setAttribute('cy', dyJoint);

    // foot point extended past the coupler for a "leg tip" trace
    const footx = cx + (dxJoint - cx) * 1.35;
    const footy = cy + (dyJoint - cy) * 1.35;
    tracePoints.push([footx, footy]);
    if (tracePoints.length > 260) tracePoints.shift();
    trace.setAttribute('d', tracePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' '));

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
