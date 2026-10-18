// Approved cartoon batch. Keep original files as fallbacks for words not redrawn yet.
const SoundCartoonWords=Object.freeze('cat hat pin pat sit rain sat tap nap sap tin sip tip pan pit tan nip rat map hen pen net ham ram dog log pig fig bug rug cap'.split(' '));
const SoundCartoonWordsV2=Object.freeze('tap mat pet gap lip dig nail seed feed cook hook chip chop dish lap bin dip hug mug jug tug hit can get wet ten men dam jog pail look sing mop top hop pop rip big rail pain weed reed moat lie wish sail boat pie jet jam goat'.split(' '));
const SoundCartoonWordsV3=Object.freeze('look hop ant bag bat bath bed bee blue boil book boot box bun bus car chain chat chick chin cloud coat coin corn cue cup dad den desk fan feet fin fish fog foot fork fox fuel glue hammer hand jeep kick kid king kit leg letter lid load mail man moon moth mouth neck out paint pant point pot pouch quack queen quiz red ring road room run sack see shark shell ship shop sister six snap snip spin spoon stamp star storm sun tail teeth that them thin this tie toad train van vest vet web wig win wing wood wool yak yam yes zip zoo zoom'.split(' '));
const SoundCartoonWordsV4=Object.freeze('lip gap sing den moon sun point queen thin web fin kit big'.split(' '));
const SoundCartoonWordsV5=Object.freeze('zoom star neck mouth chat'.split(' '));
const SoundTransparentWords=new Set([...SoundCartoonWords,...SoundCartoonWordsV2,...SoundCartoonWordsV3,...SoundCartoonWordsV4,...SoundCartoonWordsV5]);
const SoundPictureRevisions=Object.freeze({lap:'assets/pictures/revised/lap-v2.png',tip:'assets/pictures/revised/tip-v2.png'});
function soundWordPicture(word,fallback){
  if(Object.hasOwn(SoundPictureRevisions,word))return SoundPictureRevisions[word];
  if(SoundTransparentWords.has(word))return `assets/pictures/transparent/${word}.png`;
  if(word==='mouth')return 'assets/pictures/cartoon-v5/mouth-v2.png';
  if(SoundCartoonWordsV5.includes(word))return `assets/pictures/cartoon-v5/${word}.png`;
  if(SoundCartoonWordsV4.includes(word))return `assets/pictures/cartoon-v4/${word}.png`;
  if(SoundCartoonWordsV3.includes(word))return `assets/pictures/cartoon-v3/${word}.png`;
  if(SoundCartoonWordsV2.includes(word))return `assets/pictures/cartoon-v2/${word}.png`;
  return SoundCartoonWords.includes(word)?`assets/pictures/cartoon-v1/${word}.png`:fallback;
}
// Shared recorded vocabulary. Group is the earliest taught sound set.
const SoundWordExtras = [
  ['cap',2,'c a p','鴨舌帽'],
  ['mat',2,'m a t','地墊'],
  ['pet',2,'p e t','寵物'],
  ['gap',3,'g a p','空隙'],
  ['lip',3,'l i p','嘴唇'],
  ['dig',3,'d i g','挖土'],
  ['nail',4,'n ai l','鐵釘'],
  ['seed',4,'s ee d','種子'],
  ['feed',4,'f ee d','餵食'],
  ['cook',5,'c oo-short k','煮食'],
  ['hook',5,'h oo-short k','掛鈎'],
  ['chip',6,'ch i p','一條薯條'],
  ['chop',6,'ch o p','切紅蘿蔔'],
  ['dish',6,'d i sh','碟子'],
  ['lap',3,'l a p','膝上位置','03'],
  ['bin',3,'b i n','垃圾桶','03'],
  ['dip',2,'d i p','蘸醬料','03'],
  ['hug',3,'h u g','擁抱','03'],
  ['mug',3,'m u g','有把手的杯子','03'],
  ['jug',4,'j u g','有倒水嘴的水壺','03'],
  ['tug',3,'t u g','拉動繩子','03'],
  ['hit',2,'h i t','用球棒擊球','03'],
  ['can',2,'c a n','金屬罐','03'],
  ['get',3,'g e t','接到物品','03'],
  ['wet',5,'w e t','濕透的衣服','03'],
  ['ten',2,'t e n','十個蘋果','03'],
  ['men',2,'m e n','多名成年男性','03'],
  ['dam',2,'d a m','水壩','03'],
  ['jog',4,'j o g','慢跑','03'],
  ['pail',4,'p ai l','有提把的水桶','03'],
  ['look',5,'l oo-short k','注視','03'],
  ['sing',5,'s i ng','唱歌','03'],
  ['mop',3,'m o p','地拖','03'],
  ['top',3,'t o p','陀螺','03'],
  ['hop',3,'h o p','單腳跳','03'],
  ['pop',3,'p o p','氣球爆破','03'],
  ['rip',2,'r i p','撕開紙張','04'],
  ['big',3,'b i g','較大的物件','04'],
  ['rail',4,'r ai l','鐵路軌道','04'],
  ['pain',4,'p ai n','膝蓋疼痛','04'],
  ['weed',5,'w ee d','拔除雜草','04'],
  ['reed',4,'r ee d','水邊的蘆葦','04'],
  ['moat',4,'m oa t','護城河','04'],
  ['lie',4,'l ie','清醒地躺下','04'],
  ['wish',6,'w i sh','許願','04'],
].map(([word,group,sounds,description,batch='01'])=>Object.freeze({
  word,group,segments:sounds.split(' '),description,batch,
  audio:`assets/word-audio/real/group-${group}/${word}.m4a?v=${['dam','rail'].includes(word)?'20261011-rerecorded':`20261010-extra-${batch}`}`,
  picture:soundWordPicture(word,`assets/pictures/word-families-extra/${word}.png`),
}));
