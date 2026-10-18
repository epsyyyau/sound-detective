(() => {
  const groups = document.querySelectorAll('.sound-groups .sound-group');
  const controls = document.querySelectorAll('[data-library-group]');
  const list = document.querySelector('.sound-groups');
  controls.forEach(control => control.addEventListener('click', () => {
    const selected = control.dataset.libraryGroup;
    controls.forEach(button => button.setAttribute('aria-pressed', String(button === control)));
    groups.forEach(group => { group.hidden = selected !== 'all' && group.dataset.soundGroup !== selected; });
    list.classList.toggle('is-single-group', selected !== 'all');
    audioCache.forEach(audio => audio.pause());
  }));
})();
