const  router  = require("express").Router();
const {register,login}=require("../controller/user.js")
router.route("/user/register").post(register); 
router.route("/login").post(login); 
module.exports = router;