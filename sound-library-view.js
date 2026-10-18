(() => {
  const page = document.querySelector('.detective-sound-library');
  const controls = document.querySelectorAll('[data-library-view]');
  const storageKey = 'sound-library-view';
  function selectView(view) {
    const selected = view === 'simple' ? 'simple' : 'theme';
    page.dataset.libraryView = selected;
    controls.forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.libraryView === selected));
    });
  }
  try { selectView(localStorage.getItem(storageKey)); } catch { selectView('theme'); }
  controls.forEach(button => button.addEventListener('click', () => {
    selectView(button.dataset.libraryView);
    try { localStorage.setItem(storageKey, page.dataset.libraryView); } catch { /* Storage may be disabled. */ }
  }));
})();
