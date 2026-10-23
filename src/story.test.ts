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
 const before={...initial};const after=apply(before,{text:'',hint:'',delta:{wisdom:90},next:'ending'});
 assert.equal(after.wisdom,100);assert.deepEqual(before,initial);assert.equal(after.trust,30);
});
