(() => {
  const rewards = [
    ["01-clue-found.png", "做得好！"],
    ["02-listening.png", "聽得真仔細！"],
    ["03-sounds-together.png", "線索連起來了！"],
    ["04-progress.png", "繼續加油！"],
    ["05-detective-badge.png", "出色的「聲」探！"],
    ["06-unlocked.png", "你解開新線索！"],
    ["07-compass.png", "繼續向前探索！"],
    ["08-evidence.png", "又有新發現！"],
    ["09-trail.png", "一步一步進步！"],
    ["10-rosette.png", "你做到了！"],
  ];

  let dialog;
  function show(index) {
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "reward-message-dialog";
      dialog.innerHTML = '<img class="reward-message-icon" alt=""><p class="reward-message-text"></p><button type="button" class="reward-message-continue">繼續</button>';
      dialog.querySelector("button").addEventListener("click", () => dialog.close());
      document.body.append(dialog);
    }
    const [icon, message] = rewards[((index % rewards.length) + rewards.length) % rewards.length];
    dialog.querySelector("img").src = `assets/reward-messages/${icon}`;
    dialog.querySelector(".reward-message-text").textContent = message;
    if (!dialog.open) dialog.showModal();
    dialog.querySelector("button").focus();
  }

  window.RewardMessages = { show, rewards };
})();
