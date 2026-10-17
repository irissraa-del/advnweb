(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches) return;
  document.documentElement.classList.add('motion-enabled');
  const ease = 'cubic-bezier(.19,1,.22,1)';
  const hero = document.querySelector('.hero');
  const media = document.querySelector('.hero-media');
  const mark = document.querySelector('.hero-wordmark');
  const title = document.querySelector('.hero-title');
  mark.querySelectorAll('span').forEach((letter,i) => letter.animate([
    {transform:'translateY(110%) rotate(8deg)',opacity:0},
    {transform:'translateY(0) rotate(0)',opacity:1}
  ], {duration:1100,delay:100+i*85,easing:ease,fill:'backwards'}));
  title.animate([{opacity:0,transform:'translateY(45px)'},{opacity:1,transform:'translateY(0)'}],{duration:1000,delay:400,easing:ease,fill:'backwards'});
  const intro = document.querySelector('.intro h2');
  const walker = document.createTreeWalker(intro,NodeFilter.SHOW_TEXT);
  const nodes = []; while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const fragment=document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach(word => {
      if (!word.trim()) fragment.append(document.createTextNode(word));
      else { const span=document.createElement('span');span.className='read-word';span.textContent=word;fragment.append(span); }
    });node.replaceWith(fragment);
  });
  const words=[...intro.querySelectorAll('.read-word')];
  const observer=new IntersectionObserver(entries => entries.forEach(entry => {
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
  }),{threshold:.08});
  document.querySelectorAll('.project-heading,.project-stage,.additional-work-heading,.studio-intro,.studio-grid,.contact-link,.film-heading').forEach(el => {el.classList.add('reveal');observer.observe(el);});
  const films=document.querySelector('.films');
  let filmPin=null;
  if(false){
    filmPin=document.createElement('div');filmPin.className='film-pin';
    while(films.firstChild) filmPin.append(films.firstChild);
    films.append(filmPin);films.classList.add('motion-film');
  }
  const rail=document.getElementById('film-rail');
  const stages=[...document.querySelectorAll('.project:not(.project-additional) .project-stage')];
  const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
  let pending=false;
  function render(){
    pending=false;
    if(preference.matches)return;
    const vh=innerHeight;
    const rect=hero.getBoundingClientRect();
    const progress=clamp(-rect.top/(rect.height-vh));
    const small=innerWidth<601,tablet=innerWidth<901;
    const start=small?.82:tablet?.75:.48;
    media.style.transform=`translateY(${(small?0:tablet?20:120)*(1-progress)}px) scale(${start+(1-start)*progress})`;
    mark.style.transform=`translateY(${-progress*150}px)`;
    mark.style.opacity=String(1-clamp(progress*2));
    const ir=intro.getBoundingClientRect();
    const read=clamp((vh*.86-ir.top)/(vh*.63));
    words.forEach((word,i)=>word.style.opacity=String(.16+.84*clamp(read*words.length-i)));
    stages.forEach(stage=>{
      const r=stage.getBoundingClientRect();
      if(r.bottom<0||r.top>vh)return;
      const p=clamp((vh-r.top)/(vh+r.height));
      stage.style.setProperty('--art-y',`${(p-.5)*-55}px`);
      stage.style.setProperty('--detail-y',`${(p-.5)*90}px`);
    });
    if(filmPin){
      const fr=films.getBoundingClientRect();
      const p=clamp(-fr.top/(fr.height-vh));
      rail.style.transform=`translateX(${-p*Math.max(0,rail.scrollWidth-innerWidth)}px)`;
    }
  }
  const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(render);}};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);render();
  preference.addEventListener('change',()=>location.reload());
  // A contextual lens follows a fine pointer only over project imagery.
  if(matchMedia('(hover: hover) and (pointer: fine)').matches){
    const cursor=document.createElement('div');cursor.className='motion-cursor';cursor.textContent='EXPLORE ↗';cursor.setAttribute('aria-hidden','true');document.body.append(cursor);
    let pointerFrame=0,px=0,py=0;
    addEventListener('pointermove',event=>{
      px=event.clientX;py=event.clientY;
      cursor.classList.toggle('is-active',!!event.target.closest('.project-stage'));
      if(!pointerFrame)pointerFrame=requestAnimationFrame(()=>{cursor.style.transform=`translate3d(${px}px,${py}px,0)`;pointerFrame=0;});
    },{passive:true});
    document.addEventListener('pointerleave',()=>cursor.classList.remove('is-active'));
  }
})();
