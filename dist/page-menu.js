(() => {
  'use strict';
  const menu = document.querySelector('.page-menu');
  if (!menu) return;
  const button = menu.querySelector('summary');
  const nav = menu.querySelector('nav');
  const background = [...document.querySelectorAll('main, footer')];

  function syncMenu() {
    const isOpen = menu.open;
    button.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    button.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('menu-is-open', isOpen);
    background.forEach(element => { element.inert = isOpen; });
    if (isOpen) requestAnimationFrame(() => nav.querySelector('a')?.focus());
  }

  menu.addEventListener('toggle', syncMenu);
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.open = false;
    syncMenu();
  }));

  document.addEventListener('keydown', event => {
    if (!menu.open) return;
    if (event.key === 'Escape') {
      menu.open = false;
      syncMenu();
      button.focus();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [button, ...nav.querySelectorAll('a')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
