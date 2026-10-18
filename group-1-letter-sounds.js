const sounds = {
  s: "assets/sounds/personal/s.mp3",
  a: "assets/sounds/personal/a.mp3",
  t: "assets/sounds/personal/t.mp3",
  i: "assets/sounds/personal/i.mp3",
  p: "assets/sounds/personal/p.mp3?v=20261011-rerecorded",
  n: "assets/sounds/personal/n.mp3?v=20261011-rerecorded",
};

const levels = [
  { name: "第 1 關", short: "s · a", sounds: ["s", "a"], rounds: 8 },
  { name: "第 2 關", short: "t · i", sounds: ["t", "i"], rounds: 8 },
  { name: "第 3 關", short: "p · n", sounds: ["p", "n"], rounds: 8 },
  { name: "六音混合", short: "六個音", sounds: ["s", "a", "t", "i", "p", "n"], rounds: 6 },
  { name: "本組挑戰", short: "挑戰", sounds: ["s", "a", "t", "i", "p", "n"], rounds: 12 },
];

const audioCache = new Map();
const clueProgress = new ClueProgress('wave');
let currentLevel = 0;
let unlockedLevel = 0;
let questionIndex = 0;
let questions = [];
let acceptingAnswer = true;

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
const completeTitle = document.querySelector("[data-complete-title]");
const nextLevelButton = document.querySelector("[data-next-level]");
const audioCue = new QuestionAudioCue(document.querySelector("[data-play-question]"), answerOptions);
const panelLayout = new LetterPanelLayout(document.querySelector('.sound-file-panel'));

function getAudio(sound) {
  if (!audioCache.has(sound)) {
    const audio = new Audio(sounds[sound]);
    audio.preload = "auto";
    audioCache.set(sound, audio);
  }
  return audioCache.get(sound);
}

async function playSound(sound, isQuestion = false) {
  const audio = getAudio(sound);
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
  while (targets.length < level.rounds) {
    targets.push(...shuffled(level.sounds));
  }
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
  const buttons = levels[index].sounds.map(sound => {
    const button = document.createElement('button');
    button.textContent = sound;
    return button;
  });
  panelLayout.prepare(buttons, buttons.length);
}

function renderLearnSounds() {
  const level = levels[currentLevel];
  learnTitle.textContent = "聲音線索";
  learnSounds.classList.toggle("many-sounds", level.sounds.length > 2);
  learnSounds.innerHTML = "";

  level.sounds.forEach((sound) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "learn-sound-button";
    button.setAttribute("aria-label", `播放 ${sound} 的發音`);
    button.innerHTML = `<strong>${sound}</strong>`;
    button.addEventListener("click", () => playSound(sound));
    learnSounds.appendChild(button);
  });
}

function startQuiz() {
  questions = buildQuestions(levels[currentLevel]);
  clueProgress.reset(currentLevel);
  questionIndex = 0;
  learnView.hidden = true;
  quizView.hidden = false;
  completeView.hidden = true;
  showQuestion();
}

function showQuestion() {
  clueProgress.show(questions.length, questionIndex, currentLevel);
  audioCue.reset();
  audioCache.forEach(audio => audio.pause());
  const level = levels[currentLevel];
  const target = questions[questionIndex];
  acceptingAnswer = true;
  questionCount.textContent = `${questionIndex + 1}/${questions.length}`;
  progressText.textContent = questionCount.textContent;
  progressBar.style.width = `${(questionIndex / questions.length) * 100}%`;
  feedback.textContent = "";
  feedback.className = "answer-feedback";
  nextQuestionButton.hidden = true;
  answerOptions.innerHTML = "";

  shuffled(level.sounds).forEach((sound) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = sound;
    button.addEventListener("click", () => checkAnswer(button, sound, target));
    answerOptions.appendChild(button);
  });

}

function checkAnswer(button, selected, target) {
  if (!acceptingAnswer) return;

  if (selected !== target) {
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
}

document.querySelector("[data-start-quiz]").addEventListener("click", startQuiz);
document.querySelector("[data-play-question]").addEventListener("click", () => {
  if (questions[questionIndex]) playSound(questions[questionIndex], true);
});
nextQuestionButton.addEventListener("click", () => {
  questionIndex += 1;
  if (questionIndex < questions.length) showQuestion();
  else finishLevel();
});
nextLevelButton.addEventListener("click", () => {
  if (currentLevel === levels.length - 1) window.location.href = "learning-map.html";
  else openLevel(currentLevel + 1);
});

openLevel(0);
setLessonIdentity(1, '輕量版');
