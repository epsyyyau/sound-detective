const mapSoundGroups = [
  ['s', 'a', 't', 'i', 'p', 'n'],
  ['c', 'k', 'ck', 'e', 'h', 'r', 'm', 'd'],
  ['g', 'o', 'u', 'l', 'f', 'b'],
  ['ai', 'j', 'oa', 'ie', 'ee', 'or'],
  ['z', 'w', 'ng', 'v', ['oo', '短音'], ['oo', '長音']],
  ['y', 'x', 'ch', 'sh', ['th', '不震動'], ['th', '會震動']],
  ['qu', 'ou', 'oi', 'ue', 'er', 'ar'],
];
const mapStages = {
  letter: { page: 'letter-sounds.html', label: '字母「聲」探' },
  missing: { page: 'missing-sounds.html', label: '缺音「聲」探' },
  pseudoword: { page: 'pseudoword-sounds.html', label: '暗號「聲」探' },
  segment: { page: 'segment-sounds.html', label: '拆音「聲」探' },
};
const mapSelectionKey = 'sound-detective-learning-map';
function normalizeMapSelection(value = {}) {
  const group = Number(value?.group);
  return {
    group: Number.isInteger(group) && group >= 1 && group <= mapSoundGroups.length ? group : 1,
    mode: value?.mode === 'challenge' ? 'challenge' : 'light',
  };
}
function readMapSelection(search, saved = {}) {
  const params = new URLSearchParams(search);
  // Explicit links take precedence; plain return links restore the last selection.
  return normalizeMapSelection(params.has('group') || params.has('mode')
    ? { group: params.get('group'), mode: params.get('mode') }
    : saved);
}
function mapStageHref(stage, selection) {
  const { group, mode } = normalizeMapSelection(selection);
  const params = new URLSearchParams({ group: String(group) });
  if (mode === 'challenge') params.set('mode', mode);
  return `${mapStages[stage].page}?${params}`;
}

const mapUI = document.querySelector('.learning-map');
const mapGroupButtons = [...document.querySelectorAll('[data-group]')];
const mapModeButtons = [...document.querySelectorAll('[data-mode]')];
let savedMapSelection;
try { savedMapSelection = JSON.parse(sessionStorage.getItem(mapSelectionKey)); } catch {}
let mapSelection = readMapSelection(window.location.search, savedMapSelection);

function renderMapSelection() {
  const { group, mode } = mapSelection;
  const modeName = mode === 'challenge' ? '挑戰版' : '輕量版';
  mapUI.dataset.soundGroup = String(group);
  mapUI.classList.toggle('is-challenge-mode', mode === 'challenge');
  mapGroupButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.group) === group)));
  mapModeButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
  const groupTitle = document.getElementById('selected-group-title');
  groupTitle.textContent = String(group);
  groupTitle.setAttribute('aria-label', `第 ${group} 組`);
  document.getElementById('selected-mode-label').textContent = modeName;
  const sounds = document.getElementById('selected-group-sounds');
  sounds.replaceChildren();
  mapSoundGroups[group - 1].forEach(sound => {
    const token = document.createElement('span');
    token.lang = 'en';
    token.textContent = Array.isArray(sound) ? sound[0] : sound;
    if (Array.isArray(sound)) {
      const cue = document.createElement('small');
      cue.lang = 'zh-Hant'; cue.textContent = `（${sound[1]}）`; token.append(cue);
    }
    sounds.append(token);
  });
  document.querySelectorAll('[data-stage]').forEach(link => {
    const stage = link.dataset.stage;
    link.href = mapStageHref(stage, mapSelection);
    link.setAttribute('aria-label', `第 ${group} 組${modeName}：${mapStages[stage].label}`);
  });
  try { sessionStorage.setItem(mapSelectionKey, JSON.stringify(mapSelection)); } catch {}
}
function selectMap(value) {
  mapSelection = normalizeMapSelection({ ...mapSelection, ...value });
  renderMapSelection();
  const url = new URL(window.location.href);
  url.searchParams.set('group', String(mapSelection.group));
  if (mapSelection.mode === 'challenge') url.searchParams.set('mode', 'challenge');
  else url.searchParams.delete('mode');
  window.history.replaceState(null, '', url);
}
mapGroupButtons.forEach((button, index) => {
  button.addEventListener('click', () => selectMap({ group: button.dataset.group }));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % mapGroupButtons.length;
    if (event.key === 'ArrowLeft') next = (index + mapGroupButtons.length - 1) % mapGroupButtons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = mapGroupButtons.length - 1;
    if (next === undefined) return;
    event.preventDefault(); mapGroupButtons[next].focus();
    selectMap({ group: mapGroupButtons[next].dataset.group });
  });
});
mapModeButtons.forEach(button => button.addEventListener('click', () => selectMap({ mode: button.dataset.mode })));
window.addEventListener('popstate', () => {
  mapSelection = readMapSelection(window.location.search, mapSelection);
  renderMapSelection();
});
renderMapSelection();
