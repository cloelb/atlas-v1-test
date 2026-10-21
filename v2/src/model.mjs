/** Logique métier indépendante du DOM et du stockage. */
export const TERRITORIES = Object.freeze([
  { id:'autonomie', name:'Autonomie', symbol:'⌂', subtitle:'Choisir et bâtir ma liberté', question:'De quoi ai-je besoin pour décider de ma vie ?' },
  { id:'corps', name:'Corps', symbol:'✺', subtitle:'Bouger, ressentir, découvrir', question:'Qu’est-ce que mon corps peut apprendre ?' },
  { id:'esprit', name:'Esprit', symbol:'✧', subtitle:'Lire, apprendre, comprendre', question:'Comment mieux penser et me connaître ?' },
  { id:'savoir-faire', name:'Savoir-faire', symbol:'❦', subtitle:'Créer de mes propres mains', question:'Que puis-je apprendre à faire par moi-même ?' }
]);
export const makeId=()=>globalThis.crypto?.randomUUID?.() || 'a-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
export const emptyAtlas=()=>({version:2,cap:'',capNote:'',missions:[],journal:[],events:[],updatedAt:null});
export const iso=()=>new Date().toISOString();
export function normalizedAtlas(input){
 const base=emptyAtlas();
 if(!input || typeof input!=='object')return base;
 return {...base,cap:typeof input.cap==='string'?input.cap:'',capNote:typeof input.capNote==='string'?input.capNote:'',missions:Array.isArray(input.missions)?input.missions.filter(m=>m&&Array.isArray(m.steps)):[],journal:Array.isArray(input.journal)?input.journal:[],events:Array.isArray(input.events)?input.events:[],updatedAt:input.updatedAt||null};
}
export function createMission({title,reason,territory,mode,steps}){
 if(typeof title!=='string'||title.trim().length<3||title.trim().length>100)throw Error('Donne un titre de 3 à 100 caractères.');
 if(!TERRITORIES.some(t=>t.id===territory))throw Error('Choisis un Territoire.');
 if(!['guided','free'].includes(mode))throw Error('Choisis un chemin guidé ou libre.');
 const items=(steps||[]).map(s=>typeof s==='string'?s.trim():'').filter(Boolean);
 if(!items.length || items.length>30)throw Error('Ajoute de 1 à 30 Étapes.');
 return {id:makeId(),title:title.trim(),reason:String(reason||'').trim().slice(0,1200),territory,mode,createdAt:iso(),completedAt:null,steps:items.map((text,index)=>({id:makeId(),text,order:index,doneAt:null}))};
}
export const progress=m=>({done:m.steps.filter(s=>Boolean(s.doneAt)).length,total:m.steps.length});
export const isUnlocked=(mission,index)=>mission.mode==='free'||index===0||Boolean(mission.steps[index-1]?.doneAt);
export const currentStepIndex=mission=>mission.steps.findIndex(s=>!s.doneAt);
/** Pure function: returns a new atlas, never modifies original. Requires confirmation before reset of later steps. */
export function markStep(atlas,missionId,stepId,done,allowResetFollowing=false,date=iso()){
 const data=structuredClone(normalizedAtlas(atlas));
 const mission=data.missions.find(m=>m.id===missionId);if(!mission)throw Error('Mission introuvable.');
 const index=mission.steps.findIndex(s=>s.id===stepId);if(index<0)throw Error('Étape introuvable.');
 const step=mission.steps[index];const previous=Boolean(step.doneAt);
 if(done && !isUnlocked(mission,index))throw Error('Cette Étape est encore verrouillée.');
 if(previous===done)return data; // idempotence, aucun double événement
 const later=mission.steps.slice(index+1).filter(s=>s.doneAt);
 if(!done && mission.mode==='guided' && later.length && !allowResetFollowing)throw Error('CONFIRM_RESET_FOLLOWING');
 step.doneAt=done?date:null;
 if(!done && mission.mode==='guided'){for(const s of mission.steps.slice(index+1))s.doneAt=null;}
 mission.completedAt=mission.steps.every(s=>s.doneAt)?date:null;
 data.events.push({id:makeId(),type:done?'step_completed':'step_reopened',missionId,stepId,at:date});
 data.updatedAt=date;
 return data;
}
export function addJournal(atlas,{missionId=null,stepId=null,text,emotion,date=iso()}){
 if(!String(text||'').trim())throw Error('Écris quelques mots pour conserver cette trace.');
 const data=structuredClone(normalizedAtlas(atlas));
 data.journal.unshift({id:makeId(),missionId,stepId,text:String(text).trim().slice(0,12000),emotion:String(emotion||'').slice(0,40),date});
 data.updatedAt=iso();return data;
}
export function seasonForDate(date=new Date()){
 const month=date.getMonth();return month===11||month<2?'hiver':month<5?'printemps':month<8?'ete':'automne';
}
