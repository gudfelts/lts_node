module.exports = {
    
        //首页科研资讯
        getIndexData: "select title,id,content,isbanner,img,summary from articles where sort = ? order by id desc limit ?,?",

        //热门文章
        getHotArticle: "select title,id,type,img from(select title,id,type,browse,img from articles where sort = ?  order by id desc limit 5) as total order by browse limit 50", 
        //获取管理员信息
        getUser: "select * from admin where account = ?",
        //更新密码
        changePassword: "update admin set password = ?",
        updateUserTime:'update admin set loginTime = ?,loginSite = ? where account = ?',
        //点赞
        addPraise: "update ?? set praise = praise + 1 where id = ?",
        
        //获取团队列表
        getTeam: "select * from ?? order by rank asc limit ?,20",
        //获取专家信息
        getPerson: "select * from ?? where id = ? limit 1",
        getTeamoOther: "select id,name,avatar from ?? where id != ? limit 5",
        //更新专家信息
        updatePerson: "update ?? set name = ?,position = ?,content = ? ,avatar = ? ,summary = ?where id = ? limit 1",
        //查找专家
        searchPerson : 'select * from ?? where name like ? order by id desc limit ?,15',
        
        //更新专家的顺序
        updatePersonIndex: "update ?? set rank = ? where id = ?",
        
        //获取搜索专家的数量
        getReacherNumPerson : 'select count(1) from ?? where name like ? ',
        //删除专家信息
        deletePerson: "delete from ?? where id = ?",
        //存储专家信息
        saveTeam: "insert into ?? set ?",
       
        //轮播图
        saveBanner: "insert into banner set ?",
        deleteBanner: "delete from banner limit 1",
        getBanner: "select * from banner limit 5",
        //当目前banner为5个时，获取最后一个banner的id，修改这个文章的isbanner
        geBannerOne: "select id,type from banner limit 1",
        //了解该文章的banner图为第几张
        geBannerOneById: "select path from banner where id = ? limit 1",
        deleteBannerById: "delete from banner where id = ? limit 1",     
        updateBanner : 'update  banner set path = ?,title = ? where id = ?',
            
        //草稿
        saveDraft: "insert into draft set ?",
        getDraft: "select title,id,type,sort,author,time,source,draftTime from draft limit ?,10",
        getDraftOne: "select  * from draft where id = ? limit 1",
        updateDraft: "update draft set title = ?, content = ?,time = ?,source = ? ,author = ?,draftTime = ? ,sort = ? ,type = ? where id = ? limit 1",
        updateDraftColumn: "update draft set sort = ?, type = ? where id = ? limit 1",
        deleteDraft: "delete from draft where id = ? limit 1",
        
        //修改草稿的时间
        saveDraftTime :'insert into drafttime set ?',
        getDraftTime :' select draftTime from drafttime where id = ?',
        deleteDraftTime :'delete from drafttime where id = ?',
        /*
        科研成果，其中type数据：1为学术论文，2为著作，3为研究报告
        科研资讯，其中type数据：1为科研简讯，2为基地资讯，3为媒体报道
        科学研究，其中type数据：1为课题研究，2为课题招标，3为成果影响
        学术交流，其中type数据：1为来访交流，2为调研考察，3为主办年会，4为流通论坛
        咨询培训，其中type数据：1为资讯顾问，2为企业策划，3为专家培训
        智库建设，其中type数据：1为名家百人讲座，2为智库动态
        */
        saveArticle: "insert into articles set ?",
   
        //删除文章
        deleteArticle: "delete from articles where sort = ? and id = ? and type = ?",
        //删除文章
        addBrowse: "update  articles set browse = browse + 1 where id = ? limit 1",
        //获取特定资讯
        getArticleOne: "select * from articles where id = ? limit 1",
        getArticleIsBanner: "select isbanner from articles where id = ? limit 1",
        //获取目录
        getCatalog: "select  title,id,type,author,time,img,browse,praise,summary,source,isbanner from articles where sort = ? and type = ?  order by id desc  limit ?,10",
        
       
        getArticleNum: "select count(1) from articles where sort = ? and type = ?",
        //获取文章总条数
        getArticlsTotal: "select count(1) from articles where sort = ?",

        //获取总条数
        getNum: "select count(1) from ??",
        //更新内容
        editArticle: "update  articles set title = ?,author = ?,source = ?,time = ?, content = ? ,img = ? ,isbanner = ? ,sort = ?,type = ? where id = ? limit 1",
        updateArticleColumn: "update  articles set sort = ?,type = ? where id = ? limit 1",
        //查找文章
        searchArticle : 'select title,author,id,type,img,browse,praise,summary,time,source from articles where title like ? and type = ? and sort = ? order by id desc limit ?,15',
        //查找文章
        getReacherNumArticle : 'select count(1) from articles where title like ? and sort = ? and type = ?',
    
        //更新isbanner
        changeBanner : 'update articles set isbanner = ? where id = ?',
       
    
        //友情链接
        addLink : 'insert into friendlinks set ?',
        deleteLink : 'delete from friendlinks where id = ?',
        getLinkCatalog : 'select * from friendlinks',
        getLink : 'select * from friendlinks where id = ?',
        editLink : 'update  friendlinks set name = ?,link = ? where id = ?',

        saveFeedBack : 'insert into feedback set ?',
        getFeedBackCatalog : 'select id,time,title,isread from feedback limit ?,20',
        getFeedBackOne : 'select * from feedback where id = ? limit 1',
        setFeedBackRead : 'update  feedback set isread = 1 where id = ? limit 1',
        deleteFeedBack : 'delete from feedback where id = ? limit 1',

        //网站介绍

        getIntro : 'select content from intro limit 1',
        updateIntro : 'update intro set content = ?',
        getResearchdir:'select * from researchdir limit 1',
        updateResearchdir : 'update researchdir set content = ?',
        
}
