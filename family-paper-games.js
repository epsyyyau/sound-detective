const paperThemes={
  1:{name:'字族郵局',scene:'postal',colour:'#f4d98f'},
  2:{name:'線索照相館',scene:'photo',colour:'#edb2a8'},
  3:{name:'碼頭查貨',scene:'harbour',colour:'#afd1e7'},
  4:{name:'聽聲交通站',scene:'traffic',colour:'#b9ddc5'},
  5:{name:'字族圖書館',scene:'library',colour:'#d5c1e2'},
  6:{name:'招牌修復工房',scene:'workshop',colour:'#f0c69c'},
  7:{name:'字族連接橋',scene:'bridge',colour:'#e9bfd2'}
};
let paperLetter='',paperSource=null,paperDrag=null,paperActiveEnding='';
function paperFamilyBanks(round,endings){
  return endings.map((ending,index)=>({ending,side:index===0?'left':'right',tasks:round.filter(task=>task.ending===ending)}));
}
function resetPaperFamily(){
  if(paperDrag){
    const {button,id,ghost}=paperDrag;paperDrag=null;
    if(button.hasPointerCapture(id))button.releasePointerCapture(id);
    ghost?.remove();
  }
  document.querySelectorAll('.paper-drag-over').forEach(node=>node.classList.remove('paper-drag-over'));
}
function paperIcon(name){const image=document.createElement('img');image.src=`assets/icons/${name}.svg`;image.alt='';return image;}
function paperButton(label,icon){const button=document.createElement('button');button.type='button';button.title=label;button.setAttribute('aria-label',label);if(icon)button.append(paperIcon(icon));return button;}
function paperHint(text){
  const hint=document.querySelector('.paper-hint');hint.replaceChildren();
  if(text){const sentence=document.createElement('span');sentence.textContent=text;hint.append(sentence);}
}
function paperProgress(){
  const done=familyRound.filter(task=>familySolvedWords.has(task.word)).length;
  const progress=document.querySelector('.paper-progress');progress.textContent=`${done} / ${familyRound.length}`;
  progress.setAttribute('aria-label',`第 ${selectedStop.number} 組，已完成 ${done} 題，共 ${familyRound.length} 題`);
}
function renderPaperFamilyQuestion(){
  resetFamily();paperLetter='';paperSource=null;paperActiveEnding='';familyPhase='paper-choose';
  const theme=paperThemes[selectedStop.number],root=familyUI('paper');
  root.replaceChildren();root.dataset.scene=theme.scene;root.dataset.soundGroup=selectedStop.number;root.dataset.flow='choose-letter';root.style.setProperty('--paper-group',theme.colour);
  root.style.setProperty('--paper-scenery',`url('assets/game-style/family-${theme.scene}-scene.png')`);
  const scene=document.createElement('img');scene.className='paper-scenery';scene.src=`assets/game-style/family-${theme.scene}-scene.png`;scene.alt='';root.append(scene);
  const heading=document.createElement('h2');heading.className='paper-title';heading.textContent=theme.name;heading.dataset.group=selectedStop.number;root.append(heading);
  const back=paperButton('返回物換「聲」移封面');back.className='paper-back';const backImage=document.createElement('img');backImage.src='assets/game-style/family-paper-return.webp';backImage.alt='';back.append(backImage);back.onclick=returnToMap;root.append(back);
  const progress=document.createElement('span');progress.className='paper-progress';progress.setAttribute('role','status');root.append(progress);paperProgress();
  const skip=paperButton('跳過本組題目，查看字詞總覽');skip.className='paper-skip practice-skip';skip.textContent='跳過';skip.onclick=skipFamilyRound;root.append(skip);
  const hint=document.createElement('p');hint.className='paper-hint';hint.setAttribute('role','status');hint.setAttribute('aria-live','polite');root.append(hint);paperHint('請選擇字頭。');
  const audioStatus=document.createElement('p');audioStatus.className='paper-audio-status';audioStatus.setAttribute('role','status');root.append(audioStatus);
  for(const {side,ending,tasks} of paperFamilyBanks(familyRound,selectedStop.endings)){
    const bank=document.createElement('div');bank.className=`paper-letter-bank paper-bank-${side}`;bank.dataset.ending=ending;bank.setAttribute('role','group');bank.setAttribute('aria-label',`${side==='left'?'左':'右'}側 ${ending} 字族的字頭`);
    for(const task of tasks){
      const letter=task.word.slice(0,-ending.length);
      const button=paperButton(`將字頭 ${letter} 拼入 ${ending} 字族`);button.className='paper-letter';button.textContent=letter;button.lang='en';button.dataset.letter=letter;button.dataset.ending=ending;button.dataset.word=task.word;
      const pending=!familySolvedWords.has(task.word);
      button.disabled=!pending;button.classList.toggle('paper-done',!pending);button.setAttribute('aria-pressed','false');
      attachPaperLetter(button,letter);bank.append(button);
    }
    root.append(bank);
  }
  selectedStop.endings.forEach((ending,index)=>{
    const target=document.createElement('div');target.className=`paper-family-target paper-target-${index}`;target.dataset.ending=ending;
    const join=document.createElement('div');join.className='paper-join';join.dataset.ending=ending;join.lang='en';join.setAttribute('aria-label',`${ending} 字族`);
    const onset=document.createElement('span');onset.className='paper-onset';onset.setAttribute('aria-hidden','true');
    const fixed=document.createElement('span');fixed.className='paper-ending';fixed.textContent=ending;join.append(onset,fixed);
    target.append(join);
    const listen=paperButton(`聆聽 ${ending} 字族`,'volume-2');listen.className='paper-speaker';
    listen.onclick=()=>{if(target.dataset.word)playFamilyWord(target.dataset.word,audioStatus);else playFamilyAudio(familyEndingRecordings[ending],audioStatus);};target.append(listen);
    const collected=document.createElement('span');collected.className='paper-collected';collected.setAttribute('aria-hidden','true');target.append(collected);root.append(target);
  });
  const options=document.createElement('div');options.className='paper-pictures';options.setAttribute('role','group');options.setAttribute('aria-label','選擇與字詞相符的圖片');root.append(options);
  const evidence=document.createElement('div');evidence.className='paper-evidence';evidence.setAttribute('aria-label','已收集線索');
  familyRound.forEach(task=>{
    const slot=document.createElement('span');slot.className='paper-evidence-slot';slot.dataset.word=task.word;
    if(familySolvedWords.has(task.word)){const image=familyImage(task.word);image.title=task.word;slot.append(image);}
    evidence.append(slot);
  });root.append(evidence);
  if(selectedStop.number===4)buildPaperTraffic(root);
  root.querySelector('.paper-letter:not(:disabled)')?.focus({preventScroll:true});
}
function choosePaperLetter(letter,button){
  if(familyPhase==='paper-celebrating'||familyPhase==='solved')return;
  resetFamily();paperLetter=letter;paperSource=button;paperActiveEnding='';familyPhase='paper-choose';
  document.querySelector('.paper-pictures').replaceChildren();
  document.querySelectorAll('.paper-letter').forEach(node=>node.setAttribute('aria-pressed',String(node===button)));
  document.querySelectorAll('.paper-family-target').forEach(target=>{
    target.dataset.word='';target.classList.remove('paper-active');target.querySelector('.paper-onset').textContent='';target.querySelector('.paper-onset').style.visibility='';target.querySelector('.paper-onset').classList.remove('paper-filled');
    const speaker=target.querySelector('.paper-speaker');speaker.title=`聆聽 ${target.dataset.ending} 字族`;speaker.setAttribute('aria-label',speaker.title);
  });
  if(selectedStop.number===4)resetPaperTraffic();
  document.querySelector('.paper-audio-status').textContent='';paperHint('');
  joinPaperFamily(button.dataset.ending);
}
function attachPaperLetter(button,letter){
  let dragged=false;
  button.onclick=event=>{if(dragged&&event.detail){dragged=false;return;}choosePaperLetter(letter,button);};
  button.onpointerdown=event=>{
    if(button.disabled||event.button!==0||['paper-celebrating','solved'].includes(familyPhase))return;
    dragged=false;paperDrag={button,letter,id:event.pointerId,x:event.clientX,y:event.clientY,ghost:null};button.setPointerCapture(event.pointerId);
  };
  button.onpointermove=event=>{
    const drag=paperDrag;if(!drag||drag.button!==button)return;
    if(!drag.ghost&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<8)return;
    if(!drag.ghost){drag.ghost=document.createElement('span');drag.ghost.className='family-drag-ghost';drag.ghost.textContent=letter;drag.ghost.setAttribute('aria-hidden','true');document.body.append(drag.ghost);}
    event.preventDefault();drag.ghost.style.left=`${event.clientX}px`;drag.ghost.style.top=`${event.clientY}px`;
    document.querySelectorAll('.paper-join').forEach(node=>{const r=node.getBoundingClientRect();node.classList.toggle('paper-drag-over',node.dataset.ending===button.dataset.ending&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom);});
  };
  button.onpointerup=event=>{
    const drag=paperDrag;if(!drag||drag.button!==button)return;
    dragged=!!drag.ghost;
    const target=[...document.querySelectorAll('.paper-join')].find(node=>{const r=node.getBoundingClientRect();return event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom;});
    resetPaperFamily();
    if(dragged&&target?.dataset.ending===button.dataset.ending)choosePaperLetter(letter,button);
  };
  button.onpointercancel=resetPaperFamily;
  button.onlostpointercapture=()=>{if(paperDrag?.button===button)resetPaperFamily();};
}
async function paperAnimate(node,frames,duration){
  if(familyReduced.matches)return;
  await node.animate(frames,{duration,easing:'ease-in-out',fill:'none'}).finished.catch(()=>{});
}
async function joinPaperFamily(ending){
  if(!paperLetter||paperSource?.dataset.ending!==ending)return;
  if(['paper-celebrating','solved'].includes(familyPhase))return;
  const word=paperLetter+ending,index=familyRound.findIndex(task=>task.word===word&&task.ending===ending);
  if(index<0){paperHint('這個組合不在本組詞語中，請改選字頭或字族。');return;}
  if(familySolvedWords.has(word)){paperHint('這個詞語已完成，請選擇其他組合。');return;}
  resetFamily();const token=familyEpoch;stopFamilyAudio();familyStep=index;paperActiveEnding=ending;familyPhase='paper-joining';
  const root=familyUI('paper'),target=root.querySelector(`.paper-family-target[data-ending="${ending}"]`);
  root.dataset.flow='joining';root.querySelector('.paper-pictures').replaceChildren();paperHint('');
  root.querySelectorAll('.paper-family-target').forEach(node=>{node.classList.remove('paper-active');node.dataset.word='';node.querySelector('.paper-onset').textContent='';node.querySelector('.paper-onset').style.visibility='';node.querySelector('.paper-onset').classList.remove('paper-filled');const speaker=node.querySelector('.paper-speaker');speaker.title=`聆聽 ${node.dataset.ending} 字族`;speaker.setAttribute('aria-label',speaker.title);});
  target.classList.add('paper-active');target.dataset.word=word;
  const onset=target.querySelector('.paper-onset');onset.textContent=paperLetter;onset.classList.add('paper-filled');
  {
    const from=paperSource.getBoundingClientRect(),to=onset.getBoundingClientRect();
    await paperAnimate(onset,[{transform:`translate(${from.left+from.width/2-to.left-to.width/2}px,${from.top+from.height/2-to.top-to.height/2}px)`,opacity:.85},{transform:'translate(0,0)',opacity:1}],480);
    if(token!==familyEpoch)return;
  }
  familyPhase='paper-read';root.dataset.flow='pictures';renderPaperPictures(familyRound[familyStep]);paperHint('請選擇相符的圖片。');
  playFamilyWord(word,root.querySelector('.paper-audio-status'));target.querySelector('.paper-speaker').setAttribute('aria-label',`重聽 ${word}`);target.querySelector('.paper-speaker').title=`重聽 ${word}`;
}
function renderPaperPictures(task){
  const holder=document.querySelector('.paper-pictures');holder.replaceChildren();
  const choices=shuffleFamily([task.word,...task.options.filter(word=>word!==task.word).slice(0,2)]);
  choices.forEach(word=>{
    const button=paperButton(`選擇${familyWords[word].description}`);button.removeAttribute('title');button.className='paper-picture';button.dataset.word=word;button.append(familyImage(word));button.onclick=()=>answerPaperFamily(word,button);holder.append(button);
  });
  if(selectedStop.number===2)holder.querySelectorAll('img').forEach(image=>paperAnimate(image,[{opacity:0,filter:'brightness(2) saturate(0)'},{opacity:1,filter:'none'}],700));
}
async function answerPaperFamily(word,button){
  if(familyPhase!=='paper-read')return;
  const task=familyRound[familyStep];
  if(word!==task.word){
    document.querySelectorAll('.paper-picture').forEach(node=>node.removeAttribute('aria-invalid'));
    button.setAttribute('aria-invalid','true');paperHint('請再看字詞，選擇相符的圖片。');
    await paperAnimate(button,[{translate:'0'},{translate:'-4px'},{translate:'4px'},{translate:'0'}],260);return;
  }
  familyPhase='paper-celebrating';const token=familyEpoch;stopFamilyAudio();paperHint('');
  document.querySelectorAll('.paper-letter,.paper-picture').forEach(node=>node.disabled=true);
  button.classList.add('paper-correct');
  const collection=document.querySelector(`.paper-evidence-slot[data-word="${word}"]`);
  const image=familyImage(word);collection.replaceChildren(image);
  const from=button.getBoundingClientRect(),to=collection.getBoundingClientRect();
  if(selectedStop.number===2){
    const clip=document.createElement('span');clip.className='paper-clip';collection.append(clip);
    await paperAnimate(clip,[{rotate:'0deg'},{rotate:'-25deg'}],200);if(token!==familyEpoch)return;clip.style.rotate='-25deg';
  }
  const collecting=paperAnimate(image,[{transform:`translate(${from.left+from.width/2-to.left-to.width/2}px,${from.top+from.height/2-to.top-to.height/2}px) scale(${from.width/to.width})`,opacity:1},{transform:'translate(0,0) scale(1)',opacity:1}],selectedStop.number===4?1550:650);
  await Promise.all([collecting,selectedStop.number===4?animatePaperTraffic(paperActiveEnding,token):Promise.resolve()]);
  if(token!==familyEpoch)return;
  if(selectedStop.number===2){
    const clip=collection.querySelector('.paper-clip');await paperAnimate(clip,[{rotate:'-25deg'},{rotate:'0deg'}],200);if(token!==familyEpoch)return;clip.style.rotate='0deg';
  }
  if(selectedStop.number===1){
    const stamp=document.createElement('span');stamp.className='paper-postmark';stamp.textContent='✓';collection.append(stamp);
    await paperAnimate(stamp,[{scale:1.7,opacity:0},{scale:1,opacity:1}],250);if(token!==familyEpoch)return;
  }
  familySolvedWords.add(word);familyPhase='solved';familyUI('paper').dataset.flow='solved';paperProgress();
  if(familyRound.every(item=>familySolvedWords.has(item.word))){resetFamily();finishFamily();return;}
  renderPaperFamilyQuestion();
}
function buildPaperTraffic(root){
  const road=document.createElementNS('http://www.w3.org/2000/svg','svg');road.setAttribute('viewBox','0 0 400 820');road.classList.add('paper-mobile-road');road.innerHTML='<path d="M200 470 Q200 400 135 370 V290 M200 470 Q200 400 265 370 V290" fill="none" stroke="#a8b8bd" stroke-width="58"/><path d="M200 470 Q200 400 135 370 V290 M200 470 Q200 400 265 370 V290" fill="none" stroke="#fffbe5" stroke-width="3" stroke-dasharray="8 10"/>';root.append(road);
  for(let index=0;index<2;index++){
    const gate=document.createElement('div');gate.className=`paper-gate paper-gate-${index}`;gate.dataset.ending=selectedStop.endings[index];
    const light=document.createElement('span');light.className='paper-traffic-light';light.setAttribute('aria-hidden','true');light.innerHTML='<i></i><i></i><i></i>';
    const barrier=document.createElement('span');barrier.className='paper-barrier';barrier.setAttribute('aria-hidden','true');gate.append(light,barrier);root.append(gate);
  }
  const car=document.createElement('div');car.className='paper-driving-car';car.setAttribute('aria-hidden','true');const image=document.createElement('img');image.src='assets/game-style/family-inspector-rear.webp';image.alt='';
  const letter=document.createElement('span');letter.className='paper-car-letter';car.append(image,letter);root.append(car);
}
function resetPaperTraffic(){
  const car=document.querySelector('.paper-driving-car');car.style.left='';car.style.top='';car.style.transform='';car.querySelector('.paper-car-letter').textContent='';
  document.querySelectorAll('.paper-gate').forEach(gate=>gate.classList.remove('paper-open'));
}
async function animatePaperTraffic(ending,token){
  resetPaperTraffic();const index=selectedStop.endings.indexOf(ending),gate=document.querySelector(`.paper-gate-${index}`),car=document.querySelector('.paper-driving-car');
  gate.classList.add('paper-open');
  const opening=paperAnimate(gate.querySelector('.paper-barrier'),[{rotate:'0deg'},{rotate:index?'80deg':'-80deg'}],300);
  const mobile=matchMedia('(max-width:700px)').matches;
  const points=mobile?(index?[[50,57,1],[56,52,.9],[66,45,.72],[66,41,.62]]:[[50,57,1],[44,52,.9],[34,45,.72],[34,41,.62]]):
    (index?[[50,96,1],[65,82,.9],[73,68,.78],[73,59,.65],[73,55,.58]]:[[50,96,1],[35,82,.9],[27,68,.78],[27,59,.65],[27,55,.58]]);
  const frames=points.map(([x,y,scale],i)=>({left:`${x}%`,top:`${y}%`,transform:`translate(-50%,-100%) scale(${scale}) rotate(${i>0&&i<points.length-2?(index?12:-12):0}deg)`}));
  await Promise.all([opening,paperAnimate(car,frames,2000)]);if(token!==familyEpoch)return;
  const last=frames.at(-1);car.style.left=last.left;car.style.top=last.top;car.style.transform=last.transform;
}
