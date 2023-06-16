const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title:{
    type:String,
    required: true,
  },
  Discription:{
    type:String,
    required: true,
  },
  Status:{
    type:String,
    required: true,
  }
});
module.exports = mongoose.model("Task", taskSchema);