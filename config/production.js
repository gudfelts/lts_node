
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
    
    host: "localhost",
    user: "root",
    password: "root",
    database: "lts"
  },

 
  type: {
    information: {
      self : '科研资讯',
      childen: ["科研简讯", "媒体报道"]
    },
    achievement: {
      self:'科研成果',
      childen:["著作","学术论文", "研究报告"]
    },
    research:{
      self:'科学研究',
      childen:["课题研究", "调研考察"]
    },
    exchange: {
      self:'学术交流',
      childen:["学术会议", "流通论坛", "来访交流" ]
    },
    introduction :{
      self:'研究院概况',
      childen:['本院简介','研究方向','研究团队']
    },
    advisory:{
      self:'咨询服务',
      childen:['政府咨询','企业咨询','培训课程']
    },
    dynamic:{
      self:'智库专家',
      childen:['专家动态']
    },
    expert:{
      self:'智库专家',
      childen:['专家介绍']
    },
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
