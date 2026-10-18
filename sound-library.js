const soundFiles = [
  "s.mp3",
  "a.mp3",
  "t.mp3",
  "i.mp3",
  "p.mp3",
  "n.mp3",
  "ck.mp3",
  "ck.mp3",
  "ck.mp3",
  "e.mp3",
  "h.mp3",
  "r.mp3",
  "m.mp3",
  "d.mp3",
  "g.mp3",
  "o.mp3",
  "u.mp3",
  "l.mp3",
  "f.mp3",
  "b.mp3",
  "ai.mp3",
  "j.mp3",
  "oa.mp3",
  "ie.mp3",
  "ee.mp3",
  "or.mp3",
  "z.mp3",
  "w.mp3",
  "ng.mp3",
  "v.mp3",
  "book.mp3",
  "moon.mp3",
  "y.mp3",
  "x.mp3",
  "ch.mp3",
  "sh.mp3",
  "three.mp3",
  "this.mp3",
  "qu.mp3",
  "ou.mp3",
  "oi.mp3",
  "ue.mp3",
  "moon.mp3",
  "er.mp3",
  "ar.mp3",
];

const audioCache = new Map();
const status = document.querySelector("[data-audio-status]");

function setStatus(message) {
  if (!status) return;
  status.textContent = message;
}

function getAudio(fileName) {
  if (!audioCache.has(fileName)) {
    const audio = new Audio(`assets/sounds/personal/${fileName}?v=20261011-rerecorded`);
    audio.preload = "auto";
    audioCache.set(fileName, audio);
  }

  return audioCache.get(fileName);
}

document.querySelectorAll(".sound-tile").forEach((tile, index) => {
  const fileName = soundFiles[index];
  const letters = tile.querySelector("strong")?.textContent?.trim();
  const cue = tile.querySelector("span:not([aria-hidden]), small")?.textContent?.trim();
  const soundLabel = letters === "th" ? `${letters}${cue}` : [letters, cue].filter(Boolean).join("，") || "this sound";

  tile.type = "button";
  tile.setAttribute("aria-label", `播放 ${soundLabel} 的發音`);

  tile.addEventListener("click", async () => {
    if (!fileName) return;

    const audio = getAudio(fileName);
    audio.pause();
    audio.currentTime = 0;
    setStatus("");

    try {
      await audio.play();
    } catch {
      setStatus(`暫時未找到 ${soundLabel} 的發音檔，請稍後再試。`);
    }
  });
});
