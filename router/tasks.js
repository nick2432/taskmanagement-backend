const  router  = require("express").Router();
const {addtask,update,gettask,delettask}=require("../controller/task.js")
router.route("/addtask/:id").post(addtask); 
router.route("/update/:id").put(update); 
router.route("/gettask/:id").get(gettask); 
router.route("/delettask/:id").delete(delettask); 
module.exports = router;