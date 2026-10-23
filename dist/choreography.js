(() => {
  if(!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const flowerSection=document.querySelector('.flower-scroll');
  const flowerLayer=document.querySelector('.hero-flower-layer');
  const flowerVideo=document.querySelector('.flower-video');
  if(flowerVideo){
    flowerVideo.pause();
    if(reduced.matches){
      flowerVideo.preload='none';
    }else if(flowerVideo.canPlayType('video/webm; codecs="vp9"')){
      const fps=60;
      let frameCount=298;
      let requestedFrame=0;
      let progress=0;
      let updateQueued=false;
      function seekRequestedFrame(){
        if(reduced.matches||flowerVideo.readyState<2||flowerVideo.seeking)return;
        const requestedTime=requestedFrame/fps;
        if(Math.abs(flowerVideo.currentTime-requestedTime)>1/120){
          flowerVideo.currentTime=requestedTime;
          return;
        }
        flowerLayer.classList.add('is-ready');
      }
      function queueFrame(nextProgress=progress){
        progress=Math.min(1,Math.max(0,nextProgress));
        requestedFrame=Math.round(progress*(frameCount-1));
        if(updateQueued)return;
        updateQueued=true;
        requestAnimationFrame(()=>{
          updateQueued=false;
          seekRequestedFrame();
        });
      }
      flowerVideo.addEventListener('loadedmetadata',()=>{
        frameCount=Math.min(298,Math.max(1,Math.round(flowerVideo.duration*fps)));
        queueFrame(progress);
      });
      flowerVideo.addEventListener('loadeddata',()=>{
        flowerVideo.pause();
        queueFrame(progress);
      },{once:true});
      flowerVideo.addEventListener('seeked',()=>{
        if(Math.round(flowerVideo.currentTime*fps)!==requestedFrame){
          seekRequestedFrame();
          return;
        }
        flowerLayer.classList.add('is-ready');
      });
      flowerVideo.addEventListener('error',()=>flowerLayer.classList.remove('is-ready'));
      const flowerTrigger=ScrollTrigger.create({
        trigger:flowerSection,
        start:'top top',
        end:'bottom bottom',
        invalidateOnRefresh:true,
        onUpdate:self=>queueFrame(self.progress)
      });
      flowerVideo.preload='auto';
      flowerVideo.load();
      queueFrame(flowerTrigger.progress);
    }else{
      flowerVideo.preload='none';
    }
  }
  // All content remains visible and usable when motion is disabled.
  if(reduced.matches)return;
  document.documentElement.classList.add('gsap-experience');
  const mm=gsap.matchMedia();
  const intro=document.querySelector('.intro h2');
  function splitWords(el){
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(node=>{const fragment=document.createDocumentFragment();node.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim())fragment.append(document.createTextNode(word));else{const outer=document.createElement('span');outer.className='word-mask';const inner=document.createElement('span');inner.textContent=word;outer.append(inner);fragment.append(outer);}});node.replaceWith(fragment);});
  }
  const entrance=gsap.timeline({defaults:{ease:'power4.out'}});
  entrance.from('.hero-title',{yPercent:115,rotation:4,opacity:0,duration:1.25,stagger:.13},.1)
    .from('.header,.hero-top,.scroll-cue',{opacity:0,y:20,duration:.8,stagger:.08},.65);
  mm.add('(min-width: 0px)',()=>{
    document.querySelectorAll('.world-panel').forEach((panel,i)=>{
      const timeline=gsap.timeline({scrollTrigger:{trigger:panel,start:'top 95px',end:()=>'+='+innerHeight*1.85,pin:true,scrub:.65,invalidateOnRefresh:true}});
      const stage=panel.querySelector('.project-stage');
      timeline.fromTo(stage,{scale:.48,rotationY:35,rotation:-12},{scale:1.02,rotationY:0,rotation:0,duration:1.5,ease:'power2.out'},0);
      timeline.from(panel.querySelector('.project-overlay'),{x:100,opacity:0,duration:1.1},.2);
      timeline.fromTo(panel.querySelector('.fragment-0'),{x:-innerWidth*.4,y:innerHeight*.5,rotation:-40,z:-450,opacity:0},{x:0,y:0,z:90,rotation:-7,opacity:1,duration:1.4},.4);
      timeline.fromTo(panel.querySelector('.fragment-1'),{x:innerWidth*.4,y:-innerHeight*.4,rotation:40,z:-500,opacity:0},{x:0,y:0,z:130,rotation:8,opacity:1,duration:1.4},.7);
      timeline.to(panel.querySelector('.world-serial'),{y:-70,x:-30,duration:2,ease:'none'},0);
      timeline.to(panel.querySelector('.project-overlay'),{x:-innerWidth*.2,opacity:0,duration:.8},2.4);
      timeline.to(stage,{scale:1.22,rotationY:-12,rotation:4,opacity:.25,duration:1.1},2.6);
    });
  });
  splitWords(intro);
  gsap.fromTo(intro.querySelectorAll('.word-mask>span'),{yPercent:110,rotation:6,opacity:.15},{yPercent:0,rotation:0,opacity:1,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:'.intro',start:'top 80%',end:'center 45%',scrub:1}});
  gsap.from('.intro-bottom>*',{y:60,opacity:0,stagger:.15,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.intro-bottom',start:'top 90%'}});
  document.querySelectorAll('.cosmic-services h2,.film-heading h2,.additional-work-heading h2,.studio-intro h2,.contact h2').forEach(el=>{
    splitWords(el);gsap.from(el.querySelectorAll('.word-mask>span'),{yPercent:115,rotation:5,stagger:.08,duration:.9,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 88%'}});
  });
  document.querySelectorAll('.service-orbit').forEach((card,i)=>{
    gsap.from(card.querySelector('.service-number'),{x:-80,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 80%'}});
    gsap.from(card.querySelector('.service-visual img'),{scale:1.12,duration:1.5,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 85%'}});
  });
  const deck=document.querySelector('.archive-deck');
  const scenes=[...deck.querySelectorAll('.deck-scene')];
  const tabs=[...document.querySelectorAll('.archive-tabs button')];
  mm.add('(min-width: 0px)',()=>{
    gsap.set(scenes,{autoAlpha:0});gsap.set(scenes[0],{autoAlpha:1});
    const timeline=gsap.timeline({scrollTrigger:{trigger:deck,start:'top 100px',end:()=>'+='+innerHeight*scenes.length*1.75,pin:true,scrub:1,invalidateOnRefresh:true,onUpdate:self=>{
      const active=Math.min(scenes.length-1,Math.floor(self.progress*scenes.length));
      tabs.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===active)));
      document.getElementById('deck-position').textContent=String(active+1).padStart(2,'0');
    }}});
    scenes.forEach((scene,i)=>{
      const stage=scene.querySelector('.additional-stage');const at=i*2;
      if(i)timeline.fromTo(scene,{autoAlpha:0,y:120},{autoAlpha:1,y:0,duration:.6,ease:'power2.out'},at);
      timeline.fromTo(stage,{rotationY:45,rotationZ:-14,scale:.55,xPercent:35,z:-350},{rotationY:0,rotationZ:0,scale:1,xPercent:0,z:0,duration:1.3,ease:'power2.out'},at);
      timeline.from(scene.querySelectorAll('.archive-detail'),{x:(j)=>j%2?180:-180,y:130,rotation:(j)=>j%2?25:-25,opacity:0,duration:1.1,stagger:.15},at+.15);
      if(i<scenes.length-1)timeline.to(scene,{autoAlpha:0,y:-120,x:-80,rotation:-4,duration:.5,ease:'power1.in'},at+1.65);
      else timeline.to(stage,{rotationZ:3,duration:.6},at+1.5);
    });
    const handlers=tabs.map((button,i)=>{const handler=()=>{const t=timeline.scrollTrigger;window.scrollTo({top:t.start+(i+.35)/scenes.length*(t.end-t.start),behavior:'smooth'});};button.addEventListener('click',handler);return handler;});
    return()=>tabs.forEach((button,i)=>button.removeEventListener('click',handlers[i]));
  });
  gsap.from('.studio-collage',{scale:.88,rotation:-5,y:80,ease:'none',scrollTrigger:{trigger:'.studio-grid',start:'top 95%',end:'top 30%',scrub:1}});
  gsap.from('.capabilities>div',{x:80,opacity:0,stagger:.12,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.capabilities',start:'top 80%'}});
  document.querySelectorAll('.cosmic-button,.hire,.hero-explore').forEach(button=>{
    button.addEventListener('pointermove',e=>{if(e.pointerType==='touch')return;const r=button.getBoundingClientRect();gsap.to(button,{x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.18,duration:.4,ease:'power3.out'});});button.addEventListener('pointerleave',()=>gsap.to(button,{x:0,y:0,duration:.6,ease:'power4.out'}));
  });
  // Refresh measurements after local fonts and media establish their dimensions.
  document.fonts.ready.then(()=>ScrollTrigger.refresh());
  addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
  reduced.addEventListener('change',()=>location.reload());
})();
