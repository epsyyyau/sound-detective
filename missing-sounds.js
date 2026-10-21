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
      ["shell", ["sh", "e", "ll"], [0, 1]], ["teeth", ["t", "ee", thinTh]],
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
      ["letter", ["l", "e", "t", "t", "er"], [0, 1, 4]], ["star", ["s", "t", "ar"]],
      ["queen", ["qu", "ee", "n"]], ["cloud", ["c", "l", "ou", "d"]],
      ["point", ["p", "oi", "n", "t"]], ["shark", ["sh", "ar", "k"]],
      ["fuel", ["f", yooUe, "l"]], ["hammer", ["h", "a", "m", "m", "er"], [0, 1, 4]],
      ["pouch", ["p", "ou", "ch"]], ["cue", ["c", yooUe]],
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
  return sound.label === "ue" ? "ue-sound" : ["c", "k", "ck"].includes(sound.id) ? "k-sound" : sound.id;
}

function isVisibleInPattern(option, question) {
  return question.segments.some((segment, index) => (
    index !== question.targetIndex
    && (getSoundFamily(segment) === getSoundFamily(option) || segment.label === option.label)
  ));
}

const records = groupData[groupNumber].words.map(([word, segments, eligible], index) => ({
  word,
  audio: `assets/word-audio/real/group-${groupNumber}/${word}.m4a?v=20261011-rerecorded`,
  picture: soundWordPicture(word,index < 12
    ? `assets/pictures/${index < 8 ? "輕量版words" : "挑戰版words"}/${word}.jpg`
    : `assets/pictures/第二套真字/${word}.png?v=20260903-real-pictures-2`),
  segments: segments.map(normalizeSegment),
  eligible,
}));

const extraRecords = SoundWordExtras.filter(record=>record.group===groupNumber).map(record=>({
  ...record,
  segments:record.segments.map(segment=>normalizeSegment(segment==='oo-short'?shortOo:segment)),
}));
records.push(...extraRecords);

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
  return sourceRecords.flatMap((record) => {
    const indices = record.eligible || record.segments.map((_, index) => index);
    return indices
      .filter((index) => !position || getPosition(index, record.segments.length) === position)
      .map((targetIndex) => ({
        ...record,
        targetIndex,
        answer: record.segments[targetIndex],
        position: getPosition(targetIndex, record.segments.length),
      }));
  });
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
  ? Array.from({ length: 3 }, (_, index) => ({
      name: `第 ${index + 1} 關`, short: "首、中、尾音混合挑戰", count: 8,
    }))
  : [
      { name: "第 1 關", short: "找出首音", count: 6, position: "start" },
      { name: "第 2 關", short: "找出中間音", count: 6, position: "middle" },
      { name: "第 3 關", short: "找出尾音", count: 6, position: "end" },
    ];

const lightRecords = [...new Map([
  ...records.slice(0, 8), ...records.slice(12, 16), ...extraRecords,
  ...records.filter(record=>record.segments.some(sound=>sound.id==='ck')),
].map(record=>[record.word,record])).values()];
const sourceRecords = isChallenge ? records : lightRecords;
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
const picturePreloads = new Map();

function preloadPicture(src) {
  if (!picturePreloads.has(src)) {
    const image = new Image();
    image.decoding = "async";
    const ready = new Promise((resolve) => {
      image.onload = async () => {
        try {
          if (image.decode) await image.decode();
          resolve(true);
        } catch {
          resolve(true);
        }
      };
      image.onerror = () => resolve(false);
    });
    image.src = src;
    picturePreloads.set(src, ready);
  }
  return picturePreloads.get(src);
}

const questionView = document.querySelector("[data-question-view]");
const clueProgress = new ClueProgress('paper');
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
const correctPicture = document.querySelector("[data-correct-picture]");
const completeWord = document.querySelector("[data-complete-word]");
const audioCue = new QuestionAudioCue(document.querySelector("[data-play-word]"), answerOptions);
levelTrack.classList.toggle("single-level", levels.length === 1);
levelTrack.classList.add("paper-level-track");
levelTrack.classList.toggle("is-challenge", isChallenge);

setLessonIdentity(groupNumber, modeName);
document.querySelector("[data-group-sounds]").textContent = groupData[groupNumber].sounds;
document.querySelector("[data-mode-label]").textContent = modeName;
document.querySelector("[data-complete-title]").textContent = `成功找到第${["一", "二", "三", "四", "五", "六", "七"][groupNumber - 1]}組暗號！`;
document.title = `第 ${groupNumber} 組缺音「聲」探 | 小小「聲」探`;

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
    button.classList.add("paper-level-button");
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
  button.setAttribute("aria-label", option.label !== "ue" && option.description ? `${option.label}，${option.description}` : option.label);
  if (option.label === "ue") {
    button.innerHTML = `<strong>${option.label}</strong>`;
  } else if (option.image) {
    button.classList.add("has-sound-cue-image");
    button.innerHTML = `<img src="${option.image}" alt=""><span><strong>${option.label}</strong><small>${option.description}</small></span>`;
  } else if (option.cue) {
    button.classList.add("has-duration-cue");
    button.innerHTML = `<strong>${option.label}</strong><span class="duration-arrow is-${option.cue}" aria-hidden="true"></span><small>${option.description}</small>`;
  } else if (option.description) {
    button.innerHTML = `<strong>${option.label}</strong><small>${option.description}</small>`;
  } else {
    button.textContent = option.label;
  }
  button.addEventListener("click", () => chooseAnswer(button));
  answerOptions.append(button);
}

function renderQuestion() {
  audioCue.reset();
  stopAudio();
  acceptingAnswer = true;
  const question = questions[questionIndex];
  questions.slice(questionIndex, questionIndex + 3).forEach(({ picture }) => preloadPicture(picture));
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
    feedback.textContent = "未能播放詞語，請再次按下播放按鈕。";
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
  correctPicture.hidden = true;
  correctPicture.alt = `${question.word} 的圖片`;
  setQuestionAdvanceIcon(nextButton, questionIndex === questions.length - 1);
  const answeredIndex = questionIndex;
  preloadPicture(question.picture).then((ready) => {
    if (questionIndex !== answeredIndex) return;
    if (ready) correctPicture.src = question.picture;
    else correctPicture.removeAttribute("src");
    correctPicture.hidden = !ready;
    correctOverlay.hidden = false;
    nextButton.focus();
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
    if (rewardDue) RewardMessages.show((groupNumber - 1) * 5 + 5 + rewardSolvedCount / 5 - 1);
    return;
  }
  questionIndex += 1;
  renderQuestion();
  if (rewardDue) RewardMessages.show((groupNumber - 1) * 5 + 5 + rewardSolvedCount / 5 - 1);
}

document.querySelector("[data-play-word]").addEventListener("click", playWord);
nextButton.addEventListener("click", goToNextQuestion);
document.querySelector("[data-skip-question]").addEventListener("click", goToNextQuestion);
renderQuestion();
