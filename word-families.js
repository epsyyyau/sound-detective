const familyWords = {
  sat:{picture:'第二套真字/sat.png',description:'坐在椅子上'},
  pat:{picture:'輕量版words/pat.jpg',description:'輕拍膊頭'},
  tap:{picture:'輕量版words/tap.jpg',description:'輕點一下'},
  nap:{picture:'輕量版words/nap.jpg',description:'小睡'},
  sap:{picture:'第二套真字/sap.png',description:'樹液'},
  pin:{picture:'輕量版words/pin.jpg',description:'圖釘'},
  tin:{picture:'挑戰版words/tin.jpg',description:'金屬罐'},
  sip:{picture:'挑戰版words/sip.jpg',description:'小口喝水'},
  tip:{picture:'輕量版words/tip.jpg',description:'鉛筆尖'},
};
const existingFamilyWords = [
  [1,'輕量版words','jpg',[['sit','坐下'],['pan','平底鍋']]],
  [1,'第二套真字','png',[['pit','坑洞'],['tan','曬黑'],['nip','輕咬']]],
  [2,'輕量版words','jpg',[['cat','貓'],['hat','帽子'],['rat','老鼠'],['map','地圖'],['hen','母雞'],['pen','筆']]],
  [2,'第二套真字','png',[['net','網'],['ham','火腿'],['ram','公羊']]],
  [3,'輕量版words','jpg',[['dog','狗']]],
  [3,'挑戰版words','jpg',[['log','木頭']]],
  [3,'第二套真字','png',[['pig','豬'],['fig','無花果'],['bug','小蟲'],['rug','地毯']]],
  [4,'輕量版words','jpg',[['sail','帆'],['boat','小船'],['pie','批'],['jet','噴射飛機'],['jam','果醬'],['rain','下雨']]],
  [4,'挑戰版words','jpg',[['goat','山羊'],['tie','領帶']]],
  [4,'第二套真字','png',[[
    'mail','郵件'
  ],[
    'tail','尾巴'
  ],[
    'coat','大衣'
  ],[
    'road','道路'
  ],[
    'train','火車'
  ],[
    'chain','鏈條'
  ],[
    'toad','蟾蜍'
  ],[
    'load','裝載物'
  ]]],
  [5,'輕量版words','jpg',[['book','書'],['ring','戒指'],['king','國王'],['zip','拉鏈']]],
  [5,'第二套真字','png',[['wing','翅膀'],['wig','假髮'],['vet','獸醫']]],
  [6,'輕量版words','jpg',[['ship','大船'],['chin','下巴'],['thin','薄']]],
  [6,'挑戰版words','jpg',[['fish','魚']]],
  [6,'第二套真字','png',[['shop','商店']]],
];
Object.values(familyWords).forEach(record=>record.group=1);
existingFamilyWords.forEach(([group,folder,extension,words])=>words.forEach(([word,description])=>{
  familyWords[word]={group,picture:`${folder}/${word}.${extension}`,description};
}));
SoundWordExtras.forEach(record=>{
  familyWords[record.word]={...record,picture:`word-families-extra/${record.word}.png`};
});
const familyGroups = [
  [['at','sat pat'],['ap','tap nap sap'],['in','pin tin'],['ip','sip tip nip'],['it','sit pit'],['an','pan tan']],
  [['at','cat hat rat mat'],['ap','map cap tap nap'],['ip','dip rip'],['it','hit'],['an','can'],['et','pet net'],['en','hen pen ten men'],['am','ham ram dam']],
  [['ap','gap cap map lap'],['in','bin'],['ip','lip sip tip'],['ig','dig pig fig big'],['ug','bug rug hug mug tug'],['og','dog log'],['et','get'],['op','mop top hop pop']],
  [['ail','nail mail tail sail pail rail'],['ain','train chain rain pain'],['eed','seed feed reed'],['oat','coat boat goat moat'],['oad','road toad load'],['ie','pie tie lie'],['ug','jug'],['og','jog'],['et','jet'],['am','jam']],
  [['ook','book cook hook look'],['ing','ring king wing sing'],['ig','wig pig fig dig'],['et','vet pet net wet'],['eed','weed']],
  [['ip','chip ship sip zip'],['op','chop shop'],['ish','dish fish wish'],['in','chin thin pin']],
].map(families=>families.map(([ending,words])=>({ending,words:words.split(' ')})));
const familyPicture = word => soundWordPicture(word,`assets/pictures/${familyWords[word].picture}`);
const familyAudio = word => familyWords[word].audio||`assets/word-audio/real/group-${familyWords[word].group}/${word}.m4a?v=20261011-rerecorded`;
// Teaching groups remain asset metadata; the game is organised by shared endings.
const familyCatalog = [];
familyGroups.flat().forEach(({ending,words})=>{
  let family=familyCatalog.find(item=>item.ending===ending);
  if(!family){family={ending,words:[]};familyCatalog.push(family);}
  words.forEach(word=>{if(!family.words.includes(word))family.words.push(word);});
});
const firstFamilyEndings=['at','ap','in','ip','ig','ug'];
familyCatalog.sort((a,b)=>{
  const rank=ending=>firstFamilyEndings.includes(ending)?firstFamilyEndings.indexOf(ending):firstFamilyEndings.length;
  return rank(a.ending)-rank(b.ending);
});
const familyExamples={
  at:['cat','hat'],ap:['cap','map'],in:['pin','tin'],ip:['lip','sip'],ig:['pig','fig'],ug:['bug','rug'],
  it:['sit','pit'],an:['pan','tan'],et:['pet','net'],en:['hen','pen'],am:['ham','ram'],
  og:['dog','log'],op:['mop','top'],ail:['nail','mail'],ain:['train','chain'],eed:['seed','feed'],
  oat:['coat','boat'],oad:['road','toad'],ie:['pie','tie'],ook:['book','cook'],ing:['ring','king'],ish:['dish','fish'],
};
const familyPageSize=11;
// User recordings, split in the supplied west/east order; never substitute word clips.
const familyEndingRecordings=Object.fromEntries([
  'at','ap','in','ip','ig','ug','it','an','et','en','am',
  'og','op','ail','ain','eed','oat','oad','ie','ook','ing','ish',
].map(ending=>[ending,`assets/word-audio/family-endings/${ending}.m4a`]));
const familyTownRoofFilters=['none','hue-rotate(-25deg) saturate(.8)','hue-rotate(175deg) saturate(.65)','hue-rotate(70deg) saturate(.55)','hue-rotate(200deg) saturate(.65)','hue-rotate(-8deg) saturate(.8)'];
const familyRoof=ending=>familyCatalog.findIndex(family=>family.ending===ending)%6+1;
const familyStops=[
  {number:1,endings:['at','ap'],hit:{x:250,y:580,w:365,h:185},sign:{x:255,y:635,w:82,h:125},point:{x:440,y:795}},
  {number:2,endings:['in','ip'],hit:{x:745,y:580,w:350,h:185},sign:{x:755,y:635,w:82,h:125},point:{x:930,y:804}},
  {number:3,endings:['ig','ug'],hit:{x:1190,y:580,w:380,h:185},sign:{x:1200,y:635,w:82,h:125},point:{x:1395,y:807}},
  {number:4,endings:['it','an'],hit:{x:1275,y:175,w:335,h:185},sign:{x:1280,y:220,w:82,h:130},point:{x:1430,y:399}},
  {number:5,endings:['et','en'],hit:{x:880,y:155,w:315,h:180},sign:{x:885,y:195,w:82,h:130},point:{x:1065,y:365}},
  {number:6,endings:['am','og'],hit:{x:485,y:165,w:315,h:185},sign:{x:490,y:210,w:82,h:130},point:{x:665,y:395}},
  {number:7,endings:['ail','ain'],hit:{x:115,y:115,w:320,h:180},sign:{x:120,y:160,w:82,h:125},point:{x:250,y:310}},
];
function shuffleFamily(items, random=Math.random) {
  const copy=[...items];
  for(let i=copy.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}
  return copy;
}
function buildFamilyRound(family, random=Math.random) {
  const words=family.ending==='at'?['rat','cat','pat','sat']:shuffleFamily(family.words,random).slice(0,4);
  return words.map(word=>({word,options:buildFamilyOptions(word,family,random)}));
}
function buildFamilyOptions(word,family,random=Math.random){
  // Prefer contrasts within the family, then fill from recorded vocabulary.
  const concept=value=>['sat','sit'].includes(value)?'sit':['can','tin'].includes(value)?'tin':['cat','pat'].includes(value)?'cat':value;
  const choices=[word],seen=new Set([concept(word)]);
  const maxGroup=Math.max(...family.words.map(value=>familyWords[value].group));
  const others=shuffleFamily(Object.keys(familyWords).filter(value=>familyWords[value].group<=maxGroup&&!family.words.includes(value)),random);
  for(const other of [...shuffleFamily(family.words.filter(value=>value!==word),random),...others]){
    if(seen.has(concept(other)))continue;
    seen.add(concept(other));choices.push(other);
    if(choices.length===4)break;
  }
  return shuffleFamily(choices,random);
}
function buildStopRound(stop,random=Math.random){
  return stop.endings.flatMap(ending=>{
    const family=familyCatalog.find(item=>item.ending===ending);
    return buildFamilyRound(family,random).slice(0,4).map(task=>({...task,ending}));
  });
}
function nextFamilyTaskIndex(round,solved,ending){
  const sameFamily=round.findIndex(task=>task.ending===ending&&!solved.has(task.word));
  return sameFamily>=0?sameFamily:round.findIndex(task=>!solved.has(task.word));
}
const familyUI = id => document.getElementById(`family-${id}`);
const familyReduced = matchMedia('(prefers-reduced-motion: reduce)');
let familyRound=[], familyStep=0, familyPhase='setup', familyEpoch=0, familyPage=0;
let selectedFamily=familyCatalog[0],selectedStop=null;
let familyTownHouse=null;
const familySolvedWords=new Set();
let familyDrag=null;
let familyPlayer=null, cancelFamilyAudio=null;
const familyMapMobile=matchMedia('(max-width:700px), (max-width:1000px) and (orientation:portrait)');
let familyMapPath=familyUI(familyMapMobile.matches?'mobile-path':'map-path');
let familyMapLength=familyMapPath.getTotalLength();
const familyCoverRegions=[[60,495,500,280],[680,510,410,260],[1110,475,490,320],[1330,180,290,200],[940,145,350,240],[520,135,380,250],[40,105,470,215]];
const familyCoverPositions=[[4,0],[54,0],[54,24],[4,24],[4,48],[54,48],[4,72]];
const familyCoverNames=['字族郵局','線索照相館','碼頭查貨','聽聲交通站','字族圖書館','招牌修復工房','字族連接橋'];
const familyCoverCaptions=[[350,765],[870,770],[1480,774],[1430,375],[1090,370],[700,369],[355,287]];
const familyCompletedStops=new Set();
let familyMapArmed=false,trainDistance=0,trainFrame=null,trainResolve=null;
let familyStopButtons=[];
function nearestTrainDistance({x,y}){
  let best=0,score=Infinity;
  for(let step=0;step<=800;step++){
    const distance=familyMapLength*step/800,point=familyMapPath.getPointAtLength(distance);
    const nextScore=(point.x-x)**2+(point.y-y)**2;
    if(nextScore<score){best=distance;score=nextScore;}
  }
  return best;
}
function coverStopPoint(stop){
  if(!familyMapMobile.matches)return stop.point;
  const [x,y]=familyCoverPositions[stop.number-1];return {x:(x+21)*4,y:(y+21)*10};
}
let familyStopDistances=familyStops.map(stop=>nearestTrainDistance(coverStopPoint(stop)));
function setTrainDistance(distance,direction=1){
  trainDistance=distance;
  const point=familyMapPath.getPointAtLength(distance);
  const next=familyMapPath.getPointAtLength(Math.max(0,Math.min(familyMapLength,distance+direction*8)));
  const train=familyUI('train');
  train.style.left=`${point.x/(familyMapMobile.matches?400:1672)*100}%`;
  train.style.top=`${point.y/(familyMapMobile.matches?1000:941)*100}%`;
  if(Math.abs(next.x-point.x)>0.5)train.style.setProperty('--train-facing',next.x<point.x?-1:1);
}
function cancelTrainMove(){
  if(trainFrame!==null)cancelAnimationFrame(trainFrame);
  trainFrame=null;
  if(trainResolve){trainResolve(false);trainResolve=null;}
}
function moveTrainTo(number){
  cancelTrainMove();
  const target=number===0?0:familyStopDistances[number-1],from=trainDistance;
  if(familyReduced.matches||Math.abs(target-from)<1){setTrainDistance(target);return Promise.resolve(true);}
  const direction=target>=from?1:-1;
  const duration=Math.min(2100,Math.max(600,Math.abs(target-from)*0.85));
  return new Promise(resolve=>{
    trainResolve=resolve;
    let startTime=null;
    const tick=time=>{
      if(startTime===null)startTime=time;
      const progress=Math.min(1,(time-startTime)/duration);
      const eased=progress<0.5?2*progress*progress:1-(-2*progress+2)**2/2;
      setTrainDistance(from+(target-from)*eased,direction);
      if(progress<1){trainFrame=requestAnimationFrame(tick);return;}
      trainFrame=null;trainResolve=null;resolve(true);
    };
    trainFrame=requestAnimationFrame(tick);
  });
}
function setMapReady(ready){
  familyMapArmed=ready;
  familyUI('map').classList.toggle('is-armed',ready);
  familyStopButtons.forEach(button=>button.disabled=!ready);
}
function updateStopLabels(){
  familyStopButtons.forEach((button,index)=>{
    const stop=familyStops[index],completed=familyCompletedStops.has(stop.number);
    button.setAttribute('aria-label',`第 ${stop.number} 站：${stop.endings.join('、')} 字族${completed?'，已完成':''}`);
    button.classList.toggle('is-complete',completed);
  });
}
function renderMapStops(){
  const holder=familyUI('stops');holder.replaceChildren();
  familyStopButtons=familyStops.map(stop=>{
    const button=document.createElement('button');button.type='button';button.className='family-stop';button.dataset.soundGroup=stop.number;
    const index=stop.number-1,[x,y,w,h]=familyCoverRegions[index];
    button.style.left=`${x/1672*100}%`;button.style.top=`${y/941*100}%`;
    button.style.width=`${w/1672*100}%`;button.style.height=`${h/941*100}%`;
    button.style.setProperty('--mobile-x',`${familyCoverPositions[index][0]}%`);button.style.setProperty('--mobile-y',`${familyCoverPositions[index][1]}%`);
    button.style.setProperty('--sign-delay',`${index*.13}s`);
    const crop=document.createElement('span');crop.className='family-cover-landmark';crop.setAttribute('aria-hidden','true');
    const art=document.createElement('img');art.src='assets/family-map/paper-town-cover.png';art.alt='';
    Object.assign(art.style,{width:`${1672/w*100}%`,height:`${941/h*100}%`,left:`${-x/w*100}%`,top:`${-y/h*100}%`});crop.append(art);button.append(crop);
    const sign=document.createElement('span');sign.className='family-stop-sign';sign.setAttribute('aria-hidden','true');
    const number=document.createElement('strong');number.className='family-stop-number';number.textContent=stop.number;
    sign.append(number);button.append(sign);
    const caption=document.createElement('span');caption.className='family-cover-caption';caption.textContent=familyCoverNames[index];
    const [captionX,captionY]=familyCoverCaptions[index];caption.style.left=`${(captionX-x)/w*100}%`;caption.style.top=`${(captionY-y)/h*100}%`;button.append(caption);
    button.onclick=()=>openFamilyStop(stop);
    holder.append(button);return button;
  });
  updateStopLabels();
}
async function openFamilyStop(stop){
  if(!familyMapArmed||trainResolve)return;
  setMapReady(false);familyUI('train').disabled=true;familyUI('startover').disabled=true;
  familyUI('map-status').textContent=`前往第 ${stop.number} 站。`;
  if(matchMedia('(max-width:600px) and (orientation:portrait)').matches){
    familyUI('train').disabled=false;familyUI('startover').disabled=false;
    startStop(stop);
    return;
  }
  const arrived=await moveTrainTo(stop.number);
  familyUI('train').disabled=false;familyUI('startover').disabled=false;
  if(!arrived)return;
  startStop(stop);
}
function stopFamilyAudio(){
  if(cancelFamilyAudio)cancelFamilyAudio(false);
  if(familyPlayer)familyPlayer.pause();
  familyPlayer=null;
}
function playFamilyWord(word,status=familyUI('audio-status')){
  return playFamilyAudio(familyAudio(word),status);
}
function playFamilyAudio(path,status){
  stopFamilyAudio();status.textContent='';
  return new Promise(resolve=>{
    const audio=new Audio(path);familyPlayer=audio;let done=false;
    const finish=ok=>{if(done)return;done=true;clearTimeout(timer);audio.pause();if(familyPlayer===audio)familyPlayer=null;if(cancelFamilyAudio===finish)cancelFamilyAudio=null;resolve(ok);};
    const fail=()=>{if(done)return;status.textContent='暫時未能播放，請再試一次。';finish(false);};
    const timer=setTimeout(fail,15000);cancelFamilyAudio=finish;
    audio.onended=()=>finish(true);audio.onerror=fail;audio.play().catch(fail);
  });
}
function resetFamily(){
  familyEpoch++;stopFamilyAudio();
  if(typeof resetPaperFamily==='function')resetPaperFamily();
  clearFamilyDrag();
  familyUI('onsets').querySelectorAll('button').forEach(button=>button.classList.remove('needs-join'));
  familyUI('game').getAnimations({subtree:true}).forEach(animation=>animation.cancel());
}
function showFamilyView(view){['map','game','complete'].forEach(id=>familyUI(id).hidden=id!==view);}
function returnToMap(){
  cancelTrainMove();resetFamily();familyPhase='map';setMapReady(true);showFamilyView('map');
  familyUI('map-status').textContent=selectedStop?`聲探調查車停在第 ${selectedStop.number} 站。`:'聲探調查車停在起點。';
  updateStopLabels();familyUI('map-title').focus();
}
function setFamilyNavigation(onMap){
  ['back','choose'].forEach(id=>{
    const button=familyUI(id),image=document.createElement('img');
    image.src=id==='choose'||onMap?'assets/game-style/family-paper-return.png':'assets/icons/house-plus.svg';
    image.alt='';image.setAttribute('aria-hidden','true');button.replaceChildren(image);
    const label=id==='choose'?'返回物換「聲」移首頁':onMap?'返回物換「聲」移封面':'選擇字族';
    button.setAttribute('aria-label',label);button.title=label;
    button.classList.toggle('is-catalog-action',!onMap&&id==='back');
  });
}
function startStop(stop){
  resetFamily();selectedStop=stop;selectedFamily=familyCatalog.find(family=>family.ending===stop.endings[0]);
  familyRound=buildStopRound(stop);familyStep=0;
  familySolvedWords.clear();familyUI('onsets').dataset.ending='';
  setFamilyNavigation(true);
  showFamilyView('game');renderFamilyQuestion();
}
function familyImage(word){
  const image=document.createElement('img');image.src=familyPicture(word);image.alt=familyWords[word].description;
  image.onerror=()=>{image.hidden=true;image.parentElement.setAttribute('aria-label',familyWords[word].description);const label=document.createElement('span');label.textContent=familyWords[word].description;image.parentElement.append(label);};
  return image;
}
function updateFamilyProgress(task){
  const completed=familyRound.filter(item=>familySolvedWords.has(item.word)).length;
  const progress=familyUI('progress');
  progress.innerHTML=`<span class="family-progress-station"><img src="assets/home-red-dimensional.png" alt="" aria-hidden="true">${selectedStop?selectedStop.number:''}</span><span class="family-progress-ending" lang="en">${task.ending}</span><span class="family-progress-count">${completed}/${familyRound.length}</span>`;
  progress.setAttribute('aria-label',`${selectedStop?`第 ${selectedStop.number} 站，`:''}${task.ending} 字族，已完成 ${completed} 題，共 ${familyRound.length} 題`);
}
function renderFamilyQuestion(){
  const paper=!!selectedStop;
  familyUI('game').classList.toggle('is-paper-family',!!paper);
  familyUI('paper').hidden=!paper;
  if(paper){renderPaperFamilyQuestion();return;}
  familyPhase='join';
  const task=familyRound[familyStep];
  const tasks=familyRound.filter(item=>item.ending===task.ending);
  updateFamilyProgress(task);
  document.querySelector('.family-stage').dataset.soundGroup=String(familyRoof(task.ending));
  document.querySelector('.family-stage').setAttribute('aria-label',`${task.ending} 字族小屋`);
  familyUI('prompt').textContent='';
  familyUI('feedback').textContent='';familyUI('audio-status').textContent='';
  familyUI('ending').textContent=task.ending;
  const onset=familyUI('onset');onset.textContent='';onset.hidden=true;
  renderFamilyOnsets(tasks,task.ending);
  familyUI('resident').hidden=true;
  familyUI('next').hidden=true;
  familyUI('listen').hidden=true;
  const pictures=familyUI('pictures');pictures.hidden=true;pictures.replaceChildren();
  familyUI('onsets').querySelector('button:not(:disabled)')?.focus({preventScroll:true});
}
function renderFamilyOnsets(tasks,ending){
  const holder=familyUI('onsets');
  if(holder.dataset.ending!==ending){
    holder.replaceChildren();holder.dataset.ending=ending;
    tasks.forEach(task=>{
      const firstSound=task.word.slice(0,-ending.length);
      const button=document.createElement('button');button.type='button';button.className='family-onset-card';button.dataset.word=task.word;button.lang='en';
      button.textContent=firstSound;button.setAttribute('aria-label',`拼上字頭 ${firstSound}`);
      attachFamilyCard(button,task.word);holder.append(button);
    });
  }
  holder.querySelectorAll('button').forEach(button=>{
    const solved=familySolvedWords.has(button.dataset.word);
    button.disabled=solved;button.classList.toggle('is-complete',solved);button.classList.remove('is-selected');button.classList.toggle('needs-join',!solved);
    button.setAttribute('aria-label',`${solved?'已完成':'拼上'}字頭 ${button.textContent}`);
  });
}
function renderFamilyPictures(task){
  const pictures=familyUI('pictures');pictures.replaceChildren();
  task.options.forEach(word=>{
    const button=document.createElement('button');button.type='button';button.dataset.word=word;
    button.setAttribute('aria-label',`選擇${familyWords[word].description}`);button.append(familyImage(word));
    button.onclick=()=>answerFamily(word,button);pictures.append(button);
  });
}
function clearFamilyDrag(){
  if(!familyDrag)return;
  const {button,pointerId,ghost}=familyDrag;
  familyDrag=null;
  if(button.hasPointerCapture(pointerId))button.releasePointerCapture(pointerId);
  ghost?.remove();
  document.querySelector('.family-stage').classList.remove('is-drop-target');
}
function attachFamilyCard(button,word){
  let suppressClick=false;
  button.onclick=event=>{if(suppressClick&&event.detail!==0){suppressClick=false;return;}suppressClick=false;joinFamilyWord(word,button);};
  button.onpointerdown=event=>{
    if(familyPhase!=='join'||button.disabled||event.button!==0||familyDrag)return;
    suppressClick=false;
    familyDrag={button,word,pointerId:event.pointerId,x:event.clientX,y:event.clientY,ghost:null};
    button.setPointerCapture(event.pointerId);
  };
  button.onpointermove=event=>{
    const drag=familyDrag;if(!drag||drag.button!==button||drag.pointerId!==event.pointerId)return;
    if(!drag.ghost&&Math.hypot(event.clientX-drag.x,event.clientY-drag.y)<8)return;
    if(!drag.ghost){
      drag.ghost=document.createElement('span');drag.ghost.className='family-drag-ghost';drag.ghost.textContent=button.textContent;drag.ghost.setAttribute('aria-hidden','true');document.body.append(drag.ghost);
    }
    event.preventDefault();drag.ghost.style.left=`${event.clientX}px`;drag.ghost.style.top=`${event.clientY}px`;
    document.querySelector('.family-stage').classList.toggle('is-drop-target',insideFamilyHouse(event.clientX,event.clientY));
  };
  button.onpointerup=event=>{
    const drag=familyDrag;if(!drag||drag.button!==button||drag.pointerId!==event.pointerId)return;
    const moved=!!drag.ghost,accepted=moved&&insideFamilyHouse(event.clientX,event.clientY);
    suppressClick=moved;clearFamilyDrag();
    if(accepted)joinFamilyWord(word,button);
  };
  button.onpointercancel=()=>clearFamilyDrag();
  button.onlostpointercapture=()=>{if(familyDrag?.button===button)clearFamilyDrag();};
}
function insideFamilyHouse(x,y){
  const rect=document.querySelector('.family-stage').getBoundingClientRect();
  return x>=rect.left&&x<=rect.right&&y>=rect.top&&y<=rect.bottom;
}
async function joinFamilyWord(word,button){
  if(familyPhase!=='join')return;
  const ending=familyUI('ending').textContent;
  const index=familyRound.findIndex(task=>task.word===word&&task.ending===ending);
  if(index<0||familySolvedWords.has(word)||button.disabled)return;
  familyStep=index;familyPhase='joining';const token=familyEpoch,onset=familyUI('onset');
  const from=button.getBoundingClientRect();
  familyUI('onsets').querySelectorAll('button').forEach(card=>{card.disabled=true;card.classList.remove('needs-join');});
  button.classList.add('is-selected');onset.textContent=word.slice(0,-ending.length);onset.hidden=false;
  const to=onset.getBoundingClientRect();
  if(!familyReduced.matches)await onset.animate([{transform:`translate(${from.left+from.width/2-to.left-to.width/2}px,${from.top+from.height/2-to.top-to.height/2}px) scale(1.2)`},{transform:'translate(0,0) scale(1)'}],{duration:500,easing:'ease-in-out'}).finished.catch(()=>{});
  if(token!==familyEpoch)return;
  familyPhase='read';renderFamilyPictures(familyRound[familyStep]);
  familyUI('prompt').textContent='找出圖片線索。';
  familyUI('pictures').hidden=false;familyUI('listen').hidden=false;familyUI('prompt').focus({preventScroll:true});
}
async function answerFamily(word,button){
  if(familyPhase!=='read')return;
  const task=familyRound[familyStep];
  familyUI('pictures').querySelectorAll('button').forEach(option=>{option.classList.remove('incorrect');option.removeAttribute('aria-invalid');});
  if(word!==task.word){
    // Restart the visual cue when the same picture is selected again.
    void button.offsetWidth;
    button.classList.add('incorrect');button.setAttribute('aria-invalid','true');
    familyUI('feedback').textContent='';return;
  }
  familyPhase='celebrating';stopFamilyAudio();const token=familyEpoch;
  familyUI('pictures').querySelectorAll('button').forEach(option=>option.disabled=true);
  button.classList.add('correct');familyUI('prompt').textContent='';familyUI('feedback').textContent='';
  const resident=familyUI('resident');resident.src=familyPicture(word);resident.alt=familyWords[word].description;resident.hidden=false;
  if(!familyReduced.matches){
    const from=button.querySelector('img').getBoundingClientRect(),to=resident.getBoundingClientRect();
    const dx=from.left+from.width/2-to.left-to.width/2,dy=from.top+from.height/2-to.top-to.height/2;
    await resident.animate([{transform:`translateX(-50%) translate(${dx}px,${dy}px) scale(1.5)`},{transform:'translateX(-50%)'}],{duration:550,easing:'ease-out'}).finished.catch(()=>{});
  }
  if(token!==familyEpoch)return;
  familySolvedWords.add(word);familyPhase='solved';
  const card=familyUI('onsets').querySelector(`[data-word="${word}"]`);
  card.classList.add('is-complete');card.classList.remove('is-selected');
  card.setAttribute('aria-label',`已完成字頭 ${card.textContent}`);
  updateFamilyProgress(task);
  const remaining=familyRound.filter(item=>item.ending===task.ending&&!familySolvedWords.has(item.word));
  const hasAnotherFamily=familyRound.some(item=>!familySolvedWords.has(item.word));
  const nextLabel=remaining.length?'下一題':hasAnotherFamily?'下一字族':'完成';
  familyUI('next').setAttribute('aria-label',nextLabel);familyUI('next').title=nextLabel;
  familyUI('next').querySelector('img').src=hasAnotherFamily?'assets/icons/arrow-right.svg':'assets/icons/check.svg';
  familyUI('next').hidden=false;
  playFamilyWord(word);familyUI('next').focus({preventScroll:true});
}
function finishFamily(skipped=false){
  familyPhase='complete';showFamilyView('complete');
  familyUI('complete').dataset.soundGroup=selectedStop?.number || '';
  if(selectedStop){
    if(!skipped)familyCompletedStops.add(selectedStop.number);
    familyUI('complete-title').textContent=skipped?'本站字詞總覽':'本站線索已集齊！';
  }else{
    familyUI('complete-title').textContent=skipped?'字族字詞總覽':'字族線索已集齊！';
  }
  familyUI('complete-title').setAttribute('aria-label',`${selectedStop?`第 ${selectedStop.number} 站`:`${selectedFamily.ending} 字族`}，${skipped?'字詞總覽':'線索已集齊'}，共 ${familyRound.length} 個字詞`);
  familyUI('review-status').textContent='';const collection=familyUI('collection');collection.replaceChildren();
  const rows=Array.from({length:Math.min(2,familyRound.length)},()=>{
    const row=document.createElement('div');row.className='family-collection-row';collection.append(row);return row;
  });
  const firstRowCount=Math.ceil(familyRound.length/2);
  familyRound.forEach(({word,ending:wordEnding},index)=>{
    const button=document.createElement('button');button.setAttribute('aria-label',`重聽 ${word}`);button.title=`重聽 ${word}`;
    button.append(familyImage(word));const label=document.createElement('span');label.className='collection-word';label.lang='en';
    const onset=document.createElement('span');onset.textContent=word.slice(0,-wordEnding.length);const ending=document.createElement('span');ending.className='collection-ending';ending.textContent=wordEnding;
    label.append(onset,ending);button.append(label);button.onclick=()=>playFamilyWord(word,familyUI('review-status'));rows[index<firstRowCount?0:1].append(button);
  });
  familyUI('complete-title').focus();
}
renderMapStops();setTrainDistance(0);setMapReady(true);
familyUI('startover').onclick=async()=>{
  if(trainResolve)return;
  setMapReady(false);familyUI('train').disabled=true;familyUI('startover').disabled=true;
  familyUI('map-status').textContent='聲探調查車返回起點。';
  const returned=await moveTrainTo(0);
  familyUI('train').disabled=false;familyUI('startover').disabled=false;
  if(!returned)return;
  selectedStop=null;familyCompletedStops.clear();updateStopLabels();
  setMapReady(true);familyUI('map-status').textContent='聲探調查車已返回起點。';familyStopButtons[0].focus({preventScroll:true});
};
familyUI('listen').onclick=()=>{if(['read','solved'].includes(familyPhase))playFamilyWord(familyRound[familyStep].word);};
function skipFamilyRound(){if(familyUI('game').hidden)return;resetFamily();finishFamily(true);}
familyUI('skip').onclick=skipFamilyRound;
familyUI('next').onclick=()=>{
  if(familyPhase!=='solved')return;
  const ending=familyRound[familyStep].ending;resetFamily();
  const next=nextFamilyTaskIndex(familyRound,familySolvedWords,ending);
  if(next<0){finishFamily();return;}
  familyStep=next;renderFamilyQuestion();
};
const returnToSelection=returnToMap;
familyUI('back').onclick=returnToSelection;familyUI('choose').onclick=returnToMap;
familyUI('again').onclick=()=>startStop(selectedStop);
window.addEventListener('pagehide',()=>{cancelTrainMove();resetFamily();});
window.addEventListener('pageshow',event=>{
  if(!event.persisted)return;
  if(!familyUI('game').hidden){resetFamily();if(familyPhase!=='solved')renderFamilyQuestion();}
  if(!familyUI('map').hidden){familyUI('train').disabled=false;familyUI('startover').disabled=false;setMapReady(true);}
});
familyMapMobile.addEventListener('change',()=>{
  cancelTrainMove();familyMapPath=familyUI(familyMapMobile.matches?'mobile-path':'map-path');familyMapLength=familyMapPath.getTotalLength();
  familyStopDistances=familyStops.map(stop=>nearestTrainDistance(coverStopPoint(stop)));
  setTrainDistance(selectedStop?familyStopDistances[selectedStop.number-1]:0);
  familyUI('startover').disabled=false;setMapReady(true);
});
