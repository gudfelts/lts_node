


const PORT =  3000;
const HOST = 'http://localhost:3000';


module.exports = {
  HOST,
  serverPort: PORT,
  db: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "lts"
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
    getTeam: "select * from team limit ?,20",
    //获取专家信息
    getPerson: "select * from team where id = ? limit 1",
    getTeamoOther: "select id,name,avatar from team where id != ? limit 5",
    //更新专家信息
    updatePerson: "update team set name = ?,position = ?,content = ? ,avatar = ? ,summary = ?where id = ? limit 1",
    //查找专家
    reacherPerson : 'select * from team where name like ? order by id desc limit ?,15',
    //
    getReacherNumPerson : 'select count(1) from team where name like ? ',
    //删除专家信息
    deletePerson: "delete from team where id = ?",
    //存储专家信息
    saveTeam: "insert into team set ?",
   
    //轮播图
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
    getNum: "select count(1) from ?? where type = ?",
    //获取总条数
    getAllNum: "select count(1) from ??",
    //获取总条数
    getNumNoTYPE: "select count(1) from ??",
    //更新内容
    editArticle: "update  ?? set title = ?,author = ?,source = ?,time = ?, content = ? where id = ? and type = ?",
    //查找文章
    searchArticle : 'select title,author,id,type from ?? where title like ? and type = ? order by id desc limit ?,15',
    //查找文章
    getReacherNumArticle : 'select count(1) from ?? where title like ? and type = ? '
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
   
  
};
