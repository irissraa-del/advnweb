(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const projects=window.portfolioProjects.filter(p=>p.cover);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const logoCards=projects.map((p,i)=>`<a href="#work" class="brand-tile brand-${i}">${escape(p.client)}</a>`).join('');
  const brands=document.createElement('section');brands.className='brand-universe';brands.id='brands';
  brands.innerHTML=`<p class="cosmic-label">A FEW OF THE WORLDS I’VE EXPLORED</p><div class="brand-track"><div>${logoCards}${logoCards}</div></div><div class="brand-track reverse"><div>${logoCards}${logoCards}</div></div><button class="ambient-toggle" aria-pressed="false">Pause motion Ⅱ</button>`;
  document.querySelector('.intro').after(brands);
  const services=document.createElement('section');services.className='cosmic-services';services.id='services';
  const offerings=[
    ['Brand identity','Make your brand unmistakable.','We build the visual language that makes your brand feel like itself, from a distinctive logo to every detail around it.',['Brand direction','Logo systems','Visual guidelines'],'identity','Sculptural stationery and colour materials in pink and violet'],
    ['Campaigns & content','One idea. A world of possibilities.','We turn a clear concept into campaign visuals and social content with a recognisable point of view.',['Creative concepts','Campaign imagery','Social content'],'campaigns','Surreal rose campaign artwork on floating editorial panels'],
    ['Photography & film','Set the mood. Tell the story.','Considered light, expressive images and a strong sense of atmosphere. Still or moving, every frame has a purpose.',['Art direction','Photography','Campaign films'],'film','Cinema lens with rose satin and violet studio lighting'],
    ['Spaces & experiences','Bring the brand into the room.','We carry your identity into the physical world through thoughtful packaging, retail concepts and brand experiences.',['Packaging concepts','Retail displays','Brand activations'],'experiences','Sculptural pink retail display and violet architectural details']
  ];
  services.innerHTML=`<div class="cosmic-label">OUR CREATIVE WORLD</div><h2>From a first idea<br>to <em>a lasting impression.</em></h2><p class="cosmic-intro">Identity, imagery and experiences.<br>Made to work together. Made to feel like you.</p><div class="service-deck">${offerings.map(([title,line,desc,tags,asset,alt],i)=>`<article class="service-orbit"><div class="service-visual"><img src="./assets/services/${asset}-banner.webp" alt="${alt}" loading="lazy" width="1536" height="1024"><span class="service-art-label">ADVn / ${title.toUpperCase()}</span></div><div class="service-copy"><span class="service-number">0${i+1}</span><h3>${title}</h3><h4>${line}</h4><p>${desc}</p><div class="service-tags">${tags.map(tag=>`<span>${tag}</span>`).join('')}</div></div></article>`).join('')}</div>`;
  document.getElementById('work').before(services);
  const images=['electra-eye','slano-giveaway','bezdrob-3','rolls-founder','electra-profile','slano-activation','electra-bottle','rolls-strawberry','bezdrob-2','slano-summer','electra-hero','ojar-grooming-3','rolls-truck','electra-box','slano-cinema','bezdrob-4','electra-hold','slano-people','rolls-closeup','restaurant-brand'];
  const social=document.createElement('section');social.className='social-flight';social.id='social';
  social.innerHTML=`<div class="social-pin"><div class="social-frame"><div class="flying-wall" aria-hidden="true">${[0,1,2,3].map((col)=>`<div class="wall-column">${Array.from({length:4},()=>images.slice(col*5,col*5+5)).flat().map((name,i)=>`<div class="wall-tile"><img src="./assets/work/${name}.webp" alt="" loading="lazy"><span>ADVn / ${String(i+1).padStart(2,'0')} ↗</span></div>`).join('')}</div>`).join('')}</div><div class="social-vignette"></div><div class="social-copy"><span class="cosmic-label">SOCIAL MEDIA & CAMPAIGNS</span><h2>Content that<br><em>stops the scroll.</em></h2><p>Distinctive images. Moving stories. A whole world of ideas.<br>We turn your brand into content people feel.</p><a class="cosmic-button" href="https://www.instagram.com/advndigital/" target="_blank" rel="noopener">Explore ADVn on Instagram <span>↗</span></a></div><span class="flight-coordinate">ADVn / CREATIVE UNIVERSE</span><span class="flight-progress">SCROLL TO EXPLORE ↓</span></div></div>`;
  document.querySelector('.hero').after(social);
  const films=document.getElementById('films');
  films.querySelector('.film-heading h2').innerHTML='The <em>films.</em>';
  films.querySelector('.film-heading p').innerHTML='Campaigns, stories and moving images.<br>Pick a poster. Step into the world.';
  const controls=document.createElement('div');controls.className='poster-controls';controls.innerHTML='<span class="poster-position">01</span><span class="poster-total"></span><button aria-label="Previous films">←</button><button aria-label="Next films">→</button>';
  films.querySelector('.film-heading').append(controls);
  const rail=document.getElementById('film-rail');const cards=[...rail.querySelectorAll('.film-card')];
  controls.querySelector('.poster-total').textContent=` / ${String(cards.length).padStart(2,'0')}`;
  controls.querySelectorAll('button').forEach((button,i)=>button.addEventListener('click',()=>rail.scrollBy({left:(i?1:-1)*(cards[0]?.getBoundingClientRect().width+28),behavior:reduced.matches?'instant':'smooth'})));
  rail.addEventListener('scroll',()=>{const width=cards[0]?.getBoundingClientRect().width+28;controls.querySelector('.poster-position').textContent=String(Math.round(rail.scrollLeft/width)+1).padStart(2,'0');},{passive:true});
  cards.forEach((card,i)=>{const strap=document.createElement('div');strap.className='poster-strap';strap.innerHTML=`<span>ISRAA NASER PRESENTS</span><b>N° ${String(i+1).padStart(2,'0')}</b>`;card.querySelector('.film-art').append(strap);});
  const nav=document.querySelector('.header nav');nav.innerHTML='<a href="#intro">About</a><a href="#services">Services</a><a href="#work">Portfolio</a><a href="#films">Films</a><a href="#brands">Brands</a><a class="hire" href="#contact">Let’s talk <span>↗</span></a>';
  const dock=document.createElement('a');dock.className='social-dock';dock.href='https://www.instagram.com/advndigital/';dock.target='_blank';dock.rel='noopener';dock.setAttribute('aria-label','Contact ADVn on Instagram');dock.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="4" width="16" height="16" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.9" r=".6" fill="currentColor"/></svg>';document.body.append(dock);
  const progress=document.createElement('div');progress.className='page-progress';document.body.append(progress);
  // Deterministic particles move with the visitor rather than a perpetual loop.
  const sky=document.createElement('div');sky.className='cosmic-sky';sky.setAttribute('aria-hidden','true');
  sky.innerHTML=Array.from({length:44},(_,i)=>`<i style="--x:${(i*37.71)%100}%;--y:${(i*17.13)%100}%;--s:${i%9===0?7:2}px;--r:${i*41}deg" class="${i%9===0?'gold-fragment':''}"></i>`).join('');document.body.prepend(sky);
  let queued=false;const clamp=x=>Math.max(0,Math.min(1,x));
  function frame(){queued=false;const vh=innerHeight;progress.style.transform=`scaleX(${scrollY/Math.max(1,document.documentElement.scrollHeight-vh)})`;
    if(reduced.matches)return;

    sky.style.transform=`translateY(${-scrollY*.025%120}px)`;
    document.querySelectorAll('.service-orbit').forEach(el=>{const b=el.getBoundingClientRect(),entry=clamp((vh-b.top)/(vh*.7));el.style.setProperty('--entry',entry);});
  }
  const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(frame);}};addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);frame();
  // Continuous flight, with scroll displacement layered onto each column.
  const wallColumns=[...social.querySelectorAll('.wall-column')];
  let ambientPaused=false,lastTime=0,flightTime=0,mouseX=0,mouseY=0;
  const motionControl=document.createElement('button');motionControl.className='flight-motion-control';motionControl.textContent='Pause motion Ⅱ';motionControl.setAttribute('aria-pressed','false');social.querySelector('.social-frame').append(motionControl);
  motionControl.addEventListener('click',()=>{ambientPaused=!ambientPaused;motionControl.textContent=ambientPaused?'Resume motion ▷':'Pause motion Ⅱ';motionControl.setAttribute('aria-pressed',String(ambientPaused));});
  social.addEventListener('pointermove',e=>{const r=social.querySelector('.social-frame').getBoundingClientRect();mouseX=(e.clientX-r.left)/r.width-.5;mouseY=(e.clientY-r.top)/r.height-.5;});
  social.addEventListener('pointerleave',()=>{mouseX=0;mouseY=0;});
  let smoothedX=0,smoothedY=0;
  function fly(now){
    const delta=Math.min((now-lastTime)||0,50);lastTime=now;
    const r=social.getBoundingClientRect();
    if(!reduced.matches&&!ambientPaused&&!document.hidden){
      flightTime+=delta;
      smoothedX+=(mouseX-smoothedX)*.035;smoothedY+=(mouseY-smoothedY)*.035;
      if(r.bottom>0&&r.top<innerHeight){
        const p=clamp(-r.top/Math.max(1,r.height-innerHeight));
        social.querySelector('.flying-wall').style.transform=`translate3d(calc(-50% + ${smoothedX*35}px),calc(-50% - ${p*100}px),0) perspective(1200px) rotateX(${17+smoothedY*4}deg) rotateY(${smoothedX*4}deg) rotateZ(-25deg)`;
        wallColumns.forEach((col,i)=>{const travel=(flightTime*(.012+i*.002))%Math.max(1,(col.scrollHeight+15)/4);col.style.transform=`translateY(${-travel+-(i%2?700:1100)*p}px)`;});
      }
      sky.querySelectorAll('i').forEach((particle,i)=>{particle.style.transform=`translate3d(${Math.sin(flightTime*.00015+i)*22}px,${Math.cos(flightTime*.00012+i)*32}px,0) rotate(${i*41+flightTime*.008}deg)`;});
    }
    requestAnimationFrame(fly);
  }
  requestAnimationFrame(fly);
  // Film posters can be pulled with a mouse, while touch keeps native scrolling.
  let dragStart=0,dragScroll=0,dragging=false,moved=false;
  rail.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;dragging=true;moved=false;dragStart=e.clientX;dragScroll=rail.scrollLeft;rail.classList.add('dragging');});
  addEventListener('pointermove',e=>{if(!dragging)return;const distance=e.clientX-dragStart;if(Math.abs(distance)>6)moved=true;if(moved){rail.style.scrollSnapType='none';rail.scrollLeft=dragScroll-distance;}});
  addEventListener('pointerup',()=>{dragging=false;rail.classList.remove('dragging');rail.style.scrollSnapType='';});
  rail.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopImmediatePropagation();moved=false;}},true);
  rail.querySelectorAll('img').forEach(img=>img.draggable=false);
  const pause=brands.querySelector('.ambient-toggle');pause.addEventListener('click',()=>{const paused=brands.classList.toggle('paused');pause.setAttribute('aria-pressed',String(paused));pause.textContent=paused?'Resume motion ▷':'Pause motion Ⅱ';});
})();
