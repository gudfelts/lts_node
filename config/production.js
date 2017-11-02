
const path = require('path');
const env = process.env.NODE_ENV;
const PORT =  3000;
const HOST = 'http://lococo.site';
// // log配置
const errorLogPath =    path.join(__dirname, '../logs/error/error');				// 错误日志输出完整路径
const responseLogPath = path.join(__dirname, '../logs/response/response');	// 响应日志输出完整路径
module.exports = {
  HOST,
  serverPort: 3000,
  db: {
    connectionLimit : 50,    
    
    host: "localhost",
    user: "root",
    password: "root",
    database: "lts"
  },

 
  type: {
    information: ["流通所新闻", "基地资讯", "媒体报道"],
    achievement: ["学术论文", "著作", "研究报告"],
    research: ["课题研究", "课题招标", "成果影响"],
    exchange: ["来访交流", "调研考察", "主办年会", "流通论坛"],
    train: ["资讯顾问", "企业策划", "专家培训"],
    construction: ["名家百人讲座", "智库动态"],
    introduction :['简介','机构设置','研究方向','专家团队']
  },
   logConfig : {
    appenders:[
      // 错误日志
      {
        category: 'errorLogger',				// logger名称
        type: 'dateFile',						// 日志类型
        filename: errorLogPath,					// 日志输出位置
        alwaysIncludePattern: true,				// 是否总是有后缀名
        pattern: '-yyyy-MM-dd-hh.log'			// 后缀，每小时创建一个新的日志文件
      },
      // 响应日志
      {
        category: 'resLogger',
        type: 'dateFile',
        filename: responseLogPath,
        alwaysIncludePattern: true,
        pattern: '-yyyy-MM-dd-hh.log'
      }
    ],
    levels:										// 设置logger名称对应的的日志等级
    {
      errorLogger: 'ERROR',
      resLogger: 'ALL'
    }
  },
  
};
