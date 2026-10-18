const books = {
  cat: {
    name: 'Cat in a Cap', cover: 'cat-page-cover.png', coverMockup: 'cat-book-complete-cover-v1.png', backCover: 'cat-book-back-cover-v1.png',
    backCoverAlt: '小貓躲在藍色帽子裏，帽子放在綠色地氈上，旁邊有星星。', coverIncludesTitle: true,
    pageImages: ['cat-page-1.png', 'cat-page-2.png', 'cat-page-3.png', 'cat-page-4.png'],
    titleLines: ['Cat in', 'a Cap'], image: 'cat-and-cap-open.png', theme: 'room',
    pages: [
      ['A cat sat on a mat.', '小貓坐在地氈上。'],
      ['A blue cap fell on the mat.', '藍帽掉在小貓旁邊。', [['mat', 12, 57, 73], ['cap', 48, 42, 33, -18], ['cat', 5, 25, 45]]],
      ['The cat got in the cap.', '小貓鑽進藍帽裏。', [['mat', 14, 60, 70], ['cap', 29, 39, 55], ['cat', 37, 24, 35]]],
      ['Dad got the cap. The cat fell on Dad!', '爸爸拿起藍帽，小貓掉在爸爸身上。', [['mat', 11, 62, 75], ['man', 40, 23, 45], ['cap', 20, 60, 35, -18], ['cat', 48, 8, 28, -12]]]
    ]
  },
  hen: {
    name: 'Hen and Pen', cover: 'hen-page-cover.png', coverMockup: 'hen-book-complete-cover-v1.png', coverIncludesTitle: true,
    backArt: 'hen-back-art-v1.png', backCoverAlt: '母雞與小雞坐在草窩旁，紅筆在空中彈起。',
    titleLines: ['Hen and', 'Pen'], image: 'hen-and-pen-open.png', theme: 'farm',
    pageImages: ['hen-page-1.png', 'hen-page-2.png', 'hen-page-3.png', 'hen-page-4.png'],
    pages: [
      ['A hen got a red pen.', '母雞找到一枝紅筆。'],
      ['A chick got the pen.', '小雞拿走了紅筆。', [['hen', 5, 28, 43], ['chick', 43, 41, 28], ['pen', 59, 61, 30, -24]]],
      ['The chick hid the pen in a nest.', '小雞把紅筆藏進草窩。', [['hen', 5, 30, 43], ['chick', 35, 45, 26], ['nest', 54, 59, 39], ['pen', 62, 59, 24, 42]]],
      ['The hen sat on the nest. The pen went up!', '母雞坐在草窩上，紅筆向上彈起來。', [['nest', 19, 66, 48], ['hen', 18, 26, 55], ['pen', 65, 9, 24, -28], ['chick', 64, 52, 25]]]
    ]
  },
  train: {
    name: 'Chick on the Track', cover: 'chick-page-cover.png', coverMockup: 'train-book-complete-cover-v1.png', coverIncludesTitle: true, titleLines: ['Chick on', 'the Track'], image: 'chick-and-train-open.png', theme: 'rail',
    backArt: 'chick-back-art-v1.png', backCoverAlt: '小雞坐在母雞背上，旁邊有玩具火車。',
    pageImages: ['chick-page-1.png', 'chick-page-2.png', 'chick-page-3.png', 'chick-page-4.png'],
    pages: [
      ['A chick sat on the track.', '小雞坐在玩具鐵軌上。'],
      ['The train did not zip.', '小火車因小雞擋路而停下。', [['train', 8, 30, 69], ['chick', 71, 51, 24]]],
      ['The hen got the chick.', '母雞把小雞接離鐵軌。', [['train', 3, 44, 50], ['chick', 58, 24, 25, -14], ['hen', 56, 39, 32]]],
      ['The train went on. The chick sat on the hen!', '小火車繼續前行，小雞坐在母雞背上。', [['train', 35, 25, 62], ['hen', 4, 47, 32], ['chick', 10, 31, 22]]]
    ]
  },
  pup: {
    name: 'Pup in the Rain', cover: 'pup-page-cover.png', coverMockup: 'pup-book-complete-cover-v1.png', coverIncludesTitle: true, titleLines: ['Pup in', 'the Rain'], image: 'wet-pup-open.png', theme: 'rain',
    backArt: 'pup-back-art-v1.png', backCoverAlt: '濕漉漉的小狗站在床上甩水。',
    pageImages: ['pup-page-1.png', 'pup-page-2.png', 'pup-page-3.png', 'pup-page-4.png'],
    pages: [
      ['A pup ran in the rain.', '小狗在雨中奔跑。'],
      ['The pup got wet.', '小狗全身濕透了。', [['rain', 9, 3, 39], ['rain', 54, 3, 38], ['dog', 30, 35, 52]]],
      ['The pup got in a hut.', '小狗走進小屋。', [['rain', 8, 5, 29], ['dog', 24, 38, 46], ['home', 62, 35, 37]]],
      ['The pup shook on the bed. The bed got wet!', '小狗在床上甩水，床也濕了。', [['bed', 7, 43, 76], ['dog', 26, 22, 48, -10]]]
    ]
  },
  pin: {
    name: 'Pin in a Tin', cover: 'pin-page-cover.png', coverMockup: 'pin-book-complete-cover-v1.png', coverIncludesTitle: true, titleLines: ['Pin in', 'a Tin'], image: 'pin-and-tin-open.png', theme: 'kitchen',
    backArt: 'pin-back-art-v1.png', backCoverAlt: 'Pat 在鐵罐和平底鍋之間玩小針。',
    pageImages: ['pin-page-1.png', 'pin-page-2.png', 'pin-page-3.png', 'pin-page-4.png'],
    pages: [
      ['A pin sat in a tin.', '小針放在鐵罐裏。'],
      ['Pat taps the tin.', 'Pat 輕敲鐵罐。', [['tin', 28, 30, 53], ['hand', 4, 9, 42, 18], ['pin', 59, 49, 24, 25]]],
      ['The tin tips. The pin fell in a pan.', '鐵罐傾側，小針掉進平底鍋。', [['tin', 6, 34, 49, 36], ['pin', 56, 46, 23, 54], ['pan', 40, 56, 57]]],
      ['Pat taps the pan. Ping! The pin fell in the tin!', 'Pat 敲一下平底鍋，小針又彈回鐵罐。', [['pan', 4, 50, 60], ['hand', 0, 10, 35, 18], ['tin', 62, 41, 32], ['pin', 69, 31, 17, 35]]]
    ]
  },
  pig: {
    name: 'Pig and Bug', cover: 'pig-page-cover.png', coverMockup: 'pig-book-complete-cover-v1.png', coverIncludesTitle: true, titleLines: ['Pig and', 'Bug'], image: 'pig-and-bug-open.png', theme: 'meadow',
    backArt: 'pig-back-art-v1.png', backCoverAlt: '小豬和小蟲在草地上開心地玩耍。',
    pageImages: ['pig-page-1.png', 'pig-page-2.png', 'pig-page-3.png', 'pig-page-4.png'],
    pages: [
      ['A bug sat on a pig.', '小蟲停在小豬背上。'],
      ['The pig did a big hop. The bug got a bump!', '小豬跳起來，小蟲被顛了一下。', [['pig', 22, 16, 63, -9], ['bug', 54, 17, 22]]],
      ['The bug fell on a snout.', '小蟲掉在小豬的鼻子上。', [['pig', 7, 32, 54], ['bug', 43, 35, 21, -16]]],
      ['The pig went "Buzz!" The bug went "Oink!"', '小豬和小蟲學對方的叫聲。', [['rug', 8, 59, 80], ['pig', 14, 27, 57], ['bug', 68, 43, 21]]]
    ]
  },
  king: {
    name: 'King and Ring', cover: 'king-page-cover.png', coverMockup: 'king-book-complete-cover-v1.png', coverIncludesTitle: true, titleLines: ['King and', 'Ring'], image: 'king-and-ring-open.png', theme: 'castle',
    backArt: 'king-back-art-v1.png', backCoverAlt: '國王與小豬一起看書，戒指落在旁邊。',
    pageImages: ['king-page-1.png', 'king-page-2.png', 'king-page-3.png', 'king-page-4.png'],
    pages: [
      ['A king got a ring.', '國王拿著一隻戒指。'],
      ['The ring fell in a book.', '戒指掉進一本打開的書裏。', [['king', 7, 27, 48], ['book', 49, 49, 47], ['ring', 66, 38, 17, 28]]],
      ['The king did not spot the ring.', '國王沒有看見藏在書裏的戒指。', [['king', 9, 24, 52], ['book', 51, 45, 43]]],
      ['The king got the book. The ring fell on a pig!', '國王拿起書，戒指掉在一隻小豬身上。', [['book', 4, 50, 55], ['king', 1, 17, 38], ['pig', 55, 45, 39], ['ring', 70, 36, 17, 25]]]
    ]
  },
  quack: {
    name: 'Duck in a Sack', cover: 'queen-page-cover.png', coverMockup: 'duck-book-complete-cover-v1.png', coverIncludesTitle: true, titleLines: ['Duck in', 'a Sack'], image: 'quack-in-sack-open.png', theme: 'garden',
    backArt: 'queen-back-art-v1.png', backCoverAlt: '皇后望著從布袋跳出來的小鴨。',
    pageImages: ['queen-page-1.png', 'queen-page-2.png', 'queen-page-3.png', 'queen-page-4.png'],
    pages: [
      ['A duck sat in a sack.', '小鴨躲在布袋裏。'],
      ['The sack went "Quack!"', '布袋裏傳出呱呱聲。', [['sack', 24, 31, 56], ['quack', 60, 17, 31, -12]]],
      ['A queen peeks in.', '皇后彎腰看進布袋。', [['queen', 8, 23, 49], ['sack', 58, 42, 37]]],
      ['The duck pops out. The queen can quack!', '小鴨跳出布袋，皇后也學牠呱呱叫。', [['sack', 24, 45, 56], ['quack', 42, 15, 39], ['queen', 63, 20, 36]]]
    ]
  }
};

const refreshedPageImages = new Set(['chick-page-1.png', 'pin-page-2.png', 'pig-page-4.png']);

const shelf = document.querySelector('#book-shelf');
const preview = document.querySelector('#book-preview');
const previewImage = document.querySelector('#book-preview-image');
const previewVolume = document.querySelector('.book-preview-volume');
const previewMockup = document.querySelector('#book-preview-mockup');
const mockupOpen = document.querySelector('#book-preview-mockup-open');
const previewTitle = document.querySelector('#book-preview-title');
const previewInside = document.querySelector('#book-preview-inside');
const previewFirstSentence = document.querySelector('#book-preview-first-sentence');
const previewOpen = document.querySelector('#book-preview-open');
const previewReturn = document.querySelector('#book-preview-return');
const opened = document.querySelector('#book-open');
const backCover = document.querySelector('#book-back-cover');
const genericBack = document.querySelector('#book-generic-back');
const spread = document.querySelector('#book-spread');
const spreadImage = document.querySelector('#book-spread-image');
const scene = document.querySelector('#book-scene');
const bookPicture = document.querySelector('#book-picture');
const pagePlaceholder = document.querySelector('#book-page-placeholder');
const revealPicture = document.querySelector('#book-reveal');
const previous = document.querySelector('#book-previous');
const next = document.querySelector('#book-next');
const pageCount = document.querySelector('#book-page-count');
const theEnd = document.querySelector('#book-the-end');
let activeBook = null;
let pageIndex = 0;
let lastCover = null;
let turning = false;
let turnTimers = [];
let selectTimer = null;
let openTimer = null;

function showShelf() {
  window.clearTimeout(selectTimer);
  window.clearTimeout(openTimer);
  selectTimer = null;
  openTimer = null;
  preview.classList.remove('is-opening');
  spread.classList.remove('is-opening-cover');
  spread.querySelector('.book-opening-leaf')?.remove();
  previewOpen.disabled = false;
  mockupOpen.disabled = false;
  preview.hidden = true;
  shelf.hidden = false;
  opened.hidden = true;
  backCover.hidden = true;
  lastCover?.classList.remove('is-picked');
  lastCover?.focus({preventScroll: true});
  activeBook = null;
}

function renderPage() {
  const [sentence, description, objects] = activeBook.pages[pageIndex];
  const pageImage = activeBook.pageImages?.[pageIndex];
  const waitingForArt = Boolean(activeBook.pageImages && !pageImage);
  spreadImage.hidden = waitingForArt;
  if (!waitingForArt) {
    const image = pageImage || activeBook.image;
    spreadImage.src = `assets/book-game/${image}${refreshedPageImages.has(image) ? '?v=20261018' : ''}`;
  }
  spreadImage.alt = pageImage || !objects ? description : '';
  pagePlaceholder.hidden = !waitingForArt;
  bookPicture.setAttribute('aria-label', waitingForArt ? '插畫稍後加入' : description);
  document.querySelector('#book-sentence').textContent = sentence;
  pageCount.textContent = `P.${pageIndex + 1}`;
  theEnd.hidden = true;
  previous.disabled = pageIndex === 0;
  const isLastPage = pageIndex === activeBook.pages.length - 1;
  next.disabled = false;
  next.setAttribute('aria-label', isLastPage ? '翻到封底' : '下一頁');
  next.title = isLastPage ? '翻到封底' : '下一頁';
  next.hidden = true;
  bookPicture.hidden = true;
  bookPicture.classList.remove('is-revealed');
  bookPicture.classList.toggle('has-page-art', Boolean(pageImage));
  revealPicture.hidden = false;
  revealPicture.setAttribute('aria-label', `顯示第 ${pageIndex + 1} 頁插畫`);
  scene.hidden = waitingForArt || Boolean(pageImage) || !objects;
  scene.className = `book-scene scene-${activeBook.theme}`;
  scene.setAttribute('aria-label', description);
  scene.replaceChildren();
  if (pageImage || waitingForArt) return;
  for (const [asset, x, y, width, rotation = 0] of objects || []) {
    const picture = document.createElement(asset === 'nest' ? 'span' : 'img');
    if (asset === 'nest') picture.className = 'book-scene-nest';
    else {
      picture.src = asset === 'home' ? 'assets/home-illustrated-muted.png' : `assets/pictures/transparent/${asset}.png`;
      picture.alt = '';
      if (asset === 'pen' && activeBook.theme === 'farm') picture.classList.add('book-scene-red-pen');
    }
    picture.style.cssText = `left:${x}%;top:${y}%;width:${width}%;transform:rotate(${rotation}deg)`;
    scene.append(picture);
  }
}

function showBackCover() {
  if (!activeBook || bookPicture.hidden) return;
  const backImage = backCover.querySelector('img');
  backImage.hidden = !activeBook.backCover;
  genericBack.hidden = Boolean(activeBook.backCover);
  genericBack.setAttribute('aria-label', `《${activeBook.name}》封底：${activeBook.backCoverAlt}`);
  backCover.dataset.book = preview.dataset.book;
  if (activeBook.backCover) {
    backImage.src = `assets/book-game/${activeBook.backCover}`;
    backImage.alt = `《${activeBook.name}》封底${activeBook.backCoverAlt ? `：${activeBook.backCoverAlt}` : ''}`;
  } else if (activeBook.backArt) {
    genericBack.querySelector('img').src = `assets/book-game/${activeBook.backArt}`;
  }
  backCover.setAttribute('aria-label', `《${activeBook.name}》封底`);
  opened.hidden = true;
  backCover.hidden = false;
  document.querySelector('#book-back-replay').focus({preventScroll: true});
}

function turnPage(direction) {
  const target = pageIndex + direction;
  if (!turning && direction > 0 && activeBook && target === activeBook.pages.length) {
    showBackCover();
    return;
  }
  if (turning || !activeBook || target < 0 || target >= activeBook.pages.length || (direction > 0 && bookPicture.hidden)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    pageIndex = target;
    renderPage();
    revealPicture.focus({preventScroll: true});
    return;
  }
  turning = true;
  const leaf = document.createElement('div');
  leaf.className = `book-turn-leaf${direction < 0 ? ' is-previous' : ''}`;
  leaf.setAttribute('aria-hidden', 'true');
  const face = document.createElement('div');
  face.className = 'book-turn-face';
  const source = spread.querySelector(direction > 0 ? '.book-reading-right' : '.book-reading-left');
  const page = source.cloneNode(true);
  page.querySelectorAll('button').forEach(button => button.remove());
  page.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
  page.removeAttribute('id');
  face.append(page);
  const back = document.createElement('div');
  back.className = 'book-turn-back';
  leaf.append(face, back);
  spread.append(leaf);
  spread.classList.add(direction > 0 ? 'is-turning-next' : 'is-turning-previous');
  turnTimers.push(window.setTimeout(() => {
    pageIndex = target;
    renderPage();
  }, 475));
  turnTimers.push(window.setTimeout(() => {
    leaf.remove();
    spread.classList.remove('is-turning-next', 'is-turning-previous');
    turning = false;
    turnTimers = [];
    revealPicture.focus({preventScroll: true});
  }, 960));
}

for (const cover of document.querySelectorAll('[data-book]')) {
  cover.addEventListener('click', () => {
    if (selectTimer) return;
    activeBook = books[cover.dataset.book];
    pageIndex = 0;
    lastCover = cover;
    preview.dataset.book = cover.dataset.book;
    preview.setAttribute('aria-label', `《${activeBook.name}》封面`);
    previewVolume.hidden = Boolean(activeBook.coverMockup);
    previewMockup.hidden = !activeBook.coverMockup;
    if (activeBook.coverMockup) {
      previewMockup.querySelector('img').src = `assets/book-game/${activeBook.coverMockup}`;
      mockupOpen.setAttribute('aria-label', `揭開《${activeBook.name}》`);
    }
    preview.querySelector('.book-preview-front').classList.toggle('has-printed-title', Boolean(activeBook.coverIncludesTitle));
    previewImage.src = `assets/book-game/${activeBook.cover}`;
    previewFirstSentence.textContent = activeBook.pages[0][0];
    previewOpen.setAttribute('aria-label', `揭開《${activeBook.name}》`);
    previewTitle.replaceChildren(...activeBook.titleLines.map(line => {
      const part = document.createElement('span');
      part.textContent = line;
      return part;
    }));
    cover.classList.add('is-picked');
    selectTimer = window.setTimeout(() => {
      selectTimer = null;
      shelf.hidden = true;
      preview.hidden = false;
      (activeBook.coverMockup ? mockupOpen : previewOpen).focus({preventScroll: true});
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 220);
  });
}

function openSelectedBook() {
  if (openTimer || !activeBook) return;
  const openButton = activeBook.coverMockup ? mockupOpen : previewOpen;
  openButton.disabled = true;
  pageIndex = 0;
  renderPage();
  opened.setAttribute('aria-label', `《${activeBook.name}》故事書`);
  preview.hidden = true;
  opened.hidden = false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    openButton.disabled = false;
    revealPicture.focus({preventScroll: true});
    return;
  }
  const coverLeaf = document.createElement('div');
  coverLeaf.className = 'book-opening-leaf';
  coverLeaf.setAttribute('aria-hidden', 'true');
  const coverFront = preview.querySelector('.book-preview-front').cloneNode(true);
  coverFront.querySelectorAll('button').forEach(button => button.remove());
  coverFront.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
  coverLeaf.append(coverFront);
  const coverBack = document.createElement('div');
  coverBack.className = 'book-opening-back';
  const firstSentence = document.createElement('p');
  firstSentence.lang = 'en';
  firstSentence.textContent = activeBook.pages[0][0];
  coverBack.append(firstSentence);
  coverLeaf.append(coverBack);
  spread.append(coverLeaf);
  spread.classList.add('is-opening-cover');
  openTimer = window.setTimeout(() => {
    openTimer = null;
    coverLeaf.remove();
    spread.classList.remove('is-opening-cover');
    openButton.disabled = false;
    revealPicture.focus({preventScroll: true});
  }, 1110);
}
previewOpen.addEventListener('click', openSelectedBook);
mockupOpen.addEventListener('click', openSelectedBook);
previewReturn.addEventListener('click', showShelf);
revealPicture.addEventListener('click', () => {
  revealPicture.hidden = true;
  bookPicture.hidden = false;
  bookPicture.classList.add('is-revealed');
  theEnd.hidden = pageIndex !== activeBook.pages.length - 1;
  next.hidden = next.disabled;
  bookPicture.focus({preventScroll: true});
});
previous.addEventListener('click', () => turnPage(-1));
next.addEventListener('click', () => turnPage(1));
document.querySelector('#book-back-previous').addEventListener('click', () => {
  backCover.hidden = true;
  opened.hidden = false;
  next.focus({preventScroll: true});
});
document.querySelector('#book-back-replay').addEventListener('click', () => {
  pageIndex = 0;
  renderPage();
  backCover.hidden = true;
  opened.hidden = true;
  preview.hidden = false;
  (activeBook.coverMockup ? mockupOpen : previewOpen).focus({preventScroll: true});
});
document.querySelector('#book-back-shelf').addEventListener('click', showShelf);
document.querySelector('#book-return').addEventListener('click', () => {
  window.clearTimeout(openTimer);
  openTimer = null;
  previewOpen.disabled = false;
  mockupOpen.disabled = false;
  turnTimers.forEach(window.clearTimeout);
  turnTimers = [];
  spread.querySelector('.book-turn-leaf')?.remove();
  spread.querySelector('.book-opening-leaf')?.remove();
  opened.hidden = true;
  preview.hidden = false;
  spread.classList.remove('is-turning-next', 'is-turning-previous', 'is-from-cover', 'is-opening-cover');
  turning = false;
  (activeBook.coverMockup ? mockupOpen : previewOpen).focus({preventScroll: true});
});
document.addEventListener('keydown', (event) => {
  if (!backCover.hidden) {
    if (event.key === 'ArrowLeft') document.querySelector('#book-back-previous').click();
    return;
  }
  if (event.key === 'Escape' && !preview.hidden) {
    showShelf();
    return;
  }
  if (opened.hidden || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'ArrowRight') turnPage(1);
  if (event.key === 'ArrowLeft') turnPage(-1);
});
