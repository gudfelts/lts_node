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

   
    //首页科研资讯
    getIndexInfo : 'select * from information order by id desc limit ?,?',
    //获取管理员信息
    getUser : 'select * from admin where account = ?',
    //更新密码
    updatePassword : 'update admin set password = ?',

    //获取特定科研成果，其中type数据：1为学术论文，2为著作，3为研究报告
    getAchievementOne: "select * from achievement where id = ? and type = ?",
    //获取所有科研成果目录
    getAchievementAll:  "select  title,id,type from  achievement where type = ? order by id desc limit ?,?",
    //保存科研成果
    saveAchievement: "INSERT INTO achievement SET ?",
    //获取科研成果总条数
    getAchievementNum : 'select count(1) from achievement',

    //保存科研资讯，其中type数据：1为流通所新闻，2为基地资讯，3为媒体报道
    saveInformation: "INSERT INTO information SET ?",
    //获取特定科研资讯
    getInfoOne: "select * from information where id = ? and type = ?",
    //获取科研资讯目录
    getInfoAll:
      "select  title,id,type from  information where type = ? order by id desc limit ?,?",
    //获取科研资讯总条数
    getInfoNum : 'select count(1) from information',

    //保存科学研究，其中type数据：1为课题研究，2为课题招标，3为成果影响
    saveResearch: "INSERT INTO research SET ?",
    //获取特定科学研究
    getResearchOne: "select * from research where id = ? and type = ?",
    //获取科学研究目录
    getResearchAll:
      "select  title,id,type from  research where type = ? order by id desc limit ?,?",
    //获取最新科学研究
    getResLatest:
      "select top 9 * from  research order by time desc where type = ?",
      //获取科研资讯总条数
    getResearchNum : 'select count(1) from Research',

    //保存学术交流，其中type数据：1为来访交流，2为调研考察，3为主办年会，4为流通论坛
    saveExchange: "INSERT INTO exchange SET ?",
    //获取特定学术交流
    getExchangeOne: "select * from exchange where id = ? and type = ?",
    //获取学术交流目录
    getExchangeAll:
      "select  title,id,type from  exchange where type = ? order by id desc limit ?,?",
    //获取科研资讯总条数
    getExchangeNum : 'select count(1) from exchange',

    //保存咨询培训，其中type数据：1为资讯顾问，2为企业策划，3为专家培训
    saveTrain: "INSERT INTO train SET ?",
    //获取特定咨询培训
    getTrainOne: "select * from train where id = ? and type = ?",
    //获取咨询培训目录
    getTrainAll:
      "select  title,id,type from  train where type = ? order by id desc limit ?,?",
    //获取最新咨询培训
    getTrainLatest:
      "select top 9 * from  train order by time desc where type = ?",
    //获取科研资讯总条数
    getTrainNum : 'select count(1) from train',

    //保存智库建设，其中type数据：1为名家百人讲座，2为智库动态
    saveConstruction: "INSERT INTO construction SET ?",
    //获取特定智库建设
    getConstructionOne: "select * from construction where id = ? and type = ?",
    //获取智库建设目录
    getConstructionAll:
      "select  title,id,type from  construction where type = ? order by id desc limit ?,?",
    //获取最新智库建设
    getConstructionLatest:
      "select top 9 * from  construction order by time desc where type = ?",
    //获取科研资讯总条数
    getConstructionNum : 'select count(1) from construction',

  },
  type:{
    "information" : ['流通所新闻','基地资讯','媒体报道'],
    "achievement" : ['学术论文','著作','研究报告'],
    "research"    : ['课题研究','课题招标','成果影响'],
    "exchange"    : ['来访交流','调研考察','媒体报道','流通论坛'],
    "train"       : ['资讯顾问','企业策划','专家培训'],
    "construction": ['名家百人讲座','智库动态']
  }
};
