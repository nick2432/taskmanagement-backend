const Task = require("../model/task");
const User = require("../model/user.js");
exports.addtask = async (req, res) => {
    try{
      const newTaskData = {
        title:req.body.title,
        Discription:req.body.Discription,
        Status:req.body.Status,
        owner: req.params.id,
      };
      const task = await Task.create(newTaskData);
      task.createdAt.toISOString().split("T").shift()
      const user = await User.findById(req.params.id);
      user.task.push(task._id);
      await user.save();
      res.status(201).json({
        success: true,
        message: "Task created",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.update = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: "task not found",
        });
      }
      if(req.body.title){
        task.title = req.body.title;
      }
      if(req.body.Discription){
        task.Discription = req.body.Discription;
      }
      if(req.body.Status){
        task.Status = req.body.Status;
      }
      await task.save();
      res.status(200).json({
        success: true,
        message: "Task updated",
        task
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.gettask = async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate('task');
      const tasks = user.task;
      res.status(200).json({
        success: true,
        tasks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  exports.delettask = async (req, res) => {
    try{
       const task = await Task.findById(req.params.id);
       const user = await User.findById(task.owner);
       await task.deleteOne({ _id: req.params.id });     
       const index = user.task.indexOf(req.params.id);
       user.task.splice(index, 1);
       await user.save();
         return res.status(200).json({
           success: true,
           message: "Task deleted",
         });
     }
     catch (error) {
       res.status(500).json({
         success: false,
         message: error.message,
       });
     }
    }

  