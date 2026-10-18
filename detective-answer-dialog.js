(() => {
  document.querySelectorAll('.detective-answer-overlay').forEach((overlay) => {
    const main = document.querySelector('main');
    new MutationObserver(() => { if (main) main.inert = !overlay.hidden; }).observe(overlay, { attributes:true, attributeFilter:['hidden'] });
    overlay.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const controls = [...overlay.querySelectorAll('button:not(:disabled), [href]')];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
  });
})();
