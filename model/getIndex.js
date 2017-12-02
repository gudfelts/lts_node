const { getBanner, getArticlsTotal, getIndexData } = require("../model/OperationData");
const SQL = require("../config/sql");

/**
 * 选取带图新闻
 * @param {*} aNew 
 */
const pick = aNew => {
  let flag = false;
  for (let i = 0; i < aNew.length; i++) {
    let hasIMG = aNew[i].img;
    let isbanner = aNew[i].isbanner;
    if (hasIMG !=='0' && !isbanner) {
      banner = aNew[i];
      //去掉引号
      try {
        
        banner.src = hasIMG;
        flag = true;
        aNew.splice(i, 0);
        break;
      } catch (error) {

        banner.src = false;
      
      }
      
    }
  }
  if (!flag) return flag;
  else return { banner, aNew };
  return 0;
}  
/**
 * 获取首页科研资讯，选取一个带图的文章作为左边大图展示。
 */
const getInfo = async () => {
  let info_m = 0,
    info_n = 8;
  let info = {};
  //获取表格行数
  const NUM = await getArticlsTotal("information");
  //获取从info_m到info_n的数据
  let aNew;

  aNew = await getIndexData(["information", info_m, info_n]);

  //获取带图的文章
  let data = pick(aNew);
  //从info_m到info_n的文章有一个带图的文章
  if (!!data) {
    // data.banner.summary = pickSummary(data.banner.content);
    info.banner = data.banner;
    info.aNew = data.aNew;
  } else {
    //从info_m到info_n的文章没带图的文章，将这些文章都划为右边小资讯（因为他是最新的，所以不采用下面获得的数据）
    info.aNew = aNew;

    //继续往下遍历，找到带图的文章
    info_m += info_n;
    //防止超过表格条数
    if (info_m >= NUM) {
      info_m = NUM;
      info_n = 1;
    }

    while (NUM >= info_n) {
      aNew = await getIndexData(["information",info_m, info_n]);
      let data = pick(aNew);

      if (!!data) {
        // data.banner = pickSummary(data.banner)
        info.banner = data.banner;
        break;
      } else {
        //继续往下遍历，找到带图的文章
        info_m += info_n;
        //防止超过表格条数
        if (info_m >= NUM) {
          info_m = NUM;
          info_n = 1;
        }
      }
    }

    //不存在都没有带图文章，不存在的V●ᴥ●V
  }

  return info;
};

const getResearch = async () => {
  let info_m = 0,
    info_n = 4;
  let research = {};
  //获取表格行数
  const NUM = await getArticlsTotal("research");

  while (NUM >= info_n) {
    //获取从info_m到info_n的数据
    let aNew = await getIndexData(["research", info_m, info_n]);
    //获取带图的文章
    let { banner } = pick(aNew);

    if (!!banner) {
      research = banner;
      
      break;
    } else {
      //继续往下遍历，找到带图的文章
      info_m += info_n;
      //防止超过表格条数
      if (info_m >= NUM) {
        info_m = NUM;
        info_n = 1;
      }
    }
  }
  //不存在都没有带图文章，不存在的V●ᴥ●V

  return research;
};

const getDynamic = async () => {
  let aNew = await getIndexData(["dynamic",0, 8]);
  return aNew;
};
const getExchange = async () => {
  let aNew = await getIndexData(["exchange",0, 8]);
  return aNew;
};
const getAdvisory = async () => {
  let aNew = await getIndexData(["advisory",0, 8]);
  return aNew;
};



module.exports =  async () => {
 
    let info = await getInfo();
    let research = await getResearch();
    let exchange = await getExchange();
    let dynamic = await getDynamic();
    let advisory = await getAdvisory();
    let banner = await getBanner();
    return { info, research, exchange, dynamic,advisory,banner};
 
};

