(() => {
  const form=document.getElementById('order-form');
  const service=document.getElementById('order-service');
  const result=document.getElementById('order-result');
  const message=document.getElementById('order-message');
  const status=document.getElementById('order-status');
  document.querySelectorAll('[data-order-service]').forEach(button=>button.addEventListener('click',()=>{
    service.value=button.dataset.orderService;
    document.getElementById('order-request').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    service.focus({preventScroll:true});
  }));
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const name=document.getElementById('order-name').value.trim();
    const notes=document.getElementById('order-notes').value.trim();
    message.value=`ADVN DIGITAL — ORDER REQUEST\nService: ${service.value}\nName / brand: ${name}${notes?`\nProject notes: ${notes}`:''}`;
    result.hidden=false;
    status.textContent='Your draft is ready. Nothing has been sent.';
  });
  document.getElementById('copy-order').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(message.value);status.textContent='Order brief copied. Open Instagram when you’re ready to send it.';}
    catch{message.focus();message.select();status.textContent='Select and copy your order brief, then send it on Instagram.';}
  });
})();
