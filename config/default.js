
const path = require('path');
const env = process.env.NODE_ENV;
const PORT =  3000;
const HOST = env === 'production' ? '' : 'localhost';
// // log配置
const errorLogPath =    path.join(__dirname, '../logs/error/error');				// 错误日志输出完整路径
const responseLogPath = path.join(__dirname, '../logs/response/response');	// 响应日志输出完整路径
module.exports = {
  serverPort: 3000,
  db: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "lts"
  },
  api: {
    admin : {
      user: {
        self: "/admin/user",
        login: "/login",
        logout: "/logout",
        changePassword: "/changePassword"
      },
      article: {
        self: "/admin/article",
        postArticle: "/postArticle",
        getCatalog: "/getCatalog",
        getArticle: "/getArticle",
        deleteArticle: "/deleteArticle",
        batchDeleteArticle: "/batchDeleteArticle",
        editArticle: "/editArticle"
      },
      addTeamMember: "/admin/addTeamMember",
      deleteTeamMember: "/admin/addTeamMember"
    },

    fontEnd:{
      self:'/OperationData',
      getCatalog:'/getCatalog',
      addPraise:'/addPraise'
    }

   
  },
  sql: {
    //首页科研资讯
    getIndexInfo: "select title,id,type,content from information order by id desc limit ?,?",
    //首页科研研究
    getIndexResearch: "select title,id,type,content from research order by id desc limit ?,?",
    //首页学术交流 
    getIndexExchange: "select title,id,type from exchange order by id desc limit ?,?",
    //首页咨询培训 
    getIndexTrain: "select title,id,type from train order by id desc limit ?,?",
    //首页智库建设 
    getIndexConstruction: "select title,id,type from construction order by id desc limit ?,?",
    //热门文章
 
    getHotArticle: "select title,id,type from(select title,id,type,browse from ?? order by id desc limit 20) as total order by browse",

    //获取管理员信息
    getUser: "select * from admin where account = ?",
    //更新密码
    updatePassword: "update admin set password = ?",

    //点赞
    praise: "update ?? set prasise = praise + 1 where id = ?",
    //获取团队列表
    getTeam: "select name,position,avatar from team limit ?,20",
    //获取专家信息
    getTeamOne: "select content from team where id = ? limit 1",
    //更新专家信息
    updateTeamOne: "update team set name = ?,position = ?,content = ?,avatar = ? where id = ? limit 1",
    //更新专家信息
    saveTeam: "insert into team set ?",
   
   
    saveBanner: "insert into banner set ?",
    deleteBanner: "delete from banner limit 1",
    getBanner: "select * from banner limit 5",
    /*
    科研成果，其中type数据：1为学术论文，2为著作，3为研究报告
    科研资讯，其中type数据：1为流通所新闻，2为基地资讯，3为媒体报道
    科学研究，其中type数据：1为课题研究，2为课题招标，3为成果影响
    学术交流，其中type数据：1为来访交流，2为调研考察，3为主办年会，4为流通论坛
    咨询培训，其中type数据：1为资讯顾问，2为企业策划，3为专家培训
    智库建设，其中type数据：1为名家百人讲座，2为智库动态
    */
    saveArticle: "insert into ?? set ?",
    //删除文章
    deleteArticle: "delete from ?? where id = ? and type = ?",
    //删除文章
    addBrowse: "update  ?? set browse = browse + 1 where id = ? and type = ?",
    //获取特定资讯
    getArticleOne: "select * from ?? where id = ? and type = ? limit 1",
    //获取目录
    getCatalog: "select  title,id,type,author,source,time from ?? where type = ? order by id desc  limit ?,15",
    //获取总条数
    getNum: "select count(1) from ??",
    //更新内容
    editArticle: "update  ?? set title = ?,author = ?,source = ?,time = ?, content = ? where id = ? and type = ?",
  
  },
  type: {
    information: ["流通所新闻", "基地资讯", "媒体报道"],
    achievement: ["学术论文", "著作", "研究报告"],
    research: ["课题研究", "课题招标", "成果影响"],
    exchange: ["来访交流", "调研考察", "媒体报道", "流通论坛"],
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
  }
  
};
