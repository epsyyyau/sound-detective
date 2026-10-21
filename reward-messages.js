(() => {
  const rewards = [
    ["01-clue-found.webp", "做得好！"],
    ["02-listening.webp", "聽得真仔細！"],
    ["03-sounds-together.webp", "線索連起來了！"],
    ["04-progress.webp", "繼續加油！"],
    ["05-detective-badge.webp", "出色的「聲」探！"],
    ["06-unlocked.webp", "你解開新線索！"],
    ["07-compass.webp", "繼續向前探索！"],
    ["08-evidence.webp", "又有新發現！"],
    ["09-trail.webp", "一步一步進步！"],
    ["10-rosette.webp", "你做到了！"],
  ];

  let dialog;
  let pendingImage = 0;
  const imageCache = new Map();
  function loadImage(url) {
    if (!imageCache.has(url)) {
      const image = new Image();
      image.src = url;
      imageCache.set(url, image.decode().then(() => url).catch(() => null));
    }
    return imageCache.get(url);
  }

  async function show(index) {
    if (window.parent !== window && new URLSearchParams(location.search).has("route-phone-frame")) {
      window.parent.postMessage({ type: "sound-detective:reward", index }, location.origin);
      return;
    }
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "reward-message-dialog";
      dialog.innerHTML = '<img class="reward-message-icon" alt=""><p class="reward-message-text"></p><button type="button" class="reward-message-continue">繼續</button>';
      dialog.querySelector("button").addEventListener("click", () => dialog.close());
      document.body.append(dialog);
    }
    const request = ++pendingImage;
    const [icon, message] = rewards[((index % rewards.length) + rewards.length) % rewards.length];
    const imageElement = dialog.querySelector("img");
    imageElement.style.visibility = "hidden";
    const url = await loadImage(`assets/reward-messages/${icon}`);
    if (request !== pendingImage) return;
    if (url) imageElement.src = url;
    dialog.querySelector(".reward-message-text").textContent = message;
    if (!dialog.open) dialog.showModal();
    imageElement.style.visibility = url ? "visible" : "hidden";
    dialog.querySelector("button").focus();
  }

  window.addEventListener("message", event => {
    if (event.origin !== location.origin ||
        event.source !== document.getElementById("route-phone-frame")?.contentWindow ||
        !document.body.classList.contains("route-phone-active") ||
        event.data?.type !== "sound-detective:reward" ||
        !Number.isInteger(event.data.index)) return;
    show(event.data.index);
  });

  window.RewardMessages = { show, rewards };
})();
