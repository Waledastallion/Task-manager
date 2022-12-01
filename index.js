const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Port = process.env.PORT || 7000;
const taskRouter = require("./Routes/taskRouter");
const routeNotFound = require("./middleware/404");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(taskRouter);
app.use(routeNotFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(Port, () => {
      console.log(`Port is running on ${Port}... and DB connected`);
    });
  })
  .catch((err) => console.log(err));

  app.use("/tasks", taskRouter);
