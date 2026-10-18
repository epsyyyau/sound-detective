function setLessonIdentity(group, mode) {
  const label = document.querySelector('[data-group-label]');
  label.dataset.soundGroup = String(group);
  const circle = document.createElement('span');
  circle.className = 'lesson-group-circle';
  circle.textContent = String(group);
  circle.setAttribute('aria-label', `第 ${group} 組`);
  const difficulty = document.createElement('span');
  difficulty.className = 'lesson-difficulty-label';
  difficulty.textContent = mode;
  label.replaceChildren(circle, difficulty);
}
