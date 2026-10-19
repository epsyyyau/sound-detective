(() => {
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
})();
