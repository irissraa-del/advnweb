(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const button = header?.querySelector('.menu-toggle');
  const menu = document.getElementById('mobile-nav');
  if (!header || !button || !menu) return;

  const background = [...document.querySelectorAll('main, footer')];

  function closeMenu() {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation');
    header.classList.remove('menu-open');
    document.body.classList.remove('menu-is-open');
    background.forEach(element => { element.inert = false; });
  }

  button.addEventListener('click', () => {
    if (!menu.hidden) {
      closeMenu();
      return;
    }
    menu.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close navigation');
    header.classList.add('menu-open');
    document.body.classList.add('menu-is-open');
    background.forEach(element => { element.inert = true; });
    menu.querySelector('a')?.focus();
  });

  document.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') {
      closeMenu();
      button.focus();
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [button, ...menu.querySelectorAll('a')];
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

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !menu.hidden) closeMenu();
  });
})();
