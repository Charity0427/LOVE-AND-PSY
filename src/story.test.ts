import {test} from 'node:test';
import assert from 'node:assert/strict';
import {scenes,initial,apply,ending} from './story.ts';
test('every story branch terminates in a reachable ending without cycles',()=>{
 const outcomes=new Set<string>();let routes=0;
 function walk(id:string,stats:typeof initial,path:string[]){
  if(id==='ending'){outcomes.add(ending(stats).name);routes++;return;}
  assert.ok(scenes[id],`missing scene ${id}`);assert.ok(!path.includes(id));
  for(const choice of scenes[id].choices)walk(choice.next,apply(stats,choice),[...path,id]);
 }
 walk('arrival',{...initial},[]);
 assert.equal(outcomes.size,3);assert.equal(routes,54);
});
test('applying choices never mutates prior state and caps attributes',()=>{
 const before={...initial};const after=apply(before,{text:'',hint:'',delta:{affection:90},next:'ending'});
 assert.equal(after.affection,100);assert.deepEqual(before,initial);assert.equal(after.rapport,30);
});

import {shots,roles} from './cinema.ts';
test('every playable scene has valid animated dialogue and casts its speaker',()=>{
 assert.deepEqual(Object.keys(shots).sort(),Object.keys(scenes).sort());
 for(const [id,sequence] of Object.entries(shots)){
  assert.ok(sequence.length>=4,`${id} needs a scene sequence`);
  for(const shot of sequence){
   assert.ok(roles[shot.role]);assert.ok(shot.line.trim().length>0);
   assert.ok(shot.cast.every(r=>r!=='narrator'&&roles[r]));
   if(shot.role!=='narrator')assert.ok(shot.cast.includes(shot.role),`${id} speaker must appear on stage`);
  }
 }
});

test('all romantic routes keep PSY as the lead and end in a relationship with him',()=>{
 for(const id of Object.keys(scenes))assert.ok(shots[id].some(shot=>shot.role==='psy'),`${id} must give PSY dialogue`);
 for(const stats of [{affection:90,courage:30,rapport:30},{affection:30,courage:90,rapport:30},{affection:30,courage:30,rapport:90}]){
  const result=ending(stats);assert.ok(result.tag.includes('你 × PSY'));assert.ok(result.text.includes('PSY'));
 }
});
