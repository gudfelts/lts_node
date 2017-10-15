/**
 * 
 * 创建返回数据结构
 *
 */

module.exports = (data, opt, errorNo = 0, errorMessage = '')=> {
    return Object.assign({}, {errorNo: errorNo, errorMessage: errorMessage, data: data||[]}, opt);
};