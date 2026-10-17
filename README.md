# ADVn Digital portfolio — transfer package

**This is the ADVn Digital studio version: dark violet and pink.**
It includes the campaign-image hero, full-bleed scrolling image wall as section
2, generated service banners, animated selected work, archive deck, films,
contact brief composer and kinetic pink footer. It does not load the later Israa
personal rebrand or the ivory/blue design.

## Run

Double-click `Start Portfolio.command` on macOS, or run:

```sh
python3 -m http.server 4178 --bind 127.0.0.1 --directory dist
```

Open http://localhost:4178. Stop with Control-C. Python 3 is required; no build
step, npm installation or API key is needed for the existing website.

## Message to your sister’s Codex

> Open this ADVn Digital project and read START-HERE.md and AGENTS.md. Run it
> locally. Preserve the dark violet/pink ADVn brand, nine projects and animation
> sequences. Ask me what I want to change next.

## Edit map

- `dist/index.html`: page structure and script/style order.
- `dist/projects.js`: nine projects, media references, Canva/Behance source links.
- `dist/main.js`: hero selection, case viewers, films and mobile menu.
- `dist/universe.*`: generated service banners and full-bleed image wall.
- `dist/editorial.*`: project content, studio, featured film and brief composer.
- `dist/showcase.*`: selected campaign scenes and archive deck structure/style.
- `dist/choreography.*`: GSAP scroll sequences and responsive motion.
- `dist/finale.*`: contact/kinetic footer.
- `dist/styles.css`, `dist/motion.css`: still-loaded base layers; preserve order.
- `dist/motion.js`: unused earlier iteration.
- `dist/assets/`: all website images, films, PDFs, fonts and local GSAP files,
  plus generated service-banner PNGs and prompt set.
- `assets/`: original source media retained for future edits.

The nine projects include two Canva presentation links. Canva exports were not
available, so those link to the originals. Weitnauer has a cover and Behance link;
OJAR includes its eight-page PDF and all page images. Generated service banners
are illustrative service artwork, not client case studies.
Contact: https://www.instagram.com/advndigital/.
The brief composer prepares text locally for copy/paste; it does not send data.

## Firebase

Site: https://advn-digital-portfolio.web.app
Firebase project: `loom-clients`; isolated site: `advn-digital-portfolio`.
This package does not change whatever version is currently live.

```sh
npm install -g firebase-tools
firebase login
firebase deploy --only hosting --project loom-clients
```

Deploying to the existing site requires access to that Firebase project. No
account credentials are included. For a separate deployment, create a project
and site in the new account and update `.firebaserc` and `firebase.json` first.

Includes complete source/assets/configuration. Omits Git history, caches,
temporary files, debug logs and account-specific Sites metadata. The old
BRIEF.md and WOW-SPEC.md are historical notes; current code is authoritative.

# advnweb
