const express = require("express");
const router = express.Router();
const { getTasks, createTask, singleTask, deleteTask, updateTask } = require("../Controller/taskController");




// getalltasks '/tasks
router.get("/tasks", getTasks);

// create a task/ tasks req.body
router.post("/tasks", createTask);

// get a single /tasks/taskId req.params 
router.get("/tasks/:taskId", singleTask);

// updating a task /task/:taskId req.body
router.patch("/tasks/:taskId", updateTask);

//delete a task /tasks/:taskId
router.delete("/tasks/taskId", deleteTask);

router.route("/").get(getTasks).post(createTask);
router.route("/:taskId").get(singleTask).delete(deleteTask).patch(updateTask);
module.exports = router;