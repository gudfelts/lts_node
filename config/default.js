


const PORT =  3000;
const HOST = 'http://localhost:3000';


module.exports = {
  HOST,
  serverPort: PORT,
  db: {
    connectionLimit : 50,    
    host: "localhost",
    user: "root",
    password: "root",
    database: "lts"
  },


  type: {
    information: ["科研简讯", "基地资讯", "媒体报道"],
    achievement: ["学术论文", "著作", "研究报告"],
    research: ["课题研究", "课题招标", "成果影响"],
    exchange: ["来访交流", "调研考察", "主办年会", "流通论坛"],
    train: ["资讯顾问", "企业策划", "专家培训"],
    construction: ["名家百人讲座", "智库动态"],
    introduction :['简介','研究方向','研究方向','专家团队']
  },
   
  
};
