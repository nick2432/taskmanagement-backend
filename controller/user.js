const User = require("../model/user.js");
exports.register = async (req,res)=>{
    try{
     const {name,email,password}=req.body;
     let user=await User.findOne({email}).select("+password");
     if(user){
         return res.status(400)
         .json({success: false,message:"User already exists"});
     }
     user = await User.create({
         name,
         email,
         password,
     })
     res.status(201).json({success:true,user});
    }catch(error){
     res.status(500).json({
         success:false,
         message:error.message,
     });
    }
 };
 exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email })
        .select("+password")
      
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      }
      if (user.password!=password) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password",
        });
      }
      res.json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };