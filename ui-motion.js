(() => {
  document.addEventListener('gesturestart', event => event.preventDefault(), {passive: false});
  document.addEventListener('gesturechange', event => event.preventDefault(), {passive: false});
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const pressed = new Map();
  let leaving = false;

  function controlFor(target) {
    const control = target instanceof Element ? target.closest('button, a[href]') : null;
    if (!control || control.matches(':disabled') || control.closest('[inert]')) return null;
    const scale = getComputedStyle(control).scale;
    return scale === 'none' || scale === '1' ? control : null;
  }

  function rebound(control) {
    if (!control || reducedMotion.matches || !control.animate) return;
    control.animate([
      {scale: .94},
      {scale: 1.035, offset: .55},
      {scale: 1},
    ], {duration: 230, easing: 'ease-out'});
  }

  document.addEventListener('pointerdown', event => {
    if (reducedMotion.matches || event.button !== 0) return;
    const control = controlFor(event.target);
    if (!control?.animate) return;
    const animation = control.animate([{scale: 1}, {scale: .94}], {duration: 85, fill: 'forwards'});
    pressed.set(event.pointerId, {control, animation});
  }, true);

  function release(event) {
    const active = pressed.get(event.pointerId);
    if (!active) return;
    pressed.delete(event.pointerId);
    active.animation.cancel();
    rebound(active.control);
  }
  document.addEventListener('pointerup', release, true);
  document.addEventListener('pointercancel', release, true);

  document.addEventListener('click', event => {
    if (event.detail === 0) rebound(controlFor(event.target));
    if (reducedMotion.matches || leaving || window !== window.top || event.defaultPrevented ||
        event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    if (!link || link.hasAttribute('download') || (link.target && !['_self', '_top'].includes(link.target))) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || !/(\.html|\/$)/.test(url.pathname) ||
        (url.pathname === location.pathname && url.search === location.search && url.hash)) return;
    event.preventDefault();
    leaving = true;
    document.documentElement.classList.add('ui-leaving');
    setTimeout(() => location.assign(url.href), 170);
  });

  const observer = new MutationObserver(records => {
    if (reducedMotion.matches) return;
    for (const record of records) {
      const screen = record.target;
      if (record.attributeName !== 'hidden' || screen.hidden || !screen.matches('main > section')) continue;
      screen.animate([{opacity: .75, translate: '0 7px'}, {opacity: 1, translate: '0 0'}],
        {duration: 240, easing: 'ease-out'});
    }
  });
  observer.observe(document.body, {subtree: true, attributes: true, attributeFilter: ['hidden']});
  addEventListener('pageshow', () => {
    leaving = false;
    document.documentElement.classList.remove('ui-leaving');
  });

  // Warm the next screens only after the current screen has finished loading.
  const firstScreenArt = {
    'platform-intro.html': ['assets/parent-learning-paper-icons-sheet.webp'],
    'sound-library.html': ['assets/library-frames-pastel/1-folder.webp'],
    'learning-map.html': ['assets/learning-map/letter-detective-logo.webp', 'assets/learning-map/missing-detective-logo.webp'],
    'practice-room.html': ['assets/practice-room/detective-office-paper-v5.webp', 'assets/practice-room/office-paper-mobile-v1.webp'],
    'letter-sounds.html': ['assets/platform-wallpaper.webp'],
    'missing-sounds.html': ['assets/platform-wallpaper.webp'],
    'pseudoword-sounds.html': ['assets/platform-wallpaper.webp'],
    'segment-sounds.html': ['assets/platform-wallpaper.webp'],
    'sound-blending.html': ['assets/game-style/train-background.webp', 'assets/game-style/train-cover-map.webp'],
    'sound-changing.html': ['assets/game-style/lab-background.webp', 'assets/game-style/lab-evidence-cover-numbered.webp'],
    'word-families.html': ['assets/game-style/family-background.webp'],
    'book-game-concepts.html': ['assets/book-game/reading-room-cover-decorated-v3.webp'],
  };
  const controller = new AbortController();
  const pending = [];
  const seen = new Set();
  let active = 0;

  function enqueue(url, page = false) {
    const absolute = new URL(url, location.href);
    if (absolute.origin !== location.origin || seen.has(absolute.href)) return;
    seen.add(absolute.href);
    pending.push({url: absolute.href, page});
    pump();
  }

  function pump() {
    while (active < 2 && pending.length && !controller.signal.aborted) {
      const item = pending.shift();
      active += 1;
      fetch(item.url, {priority: 'low', signal: controller.signal}).then(async response => {
        if (!item.page || !response.ok) return;
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        for (const node of doc.querySelectorAll('link[rel="stylesheet"][href], script[src]')) {
          enqueue(new URL(node.getAttribute('href') || node.getAttribute('src'), item.url));
        }
      }).catch(() => {}).finally(() => {
        active -= 1;
        pump();
      });
    }
  }

  function warmNextScreens() {
    if (navigator.connection?.saveData) return;
    const routes = new Set(Array.from(document.querySelectorAll('a[href]'), link => {
      const url = new URL(link.href, location.href);
      return url.origin === location.origin ? url.pathname.split('/').pop() : '';
    }));
    if (location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) {
      routes.add('platform-intro.html');
      routes.add('sound-library.html');
      routes.add('learning-map.html');
      routes.add('practice-room.html');
    }
    routes.delete(location.pathname.split('/').pop());
    for (const route of routes) {
      if (!firstScreenArt[route]) continue;
      enqueue(route, true);
      for (const art of firstScreenArt[route]) enqueue(art);
    }
  }

  addEventListener('load', () => {
    const start = () => setTimeout(warmNextScreens, 400);
    if ('requestIdleCallback' in window) requestIdleCallback(start, {timeout: 2500});
    else setTimeout(start, 1000);
  }, {once: true});
  addEventListener('pagehide', () => controller.abort(), {once: true});
})();
