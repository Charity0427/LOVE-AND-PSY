export type Stats = { affection: number; courage: number; rapport: number };
export type Choice = { text: string; hint: string; delta: Partial<Stats>; next: string };
export type Scene = { chapter: string; title: string; location: string; choices: Choice[] };
export const initial: Stats = { affection: 30, courage: 30, rapport: 30 };
export const scenes: Record<string, Scene> = {
 arrival: { chapter:'第一章 · 雨天初见', title:'他的名字，叫 PSY', location:'晴川大学 · 樱花道', choices:[
  {text:'接过伞，和 PSY 约定明天见',hint:'心动 +15 · 去图书馆赴约',delta:{affection:15},next:'library'},
  {text:'叫住 PSY：明天一起去看排练吧',hint:'勇气 +15 · 开启天台邀约',delta:{courage:15},next:'rooftop'},
  {text:'帮 PSY 收好被雨打湿的笔记',hint:'默契 +15 · 去图书馆还书',delta:{rapport:15},next:'library'}]},
 library:{chapter:'第二章 · 靠窗的位置',title:'第十七页的小秘密',location:'晴川大学 · 图书馆',choices:[
  {text:'把自己的歌单，写在他名字旁边',hint:'心动 +15',delta:{affection:15},next:'festival'},
  {text:'记住他的喜好，带来他爱喝的拿铁',hint:'默契 +15',delta:{rapport:15},next:'festival'}]},
 rooftop:{chapter:'第二章 · 风替我说',title:'只唱给你听的前奏',location:'晴川大学 · 音乐楼天台',choices:[
  {text:'直视 PSY：我会在台下等你',hint:'勇气 +15',delta:{courage:15},next:'festival'},
  {text:'把围巾递给他：那就再唱一遍吧',hint:'心动 +15',delta:{affection:15},next:'festival'}]},
 festival:{chapter:'第三章 · 心动频率',title:'人海里，他先看见你',location:'晴川大学 · 春日音乐节',choices:[
  {text:'举起写着「PSY 加油」的手幅',hint:'心动 +20',delta:{affection:20},next:'confession'},
  {text:'走向 PSY，亲口告诉他唱得很好',hint:'勇气 +20',delta:{courage:20},next:'confession'},
  {text:'留在约好的地方，替他留住最后一盏灯',hint:'默契 +20',delta:{rapport:20},next:'confession'}]},
 confession:{chapter:'终章 · 把喜欢说给你',title:'这次，不借雨天的名义',location:'晴川大学 · 晚风长廊',choices:[
  {text:'牵住 PSY 的手：「我也喜欢你。」',hint:'心动 +10 · 回应他的告白',delta:{affection:10},next:'ending'},
  {text:'把情书递给 PSY：「其实我先喜欢你。」',hint:'勇气 +10 · 让他听见你的心意',delta:{courage:10},next:'ending'},
  {text:'站到 PSY 身旁：「以后的每天，一起走吧。」',hint:'默契 +10 · 约定属于你们的日常',delta:{rapport:10},next:'ending'}]}
};
export function apply(stats:Stats, choice:Choice):Stats { return Object.fromEntries(Object.entries(stats).map(([k,v])=>[k,Math.min(100,Math.max(0,v+(choice.delta[k as keyof Stats]??0)))])) as Stats; }
export function ending(stats:Stats) {
 if(stats.affection>=stats.courage&&stats.affection>=stats.rapport) return {name:'雨季恋人',tag:'心动结局 · 你 × PSY',text:'PSY 握紧你的手，笑着把伞收了起来。「以后想见你，不用等下雨了。」你们从那条樱花道走过，这次并肩，也心照不宣地靠近。校园的故事，终于写成了你和 PSY 的恋爱开篇。'};
 if(stats.courage>=stats.rapport) return {name:'写给 PSY 的情书',tag:'勇气结局 · 你 × PSY',text:'PSY 读到第一句就红了耳尖。他从口袋里拿出另一封信，收件人也是你。「原来，我们都准备了好久。」两封没有寄出的情书，在同一个夜晚有了答案。你和 PSY，正式成为恋人。'};
 return {name:'并肩的每一天',tag:'默契结局 · 你 × PSY',text:'PSY 把明早的课表发给你，又认真补上一句：「那从明天起，我可以用男朋友的身份等你下课吗？」你点头。两杯拿铁、靠窗的座位，以及每一个普通的日子，从此都有了你和 PSY。'};
}
