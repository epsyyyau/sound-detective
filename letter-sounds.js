const soundGroups = {
  1: [
    { id: "s", label: "s", audio: "s.mp3" },
    { id: "a", label: "a", audio: "a.mp3" },
    { id: "t", label: "t", audio: "t.mp3" },
    { id: "i", label: "i", audio: "i.mp3" },
    { id: "p", label: "p", audio: "p.mp3" },
    { id: "n", label: "n", audio: "n.mp3" },
  ],
  2: [
    { id: "ck", label: "c、k、ck", letters: ["c", "k", "ck"], hint: "相同聲音", audio: "ck.mp3" },
    { id: "e", label: "e", audio: "e.mp3" },
    { id: "h", label: "h", audio: "h.mp3" },
    { id: "r", label: "r", audio: "r.mp3" },
    { id: "m", label: "m", audio: "m.mp3" },
    { id: "d", label: "d", audio: "d.mp3" },
  ],
  3: [
    { id: "g", label: "g", audio: "g.mp3" },
    { id: "o", label: "o", audio: "o.mp3" },
    { id: "u", label: "u", audio: "u.mp3" },
    { id: "l", label: "l", audio: "l.mp3" },
    { id: "f", label: "f", audio: "f.mp3" },
    { id: "b", label: "b", audio: "b.mp3" },
  ],
  4: [
    { id: "ai", label: "ai", audio: "ai.mp3" },
    { id: "j", label: "j", audio: "j.mp3" },
    { id: "oa", label: "oa", audio: "oa.mp3" },
    { id: "ie", label: "ie", audio: "ie.mp3" },
    { id: "ee", label: "ee", audio: "ee.mp3" },
    { id: "or", label: "or", audio: "or.mp3" },
  ],
  5: [
    { id: "z", label: "z", audio: "z.mp3" },
    { id: "w", label: "w", audio: "w.mp3" },
    { id: "ng", label: "ng", audio: "ng.mp3" },
    { id: "v", label: "v", audio: "v.mp3" },
    { id: "oo-book", label: "oo", hint: "短音", duration: "short", audio: "book.mp3" },
    { id: "oo-moon", label: "oo", hint: "長音", duration: "long", audio: "moon.mp3" },
  ],
  6: [
    { id: "y", label: "y", audio: "y.mp3" },
    { id: "x", label: "x", audio: "x.mp3" },
    { id: "ch", label: "ch", audio: "ch.mp3" },
    { id: "sh", label: "sh", audio: "sh.mp3" },
    {
      id: "th-thin",
      label: "th",
      hint: "不震動",
      cue: "（不震動）",
      instruction: "聲帶不震動",
      image: "assets/th-thin-card.png",
      audio: "three.mp3",
    },
    {
      id: "th-this",
      label: "th",
      hint: "會震動",
      cue: "（會震動）",
      instruction: "聲帶會震動",
      image: "assets/th-this-card.png",
      audio: "this.mp3",
    },
  ],
  7: [
    { id: "qu", label: "qu", audio: "qu.mp3" },
    { id: "ou", label: "ou", audio: "ou.mp3" },
    { id: "oi", label: "oi", audio: "oi.mp3" },
    { id: "ue", label: "ue", hint: "u音", audio: "ue.mp3" },
    { id: "ue-oo", label: "ue", hint: "oo長音", audio: "moon.mp3" },
    { id: "er", label: "er", audio: "er.mp3" },
    { id: "ar", label: "ar", audio: "ar.mp3" },
  ],
};

const requestedGroup = Number(new URLSearchParams(window.location.search).get("group"));
const groupNumber = soundGroups[requestedGroup] ? requestedGroup : 1;
const groupSounds = soundGroups[groupNumber];
const soundsById = new Map(groupSounds.map((sound) => [sound.id, sound]));
const requestedMode = new URLSearchParams(window.location.search).get("mode");
const isChallenge = requestedMode === "challenge";
const modeName = isChallenge ? "挑戰版" : "輕量版";

const levelSettings = isChallenge
  ? [
      { name: "第 1 關", short: "三選一", sounds: groupSounds, rounds: 8, optionCount: 3 },
      { name: "第 2 關", short: "六選一", sounds: groupSounds, rounds: 12, optionCount: 6 },
      { name: "綜合挑戰", short: "18 題", sounds: groupSounds, rounds: 18, optionCount: 6 },
    ]
  : [
      { name: "第 1 關", sounds: groupSounds.slice(0, groupNumber === 7 ? 3 : 2), rounds: 8 },
      { name: "第 2 關", sounds: groupNumber === 7 ? [...groupSounds.slice(3, 5), groupSounds[2]] : groupSounds.slice(2, 4), rounds: 8 },
      { name: "第 3 關", sounds: groupSounds.slice(groupNumber === 7 ? 5 : 4), rounds: 8 },
      { name: groupNumber === 7 ? "七音混合" : "六音混合", short: groupNumber === 7 ? "七個音" : "六個音", sounds: groupSounds, rounds: 6 },
      { name: "本組挑戰", sounds: groupSounds, rounds: 12 },
    ];

const levels = levelSettings.map((level) => ({
  ...level,
  soundIds: level.sounds.map((sound) => sound.id),
  optionCount: level.optionCount || level.sounds.length,
  short: level.short || (level.sounds.length === 2
    ? level.sounds.map(formatSoundText).join(" · ")
    : level.name === "六音混合" ? "六個音" : "挑戰"),
}));

function makeAnswerOptions(level, target) {
  const optionPool = isChallenge ? groupSounds.map(sound => sound.id) : level.soundIds;
  const targetIsUe = soundsById.get(target).label === "ue";
  let hasUe = targetIsUe;
  const distractors = shuffled(optionPool.filter(id => id !== target)).filter(id => {
    if (soundsById.get(id).label !== "ue") return true;
    if (hasUe) return false;
    hasUe = true;
    return true;
  });
  if (level.soundIds.length === 2) {
    if (level.soundIds.includes("th-thin") && level.soundIds.includes("th-this")) return ["th-thin", "th-this"];
    if (level.soundIds.includes("oo-book") && level.soundIds.includes("oo-moon")) return ["oo-book", "oo-moon"];
  }
  return shuffled([target, ...distractors.slice(0, level.optionCount - 1)]);
}

const audioCache = new Map();
const clueProgress = new ClueProgress('wave');
let currentLevel = 0;
let unlockedLevel = 0;
let questionIndex = 0;
let questions = [];
let acceptingAnswer = true;
let firstAttempt = true;
let firstAttemptCorrect = 0;

const levelTrack = document.querySelector("[data-level-track]");
const levelLabel = document.querySelector("[data-level-label]");
const progressBar = document.querySelector("[data-progress-bar]");
const progressText = document.querySelector("[data-progress-text]");
const learnView = document.querySelector("[data-learn-view]");
const learnTitle = document.querySelector("[data-learn-title]");
const learnSounds = document.querySelector("[data-learn-sounds]");
const quizView = document.querySelector("[data-quiz-view]");
const completeView = document.querySelector("[data-complete-view]");
const questionCount = document.querySelector("[data-question-count]");
const answerOptions = document.querySelector("[data-answer-options]");
const feedback = document.querySelector("[data-feedback]");
const nextQuestionButton = document.querySelector("[data-next-question]");
const skipQuestionButton = document.querySelector("[data-skip-question]");
const completeTitle = document.querySelector("[data-complete-title]");
const nextLevelButton = document.querySelector("[data-next-level]");
const audioCue = new QuestionAudioCue(document.querySelector("[data-play-question]"), answerOptions);
const panelLayout = new LetterPanelLayout(document.querySelector('.sound-file-panel'));

function formatSoundText(sound) {
  if (sound.image) return `${sound.label}（${sound.hint}）`;
  return sound.hint ? `${sound.label} (${sound.hint})` : sound.label;
}

function soundMarkup(sound) {
  if (sound.letters) {
    return `<span class="sound-letter-pair">${sound.letters.map((letter) => `<strong>${letter}</strong>`).join("")}</span><small>${sound.hint}</small>`;
  }
  if (sound.duration) {
    return `
      <span class="duration-arrow is-${sound.duration}" aria-hidden="true"></span>
      <strong>${sound.label}</strong>
      <small>${sound.hint}</small>
    `;
  }
  const detail = sound.image ? sound.cue : [sound.hint, sound.cue].filter(Boolean).join(" · ");
  return `<strong>${sound.label}</strong>${detail ? `<small>${detail}</small>` : ""}`;
}

function configurePage() {
  document.title = `第 ${groupNumber} 組字母「聲」探${modeName} | 小小「聲」探`;
  setLessonIdentity(groupNumber, modeName);
  document.querySelector("[data-group-sounds]").textContent = groupSounds
    .flatMap((sound) => sound.letters || [formatSoundText(sound)])
    .join(" · ");
  document.querySelector(".lesson-mode").textContent = modeName;
  levelTrack.setAttribute("aria-label", `第 ${groupNumber} 組學習關卡`);
  levelTrack.classList.toggle("challenge-track", isChallenge);
}

function getAudio(soundId) {
  if (!audioCache.has(soundId)) {
    const audio = new Audio(`assets/sounds/personal/${soundsById.get(soundId).audio}?v=20261011-rerecorded`);
    audio.preload = "auto";
    audioCache.set(soundId, audio);
  }
  return audioCache.get(soundId);
}

async function playSound(soundId, isQuestion = false) {
  const audio = getAudio(soundId);
  audioCache.forEach(item => item.pause());
  if (isQuestion) {
    await audioCue.play(audio, () => {
      feedback.textContent = "未能播放聲音，請再次按下播放按鈕。";
    });
    return;
  }
  audio.pause();
  audio.currentTime = 0;
  try {
    await audio.play();
  } catch {
    feedback.textContent = "未能播放聲音，請再次按下播放按鈕。";
  }
}

function shuffled(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildQuestions(level) {
  const targets = [];
  while (targets.length < level.rounds) targets.push(...shuffled(level.soundIds));
  return targets.slice(0, level.rounds);
}

function renderLevelTrack() {
  levelTrack.innerHTML = "";
  levels.forEach((level, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.disabled = index > unlockedLevel;
    button.className = index === currentLevel ? "is-current" : "";
    button.setAttribute("aria-label", `${level.name}：${level.short}`);
    if (index === currentLevel) button.setAttribute("aria-current", "step");
    button.innerHTML = `<i>${index + 1}</i>`;
    button.addEventListener("click", () => openLevel(index));
    levelTrack.appendChild(button);
  });
}

function openLevel(index) {
  if (index > unlockedLevel) return;
  audioCue.clear();
  audioCache.forEach(audio => audio.pause());
  currentLevel = index;
  questionIndex = 0;
  questions = [];
  clueProgress.reset(index);
  clueProgress.show(levels[index].rounds, -1, index);
  learnView.hidden = false;
  quizView.hidden = true;
  completeView.hidden = true;
  levelLabel.textContent = levels[index].name;
  progressText.textContent = "學習聲音";
  progressBar.style.width = "0%";
  renderLearnSounds();
  renderLevelTrack();
  const level = levels[index];
  const pool = isChallenge ? groupSounds.map(sound => sound.id) : level.soundIds;
  panelLayout.prepare(pool.map(soundId => createAnswerButton(soundId)), level.optionCount);
}

function renderLearnSounds() {
  const level = levels[currentLevel];
  learnTitle.textContent = "聲音線索";
  learnSounds.classList.toggle("many-sounds", level.soundIds.length > 2);
  learnSounds.classList.toggle("visual-sounds", level.soundIds.length === 2 && level.sounds.some((sound) => sound.image || sound.duration));
  learnSounds.innerHTML = "";

  level.soundIds.forEach((soundId) => {
    const sound = soundsById.get(soundId);
    if (sound.letters) {
      const unit = document.createElement("div");
      unit.className = "same-sound-learn-unit";
      unit.setAttribute("aria-label", `${sound.letters.join(" 和 ")} 代表相同聲音`);

      sound.letters.forEach((letter) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "learn-sound-button";
        button.setAttribute("aria-label", `播放 ${letter} 的發音`);
        button.innerHTML = `<strong>${letter}</strong>`;
        button.addEventListener("click", () => playSound(soundId));
        unit.appendChild(button);
      });

      const hint = document.createElement("small");
      hint.textContent = sound.hint;
      unit.appendChild(hint);
      learnSounds.appendChild(unit);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "learn-sound-button";
    button.setAttribute("aria-label", `播放 ${formatSoundText(sound)} 的發音`);
    if (sound.duration) {
      button.classList.add("has-duration-cue");
      if (level.soundIds.length > 2) button.classList.add("is-compact");
      button.innerHTML = soundMarkup(sound);
    } else if (sound.image) {
      button.classList.add("has-sound-image");
      if (level.soundIds.length > 2) button.classList.add("is-compact");
      button.innerHTML = `
        <img src="${sound.image}" alt="" aria-hidden="true">
        <span class="sound-name"><strong>${sound.label}</strong><small>${sound.cue}</small></span>
        <small class="sound-instruction">${sound.instruction}</small>
      `;
    } else {
      button.innerHTML = soundMarkup(sound);
    }
    button.addEventListener("click", () => playSound(soundId));
    learnSounds.appendChild(button);
  });
}

function startQuiz() {
  questions = buildQuestions(levels[currentLevel]);
  questionIndex = 0;
  firstAttemptCorrect = 0;
  clueProgress.reset(currentLevel);
  learnView.hidden = true;
  quizView.hidden = false;
  completeView.hidden = true;
  showQuestion();
}

function showQuestion() {
  audioCue.reset();
  audioCache.forEach(audio => audio.pause());
  const level = levels[currentLevel];
  const target = questions[questionIndex];
  clueProgress.show(questions.length, questionIndex, currentLevel);
  acceptingAnswer = true;
  firstAttempt = true;
  questionCount.textContent = `${questionIndex + 1}/${questions.length}`;
  progressText.textContent = questionCount.textContent;
  progressBar.style.width = `${(questionIndex / questions.length) * 100}%`;
  feedback.textContent = "";
  feedback.className = "answer-feedback";
  nextQuestionButton.hidden = true;
  answerOptions.innerHTML = "";

  const optionIds = makeAnswerOptions(level, target);

  optionIds.forEach(soundId => answerOptions.appendChild(createAnswerButton(soundId, target)));
}

function createAnswerButton(soundId, target) {
  const level = levels[currentLevel];
  const sound = soundsById.get(soundId);
  const button = document.createElement("button");
  button.type = "button";
  if (groupNumber === 2 && soundId === "ck") {
    const spelling = sound.letters[Math.floor(Math.random() * sound.letters.length)];
    button.innerHTML = `<strong>${spelling}</strong>`;
    button.setAttribute("aria-label", spelling);
  } else if (sound.label === "ue") {
    button.innerHTML = `<strong>${sound.label}</strong>`;
  } else if (sound.duration) {
    button.classList.add("has-duration-cue");
    if (level.soundIds.length > 2) button.classList.add("is-compact");
    button.innerHTML = soundMarkup(sound);
  } else if (sound.image) {
    button.classList.add("has-answer-image");
    if (level.soundIds.length > 2) button.classList.add("is-compact");
    button.innerHTML = `
        <img src="${sound.image}" alt="" aria-hidden="true">
        <span class="answer-sound-name"><strong>${sound.label}</strong></span>
        <small>${sound.cue}</small>
      `;
  } else {
    button.innerHTML = soundMarkup(sound);
  }
  if (!(groupNumber === 2 && soundId === "ck")) button.setAttribute("aria-label", sound.label === "ue" ? sound.label : formatSoundText(sound));
  button.addEventListener("click", () => checkAnswer(button, soundId, target));
  return button;
}

function checkAnswer(button, selected, target) {
  if (!acceptingAnswer) return;

  if (selected !== target) {
    firstAttempt = false;
    button.classList.remove("is-wrong");
    void button.offsetWidth;
    button.classList.add("is-wrong");
    feedback.textContent = "";
    feedback.className = "answer-feedback is-wrong";
    return;
  }

  acceptingAnswer = false;
  clueProgress.collect();
  audioCue.clear();
  if (firstAttempt) firstAttemptCorrect += 1;
  button.classList.add("is-correct");
  feedback.textContent = "";
  feedback.className = "answer-feedback is-correct";
  progressBar.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  nextQuestionButton.hidden = false;
}

function finishLevel() {
  clueProgress.finish();
  audioCue.clear();
  quizView.hidden = true;
  completeView.hidden = false;
  progressText.textContent = "完成";
  progressBar.style.width = "100%";
  const clueNumber = ["一", "二", "三", "四", "五"][currentLevel];
  completeTitle.textContent = currentLevel === levels.length - 1
    ? "線索全破解！" : `成功破解第${clueNumber}組線索！`;
  nextLevelButton.setAttribute("data-route-return", String(currentLevel === levels.length - 1));

  if (currentLevel === levels.length - 1) {
    nextLevelButton.innerHTML = '<img src="assets/navigation-paper/route.png" alt="" aria-hidden="true">';
    nextLevelButton.setAttribute("aria-label", "返回聲探查案路線");
    nextLevelButton.title = "返回聲探查案路線";
  } else {
    unlockedLevel = Math.max(unlockedLevel, currentLevel + 1);
    nextLevelButton.innerHTML = '<img src="assets/icons/arrow-right.svg" alt="" aria-hidden="true">';
    nextLevelButton.setAttribute("aria-label", "進入下一關");
    nextLevelButton.title = "進入下一關";
  }
  renderLevelTrack();
  RewardMessages.show((groupNumber - 1) * 5 + currentLevel);
}

function advanceQuestion() {
  audioCache.forEach((audio) => audio.pause());
  questionIndex += 1;
  if (questionIndex < questions.length) showQuestion();
  else finishLevel();
}

document.querySelector("[data-start-quiz]").addEventListener("click", startQuiz);
document.querySelector("[data-play-question]").addEventListener("click", () => {
  if (questions[questionIndex]) playSound(questions[questionIndex], true);
});
nextQuestionButton.addEventListener("click", () => {
  advanceQuestion();
});
skipQuestionButton.addEventListener("click", advanceQuestion);
nextLevelButton.addEventListener("click", () => {
  if (currentLevel === levels.length - 1) window.location.href = "learning-map.html";
  else openLevel(currentLevel + 1);
});

configurePage();
openLevel(0);
