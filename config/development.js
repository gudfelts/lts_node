
const path = require('path');


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


  // type: {
  //   information: ["科研简讯", "媒体报道"],
  //   achievement: ["学术论文", "著作", "研究报告"],
  //   research: ["课题研究", "课题招标", "成果影响"],
  //   exchange: ["来访交流", "调研考察", "主办年会", "流通论坛"],
  //   train: ["资讯顾问", "企业策划", "专家培训"],
  //   // construction: ["名家百人讲座", "智库动态"],
  //   introduction :['简介','研究方向','研究方向','专家团队']
  // },
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
      childen:["学术学会", "流通论坛", "来访交流" ]
    },
    introduction :{
      self:'机构介绍',
      childen:['简介','研究方向','专家团队']
    }
  }
  
};
