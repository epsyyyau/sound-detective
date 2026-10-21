const magicRoutes = [
  { name:'第 1 組', sounds:'s · a · t · i · p · n', bank:['s','a','t','i','p','n'], chain:['sat','sit','pit','pin','pan','pat'] },
  { name:'第 2 組', sounds:'運用第 1–2 組聲音', bank:['c','h','p','n','e','a','t','m'], chain:['cat','hat','pat','pan','pen','hen'] },
  { name:'第 3 組', sounds:'運用第 1–3 組聲音', bank:['c','b','g','u','n','s','a','t'], chain:['cat','bat','bag','bug','bun','sun'] },
  { name:'第 4 組', sounds:'運用第 1–4 組聲音', bank:['g','c','m','s','t','p','j','n'], pairs:[['coat','goat'],['sail','mail'],['pie','tie'],['net','jet'],['boat','coat']] },
  { name:'第 5 組', sounds:'運用第 1–5 組聲音', bank:['w','p','k','r','z','l','d','v','n'], pairs:[['pin','win'],['ring','king'],['room','zoom'],['wood','wool'],['net','vet']] },
  { name:'第 6 組', sounds:'運用第 1–6 組聲音', bank:['ch','sh','p','s','o','i','f','b','h'], pairs:[['pin','chin'],['sip','ship'],['ship','shop'],['hat','chat'],['box','fox']] },
  { name:'第 7 組', sounds:'運用第 1–7 組聲音', bank:['oi','or','b','g','ar','ue','ou','o','qu','s'], pairs:[['corn','coin'],['glue','blue'],['car','cue'],['moth','mouth'],['sack','quack']] },
];
// The group overview shows its letter patterns, not the cumulative answer bank.
const routeRackSounds = [
  ['s','a','t','i','p','n'],
  ['c','k','ck','e','h','r','m','d'],
  ['g','o','u','l','f','b'],
  ['ai','j','oa','ie','ee','or'],
  ['z','w','ng','v','oo'],
  ['y','x','ch','sh','th'],
  ['qu','ou','oi','ue','er','ar'],
];
const labStationNames=['調配試管','捕捉氣泡','磁力換音','接通光格','轉動輪盤','掃描線索','聲音印章'];
const magicWords = {
  sat:[1,'第二套真字','png'], sit:[1,'輕量版words','jpg'], pit:[1,'第二套真字','png'], pin:[1,'輕量版words','jpg'], pan:[1,'輕量版words','jpg'], pat:[1,'輕量版words','jpg'],
  cat:[2,'輕量版words','jpg'], hat:[2,'輕量版words','jpg'], pen:[2,'輕量版words','jpg'], hen:[2,'輕量版words','jpg'],
  bat:[3,'輕量版words','jpg'], bag:[3,'第二套真字','png'], bug:[3,'第二套真字','png'], bun:[3,'輕量版words','jpg'], sun:[3,'輕量版words','jpg'],
};
const extraWords={
  neck:[2,'第二套真字','png','n e ck'],
  coat:[4,'第二套真字','png','c oa t'],goat:[4,'輕量版words','jpg','g oa t'],sail:[4,'輕量版words','jpg','s ai l'],mail:[4,'第二套真字','png','m ai l'],pie:[4,'輕量版words','jpg','p ie'],tie:[4,'輕量版words','jpg','t ie'],net:[2,'第二套真字','png','n e t'],jet:[4,'輕量版words','jpg','j e t'],boat:[4,'輕量版words','jpg','b oa t'],
  win:[5,'輕量版words','jpg','w i n'],ring:[5,'輕量版words','jpg','r i ng'],king:[5,'輕量版words','jpg','k i ng'],room:[5,'挑戰版words','jpg','r oo-long m'],zoom:[5,'第二套真字','png','z oo-long m'],wood:[5,'第二套真字','png','w oo-short d'],wool:[5,'第二套真字','png','w oo-short l'],vet:[5,'第二套真字','png','v e t'],
  chin:[6,'輕量版words','jpg','ch i n'],sip:[1,'挑戰版words','jpg','s i p'],ship:[6,'輕量版words','jpg','sh i p'],shop:[6,'第二套真字','png','sh o p'],chat:[6,'輕量版words','jpg','ch a t'],box:[6,'輕量版words','jpg','b o x'],fox:[6,'輕量版words','jpg','f o x'],
  corn:[4,'挑戰版words','jpg','c or n'],coin:[7,'輕量版words','jpg','c oi n'],glue:[7,'輕量版words','jpg','g l ue-oo'],blue:[7,'輕量版words','jpg','b l ue-oo'],car:[7,'輕量版words','jpg','c ar'],cue:[7,'第二套真字','png','c ue'],moth:[6,'挑戰版words','jpg','m o th-thin'],mouth:[7,'輕量版words','jpg','m ou th-thin'],sack:[2,'挑戰版words','jpg','s a ck'],quack:[7,'挑戰版words','jpg','qu a ck'],
};
Object.assign(magicWords,extraWords);
SoundWordExtras.forEach(record=>{
  magicWords[record.word]=[record.group,'word-families-extra','png',record.segments.join(' ')];
});
Object.assign(magicWords,{
  lid:[3,'第二套真字','png'],pig:[3,'第二套真字','png'],
  book:[5,'輕量版words','jpg','b oo-short k'],fish:[6,'挑戰版words','jpg','f i sh'],
});
const extraMagicPairs=[
  [],[['cap','cat'],['mat','hat'],['pet','pen'],['cap','can'],['ten','men'],['dip','rip'],['net','neck'],['sat','sack']],
  [['gap','cap'],['lip','lid'],['dig','pig'],['hug','mug'],['mug','tug'],['mop','top'],['top','pop'],['pet','get']],
  [['mail','nail'],['seed','feed'],['jug','mug'],['nail','pail'],['mail','rail'],['coat','moat'],['pie','lie']],
  [['book','cook'],['hook','cook'],['book','look'],['pet','wet'],['seed','weed']],
  [['ship','chip'],['shop','chop'],['fish','dish'],['fish','wish']],[],
];
magicRoutes.forEach((r,index)=>r.extraPairs=extraMagicPairs[index]);
['goat','tie','chat'].forEach(word=>magicWords[word][1]='挑戰版words');
const segments=word=>magicWords[word][3]?magicWords[word][3].split(' '):[...word];
const soundLabel=sound=>sound.startsWith('oo-')?'oo':sound.startsWith('th-')?'th':sound==='ue-oo'?'ue':sound;
const soundCue=sound=>sound==='oo-long'?'長音':sound==='oo-short'?'短音':sound==='th-thin'?'不震動':sound==='th-this'?'會震動':sound==='ue-oo'?'oo長音':sound==='ue'?'u音':'';
const spokenSound=sound=>`${soundLabel(sound)}${soundCue(sound)?`（${soundCue(sound)}）`:''}`;
const tasks=r=>[...(r.pairs||r.chain.slice(1).map((word,i)=>[r.chain[i],word])),...r.extraPairs];
function shuffled(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const buildMagicRound=r=>shuffled(tasks(r)).slice(0,5);
function changeIndex(from,to) { const differences=[...from].map((letter,i)=>letter!==to[i]?i:-1).filter(i=>i>=0); if(from.length!==to.length || differences.length!==1) throw Error('Each task must change exactly one sound'); return differences[0]; }
const el=id=>document.getElementById(id);
const audioPath=word=>`assets/word-audio/real/group-${magicWords[word][0]}/${word}.m4a?v=20261011-rerecorded`;
const picturePath=word=>soundWordPicture(word,`assets/pictures/${magicWords[word][1]}/${word}.${magicWords[word][2]}`);
const soundPath=sound=>`assets/sounds/personal/${({c:'ck',k:'ck','oo-long':'moon','oo-short':'book','th-thin':'three','th-this':'this','ue-oo':'moon'})[sound]||sound}.mp3?v=20261011-rerecorded`;
let route=0, step=0, selected=-1, heard=false, solved=false, busy=false, epoch=0, currentAudio=null, cancelAudio=null;
let bubbleFlow=null;
const isBubbleGame=()=>route===1;
const isMagnetGame=()=>route===2;
const isLightGridGame=()=>route===3;
const isMechanicalGame=()=>route===4||route===6;
const isScannerGame=()=>route===5;
const isGuidedGame=()=>route===0||isBubbleGame()||isMagnetGame()||isLightGridGame()||isMechanicalGame()||isScannerGame();
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function stopAudio() { if(currentAudio)currentAudio.pause(); if(cancelAudio)cancelAudio(false); currentAudio=null; }
function say(path, status=el('feedback')) {
  stopAudio();
  return new Promise(resolve=>{
    const audio=new Audio(path); currentAudio=audio; let done=false;
    const finish=ok=>{if(done)return;done=true;clearTimeout(timer);audio.pause();if(currentAudio===audio)currentAudio=null;if(cancelAudio===finish)cancelAudio=null;resolve(ok);};
    const fail=()=>{if(done)return;status.textContent='暫時未能播放，請再試一次。';finish(false);};
    const timer=setTimeout(fail,15000);cancelAudio=finish;audio.onended=()=>finish(true);audio.onerror=fail;audio.play().catch(fail);
  });
}
function show(id){['setup','game','complete'].forEach(key=>el(key).hidden=key!==id);}
function stateControls(){
  el('game').dataset.guideBusy=String(busy);
  el('source-audio').disabled=busy;el('target-audio').disabled=busy||(isGuidedGame()&&!bubbleFlow.sourceHeard);
  el('next').disabled=busy;el('answer-audio').disabled=busy;
  el('letters').querySelectorAll('button').forEach(b=>b.disabled=busy||solved||(isGuidedGame()&&bubbleFlow.phase!=='position'));
  el('choices').querySelectorAll('button').forEach(b=>b.disabled=busy||solved||!heard||(isGuidedGame()&&!bubbleFlow.canChooseBubble()));
  el('position-hint').style.visibility=!busy&&!solved&&bubbleFlow?.phase==='position'?'visible':'hidden';
  el('choice-hint').style.visibility=!busy&&!solved&&bubbleFlow?.phase==='bubbles'?'visible':'hidden';
  if(isGuidedGame()){
    el('game').dataset.guidePhase=bubbleFlow.phase;
    el('game').dataset.bubblePhase=bubbleFlow.phase;
    el('source-audio').classList.toggle('is-heard',bubbleFlow.sourceHeard);
    el('target-audio').classList.toggle('is-ready',bubbleFlow.sourceHeard);
    [['source-audio','source'],['target-audio','target'],['letters','position'],['choices','bubbles']].forEach(([id,phase])=>el(id).classList.toggle('bubble-guided',!busy&&bubbleFlow.phase===phase));
  }
}
const potionMixes=[
  {base:'#f2ce39',incoming:'#ed6260',result:'#ee973c'},
  {base:'#f2ce39',incoming:'#4898df',result:'#65b773'},
  {base:'#4898df',incoming:'#ed6260',result:'#9c73c3'},
  {base:'#ed6260',incoming:'#fffdf4',result:'#f3a6b5'},
  {base:'#4898df',incoming:'#fffdf4',result:'#a0d1ef'},
  {base:'#9c73c3',incoming:'#fffdf4',result:'#ceb8e5'},
  {base:'#65b773',incoming:'#f2ce39',result:'#b1ce63'},
  {base:'#65b773',incoming:'#4898df',result:'#57b9b6'},
];
let roundMixes=[], roundTasks=[];
function clearPotion(){el('test-tube').hidden=true;el('test-tube').style.transform='';el('potion-stream').hidden=true;el('choices').querySelectorAll('.in-flight').forEach(node=>node.classList.remove('in-flight'));el('letters').querySelectorAll('.potion-reaction').forEach(node=>node.remove());}
function reset(){epoch++;stopAudio();document.getAnimations().forEach(a=>a.cancel());document.querySelectorAll('.lab-extracted-bubble').forEach(node=>node.remove());clearPotion();clearMagnet();clearLightGrid();clearMechanical();busy=false;}
function chooseRoute(){reset();show('setup');el('routes').children[route].focus();}
function start(i){reset();route=i;step=0;roundTasks=buildMagicRound(magicRoutes[i]);roundMixes=shuffled(potionMixes.map((_,index)=>index)).slice(0,roundTasks.length);show('game');render();}
function current(){const [from,to]=roundTasks[step];return {from,to};}
function magicIcon(button,icon,label){
  button.innerHTML=`<img src="assets/icons/${icon}.svg" alt="" aria-hidden="true">`;
  button.setAttribute('aria-label',label);button.title=label;
}
async function chooseGuidedPosition(index,card){
  if(busy||solved||bubbleFlow.phase!=='position')return;
  const {from,to}=current();
  const required=changeIndex(segments(from),segments(to));
  if(!bubbleFlow.selectPosition(index,required)){
    busy=true;const token=epoch;stateControls();card.classList.add('bubble-wrong');
    await animate(card,[{transform:'translateX(0)'},{transform:'translateX(-5px)'},{transform:'translateX(5px)'},{transform:'translateX(-3px)'},{transform:'translateX(0)'}],380);
    if(token!==epoch)return;card.classList.remove('bubble-wrong');busy=false;stateControls();return;
  }
  selected=index;
  el('letters').querySelectorAll('button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  el('feedback').textContent='';stateControls();
}
function render(){
  const bubble=isBubbleGame(), magnet=isMagnetGame(), light=isLightGridGame(), guided=isGuidedGame();bubbleFlow=guided?new BubbleCatchFlow():null;
  el('game').classList.toggle('is-bubble-game',bubble);
  el('game').classList.toggle('is-potion-game',route===0);
  el('game').classList.toggle('is-magnet-game',magnet);
  el('game').classList.toggle('is-light-grid-game',light);
  el('game').classList.toggle('is-mechanical-game',isMechanicalGame()||isScannerGame());
  el('game').classList.toggle('is-scanner-game',isScannerGame());
  el('game').classList.toggle('is-rotary-game',route===4);
  el('game').classList.toggle('is-stamp-game',route===6);
  el('game').dataset.soundGroup=String(route+1);
  el('lab-paper-clues').hidden=false;
  el('lab-paper-clues').replaceChildren(...roundTasks.map((_,index)=>{
    const clue=document.createElement('span');
    clue.className=index<step?'is-collected':'';
    clue.setAttribute('aria-label',`第 ${index+1} 個線索${index<step?'，已收集':'，未收集'}`);
    if(index<step){const icon=document.createElement('img');icon.src=`assets/icons/${route===0?'test-tube-gold':'flask-coral'}.svg`;icon.alt='';clue.append(icon);}
    return clue;
  }));
  el('rotary-machine').hidden=route!==4;
  el('rotary-lever').hidden=route!==4;
  el('scanner-machine').hidden=route!==5;
  el('stamp-machine').hidden=route!==6;el('stamp-head').hidden=route!==6;
  clearMechanical();
  clearLightGrid();
  el('light-grid-console').hidden=!light;
  el('magnet-rack').hidden=!magnet;el('magnet-machine').hidden=!magnet;
  clearMagnet();
  if(!guided){
    delete el('game').dataset.guidePhase;delete el('game').dataset.bubblePhase;
    ['source-audio','target-audio','letters','choices'].forEach(id=>el(id).classList.remove('bubble-guided','is-heard','is-ready'));
  }
  el('target-audio').hidden=!guided;el('bubble-flask').hidden=!bubble;
  if(guided){
    magicIcon(el('source-audio'),'volume-2','播放原字');magicIcon(el('target-audio'),'volume-2','播放目標字');
    magicIcon(el('answer-audio'),'volume-2','重聽新字');
  }else{
    el('source-audio').textContent='♫ 聽原字';el('target-audio').textContent='♫ 聽變字任務';
    el('answer-audio').textContent='♫ 再聽';
  }
  selected=-1;heard=false;solved=false;busy=false;el('answer').hidden=true;el('picture').hidden=false;
  const {from,to}=current(), target=segments(to)[changeIndex(segments(from),segments(to))];
  el('answer-segments').hidden=false;
  el('answer-segments').replaceChildren(...segments(to).map((sound,index)=>{
    const part=document.createElement('span');part.textContent=soundLabel(sound);
    if(index===changeIndex(segments(from),segments(to)))part.className='is-changed';
    return part;
  }));
  if(isMechanicalGame()||isScannerGame())el('progress').innerHTML=`<span class="mechanical-group-number" aria-hidden="true">${route+1}</span><span class="bubble-progress-count">${step+1}/${roundTasks.length}</span>`;
  else if(guided)el('progress').innerHTML=`<span class="bubble-progress-group"><img src="${route===3?'assets/game-style/light-grid-console.webp':`assets/icons/${route===2?'magnet-blue':bubble?'flask-coral':'test-tube-gold'}.svg`}" alt="" aria-hidden="true">${route+1}</span><span class="bubble-progress-count">${step+1}/${roundTasks.length}</span>`;
  else el('progress').textContent=`${magicRoutes[route].name} · ${step+1} / ${roundTasks.length}`;
  el('progress').setAttribute('aria-label',`${magicRoutes[route].name}，第 ${step+1} 題，共 ${roundTasks.length} 題`);
  el('instruction').textContent=guided?'':'先讀原字，再聽變字任務。';el('feedback').textContent='';
  el('letters').replaceChildren();el('choices').replaceChildren();
  el('letters').style.setProperty('--sound-count',segments(from).length);
  segments(from).forEach((letter,i)=>{
    const card=document.createElement('button');card.className='letter-card';card.innerHTML=`<span lang="en">${soundLabel(letter)}</span>${soundCue(letter)?`<small class="bottle-cue">${soundCue(letter)}</small>`:''}`;
    card.dataset.mix=String(roundMixes[step]);
    card.style.setProperty('--base-liquid',potionMixes[card.dataset.mix].base);
    if(!bubble&&!magnet&&!light&&!isMechanicalGame()&&!isScannerGame()){const liquid=document.createElement('div');liquid.className='bottle-liquid';liquid.setAttribute('aria-hidden','true');card.prepend(liquid);}
    card.setAttribute('aria-label',`選擇第 ${i+1} 個音 ${spokenSound(letter)}`);card.setAttribute('aria-pressed','false');
    card.onclick=()=>{if(guided){chooseGuidedPosition(i,card);return;}if(busy||solved)return;selected=i;el('letters').querySelectorAll('button').forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));el('feedback').textContent=heard?'請選擇新的聲音。':'請先聆聽變字任務。';say(soundPath(letter));};el('letters').append(card);
  });
  const family=s=>soundLabel(s)==='ue'?'ue':['c','k','ck'].includes(s)?'k':s;
  const distractors=shuffled(magicRoutes[route].bank.filter(s=>family(s)!==family(target)&&!segments(from).some(v=>family(v)===family(s)))).slice(0,2);
  const incoming=potionMixes[roundMixes[step]].incoming;
  const otherLiquids=['#ed6260','#4898df','#f2ce39','#fffdf4'].filter(color=>color!==incoming);
  const optionLiquids=new Map([[target,incoming],...distractors.map((sound,index)=>[sound,otherLiquids[index]])]);
  shuffled([target,...distractors]).forEach(sound=>{
    const wrapper=document.createElement('div');wrapper.className='magic-option';
    const pick=document.createElement('button');pick.className='pick-sound';pick.dataset.length=String(sound.length);
    pick.innerHTML=(isMechanicalGame()||isScannerGame())?`<span class="mechanical-sound" lang="en">${soundLabel(sound)}</span>`:light?`<span class="light-sound" lang="en">${soundLabel(sound)}</span>`:magnet?`<span class="magnet-sound" lang="en">${soundLabel(sound)}</span>`:bubble?`<span class="bubble-sound" lang="en">${soundLabel(sound)}</span>`:`<span class="option-tube" aria-hidden="true"><img src="assets/game-style/lab-tube-v2.png" alt=""><span class="tube-liquid"></span><span class="tube-letter" lang="en">${sound}</span></span>`;
    pick.style.setProperty('--incoming-liquid',optionLiquids.get(sound));
    pick.setAttribute('aria-label',`選用 ${sound}`);pick.onclick=()=>attempt(sound,pick);
    const listen=document.createElement('button');listen.className='listen-sound';listen.textContent='♫';listen.setAttribute('aria-label',`聽 ${sound} 的聲音`);listen.title=`聽 ${sound} 的聲音`;listen.onclick=()=>say(soundPath(sound));
    if(guided)magicIcon(listen,'volume-2',`聽 ${sound} 的聲音`);
    wrapper.append(pick);if(!bubble&&!magnet&&!light)wrapper.append(listen);el('choices').append(wrapper);
  });
  el('choices').setAttribute('aria-label',route===4?'選擇轉輪的新聲音':route===6?'選擇聲音印章':light?'選擇替換聲音光格':magnet?'選擇替換聲音磁力圓牌':bubble?'選擇替換聲音氣泡':'候選聲音試管');
  const nextLabel=step===roundTasks.length-1?'完成實驗':'下一題';
  if(guided)magicIcon(el('next'),step===roundTasks.length-1?'check':'arrow-right',nextLabel);
  else {el('next').textContent=`${nextLabel} →`;el('next').setAttribute('aria-label',nextLabel);el('next').title=nextLabel;}
  stateControls();if(guided)el('source-audio').focus({preventScroll:true});else el('instruction').focus();
}
async function animate(node,frames,duration){if(!reduced.matches)await node.animate(frames,{duration,easing:'ease-in-out'}).finished.catch(()=>{});}
function clearLightGrid(){
  document.querySelectorAll('.circuit-charge,.circuit-lamp').forEach(node=>node.remove());
  document.querySelectorAll('.light-sweep').forEach(node=>node.remove());
  el('letters').querySelectorAll('.light-scanning').forEach(node=>node.classList.remove('light-scanning'));
}
async function scanLightGrid(card,pick,token){
  if(reduced.matches)return;
  const bench=el('light-grid-console').parentElement,frame=bench.getBoundingClientRect();
  const start=pick.getBoundingClientRect(),end=card.getBoundingClientRect();
  const charge=document.createElement('i');charge.className='circuit-charge';charge.setAttribute('aria-hidden','true');bench.append(charge);
  const point=(x,y,offset)=>({left:`${x-frame.left-6}px`,top:`${y-frame.top-6}px`,offset});
  // The pulse follows the connecting copper bus before reaching the selected pad.
  const busY=Math.max(end.bottom,start.bottom)+12;
  const stacked=getComputedStyle(el('light-grid-console')).display==='none';
  const path=stacked
    ?[point(start.left+start.width/2,start.bottom,0),point(start.left+start.width/2,frame.top+405,.15),point(frame.left-3,frame.top+405,.35),point(frame.left-3,frame.top+202,.65),point(end.left+end.width/2,frame.top+202,.9),point(end.left+end.width/2,end.bottom,1)]
    :[point(start.left+start.width/2,start.bottom,0),point(start.left+start.width/2,busY,.2),point(end.left+end.width/2,busY,.75),point(end.left+end.width/2,end.bottom,1)];
  await animate(charge,path,stacked?950:650);
  charge.remove();if(token!==epoch)return;
  const sweep=document.createElement('i');sweep.className='light-sweep';sweep.setAttribute('aria-hidden','true');
  card.classList.add('light-scanning');card.append(sweep);
  await animate(pick,[{filter:'brightness(1)'},{filter:'brightness(1.3)'},{filter:'brightness(1)'}],240);
  if(token!==epoch){sweep.remove();card.classList.remove('light-scanning');return;}
  await animate(sweep,[{transform:'translateX(-110%)',opacity:0},{opacity:1,offset:.12},{opacity:1,offset:.88},{transform:'translateX(320%)',opacity:0}],1100);
  sweep.remove();card.classList.remove('light-scanning');
  if(token!==epoch)return;
  const lamp=document.createElement('i');lamp.className='circuit-lamp';lamp.setAttribute('aria-hidden','true');
  const bulb=document.createElement('img');bulb.src='assets/game-style/lab-paper-light-console.webp';bulb.alt='';lamp.append(bulb);el('stage').append(lamp);
  await animate(lamp,[{opacity:0},{opacity:1,offset:.5},{opacity:.7}],380);
}
function clearMagnet(){
  document.querySelectorAll('.magnet-flight').forEach(node=>node.remove());
  el('magnet-arm').style.transform='';
  el('letters').querySelectorAll('.magnet-lifted').forEach(node=>node.classList.remove('magnet-lifted'));
}
async function swapMagnet(card,pick,token){
  if(reduced.matches)return;
  const arm=el('magnet-arm'),grip=el('magnet-grip'),box=arm.getBoundingClientRect(),home=grip.getBoundingClientRect();
  const pivot={x:box.left+box.width*.906,y:box.top+box.height*.678};
  const vector={x:home.left-pivot.x,y:home.top-pivot.y};
  const transformAt=(x,y)=>`rotate(${(Math.atan2(y-pivot.y,x-pivot.x)-Math.atan2(vector.y,vector.x))*180/Math.PI}deg) scale(${Math.hypot(x-pivot.x,y-pivot.y)/Math.hypot(vector.x,vector.y)})`;
  let held=null,following=true,frame;
  // The carried token follows the actual magnet tip throughout the arm's motion.
  const follow=()=>{if(held){const tip=grip.getBoundingClientRect();held.style.left=`${tip.left-held.offsetWidth/2}px`;held.style.top=`${tip.top}px`;}if(following&&token===epoch)frame=requestAnimationFrame(follow);};
  const move=async(x,y,duration)=>{const destination=transformAt(x,y);await animate(arm,[{transform:arm.style.transform||'none'},{transform:destination}],duration);if(token===epoch)arm.style.transform=destination;};
  const attach=node=>{
    const rect=node.getBoundingClientRect(),ghost=document.createElement('div');ghost.className='magnet-flight magnet-flight-disc';
    ghost.textContent=node.querySelector('span').textContent;ghost.setAttribute('aria-hidden','true');
    Object.assign(ghost.style,{width:`${rect.width}px`,height:`${rect.height}px`,transform:'scale(.85)',transformOrigin:'center top'});
    document.body.append(ghost);held=ghost;return ghost;
  };
  follow();
  try{
    const slot=card.getBoundingClientRect();
    await move(slot.left+slot.width/2,slot.top,600);if(token!==epoch)return;
    const old=attach(card);card.classList.add('magnet-lifted');
    await move(home.left,home.top,550);if(token!==epoch)return;
    await animate(old,[{opacity:1,transform:'scale(.85)'},{opacity:0,transform:'translateY(30px) scale(.3)'}],220);old.remove();held=null;
    const replacement=pick.getBoundingClientRect();
    await move(replacement.left+replacement.width/2,replacement.top,450);if(token!==epoch)return;
    const incoming=attach(pick);pick.style.visibility='hidden';
    await move(slot.left+slot.width/2,slot.top,700);if(token!==epoch)return;
    incoming.remove();held=null;card.querySelector('span').textContent=pick.querySelector('span').textContent;card.classList.remove('magnet-lifted');
    await move(home.left,home.top,400);
  }finally{following=false;cancelAnimationFrame(frame);held?.remove();if(token===epoch)arm.style.transform='';}
}
async function flyBubble(card,pick,token){
  if(reduced.matches){pick.style.visibility='hidden';return;}
  const from=pick.getBoundingClientRect(),to=card.getBoundingClientRect(),machine=el('bubble-flask').getBoundingClientRect();
  const ghost=document.createElement('div');ghost.className='lab-extracted-bubble';
  ghost.textContent=pick.textContent;ghost.setAttribute('aria-hidden','true');
  Object.assign(ghost.style,{left:`${from.left}px`,top:`${from.top}px`,width:`${from.width}px`,height:`${from.height}px`});
  document.body.append(ghost);pick.style.visibility='hidden';
  const point=(x,y,scale,offset,opacity=1)=>({transform:`translate(${x-from.left-from.width/2}px,${y-from.top-from.height/2}px) scale(${scale})`,offset,opacity});
  // Shrink through the glass neck, pass the funnel, then float into the chosen letter.
  const frames=[{transform:'translate(0,0) scale(1)',offset:0,opacity:1},
    point(machine.left+machine.width*.37,machine.top+machine.height*.42,.55,.22),
    point(machine.left+machine.width*.28,machine.top+machine.height*.42,.25,.36),
    point(machine.left+machine.width*.24,machine.top+machine.height*.42,.25,.47),
    point(machine.left+machine.width*.12,machine.top+machine.height*.42,.65,.61),
    point(machine.left+machine.width*.035,machine.top+machine.height*.42,.95,.74),
    point(to.left+to.width/2,to.top+to.height/2,.55,1,0)];
  await animate(ghost,frames,1450);ghost.remove();
  if(token!==epoch)return;
}
async function pourPotion(card,token,pick){
  const mix=potionMixes[card.dataset.mix], liquid=card.querySelector('.bottle-liquid');
  if(reduced.matches){liquid.style.background=mix.result;liquid.style.height='62%';return;}
  const r=card.getBoundingClientRect(),s=el('stage').getBoundingClientRect();
  const x=r.left-s.left+r.width/2, y=Math.max(32,r.top-s.top-6);
  const tube=el('test-tube'),stream=el('potion-stream');
  const origin=pick.querySelector('.option-tube').getBoundingClientRect();
  tube.style.width=`${origin.width}px`;tube.style.height=`${origin.height}px`;
  tube.innerHTML=pick.querySelector('.option-tube').innerHTML;
  tube.dataset.length=pick.dataset.length;
  const tilt=x<s.width/2?-120:120;
  tube.style.setProperty('--incoming-liquid',mix.incoming);stream.style.background=mix.incoming;
  tube.style.left=`${origin.left}px`;tube.style.top=`${origin.top}px`;tube.hidden=false;pick.classList.add('in-flight');
  const dx=s.left+x-origin.width/2-origin.left,dy=s.top+y-origin.height*.09-origin.top;
  const destination=`translate(${dx}px,${dy}px)`;
  await animate(tube,[{transform:'translate(0,0) rotate(0deg)'},{transform:`${destination} rotate(0deg)`,offset:.65},{transform:`${destination} rotate(${tilt}deg)`}],950);
  if(token!==epoch)return;
  tube.style.transform=`${destination} rotate(${tilt}deg)`;
  stream.style.left=`${x-2.5}px`;stream.style.top=`${y}px`;
  stream.style.height=`${Math.max(16,r.top-s.top+r.height*.08-y)}px`;stream.hidden=false;
  await Promise.all([
    animate(stream,[{transform:'scaleY(0)',opacity:0},{transform:'scaleY(1)',opacity:1,offset:.3},{transform:'scaleY(1)',opacity:1,offset:.8},{transform:'scaleY(1)',opacity:0}],1000),
    animate(tube.querySelector('.tube-liquid'),[{opacity:.8},{opacity:0}],1000),
    animate(liquid,[{height:'52%',background:mix.base},{height:'62%',background:mix.result}],1000),
  ]);
  if(token!==epoch)return;
  stream.hidden=true;
  tube.querySelector('.tube-liquid').style.opacity='0';
  liquid.style.background=mix.result;liquid.style.height='62%';
  const reaction=document.createElement('div');reaction.className='potion-reaction';reaction.setAttribute('aria-hidden','true');card.append(reaction);
  const bubbles=[];
  for(let i=0;i<5;i++){
    const bubble=document.createElement('i');bubble.style.left=`${8+i*18}%`;reaction.append(bubble);
    bubbles.push(animate(bubble,[{transform:'translateY(0) scale(.5)',opacity:0},{opacity:.8,offset:.25},{transform:`translateY(-${24+i%3*10}px) scale(1)`,opacity:0}],850+i*70));
  }
  await animate(tube,[{transform:`${destination} rotate(${tilt}deg)`},{transform:`${destination} rotate(0deg)`,offset:.3},{transform:'translate(0,0) rotate(0deg)'}],700);
  if(token!==epoch)return;
  tube.hidden=true;tube.style.transform='';pick.classList.remove('in-flight');
  await Promise.all(bubbles);
}
function clearMechanical(){
  document.querySelectorAll('.mechanical-transfer').forEach(node=>node.remove());
  document.querySelectorAll('.is-feeding').forEach(node=>node.classList.remove('is-feeding'));
  el('rotary-lever').style.transform='';delete el('rotary-lever').dataset.motion;
  document.querySelectorAll('.scanner-beam,.scanner-lamp').forEach(node=>node.remove());
  document.querySelectorAll('.mechanical-transient').forEach(node=>node.remove());
  el('letters').querySelectorAll('.is-rolling,.is-stamping').forEach(card=>card.classList.remove('is-rolling','is-stamping'));
  const head=el('stamp-head');head.style.left='';head.style.transform='';delete head.dataset.motion;delete head.dataset.sound;
  head.querySelector('.stamp-spring').style.transform='';
}
async function rollSound(card,sound,token){
  if(token!==epoch)return;
  const label=card.querySelector('span');
  if(reduced.matches){label.textContent=soundLabel(sound);return;}
  const lever=el('rotary-lever');lever.dataset.motion='pressing';
  const pressed=`rotate(${el('stage').getBoundingClientRect().width<560?14:42}deg)`;
  await animate(lever,[{transform:'rotate(0deg)'},{transform:pressed}],450);
  if(token!==epoch)return;lever.style.transform=pressed;
  const incoming=document.createElement('span');
  incoming.className='mechanical-transient';incoming.lang='en';incoming.textContent=soundLabel(sound);
  incoming.setAttribute('aria-hidden','true');card.append(incoming);card.classList.add('is-rolling');
  await Promise.all([
    animate(label,[{transform:'translateY(0) rotateX(0deg)'},{transform:'translateY(8%) rotateX(-8deg)',offset:.12},{transform:'translateY(-125%) rotateX(70deg)'}],1000),
    animate(incoming,[{transform:'translateY(125%) rotateX(-70deg)'},{transform:'translateY(125%) rotateX(-70deg)',offset:.12},{transform:'translateY(0) rotateX(0deg)'}],1000),
  ]);
  if(token!==epoch)return;
  label.textContent=soundLabel(sound);incoming.remove();card.classList.remove('is-rolling');
  lever.dataset.motion='releasing';
  await animate(lever,[{transform:pressed},{transform:'rotate(0deg)'}],400);
  if(token!==epoch)return;lever.style.transform='';delete lever.dataset.motion;
}
async function feedMechanicalSound(card,pick,token){
  if(reduced.matches||token!==epoch)return;
  const from=pick.getBoundingClientRect();
  const destination=(route===6?el('stamp-head'):card).getBoundingClientRect();
  const transfer=pick.cloneNode(true);transfer.className=`mechanical-transfer transfer-${route}`;
  transfer.removeAttribute('aria-label');transfer.setAttribute('aria-hidden','true');transfer.tabIndex=-1;
  Object.assign(transfer.style,{left:`${from.left}px`,top:`${from.top}px`,width:`${from.width}px`,height:`${from.height}px`});
  document.body.append(transfer);pick.classList.add('is-feeding');
  const dx=destination.left+destination.width/2-from.left-from.width/2;
  const dy=destination.top+destination.height/2-from.top-from.height/2;
  const scale=Math.min(1.15,destination.width/from.width);
  await animate(transfer,[{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${dx*.35}px,${dy*.6-24}px) scale(1)`,offset:.4,opacity:1},{transform:`translate(${dx}px,${dy}px) scale(${scale})`,opacity:.9}],750);
  transfer.remove();pick.classList.remove('is-feeding');
}
async function stampSound(card,sound,token){
  if(token!==epoch)return;
  const label=card.querySelector('span');
  if(reduced.matches){label.textContent=soundLabel(sound);return;}
  const head=el('stamp-head'),spring=head.querySelector('.stamp-spring'),stage=el('stage').getBoundingClientRect(),slot=card.getBoundingClientRect();
  head.dataset.sound=soundLabel(sound);
  const left=`${slot.left+slot.width/2-stage.left}px`;
  head.dataset.motion='aligning';
  await animate(head,[{left:getComputedStyle(head).left},{left}],300);
  if(token!==epoch)return;head.style.left=left;
  const distance=Math.max(0,slot.top+slot.height*.45-head.getBoundingClientRect().bottom);
  const contact=`translateY(${distance}px)`;
  const extended=`translateY(-${distance}px) scaleY(${1+distance/Math.max(1,spring.getBoundingClientRect().height)})`;
  head.dataset.motion='pressing';card.classList.add('is-stamping');
  await Promise.all([
    animate(head,[{transform:'translateY(0)'},{transform:'translateY(-8px)',offset:.2},{transform:contact}],450),
    animate(spring,[{transform:'none'},{transform:'translateY(8px)',offset:.2},{transform:extended}],450),
  ]);
  if(token!==epoch)return;head.style.transform=contact;spring.style.transform=extended;
  // The new sound appears at contact, while the stamp still covers its position.
  label.textContent=soundLabel(sound);head.dataset.motion='releasing';
  await Promise.all([
    animate(head,[{transform:contact},{transform:contact,offset:.18},{transform:'translateY(-10px)',offset:.8},{transform:'translateY(0)'}],650),
    animate(spring,[{transform:extended},{transform:extended,offset:.18},{transform:'translateY(10px)',offset:.8},{transform:'none'}],650),
    animate(label,[{opacity:.25,transform:'scale(.88)'},{opacity:1,transform:'scale(1)'}],500),
  ]);
  if(token!==epoch)return;head.style.transform='';spring.style.transform='';delete head.dataset.motion;delete head.dataset.sound;card.classList.remove('is-stamping');
}
async function scanSound(card,sound,token){
  if(token!==epoch)return;
  const label=card.querySelector('span');
  if(reduced.matches){label.textContent=soundLabel(sound);return;}
  const beam=document.createElement('i');beam.className='scanner-beam';beam.setAttribute('aria-hidden','true');card.append(beam);
  const lamp=document.createElement('span');lamp.className='scanner-lamp';lamp.setAttribute('aria-hidden','true');
  const lampArt=el('scanner-machine').cloneNode();lampArt.removeAttribute('id');lampArt.hidden=false;lampArt.className='mechanical-art scanner-lamp-art';lamp.append(lampArt);el('stage').append(lamp);
  await animate(beam,[{left:'0%',opacity:0},{left:'12%',opacity:1,offset:.2},{left:'50%',opacity:1}],650);
  if(token!==epoch)return;
  label.textContent=soundLabel(sound);
  await Promise.all([
    animate(beam,[{left:'50%',opacity:1},{left:'88%',opacity:1,offset:.8},{left:'100%',opacity:0}],650),
    animate(label,[{opacity:.35,transform:'scale(.9)'},{opacity:1,transform:'scale(1)'}],400),
  ]);
  if(token!==epoch)return;beam.remove();lamp.remove();
}
async function attempt(sound,pick){
  if(busy||solved||!heard)return;
  if(isGuidedGame()&&!bubbleFlow.canChooseBubble())return;
  if(selected<0){el('feedback').textContent='請先選擇要更換的聲音。';return;}
  const {from,to}=current();const letters=segments(from);letters[selected]=sound;
  const card=el('letters').children[selected];const token=epoch;busy=true;stopAudio();stateControls();
  if(letters.join('|')!==segments(to).join('|')){
    el('feedback').textContent=isGuidedGame()?'':'哪個聲音不同了？請再聽一次。';
    const wrong=isGuidedGame()?pick:card;wrong.classList.add('bubble-wrong');
    await animate(wrong,[{transform:'translateX(0)'},{transform:'translateX(-7px)'},{transform:'translateX(7px)'},{transform:'translateX(-4px)'},{transform:'translateX(0)'}],380);
    if(token===epoch){wrong.classList.remove('bubble-wrong');busy=false;stateControls();}return;
  }
  el('feedback').textContent=isGuidedGame()?'':'正在更換聲音……';
  let replaced=false;
  if(route>=4){await feedMechanicalSound(card,pick,token);if(token!==epoch)return;}
  if(isBubbleGame())await flyBubble(card,pick,token);else if(isMagnetGame())await swapMagnet(card,pick,token);else if(isLightGridGame())await scanLightGrid(card,pick,token);
  else if(route===4){await rollSound(card,sound,token);replaced=true;}
  else if(route===5){await scanSound(card,sound,token);replaced=true;}
  else if(route===6){await stampSound(card,sound,token);replaced=true;}
  else await pourPotion(card,token,pick);
  if(token!==epoch)return;
  if(!replaced){
    await animate(card.querySelector('span'),[{opacity:1},{opacity:0}],180);
    if(token!==epoch)return;card.querySelector('span').textContent=soundLabel(sound);
    await animate(card.querySelector('span'),[{opacity:0},{opacity:1}],250);
  }
  if(token!==epoch)return;card.setAttribute('aria-label',`第 ${selected+1} 個音 ${spokenSound(sound)}`);
  if(token!==epoch)return;clearPotion();solved=true;
  if(isGuidedGame())bubbleFlow.solve();
  el('instruction').textContent=isGuidedGame()?'':'變字成功！';el('feedback').textContent=isGuidedGame()?'':'你更換了一個音，組成了新的字詞！';
  el('picture').src=picturePath(to);el('picture').alt=to;el('answer-word').textContent=to;el('answer').hidden=false;
  stateControls();
  await say(audioPath(to));if(token===epoch){busy=false;stateControls();el('next').focus({preventScroll:true});}
}
el('source-audio').onclick=async()=>{
  if(busy)return;
  busy=true;const token=epoch;
  if(!isGuidedGame())el('target-audio').hidden=false;
  stateControls();
  const ok=await say(audioPath(current().from));
  if(token===epoch){if(isGuidedGame()){bubbleFlow.finishSource(ok);if(ok)el('feedback').textContent='';}busy=false;stateControls();}
};
el('target-audio').onclick=async()=>{
  if(busy||(isGuidedGame()&&!bubbleFlow.sourceHeard))return;busy=true;stateControls();const token=epoch;
  if(solved){await say(audioPath(current().to));if(token===epoch){busy=false;stateControls();}return;}
  el('feedback').textContent=isGuidedGame()?'':'正在播放新字……';
  const ok=await say(audioPath(current().to));if(token!==epoch)return;
  heard=heard||ok;if(isGuidedGame())bubbleFlow.finishTarget(ok);busy=false;stateControls();if(ok){el('instruction').textContent=isGuidedGame()?'':'更換哪個音，可以組成剛才聽到的字？';el('feedback').textContent='';}
};
el('answer-audio').onclick=()=>say(audioPath(current().to));
el('picture').onerror=()=>{el('picture').hidden=true;el('feedback').textContent='圖片暫時未能載入，仍可聆聽新字。';};
el('next').onclick=()=>{if(busy||!solved)return;stopAudio();step++;if(step<roundTasks.length)render();else finish();};
function finish(skipped=false){
  show('complete');el('complete').dataset.soundGroup=String(route+1);el('collection').replaceChildren();el('review-status').textContent='';
  el('complete-title').textContent=skipped?'本組字詞總覽':'換音線索已集齊！';
  el('complete-title').setAttribute('aria-label',`${magicRoutes[route].name}，${skipped?'字詞總覽':'換音線索已集齊'}，共 ${roundTasks.length} 個字詞`);
  roundTasks.forEach(([,word])=>{
    const b=document.createElement('button');
    b.innerHTML=`<img src="${picturePath(word)}" alt=""><span lang="en">${word}</span>`;
    b.setAttribute('aria-label',`重聽 ${word}`);b.title=`重聽 ${word}`;
    b.querySelector('img').onerror=event=>{event.target.hidden=true;};
    b.onclick=()=>say(audioPath(word),el('review-status'));el('collection').append(b);
  });
  el('complete-title').focus({preventScroll:true});
}
magicRoutes.forEach((r,i)=>{
  const b=document.createElement('button');
  const sounds=routeRackSounds[i];
  b.className='rack-route';
  b.dataset.soundGroup=String(i+1);
  b.setAttribute('aria-label',`${r.name}：${i>0?`${r.sounds}；`:''}${sounds.join(' · ')}`);
  b.innerHTML=`<span class="lab-station-art" aria-hidden="true"></span><strong class="rack-label" aria-hidden="true"><span class="lab-number-sign">${i+1}</span></strong><span class="rack-sounds" lang="en">${sounds.map(sound=>`<span>${sound}</span>`).join('')}</span>`;
  const name=document.createElement('span');name.className='lab-station-name';name.textContent=labStationNames[i];b.append(name);
  b.onclick=()=>start(i);el('routes').append(b);
});
el('back').onclick=chooseRoute;el('choose-route').onclick=chooseRoute;el('again').onclick=()=>start(route);
el('skip-round').onclick=()=>{if(el('game').hidden)return;reset();finish(true);};
window.addEventListener('pagehide',reset);
// Restore a playable question when the browser returns from its page cache.
window.addEventListener('pageshow',event=>{if(event.persisted&&!el('game').hidden){reset();render();}});
