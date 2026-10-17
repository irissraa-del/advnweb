(() => {
  if(!window.gsap||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  // The contact portal remains, driven by scrolling rather than a perpetual loop.
  gsap.fromTo('.contact-portal',{rotation:-25},{rotation:45,ease:'none',scrollTrigger:{trigger:'.contact',start:'top bottom',end:'bottom top',scrub:1}});
  gsap.fromTo('.brief-builder',{rotationY:-8,y:50},{rotationY:0,y:0,ease:'none',scrollTrigger:{trigger:'.contact-layout',start:'top 90%',end:'center center',scrub:1}});
  const scene=document.querySelector('.footer-scene');
  const lines=gsap.utils.toArray('.footer-kinetic-type>span');
  const timeline=gsap.timeline({scrollTrigger:{trigger:scene,start:'top top',end:()=>'+='+innerHeight*.95,pin:true,scrub:.8,invalidateOnRefresh:true}});
  timeline.fromTo(lines[0],{xPercent:-32},{xPercent:0,duration:1.5,ease:'power2.out'},0)
    .fromTo(lines[1],{xPercent:35},{xPercent:0,duration:1.5,ease:'power2.out'},0)
    .fromTo(lines[2],{xPercent:-22},{xPercent:0,duration:1.5,ease:'power2.out'},0)
    .fromTo('.footer-star',{rotation:-100},{rotation:40,duration:2,ease:'none'},0)
    .fromTo('.footer-talk-disc',{scale:.78,rotation:-25},{scale:1,rotation:0,duration:1.5,ease:'power3.out'},.2)
    .to('.footer-scroll-rail',{xPercent:-15,duration:2,ease:'none'},0);
  const disc=document.querySelector('.footer-talk-disc');
  if(matchMedia('(hover: hover) and (pointer: fine)').matches){
    disc.addEventListener('pointermove',event=>{const r=disc.getBoundingClientRect();gsap.to(disc,{x:(event.clientX-r.left-r.width/2)*.2,y:(event.clientY-r.top-r.height/2)*.2,duration:.5,ease:'power3.out'});});
    disc.addEventListener('pointerleave',()=>gsap.to(disc,{x:0,y:0,duration:.7,ease:'power4.out'}));
  }
  document.fonts.ready.then(()=>ScrollTrigger.refresh());
})();
