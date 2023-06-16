const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,"Please enter a name"],
    },
    email:{
        type: String,
        required: [true,"please enter an email"],
        unique: [true, "email already exists"],
    },
    password:{
        type: String,
        required: [true, "please enter a password"],
        minlength:[6, "password must be at least 6 characters"],
        select : false,
    },
    task:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
        }
    ],
});
module.exports = mongoose.model("User", userSchema);