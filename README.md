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
