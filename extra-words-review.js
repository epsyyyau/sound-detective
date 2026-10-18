const reviewWords=document.getElementById('review-words');
const reviewBatch=new URLSearchParams(window.location.search).get('batch');
const selectedReviewWords=reviewBatch==='03-04'?SoundWordExtras.filter(record=>['03','04'].includes(record.batch)):SoundWordExtras;
selectedReviewWords.forEach((record,index)=>{
  const article=document.createElement('article');
  article.id=`word-${record.word}`;
  const image=document.createElement('img');image.src=record.picture;image.alt=record.description;
  const title=document.createElement('h2');title.lang='en';title.textContent=record.word;
  const detail=document.createElement('p');detail.textContent=`${index+1}. ${record.description} · 第 ${record.group} 組`;
  const audio=document.createElement('audio');audio.controls=true;audio.preload='metadata';audio.src=record.audio;
  audio.setAttribute('aria-label',`重聽 ${record.word}`);
  audio.addEventListener('play',()=>document.querySelectorAll('audio').forEach(other=>{if(other!==audio)other.pause();}));
  article.append(image,title,detail,audio);reviewWords.append(article);
});
