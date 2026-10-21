import {emptyAtlas,normalizedAtlas} from './model.mjs';
export const LOCAL_KEY='atlas-v2-draft-2026';
export function readDraft(){try{return normalizedAtlas(JSON.parse(localStorage.getItem(LOCAL_KEY)||'null'));}catch{return emptyAtlas();}}
export function writeDraft(atlas){localStorage.setItem(LOCAL_KEY,JSON.stringify(normalizedAtlas(atlas)));}
export function exportAtlas(atlas){
 const blob=new Blob([JSON.stringify({exportedAt:new Date().toISOString(),atlas:normalizedAtlas(atlas)},null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='mon-atlas-'+new Date().toISOString().slice(0,10)+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),500);
}
