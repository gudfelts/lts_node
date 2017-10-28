const env = process.env.NODE_ENV;
const dev = require('../config/development');
const prod = require('../config/production');


module.exports = ()=>{
    const config = env === "production" ? prod : dev;
    return config;
}