(() => {
  const names = ['連接車卡', '裝載貨箱', '吊臂搬運', '接駁橋樑', '郵件軌道車', '隧道礦車', '環形快線'];
  document.querySelectorAll('#groups .station-group').forEach((button, index) => {
    const label = document.createElement('span');
    label.className = 'station-scene-name';
    label.textContent = names[index];
    label.setAttribute('aria-hidden', 'true');
    button.append(label);
    if(index===4 || index===5) {
      const vehicle=document.createElement('img');
      vehicle.className='station-vehicle';
      vehicle.src=`assets/game-style/train-paper-${index===4?'five':'six'}-vehicle.png`;
      vehicle.alt=''; vehicle.setAttribute('aria-hidden','true');
      button.append(vehicle);
    }
    button.style.setProperty('--pop-delay', `${index * -0.28}s`);
  });
})();
