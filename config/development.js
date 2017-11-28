
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
  }
  
};
