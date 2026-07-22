/* =====================================================================
   CONFIGURAZIONE ICONE
   Aggiungi, rimuovi o riordina le voci qui sotto per cambiare quali
   icone compaiono e quante. Le posizioni (desktop e mobile) vengono
   ricalcolate automaticamente per qualunque quantità e ad ogni resize.
   ===================================================================== */

// Icone "app" del desktop / home iOS
const DESKTOP_APPS = [
  { id:'about',   label:'About Me',  icon:'assets/icons/folder.png', window:'about'  },
  { id:'notes',   label:'Notes',     icon:'assets/icons/notes.png',  window:'notes'  },
  { id:'foto',    label:'Street Ph.',icon:'assets/icons/folder.png', window:'foto'   },
  { id:'design',  label:'Design',    icon:'assets/icons/folder.png', window:'design' },
  { id:'musica',  label:'Musica',    icon:'assets/icons/musica.png', window:'musica' },
  { id:'pittura', label:'Pittura',   icon:'assets/icons/folder.png', window:'pittura'},
];
const DESKTOP_ICON_COUNT = 6;

// Icone "file" (anteprime multimediali stile Quick Look)
const FILE_ICONS = [
  { id:'photo-file', label:'scatto-01.jpg', kind:'photo', qlook:'photo' },
  { id:'video-file', label:'reel-01.mp4',   kind:'video', qlook:'video' },
  { id:'audio-file', label:'beat-01.mp3',   kind:'audio', qlook:'audio' },
];
const SHOW_FILE_ICONS = true;

// Dock: SOLO Instagram, Illustrator, Photoshop
const DOCK_APPS = [
  { id:'instagram',   label:'Instagram',   icon:'assets/icons/instagram.png',   href:'#' },
  { id:'illustrator', label:'Illustrator', icon:'assets/icons/illustrator.png', href:'#' },
  { id:'photoshop',   label:'Photoshop',   icon:'assets/icons/photoshop.png',   href:'#' },
];
const DOCK_ICON_COUNT = 3;

// Quanto si sovrappongono le icone sul mobile (0 = griglia pulita, 1 = molto accavallate)
const MOBILE_OVERLAP = 0.6;


/* =====================================================================
   POSIZIONAMENTO
   ===================================================================== */

function seededRandom(seed){
  let t = seed;
  return function(){
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/* Desktop: sparso ma centrato, SENZA sovrapposizioni. Coord. top-left in %. */
function scatterPositions(n, seed){
  if(n <= 0) return [];
  const cols = Math.max(1, Math.ceil(Math.sqrt(n * 1.4)));
  const rows = Math.max(1, Math.ceil(n / cols));
  const cells = [];
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) cells.push([r,c]);

  const rnd = seededRandom(seed || 42);
  for(let i=cells.length-1;i>0;i--){
    const j = Math.floor(rnd()*(i+1));
    [cells[i],cells[j]] = [cells[j],cells[i]];
  }
  const zone = { left:20, top:16, width:60, height:58 };
  const cellW = zone.width/cols, cellH = zone.height/rows;

  return cells.slice(0,n).map(([r,c]) => ({
    left: zone.left + c*cellW + cellW/2 + (rnd()-0.5)*cellW*0.55,
    top:  zone.top  + r*cellH + cellH/2 + (rnd()-0.5)*cellH*0.55,
    z: 1,
  }));
}

/* Mobile: sparso, NON ruotato, con LEGGERA SOVRAPPOSIZIONE.
   Restituisce il CENTRO di ogni icona in % (poi CSS usa translateX(-50%)),
   con clamp ai bordi così le icone stanno sempre dentro lo schermo a
   qualunque larghezza -> il layout si adatta in modo fluido. */
function scatterOverlap(n, seed, overlap){
  if(n <= 0) return [];
  const cols = Math.max(2, Math.round(Math.sqrt(n * 0.9)));
  const rows = Math.ceil(n / cols);
  const cells = [];
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) cells.push([r,c]);

  const rnd = seededRandom(seed || 7);
  for(let i=cells.length-1;i>0;i--){
    const j = Math.floor(rnd()*(i+1));
    [cells[i],cells[j]] = [cells[j],cells[i]];
  }
  const zone = { left:16, top:8, right:84, bottom:82 };
  const cw = (zone.right-zone.left)/cols, ch = (zone.bottom-zone.top)/rows;
  const j = 0.6 + overlap*0.7;

  return cells.slice(0,n).map(([r,c], i) => {
    let cx = zone.left + cw*(c+0.5) + (rnd()-0.5)*cw*j;
    let cy = zone.top  + ch*(r+0.5) + (rnd()-0.5)*ch*j;
    cx = Math.max(15, Math.min(85, cx));   // resta dentro sui piccoli schermi
    cy = Math.max(6,  Math.min(84, cy));
    return { cx, cy, z:i+1 };
  });
}


/* =====================================================================
   RENDER
   ===================================================================== */

function fileIconInnerHTML(kind){
  if(kind === 'photo'){
    return '<span class="file-thumb-photo"></span>';
  }
  if(kind === 'video'){
    return '<span class="file-thumb-video"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"><path d="M8 6l11 6-11 6V6z"/></svg></span>';
  }
  return '<span class="file-thumb-audio"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"><path d="M4 12v0M8 8v8M12 5v14M16 8v8M20 12v0"/></svg></span>';
}

function renderDesktopIcons(){
  const container = document.getElementById('desktopIcons');
  if(!container) return;

  const apps = DESKTOP_APPS.slice(0, Math.min(DESKTOP_ICON_COUNT, DESKTOP_APPS.length));
  const files = SHOW_FILE_ICONS ? FILE_ICONS : [];
  const total = apps.length + files.length;
  const positions = scatterPositions(total, 42);

  let html = '', i = 0;
  apps.forEach(app => {
    const pos = positions[i++];
    html += `<button class="d-icon" data-window="${app.window}" style="left:${pos.left.toFixed(2)}%; top:${pos.top.toFixed(2)}%;">
      <span class="icon-glyph app-glyph"><img class="icon-img" src="${app.icon}" alt="${app.label}"></span>
      <span>${app.label}</span>
    </button>`;
  });
  files.forEach(file => {
    const pos = positions[i++];
    html += `<button class="d-icon file-icon" data-qlook="${file.qlook}" style="left:${pos.left.toFixed(2)}%; top:${pos.top.toFixed(2)}%;">
      <span class="icon-glyph">${fileIconInnerHTML(file.kind)}</span>
      <span>${file.label}</span>
    </button>`;
  });
  container.innerHTML = html;
}

function dockIconMarkup(app){
  return `<a class="dock-icon" href="${app.href||'#'}" target="_blank" rel="noopener" title="${app.label}">
    <img class="icon-img" src="${app.icon}" alt="${app.label}">
  </a>`;
}

function renderDock(containerId){
  const container = document.getElementById(containerId);
  if(!container) return;
  const apps = DOCK_APPS.slice(0, Math.min(DOCK_ICON_COUNT, DOCK_APPS.length));
  container.innerHTML = apps.map(dockIconMarkup).join('');
}

function renderMobileGrid(){
  const container = document.getElementById('appGrid');
  if(!container) return;
  const apps = DESKTOP_APPS.slice(0, Math.min(DESKTOP_ICON_COUNT, DESKTOP_APPS.length));
  const files = SHOW_FILE_ICONS ? FILE_ICONS : [];
  const total = apps.length + files.length;
  const positions = scatterOverlap(total, 7, MOBILE_OVERLAP);

  let html = '', i = 0;
  apps.forEach(app => {
    const p = positions[i++];
    html += `<button class="app-icon" data-window="${app.window}" style="left:${p.cx.toFixed(2)}%; top:${p.cy.toFixed(2)}%; z-index:${p.z};">
      <span class="icon-glyph app-glyph"><img class="icon-img" src="${app.icon}" alt="${app.label}"></span>
      <span>${app.label}</span>
    </button>`;
  });
  files.forEach(file => {
    const p = positions[i++];
    html += `<button class="app-icon file-icon" data-qlook="${file.qlook}" style="left:${p.cx.toFixed(2)}%; top:${p.cy.toFixed(2)}%; z-index:${p.z};">
      <span class="icon-glyph">${fileIconInnerHTML(file.kind)}</span>
      <span>${file.label.replace(/\.(jpg|mp4|mp3)$/,'')}</span>
    </button>`;
  });
  container.innerHTML = html;
}

function layoutAll(){
  renderDesktopIcons();
  renderDock('dockDesktop');
  renderMobileGrid();
  renderDock('dockMobile');
}
layoutAll();

// Ricalcolo fluido quando la finestra cambia dimensione / orientamento
let _rz;
window.addEventListener('resize', () => {
  clearTimeout(_rz);
  _rz = setTimeout(layoutAll, 120);
});


/* =====================================================================
   FINESTRE, QUICK LOOK, NOTE, OROLOGIO  (event delegation)
   ===================================================================== */

const backdrop = document.getElementById('backdrop');

function openWindow(id){
  closeQuickLook();
  document.querySelectorAll('.window').forEach(w => { w.classList.remove('open','show'); });
  const win = document.getElementById('win-' + id);
  if(win){
    win.classList.add('open');
    requestAnimationFrame(() => requestAnimationFrame(() => win.classList.add('show')));
  }
  backdrop.classList.add('show');
}
function closeWindows(){
  document.querySelectorAll('.window.open').forEach(w => {
    w.classList.remove('show');
    setTimeout(() => w.classList.remove('open'), 300);
  });
  backdrop.classList.remove('show');
}

function openQuickLook(id){
  document.querySelectorAll('.window').forEach(w => { w.classList.remove('show'); setTimeout(()=>w.classList.remove('open'),300); });
  document.querySelectorAll('.qlook').forEach(q => q.classList.remove('open','show'));
  const ql = document.getElementById('ql-' + id);
  if(ql){
    ql.classList.add('open');
    requestAnimationFrame(() => requestAnimationFrame(() => ql.classList.add('show')));
  }
  backdrop.classList.add('show');
}
function closeQuickLook(){
  document.querySelectorAll('.qlook.open').forEach(ql => {
    ql.classList.remove('show');
    setTimeout(() => ql.classList.remove('open'), 300);
  });
}

document.addEventListener('click', (e) => {
  const winTrigger = e.target.closest('[data-window]');
  if(winTrigger){ e.preventDefault(); openWindow(winTrigger.dataset.window); return; }
  const qlTrigger = e.target.closest('[data-qlook]');
  if(qlTrigger){ e.preventDefault(); openQuickLook(qlTrigger.dataset.qlook); return; }
  const closeTrigger = e.target.closest('[data-close]');
  if(closeTrigger){ closeWindows(); return; }
  const qcloseTrigger = e.target.closest('[data-qclose]');
  if(qcloseTrigger){ closeQuickLook(); backdrop.classList.remove('show'); return; }
});

backdrop.addEventListener('click', () => { closeWindows(); closeQuickLook(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape'){ closeWindows(); closeQuickLook(); } });

const notesContent = {
  1: { date: 'luglio 2026', body: 'Nuova serie in lavorazione, presto online. Questo testo è un segnaposto: sostituiscilo con i tuoi appunti veri.' },
  2: { date: 'giugno 2026', body: 'Aggiornata la sezione progetti del sito. Questo testo è un segnaposto: sostituiscilo con i tuoi appunti veri.' },
  3: { date: 'maggio 2026', body: 'Appunti sparsi da sviluppare. Questo testo è un segnaposto: sostituiscilo con i tuoi appunti veri.' }
};
document.addEventListener('click', (e) => {
  const item = e.target.closest('.notes-list-item');
  if(!item) return;
  document.querySelectorAll('.notes-list-item').forEach(i => i.classList.remove('active'));
  item.classList.add('active');
  const note = notesContent[item.dataset.note];
  document.getElementById('noteDate').textContent = note.date;
  document.getElementById('noteBody').textContent = note.body;
});

function updateClock(){
  const now = new Date();
  const str = now.toLocaleTimeString('it-IT', {hour:'2-digit', minute:'2-digit'});
  const d = document.getElementById('clockDesktop');
  const m = document.getElementById('clockMobile');
  if(d) d.textContent = str;
  if(m) m.textContent = str;
}
updateClock();
setInterval(updateClock, 15000);
