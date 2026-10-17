(() => {
  const work=document.getElementById('work');
  const lead=work.querySelector('.work-lead');lead.classList.add('showcase-lead');lead.innerHTML='<span class="eyebrow">02 / SELECTED WORK</span><h2>Different brands.<br><em>Entirely different worlds.</em></h2><span class="showcase-instruction">SCROLL THROUGH THE WORLDS ↓</span>';
  work.querySelector(':scope>.section-label').hidden=true;
  const featured=[...work.querySelectorAll('.editorial-project')];
  const gallery=document.createElement('div');gallery.className='world-showcase';featured[0].before(gallery);featured.forEach((p,i)=>{
    gallery.append(p);p.classList.add('world-panel');
    p.dataset.world=['desire','play','taste'][i];
    const stage=p.querySelector('.project-stage');
    const images=[['electra-hero','electra-box'],['slano-giveaway','slano-activation'],['rolls-strawberry','rolls-founder']][i];
    images.forEach((name,j)=>{const image=document.createElement('img');image.src=`./assets/work/${name}.webp`;image.alt='';image.loading='lazy';image.className=`world-fragment fragment-${j}`;stage.append(image);});
    const number=document.createElement('span');number.className='world-serial';number.setAttribute('aria-hidden','true');number.textContent=`0${i+1}`;p.prepend(number);
  });
  const archiveHeading=document.getElementById('archive');archiveHeading.innerHTML='<div><span class="eyebrow">THE PROJECT ARCHIVE / EXTENDED EDIT</span><h2>Open the<br><em>possibilities.</em></h2></div><p>Brand systems. Packaging. Spaces.<br>Pick a project and see where it takes you.</p>';
  const grid=work.querySelector('.additional-work-grid');grid.classList.add('archive-deck');
  const entries=[...grid.querySelectorAll('.archive-entry:not(.project-external)')];
  const external=[...grid.querySelectorAll('.project-external')];
  const tray=document.createElement('div');tray.className='presentation-tray';grid.after(tray);external.forEach(p=>tray.append(p));
  const filters=work.querySelector('.archive-filters');filters.className='archive-tabs';filters.removeAttribute('role');filters.setAttribute('aria-label','Choose an archive project');
  filters.replaceChildren();
  entries.forEach((entry,i)=>{
    entry.classList.add('deck-scene');entry.hidden=false;
    const button=document.createElement('button');button.type='button';button.dataset.scene=i;button.innerHTML=`<span>0${i+4}</span> ${entry.querySelector('h2').textContent}`;button.setAttribute('aria-pressed',String(i===0));filters.append(button);
  });
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){filters.querySelectorAll('button').forEach((button,i)=>button.addEventListener('click',()=>entries[i].scrollIntoView({behavior:'instant',block:'start'})));}
  const hint=document.createElement('div');hint.className='deck-footnote';hint.innerHTML='<span>THE COLLECTION / <b id="deck-position">01</b> — 04</span><span>SCROLL TO SHUFFLE THE DECK ↓</span>';grid.append(hint);
  const label=document.createElement('div');label.className='presentation-tray-title';label.innerHTML='<span>THE SHARED PRESENTATIONS</span><p>Two more stories.<br>Open the original decks.</p>';tray.prepend(label);
})();
