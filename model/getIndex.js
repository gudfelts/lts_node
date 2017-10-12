const operateDB = require('../db/operateDB');

function pickBanner(aNew){
    const oNew = aNew[0];
}
module.exports = async()=>{
    let aNew = await operateDB.getIndexCir();
    let data = {};
    data.aCir = pickBanner(aNew);
    data.title = '首页';
    return {data};
}