module.exports = {

  serverPort: 3000,
  db: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "lts"
  },
  api: {
    user :{
      self : '/admin/user',
      login: "/login",
      logout: "/logout",
      changePassword: "/changePassword",
    
    },
    article : {
      self : '/admin/article',
      postArticle: "/postArticle",
      deleteArticle: "/deleteArticle",
    },
   
    addTeamMember: "/admin/addTeamMember",
    deleteTeamMember: "/admin/addTeamMember"
  },
  sql: {

    getNumInfo : 'select count(1) from information',
    //首页科研资讯
    getIndexInfo : 'select * from information order by id desc limit ?,?',
    //获取管理员信息
    getUser : 'select * from admin where account = ?',
    //更新密码
    updatePassword : 'update admin set password = ?',

    //获取特定科研成果，其中type数据：1为学术论文，2为著作，3为研究报告
    getAchievementOne: "select * from achievement where id = ?",
    //获取所有科研成果目录
    getAchievementAll: "select title,id from  achievement",
    //保存科研成果
    saveAchievement: "INSERT INTO achievement SET ?",

    //保存科研资讯，其中type数据：1为流通所新闻，2为基地资讯，3为媒体报道
    saveInformation: "INSERT INTO information SET ?",
    //获取特定科研资讯
    getInfoOne: "select * from information where id = ?",
    //获取科研资讯目录
    getInfoAll:
      "select  title,id from  information order by time desc where type = ?",
    //获取最新科研资讯
    geInfoLatest:
      "select top 9 * from  information order by time desc where type = ?",

    //保存科学研究，其中type数据：1为课题研究，2为课题招标，3为成果影响
    saveResearch: "INSERT INTO research SET ?",
    //获取特定科学研究
    getResOne: "select * from research where id = ?",
    //获取科学研究目录
    getResAll:
      "select  title,id from  research order by time desc where type = ?",
    //获取最新科学研究
    getResLatest:
      "select top 9 * from  research order by time desc where type = ?",

    //保存学术交流，其中type数据：1为来访交流，2为调研考察，3为主办年会，4为流通论坛
    saveExchange: "INSERT INTO exchange SET ?",
    //获取特定学术交流
    getExcOne: "select * from exchange where id = ?",
    //获取学术交流目录
    getExcAll:
      "select  title,id from  exchange order by time desc where type = ?",
    //获取最新学术交流
    getExcLatest:
      "select top 9 * from  exchange order by time desc where type = ?",

    //保存咨询培训，其中type数据：1为资讯顾问，2为企业策划，3为专家培训
    saveTrain: "INSERT INTO train SET ?",
    //获取特定咨询培训
    getTrainOne: "select * from train where id = ?",
    //获取咨询培训目录
    getTrainAll:
      "select  title,id from  train order by time desc where type = ?",
    //获取最新咨询培训
    getTrainLatest:
      "select top 9 * from  train order by time desc where type = ?"
  }
};
