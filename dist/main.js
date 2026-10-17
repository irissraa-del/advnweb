(() => {
  'use strict';
  const projects = (window.portfolioProjects || []).map((project,index) => ({...project, number:String(index + 1).padStart(2,'0')}));
  document.querySelectorAll('[data-project-count]').forEach(el => { el.textContent = String(projects.length).padStart(2,'0'); });
  const dialog = document.getElementById('case-dialog');
  const content = document.getElementById('case-content');
  let active = 0;
  let returnFocus = null;
  const heroVideo = document.getElementById('hero-video');
  const heroImage = document.getElementById('hero-image');
  const playLabel = document.getElementById('hero-play-label');
  const playButton = document.getElementById('hero-play');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function stopHero() { heroVideo.pause(); heroVideo.hidden = true; heroImage.hidden = false; playLabel.textContent = 'Play film'; playButton.setAttribute('aria-label', 'Play featured campaign film'); }
  function selectProject(index) {
    const project = projects[index]; if (!project) return;
    active = index; stopHero();
    heroImage.src = project.heroCover || project.cover; heroImage.alt = project.heroAlt || project.coverAlt;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroImage.animate([{opacity:.45,transform:'scale(1.025)'},{opacity:1,transform:'scale(1)'}],{duration:500,easing:'cubic-bezier(.16,1,.3,1)'});
    }
    document.getElementById('hero-client').textContent = project.client;
    document.getElementById('hero-index').textContent = String(index + 1).padStart(2,'0');
    document.querySelectorAll('[data-project]').forEach(button => { const selected = Number(button.dataset.project) === index; button.classList.toggle('active',selected); button.setAttribute('aria-pressed',String(selected)); });
    playButton.hidden = !project.videos?.length;
  }
  const switcher = document.querySelector('.project-switcher');
  const featured = projects.map((project,index) => ({project,index})).filter(({project}) => project.showInHero !== false && project.cover);
  if (featured.length) switcher.innerHTML = featured.map(({project,index}) => `<button class="project-thumb ${index === 0 ? 'active' : ''}" data-project="${index}" aria-label="Show ${escape(project.client)}" aria-pressed="${index === 0}"><img src="${escape(project.cover)}" alt=""><span>${String(index+1).padStart(2,'0')}</span></button>`).join('');
  const additions = projects.slice(3);
  if (additions.length) {
    const group = document.createElement('div'); group.className = 'additional-work-grid';
    const label = document.createElement('div'); label.className = 'additional-work-heading';
    label.innerHTML = '<span class="eyebrow">THE PROJECT ARCHIVE</span><h2>More ways to<br>make a mark.</h2>';
    document.getElementById('work').append(label,group);
    additions.forEach(project => {
      const article = document.createElement('article'); article.className = 'project project-additional';
      const heading = `<div class="project-heading"><h2>${escape(project.client)}</h2><span>${escape(project.number)} / ${escape(project.disciplines)}</span></div>`;
      if (project.externalOnly) {
        article.classList.add('project-external');
        article.innerHTML = heading + `<a class="presentation-link" href="${escape(project.sourceUrl)}" target="_blank" rel="noopener"><span class="eyebrow">SHARED PRESENTATION</span><strong>Open the<br>design story.</strong><span class="presentation-action">View in Canva <b>↗</b></span></a>`;
      } else {
        article.innerHTML = heading + `<button class="project-stage additional-stage" data-case="${escape(project.id)}" aria-label="Explore ${escape(project.client)}"><img src="${escape(project.cover)}" alt="${escape(project.coverAlt)}" loading="lazy"><span class="stage-action">Explore project <span>↗</span></span></button><div class="project-caption"><p>${escape(project.title)}</p></div>`;
      }
      group.append(article);
    });
  }
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => selectProject(Number(button.dataset.project))));
  playButton.addEventListener('click', async () => {
    const project = projects[active]; if (!project?.videos?.length) return;
    if (!heroVideo.paused) { stopHero(); return; }
    const film = project.videos.find(f => f[1] === 'electra-film') || project.videos[0];
    heroVideo.src = `./assets/videos/${film[1]}.mp4`; heroVideo.poster = `./assets/posters/${film[1]}.webp`; heroVideo.hidden = false; heroImage.hidden = true;
    try { await heroVideo.play(); playLabel.textContent = 'Pause film'; playButton.setAttribute('aria-label','Pause featured campaign film'); } catch { stopHero(); openCase(project.id,film[1]); }
  });
  function openCase(id, selectedFilm) {
    const project = projects.find(p => p.id === id); if (!project) return;
    returnFocus = document.activeElement; stopHero();
    const videos = [...(project.videos || [])];
    if (selectedFilm) videos.sort((a,b) => Number(b[1] === selectedFilm)-Number(a[1] === selectedFilm));
    else videos.sort((a,b) => Number(b[1] === 'electra-film')-Number(a[1] === 'electra-film'));
    content.innerHTML = `<div class="case-intro"><div><span class="eyebrow">PROJECT ${escape(project.number)} / ${escape(project.disciplines)}</span><h2 id="case-title">${escape(project.client)}</h2></div><p>${escape(project.description)}</p></div>${videos.length ? `<div class="case-films" role="region" tabindex="0" aria-label="Project films, scroll horizontally">${videos.map(([title,file]) => `<div class="case-film"><video controls playsinline preload="none" poster="./assets/posters/${escape(file)}.webp" aria-label="${escape(title)}"><source src="./assets/videos/${escape(file)}.mp4" type="video/mp4"></video><p>${escape(title)} / FILM</p></div>`).join('')}</div>` : ''}${project.sourceUrl ? `<div class="case-source"><a href="${escape(project.sourceUrl)}" target="_blank" rel="noopener">${escape(project.sourceLabel || 'View original project')} <span>↗</span></a></div>` : ''}<div class="case-gallery ${project.gallery.length === 1 ? 'case-gallery-single' : ''}" ${project.previewWidth ? `style="--preview-width:${Number(project.previewWidth)}px"` : ''}>${project.gallery.map((file,index) => `<img src="./assets/work/${escape(file)}.webp" alt="${escape(project.client)} — ${escape(file.replace(/^(electra|slano|rolls)-/,'').replace(/-/g,' '))}" loading="${index < 2 ? 'eager' : 'lazy'}">`).join('')}</div><div class="case-end"><p>Let’s make your next move.</p><a href="https://www.instagram.com/advndigital/" target="_blank" rel="noopener">Start a conversation ↗</a></div>`;
    dialog.showModal(); dialog.scrollTop = 0;
    if (selectedFilm) content.querySelector('video')?.play().catch(() => {});
    content.querySelectorAll('video').forEach(video => video.addEventListener('play', () => content.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); })));
    document.getElementById('close-case').focus();
  }
  function closeCase() { dialog.close(); }
  dialog.addEventListener('close', () => { content.querySelectorAll('video').forEach(video => video.pause()); returnFocus?.focus(); });
  document.getElementById('close-case').addEventListener('click',closeCase);
  document.querySelector('.case-brand').addEventListener('click',closeCase);
  document.querySelectorAll('[data-case]').forEach(button => button.addEventListener('click', () => openCase(button.dataset.case)));
  document.getElementById('hero-case').addEventListener('click', () => openCase(projects[active]?.id));
  const films = projects.flatMap(project => (project.videos || []).map(film => ({project,...{title:film[0],file:film[1]}})));
  const preferred = ['electra-film','slano-event','electra-bottle','slano-launch','electra-sand','electra-spray','electra-mark'];
  films.sort((a,b) => preferred.indexOf(a.file)-preferred.indexOf(b.file));
  if (films.length) {
    const rail = document.getElementById('film-rail'); rail.innerHTML = films.map(({project,title,file},index) => `<button class="film-card" data-film="${escape(file)}" data-film-project="${escape(project.id)}" aria-label="Watch ${escape(title)}"><div class="film-art"><img src="./assets/posters/${escape(file)}.webp" alt="${escape(title)} film still" loading="lazy"><span class="circle">▶</span></div><div><span>${escape(title)}</span><small>${String(index+1).padStart(2,'0')} / FILM</small></div></button>`).join('');
    rail.querySelectorAll('[data-film]').forEach(button => button.addEventListener('click', () => openCase(button.dataset.filmProject,button.dataset.film)));
  }
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-nav');
  const background = [...document.querySelectorAll('main, footer')];
  function closeMenu() {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded','false');
    menuButton.innerHTML = 'Menu <span>+</span>';
    document.querySelector('.header').classList.remove('menu-open');
    document.body.classList.remove('menu-is-open');
    background.forEach(element => { element.inert = false; });
  }
  menuButton.addEventListener('click', () => {
    if (!menu.hidden) { closeMenu(); return; }
    menu.hidden = false;
    menuButton.setAttribute('aria-expanded','true');
    menuButton.innerHTML = 'Close <span>×</span>';
    document.querySelector('.header').classList.add('menu-open');
    document.body.classList.add('menu-is-open');
    background.forEach(element => { element.inert = true; });
  });
  document.addEventListener('keydown', event => {
    if (menu.hidden || event.key !== 'Tab') return;
    const focusable = [menuButton, ...menu.querySelectorAll('a')];
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); } });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { stopHero(); content.querySelectorAll('video').forEach(video => video.pause()); } });
})();
