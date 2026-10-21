// Curated words use only sounds from the chosen group and earlier groups.
const blendingGroups = [
  { sounds: 's · a · t · i · p · n', words: [['sit','s i t'],['tap','t a p'],['pin','p i n'],['pan','p a n'],['nap','n a p']] },
  { sounds: 'c · k · ck · e · h · r · m · d', words: [['cat','c a t'],['hen','h e n'],['hat','h a t'],['rat','r a t'],['map','m a p'],['sack','s a ck'],['kick','k i ck'],['neck','n e ck']] },
  { sounds: 'g · o · u · l · f · b', words: [['dog','d o g'],['sun','s u n'],['cup','c u p'],['leg','l e g'],['bat','b a t']] },
  { sounds: 'ai · j · oa · ie · ee · or', words: [['rain','r ai n'],['boat','b oa t'],['pie','p ie'],['see','s ee'],['fork','f or k']] },
  { sounds: 'z · w · ng · v · oo', words: [['zip','z i p'],['web','w e b'],['ring','r i ng'],['book','b oo-short k'],['moon','m oo-long n']] },
  { sounds: 'y · x · ch · sh · th', words: [['chin','ch i n'],['ship','sh i p'],['thin','th-thin i n'],['this','th-this i s'],['yam','y a m'],['chick','ch i ck']] },
  { sounds: 'qu · ou · oi · ue · er · ar', words: [['out','ou t'],['coin','c oi n'],['blue','b l ue-oo'],['car','c ar'],['glue','g l ue-oo'],['quack','qu a ck']] },
];
SoundWordExtras.forEach(record=>blendingGroups[record.group-1].words.push([record.word,record.segments.join(' ')]));
const extraBlendingAssets=new Map(SoundWordExtras.map(record=>[record.word,record]));
const soundFiles = { c:'ck', k:'ck', 'oo-short':'book', 'oo-long':'moon', 'th-thin':'three', 'th-this':'this', 'ue-oo':'moon' };
const trainArtwork = {
  tender: { file: 'assets/game-style/train-tender.webp', width: 270 },
  wagon: { file: 'assets/game-style/train-wagon.webp', width: 300 },
  engine: { file: 'assets/family-map/train.webp', width: 450 },
};
function trainPiece(element, kind) {
  const { file, width } = trainArtwork[kind];
  element.style.flex = `${width} 1 0px`;
  element.style.aspectRatio = `${width} / 300`;
  element.dataset.trainPart = kind;
  const art = document.createElement('span'); art.className = 'train-sprite';
  art.style.backgroundImage = `url("${file}")`;
  art.setAttribute('aria-hidden','true'); element.prepend(art);
  if (kind === 'wagon') {
    const frame = art.cloneNode(); frame.classList.add('wagon-frame');
    element.insertBefore(frame,art.nextSibling);
  }
}
const $ = id => document.getElementById(id);
let group = 0, round = [], index = 0, busy = false, revealed = false, generation = 0;
let activeAudio = null, finishAudio = null, gesture = null;
const collectedClues = new Set();
let clueFlight = null;
let cueStage = 'sounds';
let soundsReady = false;
let nextSound = 0;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const picture = word => soundWordPicture(word,extraBlendingAssets.get(word)?.picture || `assets/pictures/輕量版words/${word}.jpg`);
const wordAudio = word => extraBlendingAssets.get(word)?.audio || `assets/word-audio/real/group-${group + 1}/${word}.m4a?v=20261011-rerecorded`;
function stopAudio() {
  if (activeAudio) { activeAudio.pause(); activeAudio.currentTime = 0; }
  if (finishAudio) finishAudio();
  activeAudio = null;
}
function playAudio(src, status = $('audio-status')) {
  stopAudio();
  status.textContent = '';
  return new Promise(resolve => {
    const audio = new Audio(src); activeAudio = audio;
    let settled = false;
    const finish = (played = false) => { if (settled) return; settled = true; clearTimeout(timeout); audio.pause(); if (activeAudio === audio) activeAudio = null; if (finishAudio === finish) finishAudio = null; resolve(played); };
    const fail = () => { if (!settled) status.textContent = '暫時未能播放錄音，請再按一次。'; finish(); };
    const timeout = setTimeout(fail, 15000);
    finishAudio = finish; audio.onended = () => finish(true); audio.onerror = fail;
    audio.play().catch(fail);
  });
}
function view(id) { ['setup','play','complete'].forEach(key => $(key).hidden = key !== id); }
const bridgeDeck = document.createElement('div');
bridgeDeck.id = 'bridge-deck';
bridgeDeck.hidden = true;
bridgeDeck.setAttribute('aria-hidden', 'true');
for (let i=0; i<3; i++) {
  const span = document.createElement('img');
  span.className = 'bridge-span';
  span.src = 'assets/game-style/train-paper-four-bridge-span.png';
  span.alt = '';
  span.style.setProperty('--span-index', String(i));
  span.style.setProperty('--bridge-offset', `${(i-1)*4}cqw`);
  bridgeDeck.append(span);
}
$('train').before(bridgeDeck);
const bridgeEngine = document.createElement('img');
bridgeEngine.id = 'bridge-engine';
bridgeEngine.src = 'assets/game-style/train-paper-one-engine.webp';
bridgeEngine.alt = '';
bridgeEngine.hidden = true;
$('train').before(bridgeEngine);
function lock(value) {
  busy = value;
  $('play').classList.toggle('is-busy', value);
  $('blend').disabled = value || !soundsReady;
  $('try-reading').disabled = value || !['try','play','done'].includes(cueStage);
  $('reveal').disabled = value || !['play','done'].includes(cueStage);
  $('next').disabled = value || !revealed;
  $('clue-book').disabled = value;
  document.querySelectorAll('.sound-car').forEach(b => b.disabled = value || (cueStage==='sounds' && Number(b.dataset.position)>nextSound));
}
async function motion(element, frames, duration) {
  if (!reducedMotion.matches) await element.animate(frames, { duration, easing: 'ease-in-out' }).finished.catch(() => {});
}
function resetActivity() {
  generation++; stopAudio(); gesture = null;
  $('train').getAnimations().forEach(a => a.cancel());
  $('cargo-vehicle').getAnimations().forEach(a => a.cancel());
  $('crane-vehicle').getAnimations().forEach(a => a.cancel());
  $('signal-engine').getAnimations().forEach(a => a.cancel());
  ['tunnel-engine','express-engine','express-turntable'].forEach(id=>$(id).getAnimations().forEach(a=>a.cancel()));
  $('train').querySelectorAll('.signal-switch').forEach(part=>part.getAnimations().forEach(a=>a.cancel()));
  $('station-hook').getAnimations().forEach(a => a.cancel());
  bridgeDeck.querySelectorAll('.bridge-span').forEach(span=>span.getAnimations().forEach(a=>a.cancel()));
  bridgeEngine.getAnimations().forEach(animation=>animation.cancel());
  $('train').querySelectorAll('.sound-car').forEach(car=>car.getAnimations().forEach(animation=>animation.cancel()));
  if (clueFlight) { clueFlight.getAnimations().forEach(a => a.cancel()); clueFlight.remove(); clueFlight = null; }
  if ($('clue-dialog').open) $('clue-dialog').close();
  lock(false);
}
function setup() { resetActivity(); view('setup'); $('groups').querySelector('button').focus(); }
function start(number) {
  resetActivity(); group = number; index = 0; collectedClues.clear(); $('play').dataset.soundGroup=String(group+1);
  round = [...blendingGroups[group].words];
  for (let i = round.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [round[i],round[j]] = [round[j],round[i]]; }
  round=round.slice(0,5);
  view('play'); render();
}
function render() {
  bridgeDeck.hidden = group!==3;
  bridgeEngine.hidden = group!==3;
  bridgeDeck.querySelectorAll('.bridge-span').forEach(span=>span.style.removeProperty('translate'));
  $('cargo-vehicle').hidden=group!==1;
  $('crane-vehicle').hidden=group!==2;
  $('signal-engine').hidden=group!==4;
  $('tunnel-engine').hidden=group!==5;
  $('change-group').querySelector('img').src='assets/game-style/train-compact-logo.png';
  for(const id of ['signal-engine','tunnel-engine']) $(id).style.removeProperty('transform');
  $('express-engine').hidden=group!==6;
  $('express-engine').src=group===6?'assets/game-style/train-paper-one-engine.webp':'assets/game-style/train-express-engine.webp';
  $('express-turntable').hidden=group!==6;
  $('play').classList.toggle('is-cargo-station',group===1);
  $('play').classList.toggle('is-device-station',group===2 || group===3 || group===4 || group===5 || group===6);
  $('play').classList.toggle('is-crane-station',group===2);
  $('play').classList.toggle('is-bridge-station',group===3);
  $('play').classList.toggle('is-signal-station',group===4);
  $('play').classList.toggle('is-tunnel-station',group===5);
  $('play').classList.toggle('is-express-station',group===6);
  $('station-hook').hidden=true;
  $('play').classList.remove('station-joined');
  $('play').classList.remove('cargo-loaded');
  $('play').dataset.questionProgress=`${index+1}/${round.length}`;
  revealed = false; $('answer').hidden = true; $('audio-status').textContent = '';
  setReadingComplete(false);
  $('counter').textContent = String(group+1);
  $('counter').setAttribute('aria-label',`第 ${group+1} 組`);
  renderClueBook();
  $('train').className = 'sound-train'; $('train').replaceChildren();
  const segments = round[index][1].split(' ');
  const tail = document.createElement('div');
  tail.className = 'train-end train-tail'; tail.setAttribute('aria-hidden','true'); trainPiece(tail,'tender');
  if(group===0) $('train').append(tail);
  segments.forEach((sound, i) => {
    const button = document.createElement('button'); button.className = 'sound-car';
    const label = sound.startsWith('oo-')?'oo':sound.startsWith('th-')?'th':sound==='ue-oo'?'ue':sound;
    const cue = sound==='oo-short'?'短音':sound==='oo-long'?'長音':sound==='th-thin'?'不震動':sound==='th-this'?'會震動':sound==='ue-oo'?'oo長音':sound==='ue'?'u音':'';
    button.innerHTML = `<span class="car-letter">${label}${cue?`<small>${cue}</small>`:''}</span>`;
    const speaker=document.createElement('img');speaker.className='cargo-speaker';speaker.src='assets/icons/volume-2.svg';speaker.alt='';button.append(speaker);
    if(group>=1) {
      button.classList.add('cargo-crate');
      if(group===2 || group===3) {
        button.style.setProperty('--slot',String(i));
        button.style.setProperty('--join-shift',`${((segments.length-1)/2-i)*2}cqw`);
        const pads = group===2 ? [14.7,34.1,54] : [25,43,61];
        const offset = (3-segments.length)/2;
        const position = segments.length > 3 ? i*2/(segments.length-1) : i + offset;
        const lower = Math.floor(position), upper = Math.ceil(position);
        const fraction = position - lower;
        button.style.left=`${pads[lower]*(1-fraction)+pads[upper]*fraction}%`;
        button.style.setProperty('--paper-pad', button.style.left);
      }
      if(group===4) {
        button.style.left=`${28.7 + i*21.3}%`;
        button.style.setProperty('--paper-pad',button.style.left);
        for(const name of ['signal-lamp','signal-switch']) {
          const part=document.createElement('span');part.className=name;part.setAttribute('aria-hidden','true');button.append(part);
        }
      }
      if(group===5) {
        button.style.left=`${27.2 + i*22.8}%`;
        button.style.setProperty('--paper-pad',button.style.left);
        const lampCenter=[439,835,1243][i]/1672*100;
        button.style.setProperty('--lamp-correction',`${lampCenter-(27.2+i*22.8)}cqw`);
        button.style.setProperty('--tunnel-shift',`${lampCenter-(18+i*32)}cqw`);
        const glow=document.createElement('span');glow.className='tunnel-glow';glow.setAttribute('aria-hidden','true');button.append(glow);
      }
      if(group===6) {
        button.style.left=`${32+(i+(3-segments.length)/2)*18}%`;
        button.style.setProperty('--paper-pad',button.style.left);
        button.style.setProperty('--join-shift',`${((segments.length-1)/2-i)*2}cqw`);
      }
    } else trainPiece(button,'wagon');
    button.setAttribute('aria-label',`聽 ${label}${cue} 的聲音`);
    button.addEventListener('click', async () => {
      if (busy || (cueStage==='sounds' && i>nextSound) || performance.now() < suppressClickUntil) return;
      const token = generation; lock(true); button.classList.add('lit');
      const played = await playAudio(`assets/sounds/personal/${soundFiles[sound]||sound}.mp3?v=20261011-rerecorded`);
      if(token===generation) {
        button.classList.remove('lit');
        if(played) advanceSound(i);
        lock(false);
        const target = cueStage==='sounds' ? $('train').querySelector('.needs-sound') : cueStage==='blend' ? $('blend') : button;
        target.focus({preventScroll:true});
        if(cueStage==='sounds') target.scrollIntoView({block:'nearest',inline:'nearest',behavior:reducedMotion.matches?'instant':'smooth'});
      }
    });
    button.dataset.position = i; $('train').append(button);
    button.style.setProperty('--sound-position',String(segments.length===1?1:i*2/(segments.length-1)));
  });
  const engine = document.createElement('div');
  engine.className = 'train-end train-engine'; engine.setAttribute('aria-hidden','true');
  trainPiece(engine,'engine');
  if(group===0) $('train').append(engine);
  if(group===6) {
    const engineLeft=32+(segments.length+1)/2*18+8.5-(segments.length-1);
    $('express-engine').style.left=`${engineLeft}%`;
    $('express-engine').style.setProperty('--engine-pivot-x',`${48-engineLeft}cqw`);
  } else $('express-engine').style.removeProperty('left');
  setActionCue('sounds');
  $('reveal').setAttribute('aria-label','播放答案'); $('reveal').title='播放答案';
  $('next').setAttribute('aria-label',index===4?'開動火車，抵達終點':'開動火車，下一題');
  $('next').title = index===4?'抵達終點':'下一題'; lock(false); $('train').focus();
}
function clearActionCues() {
  $('blend').classList.remove('needs-blend');
  $('try-reading').classList.remove('needs-reading');
  $('reveal').classList.remove('needs-play');
  $('train').querySelectorAll('.needs-sound').forEach(car => car.classList.remove('needs-sound'));
}
function setActionCue(stage) {
  clearActionCues(); cueStage = stage;
  if(stage==='sounds') { soundsReady = false; nextSound = 0; }
  if(stage==='blend') soundsReady = true;
  $('train-actions').hidden = !soundsReady;
  if(stage==='sounds') $('train').querySelector('.sound-car')?.classList.add('needs-sound');
  if(stage==='blend') $('blend').classList.add('needs-blend');
  if(stage==='try') $('try-reading').classList.add('needs-reading');
  if(stage==='play') $('reveal').classList.add('needs-play');
}
function advanceSound(position) {
  if(cueStage!=='sounds' || position!==nextSound) return;
  const cars = $('train').querySelectorAll('.sound-car');
  if(group===4) cars[nextSound].classList.add('signal-heard');
  if(group===5) cars[nextSound].classList.add('tunnel-heard');
  cars[nextSound].classList.remove('needs-sound'); nextSound++;
  if(nextSound===cars.length) setActionCue('blend');
  else cars[nextSound].classList.add('needs-sound');
}
async function blend() {
  if (busy || !soundsReady) return;
  setActionCue('busy');
  stopAudio(); lock(true); const token = generation;
  $('train').classList.remove('connected');
  const cargo=group===1;
  for(const car of $('train').querySelectorAll('.sound-car')) {
    if(token!==generation) return;
    car.classList.add('lit');
    if(cargo) {
      const start=car.style.translate||'0 0';
      const lift=car.style.translate?'0 calc(var(--cargo-drop) - 26px)':'0 -26px';
      // Keep the underlying resting position identical to the animation endpoint.
      car.style.translate='0 var(--cargo-drop)';
      await motion(car,[{translate:start},{translate:lift,offset:.3},{translate:'0 var(--cargo-drop)'}],620);
      if(token!==generation)return;
    } else if(group===2) {
      const hook=$('station-hook');
      hook.hidden=false;
      hook.style.left=`calc(var(--crane-left) + ${car.style.left} * var(--crane-width-factor))`;
      const start=car.style.translate || '-50% 0';
      car.style.translate='-50% var(--crane-drop)';
      await Promise.all([
        motion(car,[{translate:start},{translate:'-50% -4cqw',offset:.3},{translate:'-50% var(--crane-drop)'}],900),
        motion(hook,[{scale:'1 1'},{scale:'1 .65',offset:.3},{scale:'1 2.1'}],900),
      ]);
      if(token!==generation)return;
      hook.hidden=true;
    } else if(group===3) {
      await motion(car,[{opacity:1},{opacity:.75,offset:.5},{opacity:1}],340);
      if(token!==generation)return;
    } else if(group===4) {
      car.classList.add('signal-open');
      await motion(car.querySelector('.signal-switch'),[{rotate:'-18deg'},{rotate:'0deg'}],550);
      if(token!==generation)return;
    } else if(group===5) {
      car.classList.add('tunnel-linked');
      await motion(car.querySelector('.tunnel-glow'),[{opacity:.45},{opacity:1},{opacity:1}],550);
      if(token!==generation)return;
    } else if(group===6) {
      const start=car.style.translate || '-50% 0';
      car.style.translate='calc(-50% + var(--join-shift)) 0';
      await motion(car,[{translate:start},{translate:'calc(-50% + var(--join-shift)) -1cqw',offset:.5},{translate:'calc(-50% + var(--join-shift)) 0'}],500);
      if(token!==generation)return;
    } else await motion(car,[{transform:'translateY(0)'},{transform:'translateY(-14px)'},{transform:'translateY(0)'}],340);
    car.classList.remove('lit');
  }
  if(token!==generation) return;
  if(cargo) {
    $('play').classList.add('cargo-loaded');
  }
  $('train').classList.add('connected');
  if(group===6) {
    const turn=[{transform:'rotate(0deg)'},{transform:'rotate(-6deg)',offset:.5},{transform:'rotate(0deg)'}];
    await Promise.all([motion($('express-turntable'),turn,900),motion($('train'),turn,900),motion($('express-engine'),turn,900)]);
    if(token!==generation)return;
  }
  if(group===2) $('play').classList.add('station-joined');
  setActionCue(revealed?'done':'try'); lock(false);
  if(!revealed) $('try-reading').focus({preventScroll:true});
}
let suppressClickUntil = 0;
function setReadingComplete(complete) {
  const button = $('try-reading');
  button.classList.toggle('is-read', complete);
  const label = complete ? '已完成試讀' : '試讀完成';
  button.setAttribute('aria-label', label); button.title = label;
  $('reading-prompt').textContent = complete ? '已完成試讀' : '請自己讀一次';
}
$('train').addEventListener('pointerdown', e => {
  if(busy || (e.pointerType==='mouse' && e.button!==0)) return;
  const car = e.target.closest('.sound-car');
  if(car && car.dataset.position==='0') gesture = { id:e.pointerId, x:e.clientX, y:e.clientY };
});
$('train').addEventListener('pointermove', e => {
  if(!gesture || gesture.id!==e.pointerId) return;
  if(Math.abs(e.clientY-gesture.y)>45) { gesture=null; return; }
  const last = $('train').querySelector('.sound-car:last-of-type').getBoundingClientRect();
  if(e.clientX-gesture.x>40 && e.clientX>=last.left+last.width/2) { gesture=null; suppressClickUntil=performance.now()+700; blend(); }
});
window.addEventListener('pointerup',()=>gesture=null);
window.addEventListener('pointercancel',()=>gesture=null);
$('blend').addEventListener('click',blend);
$('try-reading').addEventListener('click',async()=>{
  if(busy || !['try','play','done'].includes(cueStage)) return;
  setReadingComplete(true);
  if(group===3 && !$('play').classList.contains('station-joined')) {
    const token = generation;
    setActionCue('busy'); lock(true);
    await Promise.all([...bridgeDeck.querySelectorAll('.bridge-span')].map(span=>{
      const start = `${span.style.getPropertyValue('--bridge-offset')} 0`;
      span.style.translate = '0 0';
      return motion(span,[{translate:start},{translate:'0 0'}],850);
    }));
    if(token!==generation) return;
    $('play').classList.add('station-joined');
  }
  setActionCue(revealed?'done':'play'); lock(false); $('reveal').focus({preventScroll:true});
});
$('reveal').addEventListener('click',async()=>{
  if(busy || !['play','done'].includes(cueStage)) return; lock(true); const token=generation;
  setActionCue('busy');
  const word=round[index][0];
  $('word-picture').src=picture(word); $('word-picture').alt=word; $('word-label').textContent=word; $('answer').hidden=false;
  $('reveal').setAttribute('aria-label','再次播放答案'); $('reveal').title='再次播放答案';
  const played = await playAudio(wordAudio(word));
  if(token!==generation) return;
  if(played) {
    if(!revealed && group===5) {
      const vehicle=$('tunnel-engine');
      const distance=$('play').clientWidth + vehicle.clientWidth;
      const endpoint=`translateX(${distance}px)`;
      vehicle.style.transform=endpoint;
      await motion(vehicle,[{transform:'translateX(0)'},{transform:endpoint}],1100);
      if(token!==generation) return;
    }
    revealed=true;
    if(!collectedClues.has(index)) await collectClue(token);
  }
  if(token===generation) { setActionCue(revealed?'done':'play'); lock(false); }
});
$('word-picture').addEventListener('error',()=> { $('word-picture').removeAttribute('src'); $('audio-status').textContent='圖片暫時未能載入，仍然可以聆聽和試讀。'; });
$('next').addEventListener('click',async()=>{
  if(busy || !revealed) return; stopAudio(); lock(true); const token=generation;
  const departure=[{transform:'translateX(0)',opacity:1},{transform:'translateX(150vw)',opacity:0}];
  if(group===4) $('signal-engine').style.transform='translateX(150vw)';
  await Promise.all([
    ...((group===4 || group===5)?[]:[motion($('train'),departure,650)]),
    ...(group===1?[motion($('cargo-vehicle'),departure,650)]:[]),
    ...(group===2?[motion($('crane-vehicle'),departure,650)]:[]),
    ...(group===3?[motion($('bridge-engine'),departure,650)]:[]),
    ...(group===4?[motion($('signal-engine'),departure,650)]:[]),
    ...(group===6?[motion($('express-engine'),departure,650)]:[]),
  ]);
  if(token!==generation) return;
  index++; lock(false);
  if(index<round.length) render(); else complete();
});
function complete(skipped = false) {
  view('complete'); $('complete').dataset.soundGroup=String(group+1);
  $('review-status').textContent=''; $('collection').replaceChildren();
  $('complete').querySelector('.clue-finish-stamp').textContent=skipped?'字詞總覽':'線索集齊';
  $('complete').querySelector('h2').textContent=skipped?'本組字詞總覽':'抵達終點！';
  round.forEach(([word])=>{
    const card=document.createElement('button'); card.innerHTML=`<img src="${picture(word)}" alt=""><span lang="en">${word}</span>`;
    card.setAttribute('aria-label',`重聽 ${word}`); card.onclick=()=>playAudio(wordAudio(word),$('review-status')); $('collection').append(card);
  });
  $('complete').querySelector('h2').focus();
}
$('skip-round').onclick=()=>{if($('play').hidden)return;resetActivity();complete(true);};
function cluePages(container, review = false) {
  container.replaceChildren();
  for (const positions of [[0,1],[2,3,4]]) {
    const page = document.createElement('span'); page.className = 'clue-page';
    positions.forEach(position => {
      const collected = collectedClues.has(position);
      const slot = document.createElement(review && collected ? 'button' : 'span');
      slot.className = `clue-slot${collected ? ' is-collected' : position === index ? ' is-current' : ''}`;
      slot.dataset.clueIndex = position;
      if (collected) {
        const word = round[position][0];
        const image = document.createElement('img'); image.src = picture(word); image.alt = review ? '' : word;
        image.onerror = () => { image.hidden = true; if(!review) slot.textContent = word; };
        slot.append(image);
        if (review) {
          slot.type = 'button'; slot.setAttribute('aria-label', `重聽 ${word}`);
          const label = document.createElement('span'); label.lang = 'en'; label.textContent = word;
          slot.append(label);
          slot.onclick = () => playAudio(wordAudio(word), $('clue-review-status'));
        }
      } else {
        const icon = document.createElement('img'); icon.src = 'assets/icons/search.svg'; icon.alt = '';
        slot.append(icon);
        if(review) slot.setAttribute('aria-label', `第 ${position+1} 條線索，尚未收集`);
      }
      page.append(slot);
    });
    container.append(page);
  }
}
function renderClueBook() {
  cluePages($('clue-slots'));
  $('clue-book').setAttribute('aria-label', `開啟線索簿，已收集 ${collectedClues.size} 條線索，共 ${round.length} 條`);
  $('progress').textContent = `已收集 ${collectedClues.size} 條線索，共 ${round.length} 條。`;
  $('clue-stamp').hidden = collectedClues.size !== round.length;
}
async function collectClue(token) {
  const source = $('word-picture');
  const slot = $('clue-slots').querySelector(`[data-clue-index="${index}"]`);
  if(!reducedMotion.matches && source.naturalWidth && slot) {
    const from = source.getBoundingClientRect(), to = slot.getBoundingClientRect();
    const flyer = source.cloneNode(); flyer.removeAttribute('id'); flyer.alt = ''; flyer.className = 'clue-flyer';
    flyer.style.left = `${from.left}px`; flyer.style.top = `${from.top}px`;
    flyer.style.width = `${from.width}px`; flyer.style.height = `${from.height}px`;
    document.body.append(flyer); clueFlight = flyer;
    const dx = to.left + to.width/2 - from.left - from.width/2;
    const dy = to.top + to.height/2 - from.top - from.height/2;
    await motion(flyer,[{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${dx}px,${dy}px) scale(${Math.min(to.width/from.width,to.height/from.height)})`,opacity:.9}],600);
    flyer.remove(); if(clueFlight === flyer) clueFlight = null;
  }
  if(token!==generation) return;
  collectedClues.add(index); renderClueBook();
}
$('clue-book').onclick = () => {
  if(busy) return;
  cluePages($('clue-review'),true);
  $('clue-dialog-title').textContent = `第 ${group+1} 組 · 線索簿`;
  $('clue-review-stamp').hidden = collectedClues.size !== round.length;
  $('clue-review-status').textContent = '';
  $('clue-dialog').showModal();
};
$('clue-close').onclick = () => $('clue-dialog').close();
$('clue-dialog').addEventListener('close', () => { stopAudio(); if(!$('play').hidden) $('clue-book').focus(); });
$('clue-dialog').addEventListener('click', event => { if(event.target === $('clue-dialog')) { const box = event.target.getBoundingClientRect(); if(event.clientX<box.left || event.clientX>box.right || event.clientY<box.top || event.clientY>box.bottom) event.target.close(); } });
const groupTrainSounds = [
  ['s', 'a', 't', 'i', 'p', 'n'],
  ['c', 'k', 'e', 'h', 'r', 'm', 'd'],
  ['g', 'o', 'u', 'l', 'f', 'b'],
  ['ai', 'j', 'oa', 'ie', 'ee', 'or'],
  ['z', 'w', 'ng', 'v', ['oo', '短音'], ['oo', '長音']],
  ['y', 'x', 'ch', 'sh', ['th', '不震動'], ['th', '會震動']],
  ['qu', 'ou', 'oi', 'ue', 'er', 'ar'],
];
function groupTrainPiece(kind, sound) {
  const piece = document.createElement('span');
  piece.className = 'group-train-piece';
  trainPiece(piece,kind);
  if (sound) {
    const label = document.createElement('span');
    label.className = 'group-train-letter';
    const [letters, cue] = Array.isArray(sound) ? sound : [sound];
    label.textContent = letters;
    if (cue) {
      const hint = document.createElement('small');
      hint.textContent = cue;
      label.append(hint);
    }
    piece.append(label);
  }
  return piece;
}
blendingGroups.forEach((entry,i)=>{
  const button=document.createElement('button');
  button.className='station-group';
  button.dataset.soundGroup=String(i+1);
  button.style.setProperty('--platform-column',i%2);
  button.style.setProperty('--platform-row',Math.floor(i/2));
  button.type = 'button';
  button.innerHTML=`<span class="station-signpost" aria-hidden="true"><span class="station-pole"></span><strong class="station-sign">${i+1}</strong></span>`;
  const sounds = groupTrainSounds[i];
  button.setAttribute('aria-label', `第 ${i+1} 組：${sounds.map(sound => Array.isArray(sound) ? sound.join('，') : sound).join('、')}`);
  const train = document.createElement('span');
  train.className = 'group-train';
  train.setAttribute('aria-hidden', 'true');
  sounds.forEach(sound => train.append(groupTrainPiece('wagon',sound)));
  train.append(groupTrainPiece('engine'));
  button.append(train);
  button.onclick=()=>start(i); $('groups').append(button);
});
$('change-group').onclick=setup; $('choose').onclick=setup; $('again').onclick=()=>start(group);
window.addEventListener('pagehide',resetActivity);
