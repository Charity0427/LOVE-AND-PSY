export type Role = 'zhiwei'|'aheng'|'lingyi'|'peizhao'|'narrator';
export type Shot = {role:Role;line:string;cast:Role[];effect?:'letter'|'thunder'|'lantern'};
export const roles:Record<Role,{name:string;title:string;color:string}>={
 zhiwei:{name:'沈知微',title:'新任女史 · 你',color:'#b6cec0'},aheng:{name:'阿蘅',title:'尚仪局宫女',color:'#efc6bd'},lingyi:{name:'沈令仪',title:'尚仪局掌事',color:'#d5b77d'},peizhao:{name:'裴照',title:'巡夜校尉',color:'#a8c9d4'},narrator:{name:'旁白',title:'',color:'#dbcba9'}
};
export const shots:Record<string,Shot[]>={
 arrival:[{role:'narrator',cast:[],line:'景和三年，暮春。长安城的雨，已经下了三日。你奉召入宫，却不知道，这扇门后藏着谁的命运。'},
 {role:'zhiwei',cast:['zhiwei'],line:'母亲说，入宫之后，少看、少问，便能平安。可这宫门一关……真的还由得了我吗？'},
 {role:'aheng',cast:['zhiwei','aheng'],line:'姐姐，别回头。收好这封信。',effect:'thunder'},
 {role:'zhiwei',cast:['zhiwei','aheng'],line:'等等，你是谁？你的手怎么在发抖？'},
 {role:'aheng',cast:['zhiwei','aheng'],line:'今夜子时，莫饮宫茶。若有人问起……你从未见过我。',effect:'letter'},
 {role:'narrator',cast:['zhiwei'],line:'小宫女消失在雨幕中。掌心的信还留着余温，廊下却响起了另一道脚步声。'},
 {role:'lingyi',cast:['zhiwei','lingyi'],line:'新来的女史？抬起头来。方才，谁在与你说话？'}],
 garden:[{role:'narrator',cast:[],line:'你借着雨声追进御苑。海棠花瓣落在石灯旁，那名宫女正紧紧攥着一枚缺角的玉扣。'},
 {role:'aheng',cast:['zhiwei','aheng'],line:'你不该跟来的。她们若看见你，连你也会被牵连。'},
 {role:'zhiwei',cast:['zhiwei','aheng'],line:'你明知危险，还要递信给我。如今让我装作没看见，我做不到。'},
 {role:'aheng',cast:['zhiwei','aheng'],line:'我叫阿蘅。昨夜有人换了尚仪局的茶。西廊有一本茶料簿……我只知道这些。',effect:'lantern'},
 {role:'narrator',cast:['zhiwei','aheng'],line:'「什么人在那里？」侍卫的灯光扫过花枝。阿蘅看向你，眼里只剩最后一点希望。'}],
 court:[{role:'narrator',cast:['zhiwei','lingyi'],line:'帘后香烟袅袅。沈令仪没有追问信笺，只将一杯热茶推到你面前。'},
 {role:'lingyi',cast:['zhiwei','lingyi'],line:'在这里，规矩可以学。分寸，却要拿一生去记。'},
 {role:'zhiwei',cast:['zhiwei','lingyi'],line:'大人是说，有些事，即使看见了，也不该开口？'},
 {role:'lingyi',cast:['zhiwei','lingyi'],line:'我是说，开口之前，先想好你要保护谁。喝茶吧。',effect:'lantern'},
 {role:'narrator',cast:['zhiwei','lingyi'],line:'茶汤澄澈，清香却多了一丝陌生的甜。你按住袖中的信，终于明白这道选择意味着什么。'}],
 archive:[{role:'narrator',cast:['zhiwei'],line:'入夜，西廊典籍阁。你翻开茶料簿，最后一页被撕去一半。残页上，赫然写着「阿蘅」。',effect:'lantern'},
 {role:'zhiwei',cast:['zhiwei'],line:'她递信救我，账册上却写着她的名字……这是有人设好的局。'},
 {role:'peizhao',cast:['zhiwei','peizhao'],line:'别出声。我是巡夜校尉裴照。有人正往这里来，你只来得及带走一样东西。'},
 {role:'zhiwei',cast:['zhiwei','peizhao'],line:'一本账册，一封供词。带错了，真相和她的性命，都会消失。'},
 {role:'peizhao',cast:['zhiwei','peizhao'],line:'我守着这扇门。但怎么走，由你来选。'}],
 decision:[{role:'narrator',cast:[],line:'黎明前，你被召到承明殿。阿蘅跪在阶下，裴照立于殿外，所有人都在等你开口。'},
 {role:'lingyi',cast:['zhiwei','lingyi'],line:'茶料簿已经被调换。此刻站出来，你便再也无法置身事外。'},
 {role:'zhiwei',cast:['zhiwei','lingyi'],line:'若我今日不说话，明日还会有另一个阿蘅。'},
 {role:'lingyi',cast:['zhiwei','lingyi'],line:'那就让我看看，你要怎样走出这一步。'},
 {role:'narrator',cast:['zhiwei'],line:'天光穿过殿门。你松开紧攥的手，第一次，没有避开任何人的目光。'}]
};
export function portrait(role:Role):string {
 const index={zhiwei:0,aheng:1,lingyi:2,peizhao:3,narrator:0}[role];
 return `<svg viewBox="0 0 443.5 887" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${roles[role].name}原创角色立绘"><defs><clipPath id="crop-${role}"><rect width="443.5" height="887"/></clipPath></defs><g clip-path="url(#crop-${role})"><image x="${-index*443.5}" href="./art/characters.webp" width="1774" height="887"/></g></svg>`;
}
