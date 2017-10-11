const login = require('./controllers/login');


module.exports = router => {
    router.post("/login", login);
};
