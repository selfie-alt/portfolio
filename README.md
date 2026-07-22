# Dennie Delfin — Portfolio (skin "macOS clean")

Sito statico, codice puro HTML/CSS/JS (nessun framework).

## Struttura
- `index.html` — markup (desktop macOS + home iOS + finestre + Quick Look)
- `css/style.css` — tutto lo stile (skin Skate/Surf: screenprint, adesivi, mezzatinta)
- `js/main.js` — genera icone/dock e gestisce finestre, Quick Look, note, orologio
- `assets/` — icone, foto, video, audio (vedi assets/LEGGIMI.txt)

## Come provarlo in locale
Aprire `index.html` nel browser. Per far funzionare i font e i media
serve una pagina servita via http (non `file://` in alcuni browser):
    python3 -m http.server 8000
poi apri http://localhost:8000

## Personalizzazioni rapide (js/main.js)
- `DESKTOP_ICON_COUNT` / `DOCK_ICON_COUNT` — quante icone mostrare
- `SHOW_FILE_ICONS` — mostra/nasconde le anteprime file (foto/video/audio)
- `MOBILE_OVERLAP` — quanto si sovrappongono le icone su mobile (0 = griglia pulita, 1 = molto accavallate)
- Le liste `DESKTOP_APPS`, `FILE_ICONS`, `DOCK_APPS` — etichette, icone, finestre collegate

## Deploy
Push del repo su GitHub -> Vercel (progetto statico, nessuna build).
