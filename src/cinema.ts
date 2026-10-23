export type Role = 'you'|'psy'|'xia'|'narrator';
export type Shot = {role:Role;line:string;cast:Role[];effect?:'note'|'sparkle'|'music'};
export const roles:Record<Role,{name:string;title:string;color:string;bio:string}>={
 you:{name:'你',title:'女主角 · 晴川大学大二学生',color:'#f3c4c8',bio:'故事的女主角。第一次独自参加校园音乐节，却从一把伞开始，慢慢走进 PSY 的世界。'},
 psy:{name:'PSY',title:'男主角 · 校园音乐社成员',color:'#bad9ee',bio:'你唯一的恋爱男主角。同校大二学生，看起来安静随性，却记得你每一个不经意的小习惯。喜欢弹吉他，不太擅长藏住见到你的笑意。'},
 xia:{name:'许夏',title:'室友 · 你的恋爱助攻',color:'#f0c8a7',bio:'你的室友兼音乐节志愿者。嘴上说着只是顺路，总能刚好把你送到 PSY 面前。她是支持你的朋友，不是恋爱路线。'},
 narrator:{name:'旁白',title:'',color:'#e7d5c5',bio:''}
};
export const shots:Record<string,Shot[]>={
 arrival:[{role:'narrator',cast:[],line:'晴川大学，春季学期。午后的雨忽然落下来，你抱着报名表，躲进樱花道旁窄窄的屋檐。'},
 {role:'you',cast:['you'],line:'早知道就听许夏的带把伞……音乐节报名还有十分钟截止。'},
 {role:'psy',cast:['you','psy'],line:'去活动中心？顺路。要不要一起？'},
 {role:'you',cast:['you','psy'],line:'谢谢！可是这样，你的肩膀会淋湿吧。'},
 {role:'psy',cast:['you','psy'],line:'没关系。报名表比较要紧。对了，叫我 PSY 就好。'},
 {role:'narrator',cast:['you','psy'],line:'他把伞往你这边倾了倾，怀里笔记本的边角却被雨打湿了。雨声很近，你听见自己心跳漏了一拍。',effect:'sparkle'},
 {role:'psy',cast:['you','psy'],line:'我明天下午会在图书馆。伞先借给你……这样，就有理由再见一次了。',effect:'note'}],
 library:[{role:'narrator',cast:[],line:'第二天下午，你推开图书馆的玻璃门。靠窗的座位上，PSY 身旁恰好空着一个位置。'},
 {role:'psy',cast:['you','psy'],line:'你来了。这个位置，今天一直没让给别人。'},
 {role:'you',cast:['you','psy'],line:'我来还伞，还有……昨天没来得及说，我很高兴认识你。'},
 {role:'psy',cast:['you','psy'],line:'那帮我看看这张歌单？第十七首，是昨天回去以后加上的。'},
 {role:'narrator',cast:['you','psy'],line:'你低头，看见纸边一行小字：「下次见面，想和你一起听。」窗外的光，刚好落在他的侧脸。',effect:'note'}],
 rooftop:[{role:'narrator',cast:[],line:'音乐楼的天台比你想象中安静。PSY 看见你时，拨弦的手停了一拍。'},
 {role:'psy',cast:['you','psy'],line:'你真的来了。我还在想，昨天那个邀约是不是我听错了。'},
 {role:'you',cast:['you','psy'],line:'没有听错。我想听你弹琴，也想……多认识你一点。'},
 {role:'psy',cast:['you','psy'],line:'那这段前奏先给你听。音乐节那天，如果紧张，我就看向你。',effect:'music'},
 {role:'narrator',cast:['you','psy'],line:'风掀起他衬衫的一角。他没有急着弹下一句，好像在等一个只属于你的回答。'}],
 festival:[{role:'narrator',cast:['xia'],line:'春日音乐节开场。许夏把手幅塞进你手里，又悄悄替你理好被风吹乱的头发。'},
 {role:'xia',cast:['you','xia'],line:'别找啦，PSY 刚刚已经往这边看了三次。你只是来听歌的？我可不信。'},
 {role:'you',cast:['you','xia'],line:'我……是想见他。但还不知道，他是不是也这么想。'},
 {role:'narrator',cast:[],line:'灯光亮起。PSY 对着话筒轻轻吸了一口气，目光越过人群，准确地停在你身上。',effect:'music'},
 {role:'psy',cast:['you','psy'],line:'下一首，送给那个让我开始期待下雨的人。谢谢你，今天也来了。',effect:'sparkle'},
 {role:'narrator',cast:['you','psy'],line:'最后一个音符落下，他朝你走来。这次，你不想再把心意藏进「刚好路过」。'}],
 confession:[{role:'narrator',cast:['you','psy'],line:'散场后的长廊只剩晚风。PSY 和你并肩走着，步子慢得像舍不得走到尽头。'},
 {role:'psy',cast:['you','psy'],line:'其实，图书馆那个位置不是刚好空着。第十七首歌，也不只是想找人分享。'},
 {role:'you',cast:['you','psy'],line:'那……你那天说的顺路呢？'},
 {role:'psy',cast:['you','psy'],line:'也不顺路。我看见你站在屋檐下，就想走过去。'},
 {role:'psy',cast:['you','psy'],line:'我喜欢你。我想认真地问一次：以后，可以不只做同学吗？',effect:'sparkle'},
 {role:'narrator',cast:['you','psy'],line:'他停下脚步，给你留出回答的时间。你终于知道，这场心动从来不是你一个人的事。'}]
};
// Dimensions and thirds match the original generated transparent sprite atlas.
export function portrait(role:Role):string {
 const index={you:0,psy:1,xia:2,narrator:0}[role];
 return `<svg viewBox="0 0 512 1024" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${roles[role].name}校园角色立绘"><defs><clipPath id="crop-${role}"><rect width="512" height="1024"/></clipPath></defs><g clip-path="url(#crop-${role})"><image x="${-index*512}" href="./art/campus-characters.webp" width="1536" height="1024"/></g></svg>`;
}
