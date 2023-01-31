const router = require('express').Router();
const passport = require("passport");
const User = require("../models/User");

router.get('/', (req,res)=>{
res.render("home");
})

router.get('/login', (req,res)=>{
     res.render("login");
})

router.get('/register', (req,res)=>{
     res.render("register");
})

router.get('/submit',(req,res)=>{
    if (req.isAuthenticated()) {
  res.render("submit");
} else {
  res.redirect("/login");
}
})

router.get('/logout',  (req,res)=>{
     req.logout(function (err) {
   if (err) {
     return next(err);
   }
   res.redirect("/");
 });
})

router.post('/register', (req,res)=>{
     User.register(
   { username: req.body.username },
   req.body.password,
   (err, user) => {
     if (err) {
       console.log(err);
       res.redirect("/register");
     } else {
       passport.authenticate("local")(req, res, () => {
         res.redirect("/secrets");
       });
     }
   }
 );
})

router.post('/login', (req,res)=>{
    const user = new User({
  username: req.body.username,
  password: req.body.password,
});
req.login(user, (err) => {
  if (err) {
    console.log(err);
  } else {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/secrets");
    });
  }
});
})


module.exports = router;