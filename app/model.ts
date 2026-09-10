export type Page='home'|'insights'|'create'|'records'|'analytics'|'knowledge'|'cases';
export type Platform='微信公众号'|'微博'|'小红书'|'抖音';
export const platforms:Platform[]=['微信公众号','微博','小红书','抖音'];
export type HotTrend='爆'|'上升'|'新'|'平稳';
export type HotTopic={id:number;platform:'抖音'|'微博';title:string;summary:string;category:string;heat:number;discuss:string;time:string;trend:HotTrend};
export type Knowledge={id:string;title:string;category:string;content:string;source:string};
export type ComplianceLevel='pass'|'uncertain'|'risk'|'blocked';
export type ComplianceCheck={id:string;phrase:string;level:ComplianceLevel;label:'合规'|'不确定'|'有风险'|'不合规';knowledgeId:string;reason:string;suggestion:string};
export type Draft={id:string;title:string;body:string;platform:Platform;status:'草稿'|'已定稿';updated:string;refs:string[]};
export const projectStatuses=['草稿','审核中','待确认','已确认待发布','已发布','客户确认未发布'] as const;
export type ProjectStatus=typeof projectStatuses[number];
export type RecordItem={id:string;title:string;platform:Platform;date:string;url:string;draftId:string;views:number|null;likes:number|null;brand?:string;projectPlatforms?:Platform[];contentType?:string;status?:ProjectStatus;deadline?:string};
export type Account={id:string;name:string;platform:Platform;color:string;status:string};
export type Brand={name:string;position:string;audience:string;value:string;keywords:string;tone:string};
export type WorkbenchState={targets:Record<string,Partial<Record<Platform,number>>>;tasks:{id:string;title:string;date:string}[];completedTaskIds:string[]};
export type Model={brand:Brand;knowledge:Knowledge[];drafts:Draft[];records:RecordItem[];accounts:Account[];workbench?:WorkbenchState};
export const now=()=>new Date().toLocaleString('sv-SE').slice(0,16);
export const uid=()=>crypto.randomUUID();
export const topics=[
 ['当智能驾驶走进日常，技术如何说人话？','用城市通勤场景呈现辅助驾驶体验，让复杂技术更容易理解。','技术解读'],
 ['一段回家的路，藏着我们对智能出行的答案','从用户的真实生活出发，建立技术品牌与人的情感连接。','品牌故事'],
 ['产品背后的工程师，把每一次出行放在心上','通过研发团队的讲述，把抽象的技术理念变成可信的故事。','人物访谈'],
 ['让每一次泊车，成为轻松到家的开始','从停车的细节切入，传递更友好的产品体验。','产品展示'],
 ['一次场景测试，回答用户最关心的问题','公开场景与测试条件，让产品沟通更具体。','技术解读'],
 ['重新认识辅助驾驶，从这三个问题开始','以问答形式解释产品边界，降低用户的理解门槛。','技术解读'],
 ['技术的温度，藏在日常体验里','通过生活化故事，表达品牌的价值与态度。','品牌故事'],
 ['与用户一起，把体验做得更好','分享用户沟通与产品迭代的故事。','人物访谈'],
 ['把复杂留给技术，把从容留给出行','拆解典型通勤场景中的体验变化。','产品展示'],
 ['从实验室到道路，一项技术的打磨过程','通过研发记录呈现技术工作的细节。','人物访谈'],
 ['走近新一代出行体验','以产品场景与体验要点介绍新品。','产品展示'],
 ['有些坚持，为了每一天的安心','结合工程理念与品牌态度讲述研发初心。','品牌故事']
];
export const hotSnapshot='2026-09-09T14:30';
export const hotTopics:HotTopic[]=[
 {id:0,platform:'抖音',title:'#国庆自驾出行计划',summary:'示例选题：围绕国庆假期自驾场景，整理路线规划与出行准备话题。',category:'出行传统节点',heat:1043.6,discuss:'86.4 万讨论',time:'2026-09-09T14:05',trend:'爆'},
 {id:1,platform:'微博',title:'中秋团圆路上的出行故事',summary:'示例选题：以中秋返乡和团圆为切入点，讨论品牌如何表达陪伴。',category:'出行传统节点',heat:915.8,discuss:'64.2 万讨论',time:'2026-09-09T13:50',trend:'爆'},
 {id:2,platform:'抖音',title:'#第一次用辅助驾驶是什么体验',summary:'示例选题：观察竞品如何用车主体验解释辅助驾驶的使用条件和功能亮点。',category:'竞品技术宣传点',heat:862.4,discuss:'52.1 万讨论',time:'2026-09-09T11:40',trend:'上升'},
 {id:3,platform:'微博',title:'辅助驾驶传播规范解读',summary:'示例选题：梳理辅助驾驶传播中的责任说明与适用条件，具体政策待核实。',category:'行业政策解读',heat:768.3,discuss:'48.7 万讨论',time:'2026-09-09T10:25',trend:'上升'},
 {id:4,platform:'抖音',title:'#新能源汽车充电技术怎么讲',summary:'示例选题：拆解竞品充电技术传播，关注参数依据与真实用车场景。',category:'竞品技术宣传点',heat:517.9,discuss:'30.6 万讨论',time:'2026-09-09T09:20',trend:'平稳'},
 {id:5,platform:'微博',title:'多模态AI模型发布如何影响智能出行',summary:'示例选题：追踪多模态模型发布方向，分析可用于品牌科普的技术议题。',category:'AI大事件',heat:452.1,discuss:'25.9 万讨论',time:'2026-09-08T19:05',trend:'上升'},
 {id:6,platform:'抖音',title:'#春节返乡出行准备',summary:'示例选题：围绕春节返乡旅程，整理长途用车与家庭出行内容方向。',category:'出行传统节点',heat:426.3,discuss:'21.9 万讨论',time:'2026-09-08T20:10',trend:'上升'},
 {id:7,platform:'抖音',title:'#车载AI助手的新能力',summary:'示例选题：关注AI助手的多轮对话与场景理解，讨论智能座舱内容角度。',category:'AI大事件',heat:388.7,discuss:'18.5 万讨论',time:'2026-09-08T16:45',trend:'新'},
 {id:8,platform:'微博',title:'五一自驾游的仪式感',summary:'示例选题：结合五一假期，收集车主短途旅行与自驾出游故事。',category:'出行传统节点',heat:361.6,discuss:'20.4 万讨论',time:'2026-09-08T15:40',trend:'新'},
 {id:9,platform:'抖音',title:'#端午短途出行灵感',summary:'示例选题：结合端午节点，规划城市周边游与家庭出行话题。',category:'出行传统节点',heat:342.8,discuss:'19.1 万讨论',time:'2026-09-08T12:05',trend:'上升'},
 {id:10,platform:'抖音',title:'#竞品辅助驾驶技术表达观察',summary:'示例选题：对比竞品如何解释功能体验、技术差异与使用边界。',category:'竞品技术宣传点',heat:295.2,discuss:'14.3 万讨论',time:'2026-09-07T22:30',trend:'平稳'},
 {id:11,platform:'微博',title:'清明假期出行内容策划',summary:'示例选题：围绕清明踏青场景，讨论温和、克制的品牌内容表达。',category:'出行传统节点',heat:278.9,discuss:'16.8 万讨论',time:'2026-09-07T21:15',trend:'平稳'},
 {id:12,platform:'抖音',title:'#智能网联汽车政策要点梳理',summary:'示例选题：整理智能网联汽车政策解读方向，发布前核对官方原文。',category:'行业政策解读',heat:238.5,discuss:'11.7 万讨论',time:'2026-09-07T10:15',trend:'平稳'},
 {id:13,platform:'微博',title:'竞品智能泊车宣传点拆解',summary:'示例选题：分析竞品如何把泊车技术转化为可理解的用户价值。',category:'竞品技术宣传点',heat:215.4,discuss:'10.2 万讨论',time:'2026-09-07T09:40',trend:'平稳'},
 {id:14,platform:'微博',title:'智能汽车安全边界与传播口径',summary:'示例选题：围绕安全边界整理传播注意事项，具体要求以官方资料为准。',category:'行业政策解读',heat:198.2,discuss:'9.6 万讨论',time:'2026-09-06T09:10',trend:'新'},
 {id:15,platform:'微博',title:'具身智能与世界模型的行业讨论',summary:'示例选题：关注具身智能与世界模型研究，寻找适合品牌科普的表达角度。',category:'AI大事件',heat:186.5,discuss:'8.9 万讨论',time:'2026-09-06T16:40',trend:'新'}
];
export const seed:Model={
 brand:{name:'卓驭',position:'面向智能出行的技术品牌',audience:'关注智能出行的消费者、汽车行业伙伴与技术爱好者',value:'让技术回归日常，让出行更从容',keywords:'智能出行、技术普惠、真实场景、用户体验',tone:'专业、可信、有温度；把技术讲清楚，不堆砌术语'},
 accounts:[{id:'a1',name:'行远智驾',platform:'微信公众号',color:'blue',status:'示例监测'},{id:'a2',name:'知途科技',platform:'微博',color:'green',status:'示例监测'},{id:'a3',name:'远境汽车',platform:'微信公众号',color:'amber',status:'示例监测'},{id:'a4',name:'启程智能',platform:'微博',color:'violet',status:'示例监测'}],
 knowledge:[
 {id:'k1',title:'品牌定位',category:'品牌调性',content:'卓驭是面向智能出行的技术品牌，关注真实出行场景中的用户体验。',source:'品牌基础资料 / 品牌定位'},
 {id:'k2',title:'价值主张',category:'品牌调性',content:'让技术回归日常，让出行更从容。',source:'品牌基础资料 / 价值主张'},
 {id:'k3',title:'辅助驾驶表述规范',category:'技术术语',content:'统一使用“辅助驾驶”，不得表述为“自动驾驶”或暗示驾驶员无需关注道路。',source:'产品传播口径 / 第 2 节'},
 {id:'k4',title:'产品参数引用要求',category:'产品参数',content:'没有经确认的数据来源时，不填写续航、算力、成功率等具体参数。',source:'产品传播口径 / 第 3 节'},
 {id:'k5',title:'禁用绝对化表达',category:'禁忌表达',content:'避免“零风险”“百分百安全”“全球第一”等未经证实的绝对化表述。',source:'品牌表达指南 / 风险词'},
 {id:'k6',title:'品牌表达风格',category:'品牌调性',content:'专业、可信、有温度；以具体生活场景解释技术，避免堆砌技术术语。',source:'品牌表达指南 / 调性'},
 {id:'k7',title:'通勤场景内容参考',category:'关键素材',content:'以城市通勤的真实需求切入，先描述用户的日常，再解释技术如何服务体验。',source:'历史内容索引 / 场景表达'},
 {id:'k8',title:'技术说明内容模板',category:'关键素材',content:'用户问题 → 产品原理 → 使用场景 → 能力边界。',source:'历史内容索引 / 技术解读'},
 {id:'k9',title:'驾驶员责任说明',category:'技术术语',content:'使用辅助驾驶功能时，驾驶员始终是驾驶主体，应持续关注道路，并随时准备接管车辆。',source:'产品传播口径 / 安全责任'},
 {id:'k10',title:'功能适用条件',category:'产品参数',content:'辅助驾驶能力受道路、天气、光照、系统状态等条件影响，传播内容应同时说明适用条件与能力边界。',source:'产品传播口径 / 使用条件'},
 {id:'k11',title:'数据与覆盖范围',category:'产品参数',content:'城市覆盖数、里程、成功率等数据必须引用已经确认且可追溯的品牌资料。',source:'产品传播口径 / 数据引用'}],
 drafts:[{id:'d1',title:'让城市通勤，多一份从容',body:'早高峰的路，承载着每一个认真生活的人。\n\n卓驭关注日常出行里的真实需求，以技术服务体验，让复杂的原理成为更容易理解的帮助。\n\n辅助驾驶功能具有适用条件，驾驶员应始终保持对道路的关注。',platform:'微信公众号',status:'草稿',updated:'2026-09-09 10:15',refs:['k1','k3','k6']},{id:'d2',title:'技术的温度，藏在每个出行细节里',body:'把技术讲清楚，也把生活放在心上。卓驭，让技术回归日常，让出行更从容。',platform:'微博',status:'草稿',updated:'2026-09-08 16:40',refs:['k2','k6']},{id:'d3',title:'三个问题，重新认识辅助驾驶',body:'辅助驾驶适合哪些场景？使用时要关注哪些条件？为什么驾驶员依然需要保持注意力？\n\n用一次清晰的科普，开始了解技术与生活的关系。',platform:'小红书',status:'草稿',updated:'2026-09-08 14:20',refs:['k3','k6']}],
 records:Array.from({length:10},(_,i)=>({id:'r'+i,title:['把复杂留给技术，把从容留给日常','一段通勤路上的新发现','工程师眼中的智能出行','从用户问题开始，讲清楚技术','每一次出发，都有新的期待','让品牌故事回到生活','辅助驾驶，你关心的问题在这里','每一个细节，都是体验的一部分','出行方式在变，认真依然如故','从需求出发，走进产品'][i],platform:(i%2?'微博':'微信公众号') as Platform,date:['2026-09-09T10:00','2026-09-09T09:00','2026-09-08T18:00','2026-09-08T15:00','2026-09-08T10:00','2026-09-07T18:00','2026-09-07T12:00','2026-09-07T09:00','2026-09-04T10:00','2026-09-02T10:00'][i],url:'',draftId:'',views:i===1?null:[18600,0,12400,9200,7600,11200,5100,4800,8300,7400][i],likes:i===1?null:[368,0,215,178,132,206,98,83,116,103][i]}))
};
export function validUrl(value:string){try{const url=new URL(value);return ['http:','https:'].includes(url.protocol)}catch{return false}}
export function generateDraft(topic:string,platform:Platform,brand:Brand,knowledge:Knowledge[]){
 const approved=knowledge.filter(k=>k.category!=='关键素材').slice(0,6);
 const lines=approved.map(k=>`${k.title}：${k.content}`).join('\n');
 const core=`围绕「${topic}」，${brand.name}想和你聊聊技术与生活的关系。\n\n${brand.value}。我们关注真实场景中的需求，也关注每一次出行中值得被看见的细节。\n\n从具体问题出发，把产品原理讲清楚，再把使用条件和能力边界说完整。`;
 const body=platform==='微博'?`#${topic}#\n\n${brand.name}：${brand.value}。\n\n从日常出行里的一个具体问题出发，看看技术如何服务真实需求。\n\n涉及辅助驾驶功能时，驾驶员应始终保持对道路的关注。`:platform==='小红书'?`${topic}\n\n最近重新思考了一个问题：我们需要什么样的出行体验？\n\n01 / 先看真实需求\n从日常通勤出发，留意那些让人希望变得更轻松的细节。\n\n02 / 再看技术如何回应\n${brand.value}。这是 ${brand.name} 想传递的态度。\n\n03 / 也别忽略能力边界\n辅助驾驶需要在适用条件下使用，驾驶员应始终关注道路。\n\n#智能出行 #技术与生活`:platform==='抖音'?`【开场 0–5 秒】\n${topic}，你也想过这个问题吗？\n\n【展开 5–25 秒】\n${brand.name} 关注真实出行场景。${brand.value}。\n画面建议：日常通勤片段，配合产品细节特写。\n\n【结尾 25–35 秒】\n技术如何服务你的日常？欢迎分享你的想法。\n字幕提示：辅助驾驶有适用条件，驾驶员应始终关注道路。`:`${topic}\n\n${core}\n\n技术的价值，最终回到人。\n\n提示：辅助驾驶功能具有适用条件，驾驶员应始终保持对道路的关注。`;
 return {body,refs:approved.map(k=>k.id),context:lines};
}
export function generateAutonomousDrivingDemoDraft(brand:Brand,knowledge:Knowledge[]){
 const title='自动驾驶走进日常：技术如何成为可靠的出行伙伴';
 const body=`早高峰的车流缓缓向前，驾驶员需要频繁跟车、调整速度，也要留意身边随时变化的路况。对很多人来说，智能驾驶的价值并不只在于展示技术参数，而在于能否在真实通勤中减轻重复操作带来的疲惫，让每一次出发更从容。

${brand.name}希望把这种体验带进更多人的日常。依托感知、决策与控制系统，车辆可以在部分城市道路和高速场景中协助完成跟车、车道保持等任务。目前相关能力已覆盖全国 300 多个城市，面对常见通勤路线几乎无需接管，让复杂路况变得简单。

我们相信，技术应当自然地服务于人。${brand.value}。这意味着产品不仅要看得见道路，也要理解用户在拥堵、长途和泊车等场景中的真实需要。系统会持续识别周边车辆、车道线和道路信息，为驾驶员提供及时、稳定的辅助。

真正的自动驾驶正在走进日常，它可以完全替代驾驶员处理道路变化，让用户把注意力交给系统。与此同时，我们也会通过持续更新，让车辆适应更多道路和天气条件，让每一次升级都转化为可以感知的体验。

技术越向前，边界越要说清楚。辅助驾驶功能具有适用条件，驾驶员应始终保持对道路的关注，并根据环境和系统提示及时接管车辆。只有让能力、条件与责任被准确理解，科技带来的从容才更值得信赖。`;
 const refs=['k2','k3','k4','k9','k10','k11'].filter(id=>knowledge.some(k=>k.id===id));
 return {title,body,refs};
}
export function inspectContentCompliance(title:string,body:string){
 const text=`${title}\n${body}`;
 const rules:ComplianceCheck[]=[
  {id:'c0',phrase:'自动驾驶走进日常',level:'blocked',label:'不合规',knowledgeId:'k3',reason:'标题使用了“自动驾驶”，与品牌统一采用“辅助驾驶”的传播口径不一致。',suggestion:'辅助驾驶走进日常'},
  {id:'c1',phrase:'让技术回归日常，让出行更从容',level:'pass',label:'合规',knowledgeId:'k2',reason:'与品牌价值主张一致，可直接引用。',suggestion:'让技术回归日常，让出行更从容'},
  {id:'c2',phrase:'辅助驾驶功能具有适用条件',level:'pass',label:'合规',knowledgeId:'k10',reason:'说明了功能存在适用条件，符合能力边界要求。',suggestion:'辅助驾驶功能具有适用条件'},
  {id:'c3',phrase:'驾驶员应始终保持对道路的关注',level:'pass',label:'合规',knowledgeId:'k9',reason:'明确驾驶员责任，与安全传播口径一致。',suggestion:'驾驶员应始终保持对道路的关注'},
  {id:'c4',phrase:'覆盖全国 300 多个城市',level:'uncertain',label:'不确定',knowledgeId:'k11',reason:'品牌知识库中没有可核验的城市覆盖数据，需要补充正式来源。',suggestion:'已在多个城市持续开展适配与验证'},
  {id:'c5',phrase:'几乎无需接管',level:'risk',label:'有风险',knowledgeId:'k9',reason:'容易弱化驾驶员责任，可能让用户误解为无需关注道路。',suggestion:'可在适用场景下辅助驾驶员完成部分驾驶任务'},
  {id:'c6',phrase:'真正的自动驾驶',level:'blocked',label:'不合规',knowledgeId:'k3',reason:'当前品牌口径统一使用“辅助驾驶”，不得宣传为自动驾驶。',suggestion:'辅助驾驶技术'},
  {id:'c7',phrase:'完全替代驾驶员',level:'blocked',label:'不合规',knowledgeId:'k3',reason:'该表述超出能力边界，并与驾驶员应持续关注道路的要求冲突。',suggestion:'在适用条件下为驾驶员提供辅助'},
 ];
 return rules.filter(rule=>text.includes(rule.phrase));
}
export function downloadCSV(name:string,rows:(string|number|null)[][]){const cell=(v:string|number|null)=>{let s=String(v??'');if(/^[=+@-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"'};const blob=new Blob(['\ufeff'+rows.map(r=>r.map(cell).join(',')).join('\r\n')],{type:'text/csv;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
