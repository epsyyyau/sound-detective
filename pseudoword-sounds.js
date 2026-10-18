const shortOo = { id: "oo-short", label: "oo", cue: "short", description: "短音" };
const longOo = { id: "oo-long", label: "oo", cue: "long", description: "長音" };
const thinTh = { id: "th-thin", label: "th", image: "assets/th-thin-voiceless.png", description: "（不震動）" };
const thisTh = { id: "th-this", label: "th", image: "assets/th-this-voiced.png", description: "（會震動）" };

const groupData = {
  1: {
    sounds: "s · a · t · i · p · n",
    lightWords: ["tas", "nis", "nas", "sas", "nin", "tasp"],
    words: [
      ["tas", ["t", "a", "s"]], ["nis", ["n", "i", "s"]],
      ["nas", ["n", "a", "s"]], ["sas", ["s", "a", "s"]],
      ["nin", ["n", "i", "n"]], ["tasp", ["t", "a", "s", "p"]],
      ["nisp", ["n", "i", "s", "p"]], ["snat", ["s", "n", "a", "t"]],
    ],
  },
  2: {
    sounds: "c · k · ck · e · h · r · m · d",
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
    sounds: "g · o · u · l · f · b",
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
    sounds: "ai · j · oa · ie · ee · or",
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
    sounds: "z · w · ng · v · oo（短音）· oo（長音）",
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
    sounds: "y · x · ch · sh · th（不震動）· th（會震動）",
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
    sounds: "qu · ou · oi · ue · er · ar",
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

function normalizeSegment(segment) {
  return typeof segment === "string" ? { id: segment, label: segment } : segment;
}

function getSoundFamily(sound) {
  return ["c", "k", "ck"].includes(sound.id) ? "k-sound" : sound.id;
}

function isVisibleInPattern(option, question) {
  return question.segments.some((segment, index) => (
    index !== question.targetIndex
    && (getSoundFamily(segment) === getSoundFamily(option) || segment.label === option.label)
  ));
}

const records = groupData[groupNumber].words.map(([word, segments]) => ({
  word,
  audio: `assets/word-audio/pseudowords/group-${groupNumber}/${word}.m4a?v=20260903-rerecorded-2`,
  segments: segments.map(normalizeSegment),
}));

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function getPosition(index, length) {
  if (index === 0) return "start";
  if (index === length - 1) return "end";
  return "middle";
}

function buildCandidates(sourceRecords, position) {
  return sourceRecords.flatMap((record) => record.segments
    .map((segment, targetIndex) => ({
      ...record,
      targetIndex,
      answer: segment,
      position: getPosition(targetIndex, record.segments.length),
    }))
    .filter((question) => !position || question.position === position));
}

function takeQuestions(candidates, count, levelIndex, sessionState) {
  const result = [];
  while (result.length < count && candidates.length) {
    let pool = [...candidates];
    const withoutPrevious = pool.filter((candidate) => candidate.word !== sessionState.previousWord);
    if (withoutPrevious.length) pool = withoutPrevious;

    const unseenWords = pool.filter((candidate) => !sessionState.wordUses.has(candidate.word));
    if (unseenWords.length) {
      pool = unseenWords;
    } else {
      const wellSpaced = pool.filter((candidate) => (
        sessionState.questionNumber - sessionState.lastUsed.get(candidate.word) >= 6
      ));
      if (wellSpaced.length) pool = wellSpaced;

      const fewestUses = Math.min(...pool.map((candidate) => sessionState.wordUses.get(candidate.word) || 0));
      pool = pool.filter((candidate) => (sessionState.wordUses.get(candidate.word) || 0) === fewestUses);

      const unusedTargets = pool.filter((candidate) => (
        !sessionState.targets.has(`${candidate.word}:${candidate.targetIndex}`)
      ));
      if (unusedTargets.length) pool = unusedTargets;

      const longestGap = Math.max(...pool.map((candidate) => (
        sessionState.questionNumber - sessionState.lastUsed.get(candidate.word)
      )));
      pool = pool.filter((candidate) => (
        sessionState.questionNumber - sessionState.lastUsed.get(candidate.word) === longestGap
      ));
    }

    const candidate = shuffled(pool)[0];
    result.push({ ...candidate, levelIndex });
    sessionState.wordUses.set(candidate.word, (sessionState.wordUses.get(candidate.word) || 0) + 1);
    sessionState.lastUsed.set(candidate.word, sessionState.questionNumber);
    sessionState.targets.add(`${candidate.word}:${candidate.targetIndex}`);
    sessionState.previousWord = candidate.word;
    sessionState.questionNumber += 1;
  }
  return result;
}

const levels = isChallenge
  ? [{ name: "暗號混合", short: "首、中、尾音", count: 24 }]
  : [
      { name: "第 1 關", short: "找出首音", count: 6, position: "start" },
      { name: "第 2 關", short: "找出中間音", count: 6, position: "middle" },
      { name: "第 3 關", short: "找出尾音", count: 6, position: "end" },
    ];

const sourceRecords = isChallenge
  ? records
  : records.filter((record) => groupData[groupNumber].lightWords.includes(record.word));
levels.forEach((level) => {
  level.coveredSounds = [...new Set(buildCandidates(sourceRecords, level.position).map((question) => question.answer.label))];
});
const sessionState = {
  wordUses: new Map(),
  lastUsed: new Map(),
  targets: new Set(),
  previousWord: "",
  questionNumber: 0,
};
const questions = levels.flatMap((level, levelIndex) => (
  takeQuestions(buildCandidates(sourceRecords, level.position), level.count, levelIndex, sessionState)
));
const optionPool = [...new Map(
  buildCandidates(records).map((question) => [question.answer.id, question.answer]),
).values()];

let questionIndex = 0;
let rewardSolvedCount = 0;
let acceptingAnswer = true;
let activeAudio;

const questionView = document.querySelector("[data-question-view]");
const clueProgress = new ClueProgress('seal');
const completeView = document.querySelector("[data-complete-view]");
const progressBar = document.querySelector("[data-progress-bar]");
const progressText = document.querySelector("[data-progress-text]");
const levelLabel = document.querySelector("[data-level-label]");
const levelTrack = document.querySelector("[data-level-track]");
const questionTitle = document.querySelector("[data-question-title]");
const wordPattern = document.querySelector("[data-word-pattern]");
const answerOptions = document.querySelector("[data-answer-options]");
const feedback = document.querySelector("[data-feedback]");
const nextButton = document.querySelector("[data-next-question]");
const correctOverlay = document.querySelector("[data-correct-overlay]");
const completeWord = document.querySelector("[data-complete-word]");
const audioCue = new QuestionAudioCue(document.querySelector("[data-play-word]"), answerOptions);
const infoButton = document.querySelector("[data-code-info]");
const infoBox = infoButton.closest(".pseudoword-info");

levelTrack.classList.toggle("single-level", levels.length === 1);
setLessonIdentity(groupNumber, modeName);
document.querySelector("[data-group-sounds]").textContent = groupData[groupNumber].sounds;
document.querySelector("[data-mode-label]").textContent = modeName;
document.querySelector("[data-complete-title]").textContent = `成功找到第${["一", "二", "三", "四", "五", "六", "七"][groupNumber - 1]}組暗號！`;
document.title = `第 ${groupNumber} 組暗號「聲」探 | 小小「聲」探`;

function renderLevelTrack(currentLevel) {
  levelTrack.innerHTML = "";
  levels.forEach((level, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.disabled = true;
    if (index === currentLevel) {
      button.classList.add("is-current");
      button.setAttribute("aria-current", "step");
    } else if (index < currentLevel) {
      button.classList.add("is-complete");
    }
    button.setAttribute("aria-label", `${level.name}：${level.short}，${level.coveredSounds.join(" · ")}`);
    button.innerHTML = `<i>${index + 1}</i>`;
    levelTrack.append(button);
  });
}

function stopAudio() {
  if (!activeAudio) return;
  activeAudio.pause();
  activeAudio.currentTime = 0;
  activeAudio = null;
}

function makeOptions(question) {
  const requestedCount = isChallenge ? 4 : 2;
  let fixedPair = [];
  if (["oo-short", "oo-long"].includes(question.answer.id)) fixedPair = [shortOo, longOo];
  if (["th-thin", "th-this"].includes(question.answer.id)) fixedPair = [thinTh, thisTh];
  const selected = fixedPair.length ? [...fixedPair] : [question.answer];
  shuffled(optionPool).forEach((option) => {
    const alreadyRepresented = selected.some((item) => getSoundFamily(item) === getSoundFamily(option));
    if (selected.length < requestedCount && !alreadyRepresented && !isVisibleInPattern(option, question)) {
      selected.push(option);
    }
  });
  return fixedPair.length
    ? [...fixedPair, ...shuffled(selected.slice(fixedPair.length))]
    : shuffled(selected);
}

function renderOption(option) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.answer = option.id;
  button.setAttribute("aria-label", option.description ? `${option.label}，${option.description}` : option.label);
  if (option.image) {
    button.classList.add("has-sound-cue-image");
    button.innerHTML = `<img src="${option.image}" alt=""><span><strong>${option.label}</strong><small>${option.description}</small></span>`;
  } else if (option.cue) {
    button.classList.add("has-duration-cue");
    button.innerHTML = `<strong>${option.label}</strong><span class="duration-arrow is-${option.cue}" aria-hidden="true"></span><small>${option.description}</small>`;
  } else {
    button.textContent = option.label;
  }
  button.addEventListener("click", () => chooseAnswer(button));
  answerOptions.append(button);
}

function closeInfo() {
  infoBox.classList.remove("is-open");
  infoButton.setAttribute("aria-expanded", "false");
}

function renderQuestion() {
  audioCue.reset();
  stopAudio();
  closeInfo();
  acceptingAnswer = true;
  const question = questions[questionIndex];
  const level = levels[question.levelIndex];
  const levelStart = levels.slice(0, question.levelIndex).reduce((sum, item) => sum + item.count, 0);
  const levelQuestionIndex = questionIndex - levelStart;
  clueProgress.show(level.count, levelQuestionIndex, question.levelIndex);
  levelLabel.textContent = level.name;
  progressText.textContent = `第 ${levelQuestionIndex + 1} / ${level.count} 題`;
  progressBar.style.width = `${(levelQuestionIndex / level.count) * 100}%`;
  questionTitle.textContent = "破解暗號";
  renderLevelTrack(question.levelIndex);

  wordPattern.innerHTML = "";
  question.segments.forEach((segment, index) => {
    const tile = document.createElement("span");
    tile.textContent = index === question.targetIndex ? "?" : segment.label;
    if (index === question.targetIndex) tile.classList.add("is-missing");
    wordPattern.append(tile);
  });
  answerOptions.innerHTML = "";
  makeOptions(question).forEach(renderOption);
  feedback.textContent = "";
  feedback.className = "answer-feedback";
  correctOverlay.hidden = true;
}

async function playWord() {
  stopAudio();
  const question = questions[questionIndex];
  activeAudio = new Audio(question.audio);
  await audioCue.play(activeAudio, () => {
    feedback.textContent = "未能播放暗號，請再次按下播放按鈕。";
    feedback.className = "answer-feedback is-wrong";
  });
}

function chooseAnswer(button) {
  if (!acceptingAnswer) return;
  const question = questions[questionIndex];
  if (button.dataset.answer !== question.answer.id) {
    button.classList.remove("is-wrong");
    void button.offsetWidth;
    button.classList.add("is-wrong");
    feedback.textContent = "";
    feedback.className = "answer-feedback is-wrong";
    return;
  }
  acceptingAnswer = false;
  audioCue.clear();
  button.classList.add("is-correct");
  wordPattern.children[question.targetIndex].textContent = question.answer.label;
  wordPattern.children[question.targetIndex].classList.remove("is-missing");
  answerOptions.querySelectorAll("button").forEach((option) => { option.disabled = true; });
  feedback.textContent = "";
  feedback.className = "answer-feedback is-correct";
  completeWord.textContent = question.word;
  setQuestionAdvanceIcon(nextButton, questionIndex === questions.length - 1);
  correctOverlay.hidden = false;
  nextButton.focus();
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
    if (rewardDue) RewardMessages.show((groupNumber - 1) * 5 + 7 + rewardSolvedCount / 5 - 1);
    return;
  }
  questionIndex += 1;
  renderQuestion();
  if (rewardDue) RewardMessages.show((groupNumber - 1) * 5 + 7 + rewardSolvedCount / 5 - 1);
}

infoButton.addEventListener("click", () => {
  const open = !infoBox.classList.contains("is-open");
  infoBox.classList.toggle("is-open", open);
  infoButton.setAttribute("aria-expanded", String(open));
});
document.addEventListener("click", (event) => {
  if (!infoBox.contains(event.target)) closeInfo();
});
document.querySelector("[data-play-word]").addEventListener("click", playWord);
document.querySelector("[data-next-question]").addEventListener("click", goToNextQuestion);
document.querySelector("[data-skip-question]").addEventListener("click", goToNextQuestion);
renderQuestion();
