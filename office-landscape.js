(() => {
  const embedded = new URLSearchParams(location.search).has('office-landscape-frame');
  if (embedded) {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (link && link.target !== '_blank') link.target = '_top';
    }, true);
    return;
  }

  const portrait = matchMedia('(orientation: portrait)');
  const landscape = matchMedia('(orientation: landscape)');
  const touchDevice = navigator.maxTouchPoints > 0 || matchMedia('(pointer: coarse)').matches;
  const baseWidth = 1280;
  const baseHeight = 720;
  let stage;
  let viewport;
  let frame;
  let prompt;

  function createShell() {
    stage = document.createElement('div');
    stage.id = 'office-landscape-stage';
    viewport = document.createElement('div');
    viewport.id = 'office-landscape-viewport';
    frame = document.createElement('iframe');
    frame.id = 'office-landscape-frame';
    frame.title = document.title;
    const url = new URL(location.href);
    url.searchParams.set('office-landscape-frame', '1');
    frame.src = url.href;
    viewport.append(frame);
    stage.append(viewport);

    prompt = document.createElement('div');
    prompt.id = 'office-landscape-rotate';
    prompt.setAttribute('role', 'status');
    const logo = document.createElement('img');
    logo.src = 'assets/icons/rotate-phone-paper.webp';
    logo.alt = '';
    const message = document.createElement('span');
    message.textContent = '請將設備轉為橫向';
    prompt.append(logo, message);
    document.body.append(stage, prompt);
  }

  function update() {
    const promptForRotation = portrait.matches && (touchDevice || innerWidth <= 900);
    const scaleDesktopScene = landscape.matches && (touchDevice || (innerWidth <= 1100 && innerHeight <= 600));
    const active = promptForRotation || scaleDesktopScene;
    if (active && !stage) createShell();
    document.body.classList.toggle('shell-active', active);
    if (!stage) return;
    stage.hidden = !scaleDesktopScene;
    frame.inert = !scaleDesktopScene;
    if (!scaleDesktopScene) return;
    const scale = Math.min(innerWidth / baseWidth, innerHeight / baseHeight, 1);
    stage.style.setProperty('--frame-width', `${baseWidth * scale}px`);
    stage.style.setProperty('--frame-height', `${baseHeight * scale}px`);
    frame.style.transform = `scale(${scale})`;
  }

  let settleTimer;
  function scheduleUpdate() {
    update();
    requestAnimationFrame(update);
    clearTimeout(settleTimer);
    settleTimer = setTimeout(update, 300);
  }

  addEventListener('resize', scheduleUpdate);
  addEventListener('orientationchange', scheduleUpdate);
  addEventListener('pageshow', scheduleUpdate);
  portrait.addEventListener('change', scheduleUpdate);
  globalThis.visualViewport?.addEventListener('resize', scheduleUpdate);
  update();
})();
