const introSections = {
  about: ['認識平台', `
    <div class="intro-about">
      <ul>
        <li>由實習教育心理學家設計，供親子練習英語拼讀。</li>
        <li>透過聽音、認字母、合音及拆音，逐步探索字詞。</li>
        <li>可使用「聲音線索圖鑑」、「聲探查案路線」及「聲探事務所」練習。</li>
      </ul>
      <h3>給家長的提醒</h3>
      <ul>
        <li>平台支援電腦、平板及手機使用，但建議使用較大的螢幕進行「聲探事務所」的練習，以便孩子觀看及操作。</li>
        <li>拼讀是閱讀基礎之一；理解字詞與故事仍需累積詞彙及閱讀經驗。</li>
        <li>部分字詞不完全符合拼讀規律；錄音只作示範，亦可能與其他英語口音不同。</li>
        <li>平台只供輔助練習，不取代學校教學或個別專業評估。</li>
      </ul>
      <h3>參考資料</h3>
      <ul class="intro-about-references">
        <li><a href="https://www.edb.gov.hk/attachment/en/curriculum-development/kla/eng-edu/Curriculum%20Document/Pri_ELCG_Primary_1-6_2025.pdf" target="_blank" rel="noopener noreferrer">香港教育局《小學英國語文課程指引》（2025）</a></li>
        <li><a href="https://ies.ed.gov/ncee/wwc/PracticeGuide/21/Published" target="_blank" rel="noopener noreferrer">美國教育科學研究所：初階閱讀指南</a></li>
        <li><a href="https://dictionary.cambridge.org/pronunciation/english/audio" target="_blank" rel="noopener noreferrer">劍橋詞典：英美發音示例</a></li>
      </ul>
      <p class="intro-about-note">以上資料並非本平台的成效驗證。</p>
    </div>`],
  start: ['開始使用', `
    <div class="intro-start">
      <section class="intro-start-item" aria-labelledby="intro-library-title">
        <a class="intro-start-logo" href="sound-library.html" aria-label="前往聲音線索圖鑑"><img src="assets/navigation-paper/library.png" alt=""></a>
        <div><h3 id="intro-library-title"><a href="sound-library.html">聲音線索圖鑑</a></h3>
          <ul><li>按組別查閱字母及字母組合，點選即可聽音。</li><li>可切換「主題」或「簡潔」畫面。</li></ul></div>
      </section>
      <section class="intro-start-item" aria-labelledby="intro-route-title">
        <a class="intro-start-logo" href="learning-map.html" aria-label="前往聲探查案路線"><img src="assets/navigation-paper/route.png" alt=""></a>
        <div><h3 id="intro-route-title"><a href="learning-map.html">聲探查案路線</a></h3>
          <ul><li>選擇組別，依次練習字母音、缺音、暗號及拆音。</li><li>按需要選擇「輕量版」或「挑戰版」。</li></ul></div>
      </section>
      <section class="intro-start-item" aria-labelledby="intro-office-title">
        <a class="intro-start-logo" href="practice-room.html" aria-label="前往聲探事務所"><img src="assets/navigation-paper/office.png" alt=""></a>
        <div><h3 id="intro-office-title"><a href="practice-room.html">聲探事務所</a></h3>
          <ul><li>透過拼音、換音、字族及故事書遊戲運用所學。</li><li>可按孩子的興趣選擇遊戲。</li></ul></div>
      </section>
    </div>`],
  games: ['遊戲指南', `
    <div class="intro-guide">
      <h3>聲探查案路線</h3>
      <p class="intro-guide-lead">四個關卡由辨認聲音逐步走向拼讀與拆音；進入路線後可選擇組別及練習模式。</p>
      <section class="intro-guide-item" aria-labelledby="guide-letter-title">
        <a class="intro-guide-logo" href="letter-sounds.html?group=1" aria-label="前往字母「聲」探"><img src="assets/learning-map/letter-detective-logo.webp" alt=""></a>
        <div><h4 id="guide-letter-title"><a href="letter-sounds.html?group=1">字母「聲」探</a></h4><p>練習聆聽及分辨英語聲音，再把聲音與相應的字母或字母組合連繫起來，建立拼讀的基礎。</p></div>
      </section>
      <section class="intro-guide-item" aria-labelledby="guide-missing-title">
        <a class="intro-guide-logo" href="missing-sounds.html?group=1" aria-label="前往缺音「聲」探"><img src="assets/learning-map/missing-detective-logo.webp" alt=""></a>
        <div><h4 id="guide-missing-title"><a href="missing-sounds.html?group=1">缺音「聲」探</a></h4><p>留意字詞中各個聲音的位置，找出缺少的一個聲音，提升對字詞聲音結構的察覺能力。</p></div>
      </section>
      <section class="intro-guide-item" aria-labelledby="guide-code-title">
        <a class="intro-guide-logo" href="pseudoword-sounds.html?group=1" aria-label="前往暗號「聲」探"><img src="assets/learning-map/pseudoword-detective-logo.webp" alt=""></a>
        <div><h4 id="guide-code-title"><a href="pseudoword-sounds.html?group=1">暗號「聲」探</a></h4><p>把學過的字母音連起來，嘗試讀出假詞，練習運用拼音規則，而非單靠記住熟悉的字詞。</p></div>
      </section>
      <section class="intro-guide-item" aria-labelledby="guide-segment-title">
        <a class="intro-guide-logo" href="segment-sounds.html?group=1" aria-label="前往拆音「聲」探"><img src="assets/learning-map/segment-detective-logo.webp" alt=""></a>
        <div><h4 id="guide-segment-title"><a href="segment-sounds.html?group=1">拆音「聲」探</a></h4><p>把聽到的字詞拆成一個個字母聲音，練習按次序辨認每個聲音，為自行拼寫及檢查字詞作準備。</p></div>
      </section>
      <h3>聲探事務所</h3>
      <p class="intro-guide-lead">透過遊戲，把已學的聲音運用到字詞和句子之中。</p>
      <section class="intro-guide-item" aria-labelledby="guide-blending-title">
        <a class="intro-guide-logo intro-guide-title-logo" href="sound-blending.html" aria-label="前往「聲」「聲」相惜"><img src="assets/game-style/train-paper-title.png" alt=""></a>
        <div><h4 id="guide-blending-title"><a href="sound-blending.html">「聲」「聲」相惜</a></h4><p>依照次序把分開的聲音連起來，讀成完整字詞，練習聽音合成及拼讀。</p></div>
      </section>
      <section class="intro-guide-item" aria-labelledby="guide-changing-title">
        <a class="intro-guide-logo intro-guide-title-logo" href="sound-changing.html" aria-label="前往一「聲」之差"><img src="assets/game-style/lab-paper-title.png" alt=""></a>
        <div><h4 id="guide-changing-title"><a href="sound-changing.html">一「聲」之差</a></h4><p>替換字詞中的一個字母，觀察發音與拼寫如何改變，練習靈活運用已學聲音。</p></div>
      </section>
      <section class="intro-guide-item" aria-labelledby="guide-families-title">
        <a class="intro-guide-logo intro-guide-title-logo" href="word-families.html" aria-label="前往物換「聲」移"><img src="assets/family-map/paper-town-title.png" alt=""></a>
        <div><h4 id="guide-families-title"><a href="word-families.html">物換「聲」移</a></h4><p>比較有共同字尾與聲音模式的字詞，發現字族規律，並嘗試運用規律拼讀新字。</p></div>
      </section>
      <section class="intro-guide-item" aria-labelledby="guide-books-title">
        <a class="intro-guide-logo intro-guide-title-logo" href="book-game-concepts.html" aria-label="前往句句有「聲」"><img src="assets/book-game/story-paper-title-v2.png" alt=""></a>
        <div><h4 id="guide-books-title"><a href="book-game-concepts.html">句句有「聲」</a></h4><p>在八本故事中把字詞放進句子閱讀，練習連貫拼讀，並透過圖畫理解故事內容。</p></div>
      </section>
    </div>`],
  parents: ['家長陪學', `
    <div class="intro-parents">
      <ul>
        <li><span class="intro-parent-icon is-ear" aria-hidden="true"></span><span><strong>一起聆聽：</strong>先讓孩子聆聽聲音，再鼓勵孩子模仿發音，嘗試將聲音拼讀成字。</span></li>
        <li><span class="intro-parent-icon is-steps" aria-hidden="true"></span><span><strong>循序漸進：</strong>由簡單的聲音開始，按孩子的能力逐步挑戰不同遊戲。</span></li>
        <li><span class="intro-parent-icon is-care" aria-hidden="true"></span><span><strong>耐心陪伴：</strong>每個孩子都有自己的學習步伐，不必急於求成，也無須與他人比較。</span></li>
        <li><span class="intro-parent-icon is-star" aria-hidden="true"></span><span><strong>多加鼓勵：</strong>欣賞孩子的每一次嘗試和進步，即使答錯，也要肯定他們的努力。</span></li>
        <li><span class="intro-parent-icon is-retry" aria-hidden="true"></span><span><strong>從錯誤中學習：</strong>遇到困難時，可以重播聲音、一起示範，再鼓勵孩子自行嘗試。</span></li>
        <li><span class="intro-parent-icon is-joy" aria-hidden="true"></span><span><strong>愉快學習：</strong>每次練習不必太長，按孩子的興趣和專注力適時休息，讓拼音學習成為愉快的親子時光。</span></li>
      </ul>
      <p class="intro-parent-closing"><strong>學習不是比快，而是一步一步累積進步。您的耐心陪伴與鼓勵，就是孩子學習的最大動力！</strong></p>
    </div>`],
};
const introDialog = document.querySelector('.intro-dialog');
document.querySelectorAll('[data-section]').forEach(button => {
  button.addEventListener('click', () => {
    const [title, content] = introSections[button.dataset.section];
    introDialog.classList.toggle('is-about', button.dataset.section === 'about');
    introDialog.classList.toggle('is-start', button.dataset.section === 'start');
    introDialog.classList.toggle('is-games', button.dataset.section === 'games');
    introDialog.classList.toggle('is-parents', button.dataset.section === 'parents');
    document.querySelector('#intro-dialog-title').textContent = title;
    document.querySelector('#intro-dialog-content').innerHTML = content;
    introDialog.showModal();
  });
});
document.querySelector('.intro-close').addEventListener('click', () => introDialog.close());
introDialog.addEventListener('click', event => {
  if (event.target !== introDialog) return;
  const bounds = introDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) introDialog.close();
});
