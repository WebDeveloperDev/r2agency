const { json } = require("body-parser");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var usersModel = require("../models/users.js");
var sendMail = require("../controllers/SendMail.js");
var router = express.Router();
router.use(cookieParser());
router.use(session({ secret: "Shh, its a secret!" }));

router.post("/email", async (req, res) => {
  var email = new usersModel.emailSchema({
    email: req.body.email,
  });
  email
    .save()
    .then((savedUser) => {
      console.log("data saved");
      res.send({status:200})
    })
    .catch((err) => {
      console.log("Error :", err);
    });
});
router.post("/contactInfo", async (req, res) => {
  
  var contactInfo = new usersModel.contactInfo({
    name:req.body.name,
    email: req.body.email,
    message:req.body.message
  });
  contactInfo
    .save()
    .then((savedUser) => {
      console.log("data saved");
      res.send(`<div style="display:flex;text-align:center;justify-content:center;flex-direction:column;font-family: sans-serif;"><p style="font-size:x-large;">Your Response has been recorded</p><p>We will contact you within 24 hours</p>  <a href='/'>visit Home page</a> <br>Redirecting to home page in 3 seconds</div><script>setTimeout(() => {
        window.location.href='/'
      }, 3000);</script>`)
      // res.send({status:200})
    })
    .catch((err) => {
      console.log("Error :", err);
    });
});
module.exports = router;
