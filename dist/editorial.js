(() => {
  const projects=window.portfolioProjects;
  const work=document.getElementById('work');
  const lead=document.createElement('div');lead.className='work-lead';lead.innerHTML='<div><span class="eyebrow">A SELECTION OF BRAND WORLDS</span><h2>Not just seen.<br><em>Remembered.</em></h2></div><p>Different brands. Different expressions.<br>A closer look at the ideas we’ve brought to life.</p>';
  work.querySelector('.section-label').after(lead);
  const featured=[...work.querySelectorAll(':scope > .project:not(.project-additional)')];
  featured.forEach((article,i)=>{
    const p=projects[i];
    article.classList.add('editorial-project');
    const stage=article.querySelector('.project-stage');
    if(i===1){const image=stage.querySelector('.slano-art img');image.src='./assets/work/slano-summer.webp';image.alt='Slatko ili Slano outdoor cinema campaign';}
    const overlay=document.createElement('span');overlay.className='project-overlay';overlay.innerHTML=`<span class="project-kicker">SELECTED / 0${i+1}</span><span class="project-display">${['A world<br>of desire.','A taste for<br>the unexpected.','A little twist.<br>A lot of joy.'][i]}</span><span class="project-open">View the story <b>↗</b></span>`;
    stage.append(overlay);
    article.querySelector('.project-heading').innerHTML=`<h2>${p.client}</h2><span>${p.disciplines}</span>`;
    const number=document.createElement('span');number.className='project-counter';number.textContent=`0${i+1} / 03`;article.querySelector('.project-caption').append(number);
  });
  const archiveHeading=work.querySelector('.additional-work-heading');
  archiveHeading.id='archive';archiveHeading.innerHTML='<div><span class="eyebrow">THE EXTENDED EDIT / 06 PROJECTS</span><h2>More to<br><em>the story.</em></h2></div><p>From the smallest brand detail<br>to a whole new environment.<br><span>Explore the ideas in between.</span></p>';
  const grid=work.querySelector('.additional-work-grid');
  const filters=document.createElement('div');filters.className='archive-filters';filters.setAttribute('role','group');filters.setAttribute('aria-label','Filter the project archive');
  filters.innerHTML='<button type="button" data-filter="all" aria-pressed="true">All work <span>06</span></button><button type="button" data-filter="identity" aria-pressed="false">Brand identity</button><button type="button" data-filter="presentations" aria-pressed="false">Presentations</button>';
  grid.before(filters);
  const archive=[...grid.children];
    archive.forEach((article,i)=>{
    const project=projects[i+3];
    article.classList.add('archive-entry');article.dataset.archiveProject=project.id;
    const heading=article.querySelector('.project-heading');
    const copy=document.createElement('div');copy.className='archive-copy';
    const index=document.createElement('span');index.className='archive-index';index.textContent=`0${i+4} / THE EXTENDED EDIT`;copy.append(index,heading);
    const description=document.createElement('p');description.className='archive-description';
    description.textContent=[
      'A Swiss brand story. Discover the complete Weitnauer Group project on Behance.',
      'A bold identity that moves from the training floor to the social feed.',
      'Greek warmth. Italian character. One distinctive restaurant identity.',
      'A brand you can step into. Retail displays and spatial concepts for men’s grooming.',
      'An additional design presentation, shared in its original Canva format.',
      'More creative thinking, presented in its original Canva format.'
    ][i];copy.append(description);
    const cue=document.createElement('button');cue.type='button';cue.className='archive-cue';cue.addEventListener('click',()=>article.querySelector('.additional-stage,.presentation-link').click());cue.innerHTML=project.externalOnly?'OPEN PRESENTATION <b>↗</b>':'EXPLORE THE PROJECT <b>↗</b>';copy.append(cue);
    const caption=article.querySelector('.project-caption');caption?.remove();
    article.append(copy);
    const stage=article.querySelector('.additional-stage');
    if(stage){
      const extra={
        'bezdrob-transformation':['bezdrob-1','bezdrob-3'],
        'ojar-mens-grooming':['ojar-grooming-4','ojar-grooming-7'],
        'nostimo-restaurant':['restaurant-brand']
      }[project.id]||[];
      extra.forEach((name,j)=>{const image=document.createElement('img');image.className=`archive-detail archive-detail-${j}`;image.src=`./assets/work/${name}.webp`;image.alt=`${project.client} project detail`;image.loading='lazy';stage.append(image);});
      stage.querySelector('.stage-action').innerHTML='<span>↗</span>';
    }else{
      const link=article.querySelector('.presentation-link');
      link.querySelector('strong').innerHTML=`Presentation<br>0${i-3}`;
      const paper=document.createElement('span');paper.className='presentation-paper';paper.setAttribute('aria-hidden','true');paper.innerHTML='<i></i><i></i><i></i><b>ADVn</b>';link.prepend(paper);
      link.setAttribute('aria-label',`Open Canva presentation ${i-3}`);
    }
  });
  const films=document.getElementById('films');
  films.querySelector('.section-label').innerHTML='<span>03 / THE SCREENING ROOM</span><span>LOOK CLOSER. PRESS PLAY.</span>';
  films.querySelector('.film-heading h2').innerHTML='A story.<br><em>A feeling. A film.</em>';
  films.querySelector('.film-heading p').innerHTML='An image sets the mood.<br>Movement takes you somewhere.';
  const theatre=document.createElement('div');theatre.className='feature-theatre';
  theatre.innerHTML='<div class="theatre-screen"><video id="screening-video" controls playsinline preload="none" poster="./assets/work/electra-hero.webp" aria-label="Electra Elixir campaign film"><source src="./assets/videos/electra-film.mp4" type="video/mp4"></video><button type="button" class="theatre-play" id="screening-play"><span>▶</span><b>PLAY THE CAMPAIGN</b></button><div class="theatre-title"><span>NOW SHOWING / 01</span><h3>Electra Elixir</h3><p>Maison de l’Avenir · Campaign film</p></div></div><div class="theatre-caption"><span>A SCENT BECOMES A STORY.</span><span>SOUND ON. WORLD OFF.</span></div>';
  films.querySelector('.film-heading').after(theatre);
  const player=document.getElementById('screening-video');const play=document.getElementById('screening-play');
  play.addEventListener('click',()=>{player.play().catch(()=>{player.controls=true;});});
  player.addEventListener('play',()=>{theatre.classList.add('is-playing');document.querySelectorAll('video').forEach(other=>{if(other!==player)other.pause();});});
  player.addEventListener('ended',()=>theatre.classList.remove('is-playing'));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)player.pause();});
  document.getElementById('case-dialog').addEventListener('toggle',()=>player.pause());
  document.querySelectorAll('[data-case],[data-film],#hero-case').forEach(button=>button.addEventListener('click',()=>player.pause()));
  const filmSubhead=document.createElement('div');filmSubhead.className='film-selection-label';filmSubhead.innerHTML='<span>MORE FROM THE EDIT</span><span>DRAG TO EXPLORE ↔</span>';document.getElementById('film-rail').before(filmSubhead);
  document.getElementById('footer-year').textContent=new Date().getFullYear();
  const form=document.getElementById('brief-builder');
  form.addEventListener('submit',event=>{
    event.preventDefault();const data=new FormData(form);const services=data.getAll('service');
    document.getElementById('brief-preview').value=`Hi ADVn! I’m ${String(data.get('name')).trim()}.\n\n${services.length?'I’m interested in '+services.join(', ')+'.\n\n':''}${String(data.get('idea')).trim()}\n\nI’d love to talk about working together.`;
    const result=document.getElementById('brief-result');result.hidden=false;document.getElementById('brief-preview').focus();window.ScrollTrigger?.refresh();
  });
  document.getElementById('copy-brief').addEventListener('click',async()=>{
    const text=document.getElementById('brief-preview');const status=document.getElementById('brief-status');
    try{await navigator.clipboard.writeText(text.value);status.textContent='Copied. Open Instagram and paste it into your message to @advndigital.';}catch{text.focus();text.select();status.textContent='Select and copy the message, then paste it into Instagram.';}
  });
})();
