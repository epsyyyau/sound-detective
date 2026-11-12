(() => {
  const button = document.querySelector('[data-game-rules]');
  if (!button) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'game-rules-dialog';
  dialog.setAttribute('aria-labelledby', 'game-rules-title');
  const heading = document.createElement('h2');
  heading.id = 'game-rules-title';
  heading.textContent = '遊戲規則';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'game-rules-close';
  close.setAttribute('aria-label', '關閉遊戲規則');
  close.textContent = '×';
  const copy = document.createElement('p');
  copy.textContent = button.dataset.gameRules;
  dialog.append(close, heading, copy);
  document.body.append(dialog);

  button.addEventListener('click', () => dialog.showModal());
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => button.focus());
})();
