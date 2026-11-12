(() => {
  const scenes = {
    train: [
      'train-paper-one-background.webp', 'train-paper-two-background.webp',
      'train-paper-three-background.webp', 'train-paper-four-empty-river.webp',
      'train-paper-five-background.webp', 'train-paper-six-background.webp',
      'train-paper-seven-connected.webp', 'train-paper-two-station.webp',
      'train-group-one-mobile-background-v1.webp',
      'train-group-two-mobile-background-v1.webp', 'train-background.webp'
    ].map(name => `assets/game-style/${name}`),
    lab: ['assets/game-style/lab-paper-room.webp'],
    book: ['assets/book-game/reading-nook-background-v1.webp']
  };
  const kind = document.currentScript?.dataset.scenePreload;
  if (!scenes[kind]) return;
  window.addEventListener('load', () => {
    const images = [];
    for (const source of scenes[kind]) {
      const image = new Image();
      image.decoding = 'async';
      image.src = source;
      images.push(image);
    }
    window.gameScenePreload = images;
  }, { once: true });
})();
