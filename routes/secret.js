const router = require('express').Router();
const passport = require("passport");
const User = require("../models/User");


router.get('/secrets',(req,res)=>{
 User.find({ "secret": { $ne: null } }, (err, foundUsers) => {
   if (err) {
     console.log(err);
   } else {
     if (foundUsers) {
       res.render("secrets", {usersWithSecrets: foundUsers})
     }
   }
 })
})

router.post('/submit', (req,res)=>{
 const submittedSecret = req.body.secret;
 User.findById(req.user.id, (err, foundUser) => {
   if (err) {
     console.log(err);
   } else {
     if (foundUser) {
       foundUser.secret = submittedSecret;
       foundUser.save(() => {
         res.redirect("/secrets");
       });
     }
   }
 });
})

module.exports = router;