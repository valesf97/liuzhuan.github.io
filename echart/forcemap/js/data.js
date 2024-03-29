var newsDatas = {
  "南苏丹":{date:"1月9日", 
  site:"南苏丹", 
  title:"中国首支维和步兵营先遣分队出征南苏丹", 
  comment:"中国首次派遣成建制的维和步兵营，我维和力量由支援保障型向防御作战型转变。"},

"马来西亚":{
date:"1月13日",
site:"马来西亚",
title:"空军两架伊尔-76执行援助马来西亚救灾任务", 
comment:"中国空军反应速度及运输救灾能力大幅提升。"
},

"亚丁湾海域":{date:"2014年12月2日-2015年6月4日",
site:"亚丁湾海域",
title:"海军第十九批护航编队赴亚丁湾海域护航",
comment:"圆满完成35批108艘中外船舶护航任务，保护重要运输线安全，展示我军和平之师、文明之师的良好形象。"},

"印度洋":{date:"1月29日",
site:"印度洋",
title:"中国海军部署潜艇进入印度洋",
comment:"海军潜艇突破第二岛链，远洋航行能力提升。"},

"西太平洋": {date:"2月13日",
site:"西太平洋",
title:"海军舰艇编队赴西太平洋训练。",
comment:"加强舰艇编队训练力度，体现中国海军远洋训练常态化。"},

"马来西亚1":{date:"3月11日",
site:"马来西亚",
title:"八一飞行表演队赴马来西亚参加兰卡威国际海空展",
comment:"中国首批歼击机女飞行员驾歼-10海外首秀。"},

"也门": {date:"2月29日",
site:"也门",
title:"海军“临沂舰”赴也门抵吉布提撤离中外公民",
comment:"中国海军作战舰艇首次靠泊外国港口执行撤侨任务。"},

"西太平洋1":{date:"3月30日",
site:"西太平洋",
title:"中国空军首次赴西太平洋开展远海训练",
comment:"空军航空兵某师装备新型轰炸机轰-6执行该任务，提升空军部队作战能力。"},

"尼泊尔":{date:"4月27日",
site:"尼泊尔",
title:"中国军队和武警部队赴尼泊尔参加地震救灾",
comment:"中国武警交通部队首次执行境外任务。"},

"俄罗斯":{date:"5月9日",
site:"俄罗斯",
title:"解放军三军仪仗队参加俄罗斯纪念卫国战争胜利70周年阅兵式",
comment:"三军仪仗队首次亮相红场，为俄阅兵中人数最多外军方队。"},

"地中海":{date:"5月11日",
site:"地中海",
title:"海军舰艇赴地中海参加中俄“海上联合－2015（Ⅰ）”军事演习",
comment:"主战舰艇齐聚地中海，距离中国本土较远，对海军是一次新的挑战。"},

"马里":{date:"5月22日",
site:"马里",
title:"中国第三批赴马里维和部队出征",
comment:"陆军第39集团军首次出兵赴马里维和。"},

"西太平洋2":{date:"5月21日",
site:"西太平洋",
title:"中国空军首次飞越宫古海峡赴西太平洋开展远海训练",
comment:"训练难度进一步加大，提升空军航空兵部队远海机动作战能力。"},

"西太平洋3": {date:"6月10日",
site:"西太平洋",
title:"海军主战机种赴西太平洋开展舰机协同训练",
comment:"歼-11B与轰-6K首次联合出动赴远海，舰机协同训练难度大，需不断完善作战战法。"},

"白俄罗斯": {date:"6月15日",
site:"白俄罗斯",
title:"中国空降兵赴白俄罗斯参加“神鹰－2015”联合反恐训练",
comment:"加强空军遂行多样化军事任务能力，提高部队实战化训练水平。"}
};

var diff = 1;
var geoCoord = {
                        '中国':[116.415166,39.922828],
                        '南苏丹':[31.536389,5.281443],
                        '马来西亚':[101.620891,3.208169], 
                        '马来西亚1':[101.620891+diff,3.208169 + diff], 
                        '亚丁湾海域':[48.549289,12.761174],
                        '印度洋':[78.904829,-5.901939],
                        '西太平洋':[138.659249,28.785249],
                        '西太平洋1':[138.659249+diff,28.785249-diff],
                        '西太平洋2':[138.659249+diff*2,28.785249+diff*2],
                        '西太平洋3':[138.659249-diff,28.785249-diff],
                        '也门':[43.089891,11.543829],
                        '尼泊尔':[84.708,28.147],
                        '俄罗斯':[37.64254,55.715869],
                        '地中海':[27.923045,33.767996],
                        '马里':[-8.079342,12.77321],
                        '白俄罗斯':[27.390647,53.950642]
                    };