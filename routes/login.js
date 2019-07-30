var express = require('express');
var router = express.Router();
let passport=require('passport');


router.get('/', function(req, res) {
    res.render('login',{ message: req.flash() });
});


router.post('/',passport.authenticate('local',{
    successRedirect:'/profile',
    failureRedirect:'/login',
    failureFlash:true

}));

module.exports = router;