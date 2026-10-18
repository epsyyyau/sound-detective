(() => {
  const missions = {
    groups: ['連起車卡上的聲音，讀出第一條線索！','檢查貨箱上的字音，讀出貨物線索！','啟動吊臂，將箱子上的聲音連起來！','連起橋上的字音，讓線索列車通過！','讀出郵件線索，取得通行許可！','讀出隧道線索，讓礦車通過！','拼接環形快線的車卡，讀出新的線索！'],
    routes: ['選對聲音試管，調出新的單字線索！','找出正確的聲音氣泡，換出新單字！','用聲音磁牌替換一個音，找出新線索！','換上正確的聲音光格，接通線索！','轉動聲音輪盤，換出目標單字！','掃描前後的單字，找出改變的聲音！','選對聲音印章，蓋出新的單字線索！'],
    'family-stops': ['拼好字詞、找對圖片，為線索蓋上郵局印章！','拼出字詞、認出相符的相片，把線索夾起來！','拼讀貨物線索，核對與字詞相符的圖片！','讀出字詞、找對圖片，開閘讓小車通過！','在圖書館拼讀字詞，找出對應的圖片線索！','替招牌配上字頭，拼好字詞並找對圖片！','連起字頭與字尾，拼出字詞並找對圖片！'],
  };
  Object.entries(missions).forEach(([id, lines]) => {
    const holder = document.getElementById(id);
    if (!holder) return;
    const cover = document.getElementById(id === 'family-stops' ? 'family-map' : 'setup');
    const hint = document.createElement('p');
    hint.className = 'group-mission-hint';
    hint.setAttribute('aria-live', 'polite');
    cover.append(hint);
    const buttons = [...holder.querySelectorAll('button')];
    const show = button => { hint.textContent = lines[buttons.indexOf(button)] || ''; };
    const restore = () => {
      const focused = buttons.find(button => button === document.activeElement);
      hint.textContent = focused ? lines[buttons.indexOf(focused)] : '';
    };
    buttons.forEach((button, index) => {
      const description = document.createElement('span');
      description.id = `${id}-mission-${index + 1}`;
      description.className = 'group-mission-description';
      description.textContent = lines[index];
      cover.append(description);
      button.setAttribute('aria-describedby', [button.getAttribute('aria-describedby'), description.id].filter(Boolean).join(' '));
      button.addEventListener('pointerenter', () => show(button));
      button.addEventListener('pointerleave', restore);
      button.addEventListener('focus', () => show(button));
      button.addEventListener('blur', restore);
    });
  });
})();
