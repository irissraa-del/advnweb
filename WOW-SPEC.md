# ADVN redesign: the screening room
## Concept
A creative studio presented as a living screening room: actual campaign imagery fills the screen; an unusually large ADVN wordmark and precise broadcast-like controls frame the work. Work is the first impression. Cinematic dark direction; no brown/gold, arch shapes, orbit lines, cookie cutter text/cards or repeated pill buttons.
## Tokens
Background #101112, surface #191b1d, text #f5f5ef, muted #adb0aa, acid accent #dcfa78, light chapter #eceee7, line rgba(245,245,239,.2). Low radii (0-4px); circles only for directional/video controls. Typography Hanken Grotesk 400/500/600/700/800 with intentional contrast, labels monospace. Avoid all-caps Archivo Black block headings.
## Motif
Film-frame brackets and slashes as small purposeful framing, repeated in hero controls, work labels, project section numbers, film reel, contact.
## Blueprint
1. Full viewport hero: real supplied campaign photo/video as full bleed, sophisticated scrim for readability. Custom wordmark, minimal desktop nav and strong lime contact control. Large confident heading with crafted line breaks, short clear description. Visible project-selector thumbnails (three) switch hero image/background and captions; play/reel action plus pause control. Mobile image-first composition has image/story and title arranged specifically, no horizontal overflow.
2. Intro on light paper: sharp asymmetric type, concise statement of creative offering, index/scroll cue. Not a service-card template.
3. Selected work: three distinct compositions. Maison fullbleed image pair with a slim caption and clear view case control; Slano acid/black or red image-led rail with oversized artwork and supporting activation image; King Rolls warm photography with offset food crop. Can render project cards from data but each has distinct layout. Avoid a generic filters/card grid. Project buttons open immersive accessible full-screen case viewer with images and film videos; videos should appear near top instead of after eight stills. Dynamic counts.
4. Moving image section: portrait film strips / swipe rail with functioning play. Poster frames actual clips, not one reused image for every film. Same accessible viewer can handle film mode.
5. Studio capability area: short direct studio copy, big typographic service rows (not chips), real food/activation image in layout. No fake team portrait.
6. Contact: oversized direct 'Have something in mind?' or 'Let’s make your next move.' with a large custom arrow/button and Instagram destination. Strong conversion, no fake forms. Footer with brand wordmark, work/studio/contact anchors.
## Motion
Two patterns: 800ms clip/mask opening and 180ms hover/focus changes; image subtle drift optional. Hero project crossfade 500ms. Disable autoplay and parallax on prefers-reduced-motion, show poster. Never hide content by default. All native scroll, no dependency needed.
## Implementation
Interface agent owns dist/index.html, dist/styles.css, dist/main.js. Keep dist/projects.js usable, avoid changing unless coordinated. Main agent owns BRIEF.md, WOW-SPEC.md, README, assets/video posters, manifest and publishing.
## Gate
# The gate — nothing ships until every line passes

Paste this section verbatim into `WOW-SPEC.md` §7. Report honestly which items you verified and
which you skipped; "it builds" is not a passing grade.

---

## A. Facts (zero tolerance)

- [ ] Every name, phone, email, address, social handle, price, stat, certification matches `BRIEF.md`
- [ ] Zero invented testimonials, reviews, ratings, client logos, awards, team members, statistics
- [ ] Zero lorem / placeholder / "Company Name" / example.com
- [ ] Client's logo correct file, correct clear-space, not stretched
- [ ] Bilingual: Arabic reads as native Arabic (not machine-translated), `dir="rtl"` at layout
      level, language choice persists across navigation
- [ ] No content that offends the market (e.g. no alcohol/bar/wine imagery for Jordanian brands)

## B. Links & interaction

- [ ] Zero `href="#"` and zero dead buttons — every control does something real
- [ ] `mailto:` / `tel:` / `wa.me/<intl>` / Google Maps URL all open correctly
- [ ] Every social link resolves to the client's real profile
- [ ] Anchors go through the Lenis helper (native `scrollTo` is intercepted and silently fails)
- [ ] `scroll-margin-top` set so the sticky nav doesn't cover targets
- [ ] Forms submit somewhere real, validate inline, and show a real success state

## C. Device & responsive

- [ ] 390 / 768 / 1280 / 1920 all inspected visually, not just "responsive classes present"
- [ ] **Zero horizontal scroll at any width** (`overflow-x: clip` on the wrapper, and find the
      actual overflowing child — clipping alone hides bugs)
- [ ] Tap targets ≥44px; primary action in the thumb zone
- [ ] Mobile is re-laid-out, not squeezed: counter-stagger removed, display type re-scaled,
      horizontal sections swipeable, hover-only affordances made visible
- [ ] Safe-area insets respected on notched devices

## D. Motion & performance

- [ ] 60fps while scrolling (check with the perf panel). If everything is exactly 30.0fps, check
      `pmset -g batt` — Chrome Energy Saver caps at 30, it's not your code
- [ ] transform/opacity only in scroll handlers; no `filter: blur` or layout props animated
- [ ] `prefers-reduced-motion`: transforms off, content still fully visible and reachable, video
      falls back to a poster — **never gate content on it** (Chrome Battery Saver forces reduce)
- [ ] Reveals fire once, not on every pass; no re-mount shake from unstable `key`s
- [ ] No layout shift on load: every image/video/embed has a reserved aspect ratio; fonts
      preloaded with matched fallback metrics
- [ ] Hero payload < 1MB; LCP < 2.5s on throttled 4G
- [ ] Video ≤3MB, 720p, CRF 27, `-an -movflags +faststart`, poster extracted, compressed with
      **ffmpeg-static** (Playwright's bundled ffmpeg can't decode H.264)
- [ ] Images ≤600KB (`sips -s format jpeg -s formatOptions 72 -Z 2200`), modern formats served

## E. Accessibility & correctness

- [ ] Contrast checked per band with real ratios — especially muted-on-surface and accent-as-text
- [ ] Focus rings present and designed on every interactive element; keyboard-only pass completes
- [ ] Semantic headings in order, landmarks, alt text on meaningful images, `aria-label` on
      icon-only buttons
- [ ] DevTools console clean: zero errors, zero React key/hydration warnings
- [ ] Works with JS partially failed — text and contact details survive

## F. Polish & shipping

- [ ] Favicon, OG image, per-page `<title>` + description, `theme-color`
- [ ] Designed 404 and designed empty/loading states
- [ ] `::selection` styled; scrollbar considered
- [ ] Preloader `sessionStorage`-gated (plays once, not on every navigation)
- [ ] Analytics installed with one event on the primary action
- [ ] Opened in the user's real browser, screenshotted desktop + 390px, screenshots reviewed

## G. Uniqueness (the last gate)

- [ ] For each section: *could this appear unchanged on another site?* Any yes → redesign it
- [ ] The motif appears 6+ times and is unmistakably this project's
- [ ] Exactly one accent, one display face, ≤2 motion patterns
- [ ] The signature moment exists, works on mobile, and is the thing you'd screenshot

---

## Traps already paid for — check these by default

**Ground flips.** Dark→light conversions break color ramps, orphan dark plates, and turn
accent-as-text unreadable. Grep finds none of it. Sweep every band visually.

**Lenis vs native scroll.** Native `scrollTo` and anchor jumps silently do nothing.

**Reduced-motion / battery saver.** Chrome Battery Saver forces `prefers-reduced-motion: reduce`;
Chrome Energy Saver caps at 30fps. Never gate hero video on reduced-motion; check battery before
profiling.

**Fake-looking mockups.** Hand-drawn HTML "app screenshots" read as fake. Use real captures, or
make the mockup dense with real data and zero illustration.

**overflow-x.** `clip` on the wrapper hides the symptom; find the child that overflows.

**Static asset caching.** SvelteKit `/static` ships `max-age=0` on fonts/images — the CDN TTL must
be set to *ignore* cache-control to override it.

**WebKit media cache.** iOS `<video>` ignores `fetch()` cache entirely. Test in Playwright webkit,
not just Chrome.

**Vite/GLSL.** `vite-plugin-glsl@1.6` silently blanks Vite 5 builds — use `?raw` imports.

**drei `<Environment>`** fetches an HDR over the network and blanks the Canvas offline — vendor
the HDRI locally.

**three.js.** `SkeletonUtils.clone` for skinned meshes (plain clone leaks + misbinds); widen FOV
by aspect on portrait viewports or the subject crops; additive animation tracks scale amplitude.

**Hosting from Jordan.** `*.vercel.app` is unreachable from JO — deploy to Firebase Hosting, or
put the custom domain behind Cloudflare. Verify the client can actually load the URL.

**Node runtime.** Node lives at `~/.local/node/bin` and is not on PATH:
`export PATH="$HOME/.local/node/bin:$PATH"`.

**Multi-session git.** Never `git commit -a` in a shared repo; use `git commit -o -- <paths>`.

**Charts.** Never library-default colors — follow the `dataviz` skill.

**Firebase.** A 403 is rules, not credentials; Firestore offline returns a silent empty result;
Auth must be explicitly enabled in the console before it works.
