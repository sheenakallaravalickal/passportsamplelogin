var express = require('express');
var router = express.Router();
let bcrypt =require('bcrypt')
const users=[];


router.get('/', function(req, res) {
    res.render('register');
});
router.post('/',async (req,res) =>{
    try {
        let hashedPassword= await bcrypt.hash(req.body.password,10);

        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword
        })
       console.log(hashedPassword)
        //console.log(users)
        res.redirect('/login');
    }catch  {
        res.redirect('/register')
    }
   console.log(users)



})

module.exports = {router:router,users:users};