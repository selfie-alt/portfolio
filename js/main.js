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

  document.querySelectorAll('[data-window]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openWindow(el.dataset.window);
    });
  });
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.addEventListener('click', closeWindows);
  });
  backdrop.addEventListener('click', () => { closeWindows(); closeQuickLook(); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape'){ closeWindows(); closeQuickLook(); } });

  // Quick Look — anteprima file multimediali (stile macOS, animazione a molla)
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
  document.querySelectorAll('[data-qlook]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openQuickLook(el.dataset.qlook);
    });
  });
  document.querySelectorAll('[data-qclose]').forEach(btn => {
    btn.addEventListener('click', () => { closeQuickLook(); backdrop.classList.remove('show'); });
  });

  // App Notes: contenuto di ogni nota (segnaposto — sostituisci con i tuoi appunti)
  const notesContent = {
    1: { date: 'luglio 2026', body: 'Nuova serie in lavorazione, presto online. Questo testo è un segnaposto: sostituiscilo con i tuoi appunti veri.' },
    2: { date: 'giugno 2026', body: 'Aggiornata la sezione progetti del sito. Questo testo è un segnaposto: sostituiscilo con i tuoi appunti veri.' },
    3: { date: 'maggio 2026', body: 'Appunti sparsi da sviluppare. Questo testo è un segnaposto: sostituiscilo con i tuoi appunti veri.' }
  };
  document.querySelectorAll('.notes-list-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.notes-list-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const note = notesContent[item.dataset.note];
      document.getElementById('noteDate').textContent = note.date;
      document.getElementById('noteBody').textContent = note.body;
    });
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
