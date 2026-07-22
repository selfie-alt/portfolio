/* =====================================================================
   CONFIGURAZIONE ICONE
   Aggiungi, rimuovi o riordina le voci qui sotto per cambiare quali
   icone compaiono e quante. Le posizioni sul desktop vengono ricalcolate
   automaticamente in modo sparso-ma-centrato per qualunque quantità,
   quindi non serve toccare percentuali o coordinate a mano.
   ===================================================================== */

// Icone "app" del desktop / home iOS (finestre già presenti nel sito)
const DESKTOP_APPS = [
  { id:'about',   label:'About Me',  icon:'assets/icons/about.png',   grad:'about-grad',   window:'about'  },
  { id:'notes',   label:'Notes',     icon:'assets/icons/notes.png',   grad:'notes-grad',   window:'notes'  },
  { id:'foto',    label:'Street Ph.',icon:'assets/icons/foto.png',    grad:'foto-grad',    window:'foto'   },
  { id:'design',  label:'Design',    icon:'assets/icons/design.png',  grad:'design-grad',  window:'design' },
  { id:'musica',  label:'Musica',    icon:'assets/icons/musica.png',  grad:'musica-grad',  window:'musica' },
  { id:'pittura', label:'Pittura',   icon:'assets/icons/pittura.png', grad:'pittura-grad', window:'pittura'},
];
// Quante di queste mostrare (le prime N della lista sopra). Max: DESKTOP_APPS.length
const DESKTOP_ICON_COUNT = 6;

// Icone "file" (anteprime multimediali stile Quick Look) — sempre presenti
// insieme alle app, sparse nello stesso spazio senza sovrapporsi.
const FILE_ICONS = [
  { id:'photo-file', label:'scatto-01.jpg', kind:'photo', qlook:'photo' },
  { id:'video-file', label:'reel-01.mp4',   kind:'video', qlook:'video' },
  { id:'audio-file', label:'beat-01.mp3',   kind:'audio', qlook:'audio' },
];
// Metti a false se non vuoi le icone file sul desktop / home iOS
const SHOW_FILE_ICONS = true;

// Icone del dock (desktop in basso, mobile in basso)
const DOCK_APPS = [
  { id:'about',       label:'About Me',   grad:'about-grad', icon:'assets/icons/about.png',       window:'about' },
  { id:'notes',       label:'Notes',      grad:'notes-grad', icon:'assets/icons/notes.png',       window:'notes' },
  { id:'instagram',   label:'Instagram',  bg:'linear-gradient(155deg, #F5A623, #E4405F 55%, #7B4FE0)', icon:'assets/icons/instagram.png',   href:'#' },
  { id:'photoshop',   label:'Editor foto',bg:'linear-gradient(155deg, #0B2E4F, #1E7FCB)',              icon:'assets/icons/photoshop.png',   href:'#' },
  { id:'illustrator', label:'Vettoriale', bg:'linear-gradient(155deg, #B14C0A, #F08A2B)',              icon:'assets/icons/illustrator.png', href:'#' },
  { id:'premiere',    label:'Video',      bg:'linear-gradient(155deg, #241645, #5A2FBF)',              icon:'assets/icons/premiere.png',    href:'#' },
];
// Quante di queste mostrare nel dock (le prime N della lista sopra). Max: DOCK_APPS.length
const DOCK_ICON_COUNT = 6;


/* =====================================================================
   POSIZIONAMENTO SPARSO-MA-CENTRATO (si adatta a qualunque quantità)
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

// Calcola N posizioni (in percentuale) sparse ma raggruppate al centro,
// senza sovrapposizioni, qualunque sia N. Seed fisso = layout stabile
// tra un caricamento e l'altro della pagina.
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

  // zona "sicura" centrale (percentuali sullo schermo)
  const zone = { left:20, top:14, width:60, height:60 };
  const cellW = zone.width/cols, cellH = zone.height/rows;

  return cells.slice(0,n).map(([r,c]) => {
    const jitterX = (rnd()-0.5)*cellW*0.55;
    const jitterY = (rnd()-0.5)*cellH*0.55;
    return {
      left: zone.left + c*cellW + cellW/2 + jitterX,
      top:  zone.top  + r*cellH + cellH/2 + jitterY,
    };
  });
}


/* =====================================================================
   RENDER — desktop, dock, home iOS, dock mobile
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

  let html = '';
  let i = 0;

  apps.forEach(app => {
    const pos = positions[i++];
    html += `<button class="d-icon" data-window="${app.window}" style="left:${pos.left.toFixed(2)}%; top:${pos.top.toFixed(2)}%;">
      <span class="icon-glyph ${app.grad}"><img class="icon-img" src="${app.icon}" alt="${app.label}"></span>
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

function dockIconMarkup(app, tag){
  const bgStyle = app.bg ? `style="background: ${app.bg};"` : '';
  const gradClass = app.grad ? app.grad : '';
  if(tag === 'a'){
    return `<a class="dock-icon ${gradClass}" ${bgStyle} href="${app.href||'#'}" target="_blank" rel="noopener" title="${app.label}">
      <img class="icon-img" src="${app.icon}" alt="${app.label}">
    </a>`;
  }
  return `<button class="dock-icon ${gradClass}" ${bgStyle} data-window="${app.window}" title="${app.label}">
    <img class="icon-img" src="${app.icon}" alt="${app.label}">
  </button>`;
}

function renderDock(containerId){
  const container = document.getElementById(containerId);
  if(!container) return;
  const apps = DOCK_APPS.slice(0, Math.min(DOCK_ICON_COUNT, DOCK_APPS.length));
  container.innerHTML = apps.map(app => dockIconMarkup(app, app.window ? 'button' : 'a')).join('');
}

function renderMobileGrid(){
  const container = document.getElementById('appGrid');
  if(!container) return;
  const apps = DESKTOP_APPS.slice(0, Math.min(DESKTOP_ICON_COUNT, DESKTOP_APPS.length));
  const files = SHOW_FILE_ICONS ? FILE_ICONS : [];

  let html = '';
  apps.forEach(app => {
    html += `<button class="app-icon" data-window="${app.window}">
      <span class="icon-glyph ${app.grad}"><img class="icon-img" src="${app.icon}" alt="${app.label}"></span>
      <span>${app.label}</span>
    </button>`;
  });
  files.forEach(file => {
    html += `<button class="app-icon file-icon" data-qlook="${file.qlook}">
      <span class="icon-glyph">${fileIconInnerHTML(file.kind)}</span>
      <span>${file.label.replace(/\.(jpg|mp4|mp3)$/,'')}</span>
    </button>`;
  });
  container.innerHTML = html;
}

renderDesktopIcons();
renderDock('dockDesktop');
renderMobileGrid();
renderDock('dockMobile');


/* =====================================================================
   FINESTRE, QUICK LOOK, NOTE, OROLOGIO
   (invariato — usa event delegation così funziona anche con le icone
   generate dinamicamente qui sopra)
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

// Event delegation: funziona anche per le icone create dinamicamente
document.addEventListener('click', (e) => {
  const winTrigger = e.target.closest('[data-window]');
  if(winTrigger){
    e.preventDefault();
    openWindow(winTrigger.dataset.window);
    return;
  }
  const qlTrigger = e.target.closest('[data-qlook]');
  if(qlTrigger){
    e.preventDefault();
    openQuickLook(qlTrigger.dataset.qlook);
    return;
  }
  const closeTrigger = e.target.closest('[data-close]');
  if(closeTrigger){
    closeWindows();
    return;
  }
  const qcloseTrigger = e.target.closest('[data-qclose]');
  if(qcloseTrigger){
    closeQuickLook();
    backdrop.classList.remove('show');
    return;
  }
});

backdrop.addEventListener('click', () => { closeWindows(); closeQuickLook(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape'){ closeWindows(); closeQuickLook(); } });

// App Notes: contenuto di ogni nota (segnaposto — sostituisci con i tuoi appunti)
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
