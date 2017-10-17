module.exports = {
  serverPort: 3000,
  db: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "lts"
  },
  api: {
    user: {
      self: "/admin/user",
      login: "/login",
      logout: "/logout",
      changePassword: "/changePassword"
    },
    article: {
      self: "/admin/article",
      postArticle: "/postArticle",
      deleteArticle: "/deleteArticle"
    },

    addTeamMember: "/admin/addTeamMember",
    deleteTeamMember: "/admin/addTeamMember"
  },
  sql: {
    //首页科研资讯
    getIndexInfo: "select * from information order by id desc limit ?,?",
    //首页科研研究
    getIndexResearch: "select * from research order by id desc limit ?,?",

    //获取管理员信息
    getUser: "select * from admin where account = ?",
    //更新密码
    updatePassword: "update admin set password = ?",

    //点赞
    praise: "update ?? set prasise = praise + 1 where id = ?",

    /*
    科研成果，其中type数据：1为学术论文，2为著作，3为研究报告
    科研资讯，其中type数据：1为流通所新闻，2为基地资讯，3为媒体报道
    科学研究，其中type数据：1为课题研究，2为课题招标，3为成果影响
    学术交流，其中type数据：1为来访交流，2为调研考察，3为主办年会，4为流通论坛
    咨询培训，其中type数据：1为资讯顾问，2为企业策划，3为专家培训
    智库建设，其中type数据：1为名家百人讲座，2为智库动态
    */
    saveArticle: "insert into ?? set ?",
    //获取特定资讯
    getArticleOne: "select * from ?? where id = ? and type = ?",
    //获取目录
    getCatalog: "select  title,id,type from ?? where type = ? order by id desc  LIMIT ?,15",
    //获取总条数
    getNum: "select count(1) from ??",
   
   

  },
  type: {
    information: ["流通所新闻", "基地资讯", "媒体报道"],
    achievement: ["学术论文", "著作", "研究报告"],
    research: ["课题研究", "课题招标", "成果影响"],
    exchange: ["来访交流", "调研考察", "媒体报道", "流通论坛"],
    train: ["资讯顾问", "企业策划", "专家培训"],
    construction: ["名家百人讲座", "智库动态"]
  }
};
