var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('login',{ message: req.flash() });
});


router.post('/login',passport.);

module.exports = router;