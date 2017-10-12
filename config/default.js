module.exports = {
    serverPort : 3030,
    db : {
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'lts'
    },
    api : {
        login :'/login',
        logout :'/logout',
        postArticle : '/admin/postArticle',
        deleteArticle : '/admin/deleteArticle',
        changePassword : '/admin/changePassword',
        addTeamMember :'/admin/addTeamMember',
        deleteTeamMember :'/admin/addTeamMember',
    },
    sql : {
        
        //获取特定学术论文
        getAcademicPapersOne : 'select * from AcademicPapers where id = ?',
        //获取所有学术论文目录
        getAcademicPapers : 'select title,id from  AcademicPapers',
        //保存学术论文
        saveAcademicPapers : 'INSERT INTO AcademicPapers SET ?',
        //保存流通所新闻
        saveCirculationNews    : 'INSERT INTO CirculationNews SET ?',
        //获取特定流通所新闻
        getCirOne : 'select * from CirculationNews where id = ?',
        //获取流通所新闻目录
        getAllCir :'select  title,id from  CirculationNews order by time desc',
        //获取最新流通所新闻
        getIndexCir :'select top 9 * from  CirculationNews order by time desc'
    }
}