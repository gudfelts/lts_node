const getIndex = require("../model/getData").getIndex;
const getNum = require("../model/getData").getNum;
const sql = require("config-lite")(__dirname).sql;
const trimHtml = require("trim-html");
/**
 * 截取摘要
 * @param {*} content 
 */
const pickSummary = content => {
  const summary = trimHtml(content, { preserveTags: false, limit: 70 }).html;
  console.log(summary);
  return summary;
};
/**
 * 选取大图资讯
 * @param {*} aNew 
 */

const pickBanner = aNew => {
  let banner = {};
  const patt1 = /<img [^>]*src=['"]([^'"]+)[^>]*>/gi;
  const patt2 = /src='[\'\"]?([^\'\"]*)[\'\"]?'/i;
  let flag = false;

  for (let i = 0; i < 8; i++) {
    let content = aNew[i].content;
    if (patt1.test(content)) {
      banner = aNew[i];
      //去掉引号
      banner.src = content.match(patt2)[0].replace(/\'/g, "");
      flag = true;
      aNew.splice(i, 0);
      break;
    }
  }
  if (!flag) return flag;
  else return { banner, aNew };
  return 0;
};
/**
 * 获取首页科研资讯，选取一个带图的文章作为左边大图展示。
 */
const getInfo = async () => {
  let info_m = 0,
    info_n = 8;
  let info = {};
  //获取表格行数
  const NUM = await getNum(sql.getNumInfo);
  //获取从info_m到info_n的数据
  let aNew = await getIndex(sql.getIndexInfo, [info_m, info_n]);

  //获取带图的文章
  let data = pickBanner(aNew);

  //从info_m到info_n的文章有一个带图的文章
  if (!!data) {
    data.banner.summary = pickSummary(data.banner.content);
    info.banner = data.banner;
    info.aNew = data.aNew;
  } else {
    //从info_m到info_n的文章没带图的文章，将这些文章都划为右边小资讯（因为他是最新的，所以不采用下面获得的数据）
    info.aNew = aNew;

    //继续往下遍历，找到带图的文章
    info_m = info_n;
    //防止超过表格条数
    info_n = info_n * 2 > NUM ? NUM : info_n * 2;

    while (NUM >= info_n) {
      aNew = await getIndex(sql.getIndexInfo, [info_m, info_n]);

      let data = pickBanner(aNew);

      if (!!data) {
        // data.banner = pickSummary(data.banner)
        info.banner = data.banner;
        break;
      } else {
        info_m = info_n;
        info_n = info_n * 2 > NUM ? NUM : info_n * 2;
      }
    }

    //不存在都没有带图文章，不存在的V●ᴥ●V
  }

  return info;
};
const getData = async () => {
  let info = await getInfo();
  let title = "首页";

  return { title, info };
};

module.exports = async () => {
  const data = await getData();
  return data;
};
