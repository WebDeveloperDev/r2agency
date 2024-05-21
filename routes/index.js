var fs=require('fs')
var express=require('express')
var cookieParser = require('cookie-parser');
var session = require('express-session');
const { render } = require('pug');
var router=express.Router()

router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!"}));

router.get('/',(req,res)=>{
   res.sendfile('index.html')
})
router.get('/contact',(req,res)=>{
   res.sendfile('contact.html')
})
router.get('/about',(req,res)=>{
   res.sendfile('about.html')
})
router.get('/services',(req,res)=>{
   res.sendfile('services.html')
})
router.get('/google647198defbe41f61',(req,res)=>{
   res.sendfile('google647198defbe41f61.html')
})
module.exports=router;
