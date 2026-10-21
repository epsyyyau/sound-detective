const shortOo = { id: "oo-short", label: "oo", cue: "short", description: "短音" };
const longOo = { id: "oo-long", label: "oo", cue: "long", description: "長音" };
const thinTh = { id: "th-thin", label: "th", image: "assets/th-thin-voiceless.webp", description: "（不震動）" };
const thisTh = { id: "th-this", label: "th", image: "assets/th-this-voiced.webp", description: "（會震動）" };
const yooUe = { id: "ue", label: "ue", description: "u音" };
const ooUe = { id: "ue-oo", label: "ue", description: "oo長音" };

const groupData = {
  1: {
    sounds: "s · a · t · i · p · n",
    words: [
      ["ant", ["a", "n", "t"]], ["sit", ["s", "i", "t"]],
      ["tap", ["t", "a", "p"]], ["tip", ["t", "i", "p"]],
      ["pin", ["p", "i", "n"]], ["pan", ["p", "a", "n"]],
      ["pat", ["p", "a", "t"]], ["nap", ["n", "a", "p"]],
      ["sip", ["s", "i", "p"]], ["tin", ["t", "i", "n"]],
      ["spin", ["s", "p", "i", "n"]], ["snip", ["s", "n", "i", "p"]],
      ["sat", ["s", "a", "t"]], ["sap", ["s", "a", "p"]],
      ["pit", ["p", "i", "t"]], ["nip", ["n", "i", "p"]],
      ["tan", ["t", "a", "n"]], ["pant", ["p", "a", "n", "t"]],
      ["snap", ["s", "n", "a", "p"]],
    ],
  },
  2: {
    sounds: "c · k · ck · e · h · r · m · d",
    words: [
      ["cat", ["c", "a", "t"]], ["kit", ["k", "i", "t"]],
      ["kid", ["k", "i", "d"]], ["hen", ["h", "e", "n"]],
      ["hat", ["h", "a", "t"]], ["rat", ["r", "a", "t"]],
      ["map", ["m", "a", "p"]], ["pen", ["p", "e", "n"]],
      ["sack", ["s", "a", "ck"]], ["kick", ["k", "i", "ck"]],
      ["man", ["m", "a", "n"]], ["dad", ["d", "a", "d"]],
      ["red", ["r", "e", "d"]], ["ham", ["h", "a", "m"]],
      ["net", ["n", "e", "t"]], ["den", ["d", "e", "n"]],
      ["ram", ["r", "a", "m"]], ["hand", ["h", "a", "n", "d"]],
      ["desk", ["d", "e", "s", "k"]], ["neck", ["n", "e", "ck"]],
    ],
  },
  3: {
    sounds: "g · o · u · l · f · b",
    words: [
      ["dog", ["d", "o", "g"]], ["sun", ["s", "u", "n"]],
      ["cup", ["c", "u", "p"]], ["leg", ["l", "e", "g"]],
      ["fan", ["f", "a", "n"]], ["bat", ["b", "a", "t"]],
      ["bed", ["b", "e", "d"]], ["bun", ["b", "u", "n"]],
      ["log", ["l", "o", "g"]], ["pot", ["p", "o", "t"]],
      ["run", ["r", "u", "n"]], ["fin", ["f", "i", "n"]],
      ["pig", ["p", "i", "g"]], ["bus", ["b", "u", "s"]],
      ["bag", ["b", "a", "g"]], ["bug", ["b", "u", "g"]],
      ["rug", ["r", "u", "g"]], ["lid", ["l", "i", "d"]],
      ["fig", ["f", "i", "g"]], ["fog", ["f", "o", "g"]],
    ],
  },
  4: {
    sounds: "ai · j · oa · ie · ee · or",
    words: [
      ["rain", ["r", "ai", "n"]], ["jam", ["j", "a", "m"]],
      ["boat", ["b", "oa", "t"]], ["pie", ["p", "ie"]],
      ["see", ["s", "ee"]], ["fork", ["f", "or", "k"]],
      ["sail", ["s", "ai", "l"]], ["jet", ["j", "e", "t"]],
      ["goat", ["g", "oa", "t"]], ["tie", ["t", "ie"]],
      ["feet", ["f", "ee", "t"]], ["corn", ["c", "or", "n"]],
      ["mail", ["m", "ai", "l"]], ["coat", ["c", "oa", "t"]],
      ["bee", ["b", "ee"]], ["tail", ["t", "ai", "l"]],
      ["road", ["r", "oa", "d"]], ["jeep", ["j", "ee", "p"]],
      ["paint", ["p", "ai", "n", "t"]], ["storm", ["s", "t", "or", "m"]],
    ],
  },
  5: {
    sounds: "z · w · ng · v · oo（短音）· oo（長音）",
    words: [
      ["zip", ["z", "i", "p"]], ["web", ["w", "e", "b"]],
      ["ring", ["r", "i", "ng"]], ["van", ["v", "a", "n"]],
      ["book", ["b", shortOo, "k"]], ["moon", ["m", longOo, "n"]],
      ["win", ["w", "i", "n"]], ["king", ["k", "i", "ng"]],
      ["zoo", ["z", longOo]], ["vest", ["v", "e", "s", "t"]],
      ["foot", ["f", shortOo, "t"]], ["room", ["r", longOo, "m"]],
      ["wig", ["w", "i", "g"]], ["vet", ["v", "e", "t"]],
      ["wood", ["w", shortOo, "d"]], ["boot", ["b", longOo, "t"]],
      ["zoom", ["z", longOo, "m"]], ["wing", ["w", "i", "ng"]],
      ["spoon", ["s", "p", longOo, "n"]], ["wool", ["w", shortOo, "l"]],
    ],
  },
  6: {
    sounds: "y · x · ch · sh · th（不震動）· th（會震動）",
    words: [
      ["yes", ["y", "e", "s"]], ["fox", ["f", "o", "x"]],
      ["chin", ["ch", "i", "n"]], ["ship", ["sh", "i", "p"]],
      ["thin", [thinTh, "i", "n"]], ["this", [thisTh, "i", "s"]],
      ["yam", ["y", "a", "m"]], ["box", ["b", "o", "x"]],
      ["chat", ["ch", "a", "t"]], ["fish", ["f", "i", "sh"]],
      ["moth", ["m", "o", thinTh]], ["that", [thisTh, "a", "t"]],
      ["yak", ["y", "a", "k"]], ["six", ["s", "i", "x"]],
      ["chick", ["ch", "i", "ck"]], ["shop", ["sh", "o", "p"]],
      ["bath", ["b", "a", thinTh]], ["them", [thisTh, "e", "m"]],
      ["shell", ["sh", "e", "l"]], ["teeth", ["t", "ee", thinTh]],
    ],
  },
  7: {
    sounds: "qu · ou · oi · ue · er · ar",
    words: [
      ["quiz", ["qu", "i", "z"]], ["out", ["ou", "t"]],
      ["coin", ["c", "oi", "n"]], ["blue", ["b", "l", ooUe]],
      ["sister", ["s", "i", "s", "t", "er"]], ["car", ["c", "ar"]],
      ["mouth", ["m", "ou", thinTh]], ["glue", ["g", "l", ooUe]],
      ["quack", ["qu", "a", "ck"]], ["boil", ["b", "oi", "l"]],
      ["letter", ["l", "e", "t", "er"]], ["star", ["s", "t", "ar"]],
      ["queen", ["qu", "ee", "n"]], ["cloud", ["c", "l", "ou", "d"]],
      ["point", ["p", "oi", "n", "t"]], ["shark", ["sh", "ar", "k"]],
      ["fuel", ["f", yooUe, "l"]], ["hammer", ["h", "a", "m", "er"]],
      ["pouch", ["p", "ou", "ch"]], ["cue", ["c", yooUe]],
    ],
  },
};

const pseudowordData = {
  1: {
    lightWords: ["tas", "nis", "nas", "sas", "nin", "tasp"],
    words: [
      ["tas", ["t", "a", "s"]], ["nis", ["n", "i", "s"]],
      ["nas", ["n", "a", "s"]], ["sas", ["s", "a", "s"]],
      ["nin", ["n", "i", "n"]], ["tasp", ["t", "a", "s", "p"]],
      ["nisp", ["n", "i", "s", "p"]], ["snat", ["s", "n", "a", "t"]],
    ],
  },
  2: {
    lightWords: ["pem", "kem", "dap", "hent", "nemp", "crin"],
    words: [
      ["pem", ["p", "e", "m"]], ["kem", ["k", "e", "m"]],
      ["mip", ["m", "i", "p"]], ["dap", ["d", "a", "p"]],
      ["dek", ["d", "e", "k"]], ["hent", ["h", "e", "n", "t"]],
      ["nemp", ["n", "e", "m", "p"]], ["kisp", ["k", "i", "s", "p"]],
      ["dasp", ["d", "a", "s", "p"]], ["crin", ["c", "r", "i", "n"]],
    ],
  },
  3: {
    lightWords: ["gop", "gup", "fim", "lup", "baf", "mub"],
    words: [
      ["gop", ["g", "o", "p"]], ["gup", ["g", "u", "p"]],
      ["fim", ["f", "i", "m"]], ["lup", ["l", "u", "p"]],
      ["baf", ["b", "a", "f"]], ["rud", ["r", "u", "d"]],
      ["teg", ["t", "e", "g"]], ["fep", ["f", "e", "p"]],
      ["mub", ["m", "u", "b"]], ["dol", ["d", "o", "l"]],
      ["bim", ["b", "i", "m"]], ["lom", ["l", "o", "m"]],
    ],
  },
  4: {
    lightWords: ["maip", "jep", "poat", "miep", "peem", "dort"],
    words: [
      ["maip", ["m", "ai", "p"]], ["dait", ["d", "ai", "t"]],
      ["jep", ["j", "e", "p"]], ["jom", ["j", "o", "m"]],
      ["poat", ["p", "oa", "t"]], ["noam", ["n", "oa", "m"]],
      ["miep", ["m", "ie", "p"]], ["tief", ["t", "ie", "f"]],
      ["peem", ["p", "ee", "m"]], ["feen", ["f", "ee", "n"]],
      ["dort", ["d", "or", "t"]], ["sorp", ["s", "or", "p"]],
    ],
  },
  5: {
    lightWords: ["zim", "wap", "nang", "vop", "dook", "noom"],
    words: [
      ["zim", ["z", "i", "m"]], ["zep", ["z", "e", "p"]],
      ["wap", ["w", "a", "p"]], ["wem", ["w", "e", "m"]],
      ["wib", ["w", "i", "b"]], ["nang", ["n", "a", "ng"]],
      ["seng", ["s", "e", "ng"]], ["vop", ["v", "o", "p"]],
      ["vem", ["v", "e", "m"]], ["dook", ["d", shortOo, "k"]],
      ["noom", ["n", longOo, "m"]], ["zoop", ["z", longOo, "p"]],
    ],
  },
  6: {
    lightWords: ["yem", "pex", "chep", "shap", "thep", "thim"],
    words: [
      ["yem", ["y", "e", "m"]], ["yop", ["y", "o", "p"]],
      ["pex", ["p", "e", "x"]], ["dax", ["d", "a", "x"]],
      ["chep", ["ch", "e", "p"]], ["chom", ["ch", "o", "m"]],
      ["shap", ["sh", "a", "p"]], ["shem", ["sh", "e", "m"]],
      ["thep", [thinTh, "e", "p"]], ["thop", [thinTh, "o", "p"]],
      ["thim", [thisTh, "i", "m"]], ["thab", [thisTh, "a", "b"]],
    ],
  },
  7: {
    lightWords: ["quim", "dout", "foin", "plue", "vemer", "zarn", "merp", "tarm"],
    words: [
      ["quim", ["qu", "i", "m"]], ["quop", ["qu", "o", "p"]],
      ["dout", ["d", "ou", "t"]], ["poud", ["p", "ou", "d"]],
      ["foin", ["f", "oi", "n"]], ["doil", ["d", "oi", "l"]],
      ["plue", ["p", "l", "ue"]], ["smue", ["s", "m", "ue"]],
      ["vemer", ["v", "e", "m", "er"]], ["zamer", ["z", "a", "m", "er"]],
      ["zarn", ["z", "ar", "n"]], ["parn", ["p", "ar", "n"]],
      ["merp", ["m", "er", "p"]], ["tarm", ["t", "ar", "m"]],
    ],
  },
};

const parameters = new URLSearchParams(window.location.search);
const requestedGroup = Number(parameters.get("group"));
const groupNumber = groupData[requestedGroup] ? requestedGroup : 1;
const isChallenge = parameters.get("mode") === "challenge";
const modeName = isChallenge ? "挑戰版" : "輕量版";
const questionTotal = isChallenge ? 16 : 12;
const levels = (isChallenge ? [5, 5, 6] : [4, 4, 4]).map((count, index) => ({
  name: `第 ${index + 1} 關`,
  short: isChallenge ? "混合拆音挑戰" : "拆音練習",
  count,
}));

function normalizeSegment(segment) {
  if (typeof segment !== "string") return segment;
  return { id: segment, label: segment };
}

function getSoundFamily(sound) {
  return sound.label === "ue" ? "ue-sound" : ["c", "k", "ck"].includes(sound.id) ? "k-sound" : sound.id;
}

// This spelling-based interface cannot represent doubled letters with one sound tile.
function hasCompleteSpelling(record) {
  return record.segments.map(sound => sound.label).join("") === record.word;
}

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

const records = groupData[groupNumber].words.map(([word, segments], index) => ({
  word,
  isPseudoword: false,
  audio: `assets/word-audio/real/group-${groupNumber}/${word}.m4a?v=20261011-rerecorded`,
  picture: soundWordPicture(word,index < 12
    ? `assets/pictures/${index < 8 ? "輕量版words" : "挑戰版words"}/${word}.jpg`
    : `assets/pictures/第二套真字/${word}.png?v=20260903-real-pictures-2`),
  segments: segments.map(normalizeSegment),
})).filter(hasCompleteSpelling);

// "cook" needs both c and k: their order cannot be inferred from audio alone.
const extraRecords = SoundWordExtras.filter(record=>record.group===groupNumber&&record.word!=='cook').map(record=>({
  ...record,isPseudoword:false,
  segments:record.segments.map(segment=>normalizeSegment(segment==='oo-short'?shortOo:segment)),
})).filter(hasCompleteSpelling);
records.push(...extraRecords);

const pseudowordRecords = pseudowordData[groupNumber].words.map(([word, segments]) => ({
  word,
  isPseudoword: true,
  audio: `assets/word-audio/pseudowords/group-${groupNumber}/${word}.m4a?v=20260903-rerecorded-2`,
  segments: segments.map(normalizeSegment),
})).filter(hasCompleteSpelling);

const lightRecords = [...new Map([
  ...records.slice(0, 8), ...records.slice(12, 16), ...extraRecords,
  ...records.filter(record=>record.segments.some(sound=>sound.id==='ck')),
].map(record=>[record.word,record])).values()];
const realSourceRecords = isChallenge
  ? records.filter((record) => !(groupNumber === 1 && record.word === "stamp"))
  : lightRecords;
const pseudowordSourceRecords = isChallenge
  ? pseudowordRecords
  : pseudowordRecords.filter((record) => pseudowordData[groupNumber].lightWords.includes(record.word));
const questionsPerType = questionTotal / 2;
const questions = shuffled([
  ...shuffled(realSourceRecords).slice(0, questionsPerType),
  ...shuffled(pseudowordSourceRecords).slice(0, questionsPerType),
]).map((question, index) => ({
  ...question,
  levelIndex: index < levels[0].count ? 0 : index < levels[0].count + levels[1].count ? 1 : 2,
}));
const soundPool = [...new Map(
  [...records, ...pseudowordRecords]
    .flatMap((record) => record.segments)
    .map((sound) => [sound.id, sound]),
).values()];

let questionIndex = 0;
let rewardSolvedCount = 0;
let selectedTiles = [];
let activeAudio;
let acceptingAnswer = true;

const questionView = document.querySelector("[data-question-view]");
const clueProgress = new ClueProgress('puzzle');
const levelTrack = document.querySelector("[data-level-track]");
const levelLabel = document.querySelector("[data-level-label]");
const completeView = document.querySelector("[data-complete-view]");
const progressBar = document.querySelector("[data-progress-bar]");
const progressText = document.querySelector("[data-progress-text]");
const soundSlots = document.querySelector("[data-sound-slots]");
const soundOptions = document.querySelector("[data-sound-options]");
const feedback = document.querySelector("[data-feedback]");
const undoButton = document.querySelector("[data-undo-selection]");
const resetButton = document.querySelector("[data-reset-selection]");
const nextButton = document.querySelector("[data-next-question]");
const correctOverlay = document.querySelector("[data-correct-overlay]");
const correctPicture = document.querySelector("[data-correct-picture]");
const completeWord = document.querySelector("[data-complete-word]");
const questionTitle = document.querySelector("[data-question-title]");
const playWordButton = document.querySelector("[data-play-word]");
const audioCue = new QuestionAudioCue(playWordButton, soundOptions);
const correctTitle = document.querySelector("[data-correct-title]");
const correctSegments = document.querySelector("[data-correct-segments]");
const correctPseudowordNote = document.querySelector("[data-correct-pseudoword-note]");
const infoButton = document.querySelector("[data-code-info]");
const infoBox = infoButton.closest(".pseudoword-info");

setLessonIdentity(groupNumber, modeName);
levelTrack.classList.add("paper-level-track");
levelTrack.classList.toggle("is-challenge", isChallenge);
document.querySelector("[data-group-sounds]").textContent = groupData[groupNumber].sounds;
document.querySelector("[data-mode-label]").textContent = modeName;
document.querySelector("[data-complete-title]").textContent = `成功找到第${["一", "二", "三", "四", "五", "六", "七"][groupNumber - 1]}組暗號！`;
document.title = `第 ${groupNumber} 組拆音「聲」探 | 小小「聲」探`;

function renderLevelTrack(currentLevel) {
  levelTrack.innerHTML = "";
  levels.forEach((level, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.disabled = true;
    button.classList.add("paper-level-button");
    if (index === currentLevel) {
      button.classList.add("is-current");
      button.setAttribute("aria-current", "step");
    } else if (index < currentLevel) {
      button.classList.add("is-complete");
    }
    button.setAttribute("aria-label", `${level.name}：${level.short}`);
    const icon = isChallenge ? "folder" : ["magnifier", "listening", "trail"][index];
    button.innerHTML = `<span class="paper-level-art is-${icon}" aria-hidden="true"></span><i>${index + 1}</i>`;
    levelTrack.append(button);
  });
}

function stopAudio() {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
}

function closeInfo() {
  infoBox.classList.remove("is-open");
  infoButton.setAttribute("aria-expanded", "false");
}

function soundMarkup(sound, includeImage = true) {
  if (sound.image && includeImage) {
    return `<img src="${sound.image}" alt=""><span><strong>${sound.label}</strong><small>${sound.description}</small></span>`;
  }
  if (sound.cue) {
    return `<strong>${sound.label}</strong><span class="duration-arrow is-${sound.cue}" aria-hidden="true"></span><small>${sound.description}</small>`;
  }
  return `<strong>${sound.label}</strong>${sound.description ? `<small>${sound.description}</small>` : ""}`;
}

function getChoices(question) {
  const representedFamilies = new Set(question.segments.map(getSoundFamily));
  const distractors = [];
  if (isChallenge) {
    shuffled(soundPool).forEach((sound) => {
      const family = getSoundFamily(sound);
      if (distractors.length < 2 && !representedFamilies.has(family)) {
        distractors.push(sound);
        representedFamilies.add(family);
      }
    });
  }
  return shuffled([
    ...question.segments.map((sound, index) => ({ sound, key: `required-${index}` })),
    ...distractors.map((sound, index) => ({ sound, key: `distractor-${index}` })),
  ]);
}

function renderSlots(question) {
  soundSlots.style.setProperty("--slot-count", question.segments.length);
  soundSlots.innerHTML = "";
  question.segments.forEach((_, index) => {
    const slot = document.createElement("span");
    const selected = selectedTiles[index];
    if (selected) {
      if (selected.sound.cue) slot.classList.add("has-duration-cue");
      slot.innerHTML = soundMarkup(selected.sound, false);
    } else {
      slot.textContent = index + 1;
      slot.classList.add("is-empty");
    }
    soundSlots.append(slot);
  });
}

function updateArrangeButtons() {
  const hasSelection = selectedTiles.length > 0;
  soundOptions.classList.toggle('has-full-sequence', selectedTiles.length === questions[questionIndex].segments.length);
  undoButton.disabled = !hasSelection || !acceptingAnswer;
  resetButton.disabled = !hasSelection || !acceptingAnswer;
}

function resetSelection() {
  if (!acceptingAnswer) return;
  selectedTiles = [];
  soundOptions.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
    button.classList.remove("is-selected");
  });
  soundSlots.classList.remove("is-wrong");
  feedback.textContent = "";
  feedback.className = "answer-feedback";
  renderSlots(questions[questionIndex]);
  updateArrangeButtons();
}

function undoSelection() {
  if (!selectedTiles.length || !acceptingAnswer) return;
  const removed = selectedTiles.pop();
  const button = soundOptions.querySelector(`[data-tile-key="${removed.key}"]`);
  if (button) {
    button.disabled = false;
    button.classList.remove("is-selected");
  }
  soundSlots.classList.remove("is-wrong");
  feedback.textContent = "";
  feedback.className = "answer-feedback";
  renderSlots(questions[questionIndex]);
  updateArrangeButtons();
}

function showCorrectAnswer(question) {
  acceptingAnswer = false;
  audioCue.clear();
  soundOptions.querySelectorAll("button").forEach((button) => { button.disabled = true; });
  updateArrangeButtons();
  feedback.textContent = "";
  feedback.className = "answer-feedback is-correct";
  completeWord.textContent = question.word;
  correctPicture.hidden = true;
  correctTitle.textContent = "拆音成功";
  correctSegments.textContent = question.segments.map(sound => sound.label).join(' · ');
  correctPseudowordNote.hidden = !question.isPseudoword;
  if (!question.isPseudoword) {
    correctPicture.onload = () => { correctPicture.hidden = false; };
    correctPicture.onerror = () => { correctPicture.hidden = true; };
    correctPicture.src = question.picture;
    correctPicture.alt = `${question.word} 的圖片`;
  } else {
    correctPicture.onload = null;
    correctPicture.onerror = null;
    correctPicture.src = "assets/pseudoword-envelope.webp";
    correctPicture.alt = "「聲」探暗號信封";
    correctPicture.hidden = false;
  }
  setQuestionAdvanceIcon(nextButton, questionIndex === questions.length - 1);
  correctOverlay.hidden = false;
  nextButton.focus();
}

function checkSequence(question) {
  const correct = question.segments.every((sound, index) => selectedTiles[index].sound.id === sound.id);
  if (correct) {
    showCorrectAnswer(question);
    return;
  }
  soundSlots.classList.add("is-wrong");
  feedback.textContent = "聲音次序尚未正確，請復原或重新排列。";
  feedback.className = "answer-feedback is-wrong";
}

function selectSound(button, tile) {
  const question = questions[questionIndex];
  if (!acceptingAnswer || button.disabled || selectedTiles.length >= question.segments.length) return;
  selectedTiles.push(tile);
  button.disabled = true;
  button.classList.add("is-selected");
  soundSlots.classList.remove("is-wrong");
  renderSlots(question);
  updateArrangeButtons();
  if (selectedTiles.length === question.segments.length) checkSequence(question);
}

function renderOption(tile) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.tileKey = tile.key;
  button.setAttribute("aria-label", tile.sound.label !== "ue" && tile.sound.description
    ? `${tile.sound.label}，${tile.sound.description}`
    : tile.sound.label);
  if (tile.sound.image) button.classList.add("has-sound-cue-image");
  if (tile.sound.cue) button.classList.add("has-duration-cue");
  button.innerHTML = tile.sound.label === "ue" ? `<strong>${tile.sound.label}</strong>` : soundMarkup(tile.sound);
  button.addEventListener("click", () => selectSound(button, tile));
  soundOptions.append(button);
}

function renderQuestion() {
  audioCue.reset();
  stopAudio();
  closeInfo();
  acceptingAnswer = true;
  selectedTiles = [];
  const question = questions[questionIndex];
  const level = levels[question.levelIndex];
  const levelStart = levels.slice(0, question.levelIndex).reduce((sum, item) => sum + item.count, 0);
  const levelQuestionIndex = questionIndex - levelStart;
  clueProgress.show(level.count, levelQuestionIndex, question.levelIndex);
  renderLevelTrack(question.levelIndex);
  levelLabel.textContent = level.name;
  infoBox.hidden = !question.isPseudoword;
  questionTitle.textContent = "破解暗號";
  const playLabel = question.isPseudoword ? "播放暗號" : "播放詞語";
  playWordButton.setAttribute("aria-label", playLabel);
  playWordButton.title = playLabel;
  progressText.textContent = `第 ${levelQuestionIndex + 1} / ${level.count} 題`;
  progressBar.style.width = `${(levelQuestionIndex / level.count) * 100}%`;
  correctOverlay.hidden = true;
  soundSlots.classList.remove("is-wrong");
  soundOptions.innerHTML = "";
  getChoices(question).forEach(renderOption);
  renderSlots(question);
  updateArrangeButtons();
  feedback.textContent = "";
  feedback.className = "answer-feedback";
}

async function playWord() {
  stopAudio();
  const question = questions[questionIndex];
  activeAudio = new Audio(question.audio);
  await audioCue.play(activeAudio, () => {
    feedback.textContent = question.isPseudoword
      ? "未能播放暗號，請再次按下播放按鈕。"
      : "未能播放詞語，請再次按下播放按鈕。";
    feedback.className = "answer-feedback is-wrong";
  });
}

function finishActivity() {
  clueProgress.finish();
  audioCue.clear();
  stopAudio();
  progressBar.style.width = "100%";
  progressText.textContent = "完成";
  questionView.hidden = true;
  completeView.hidden = false;
}

function goToNextQuestion() {
  const earnedClue = !correctOverlay.hidden;
  correctOverlay.hidden = true;
  if (earnedClue) clueProgress.collect({ animate: true });
  if (earnedClue) rewardSolvedCount += 1;
  const rewardDue = earnedClue && rewardSolvedCount % 5 === 0;
  if (questionIndex === questions.length - 1) {
    finishActivity();
    if (rewardDue) RewardMessages.show((groupNumber - 1) * 5 + 9 + rewardSolvedCount / 5 - 1);
    return;
  }
  questionIndex += 1;
  renderQuestion();
  if (rewardDue) RewardMessages.show((groupNumber - 1) * 5 + 9 + rewardSolvedCount / 5 - 1);
}

document.querySelector("[data-play-word]").addEventListener("click", playWord);
document.querySelector("[data-skip-question]").addEventListener("click", goToNextQuestion);
infoButton.addEventListener("click", () => {
  const open = !infoBox.classList.contains("is-open");
  infoBox.classList.toggle("is-open", open);
  infoButton.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", (event) => {
  if (!infoBox.contains(event.target)) closeInfo();
});
undoButton.addEventListener("click", undoSelection);
resetButton.addEventListener("click", resetSelection);
nextButton.addEventListener("click", goToNextQuestion);
renderQuestion();
