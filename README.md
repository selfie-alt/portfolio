# denniedelfin.art

Sito portfolio in HTML/CSS/JS puro, stile desktop macOS (versione desktop)
e home iPhone (versione mobile).

## Struttura del progetto

```
denniedelfin-art/
├── index.html          → pagina principale del sito
├── css/
│   └── style.css        → tutti gli stili
├── js/
│   └── main.js           → logica di apertura finestre, Quick Look, orologio
└── assets/
    ├── images/           → qui vanno le tue foto (street photography, pittura)
    ├── video/            → qui vanno i tuoi video (reel, clip)
    └── audio/            → qui vanno i tuoi mp3 (dj set, beatmaking)
```

## Cambiare quante icone mostrare (desktop e dock)

Apri `js/main.js`: in cima al file trovi due liste (`DESKTOP_APPS` e
`DOCK_APPS`) e due numeri:

```js
const DESKTOP_ICON_COUNT = 6;   // quante icone-app sul desktop / home iOS
const DOCK_ICON_COUNT = 6;      // quante icone nel dock
```

Per **mostrarne di meno**, abbassa il numero (es. `DOCK_ICON_COUNT = 3`
mostra solo le prime 3 della lista `DOCK_APPS`).
Per **aggiungerne altre**, aggiungi una nuova riga dentro `DESKTOP_APPS` o
`DOCK_APPS` con lo stesso formato delle altre (serve anche l'icona PNG
corrispondente dentro `assets/icons/`), poi alza il numero.

Le posizioni sul desktop vengono ricalcolate automaticamente in modo
sparso-ma-centrato per qualunque quantità — non serve toccare percentuali
o coordinate a mano, e le icone non si sovrappongono mai.

Per nascondere del tutto le icone "file" (scatto-01.jpg, reel-01.mp4,
beat-01.mp3), metti `SHOW_FILE_ICONS = false` nello stesso file.

## Icone personalizzate (PNG)

Tutte le icone principali (app del desktop, dock) sono immagini PNG dentro
`assets/icons/`, non più disegni SVG — così puoi sostituirle facilmente
con le tue:

```
assets/icons/
├── about.png         → icona "About Me"
├── notes.png         → icona "Notes"
├── foto.png           → icona "Street Photography"
├── design.png         → icona "Design"
├── musica.png         → icona "Musica"
├── pittura.png         → icona "Pittura"
├── instagram.png       → icona Instagram nel dock
├── photoshop.png       → icona "Editor foto" nel dock
├── illustrator.png     → icona "Vettoriale" nel dock
└── premiere.png        → icona "Video" nel dock
```

Per sostituirle: crea la tua immagine (consigliato **PNG con sfondo
trasparente**, quadrata, almeno 256×256px) e salvala con **lo stesso nome
esatto** del file che vuoi sostituire — verrà usata automaticamente,
senza bisogno di toccare il codice HTML o CSS.

Il colore di sfondo colorato dietro l'icona (il "tile" arrotondato) resta
quello già impostato nel CSS — la tua PNG ci si sovrappone sopra. Se vuoi
cambiare anche quel colore, cerca nel file `css/style.css` le classi
`.foto-grad`, `.design-grad`, `.musica-grad`, `.pittura-grad`,
`.about-grad`, `.notes-grad` (per le icone del desktop) oppure gli stili
inline `background: linear-gradient(...)` nell'HTML per le icone del dock
(Instagram, Photoshop, ecc.).

## Cosa devi personalizzare

1. **Testi segnaposto**: cerca "segnaposto" dentro `index.html` (bio, note,
   titoli dei lavori) e sostituiscili con i tuoi contenuti reali.

2. **Immagini dei lavori** (Street Photography / Pittura): dentro
   `index.html` cerca le classi `.work-thumb foto-grad` e `.work-thumb
   pittura-grad` — sono div vuoti con un colore di sfondo. Per mettere una
   foto vera, aggiungi dentro il div: `<img src="assets/images/nome-foto.jpg"
   alt="...">` e togli il colore di sfondo dal CSS se non ti serve più.

3. **File Quick Look** (le tre icone `scatto-01.jpg`, `reel-01.mp4`,
   `beat-01.mp3` sul desktop): metti i tuoi file dentro `assets/images/`,
   `assets/video/`, `assets/audio/` e aggiorna i percorsi `src="..."` dentro
   `index.html` (cerca `assets/scatto-01.jpg`, `assets/reel-01.mp4`,
   `assets/beat-01.mp3`).

4. **Tracce musicali**: nella finestra "Musica" ci sono dei tag `<audio>`
   con `src="assets/track-01.mp3"` ecc. — sostituisci con i percorsi dei
   tuoi mp3 reali dentro `assets/audio/`.

5. **Link social**: i pulsanti Instagram e le icone Photoshop/Illustrator/
   Premiere nel dock puntano tutti a `href="#"` — sostituiscili con i tuoi
   link veri (profilo Instagram, Behance, ecc.).

## Come pubblicarlo

1. Carica tutta questa cartella (mantenendo la struttura) nel tuo repo GitHub.
2. Su Vercel: "Add New... → Project" → seleziona il repo → Import → Deploy.
   Non serve nessuna configurazione particolare, è un sito statico puro.
3. Quando sei pronto, collega il dominio denniedelfin.art da
   Settings → Domains nel progetto Vercel.
