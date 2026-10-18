(() => {
  if (new URLSearchParams(location.search).has('route-phone-frame')) {
    document.addEventListener('click', event => {
      const link = event.target.closest('a[href]');
      if (link && link.target !== '_blank') link.target = '_top';
    }, true);
    return;
  }

  const baseWidth = 1280;
  const baseHeight = 720;
  let stage;
  let frame;

  function createFrame() {
    stage = document.createElement('div');
    stage.id = 'route-phone-stage';
    const viewport = document.createElement('div');
    viewport.id = 'route-phone-viewport';
    frame = document.createElement('iframe');
    frame.id = 'route-phone-frame';
    frame.title = document.title;
    const url = new URL(location.href);
    url.searchParams.set('route-phone-frame', '1');
    frame.src = url.href;
    viewport.append(frame);
    stage.append(viewport);
    document.body.append(stage);
  }

  function update() {
    const landscapePhone = matchMedia('(orientation: landscape)').matches
      && innerWidth <= 1100 && innerHeight <= 600;
    if (landscapePhone && !stage) createFrame();
    document.body.classList.toggle('route-phone-active', landscapePhone);
    if (!stage) return;
    stage.hidden = !landscapePhone;
    frame.inert = !landscapePhone;
    if (!landscapePhone) return;
    const scale = Math.min(innerWidth / baseWidth, innerHeight / baseHeight);
    stage.style.setProperty('--route-frame-width', `${baseWidth * scale}px`);
    stage.style.setProperty('--route-frame-height', `${baseHeight * scale}px`);
    frame.style.transform = `scale(${scale})`;
  }

  addEventListener('resize', update);
  update();
})();
