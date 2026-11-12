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
  const copy = document.createElement('ol');
  for (const step of button.dataset.gameRules.split('|')) {
    const item = document.createElement('li');
    item.textContent = step.trim();
    copy.append(item);
  }
  dialog.append(close, heading, copy);
  document.body.append(dialog);

  let lastTrigger = button;
  function openRules(trigger) {
    lastTrigger = trigger;
    dialog.showModal();
  }
  window.addGameRulesButton = (target) => {
    if (!target || target.querySelector(':scope > .game-rules-in-game')) return;
    const inGameButton = button.cloneNode(true);
    inGameButton.removeAttribute('data-game-rules');
    inGameButton.classList.add('game-rules-in-game');
    inGameButton.addEventListener('click', () => openRules(inGameButton));
    target.prepend(inGameButton);
  };
  for (const selector of ['.train-page #play', '.magic-page #game', '.book-game-concepts #book-preview', '.book-game-concepts #book-open', '.book-game-concepts #book-back-cover']) {
    window.addGameRulesButton(document.querySelector(selector));
  }
  button.addEventListener('click', () => openRules(button));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => (lastTrigger.isConnected ? lastTrigger : button).focus());
})();
