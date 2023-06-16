const expresss = require("express");
const app=expresss();
const mongoose = require("mongoose");
const cors=require('cors');
const morgan = require("morgan")
const helmet = require("helmet");
const User = require('./router/user')
const Task = require('./router/tasks')
app.use(cors());
const database = (module.exports = () => {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    try {
      mongoose.connect(
        'mongodb+srv://nikhilanand2432:YY0yr2Eejibc0lTM@cluster0.vzi8xmz.mongodb.net/?retryWrites=true&w=majority',
        connectionParams
      );
      console.log("Database connected succesfully");
    } catch (error) {
      console.log(error);
      console.log("Database connection failed");
    }
  });
  database();
app.use(expresss.json());
app.use(helmet());
app.use(morgan("common"));
app.use('/api', User);
app.use('/api', Task);
  app.listen(8100,()=>{
    console.log("ready");
})