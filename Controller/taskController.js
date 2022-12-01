// getalltasks '/tasks
const Tasks = require("../models/task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.status(200).json({ noOfTasks: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//create a task /tasks req.body
const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(401).json({ msg: "please provide necessary values" });
  }
  try {
    const task = await Tasks.create(req.body);
    //const task = await Tasks.create({title, description})
    res.status(201).json({ data: task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
//get a single /tasks/:taskId req.params
const singleTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Tasks.findById({ _id: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `The Task with the id ${taskId} cannot be found` });
    }
    res.status(200).json({ data: task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//updating a task /tasks/:taskId req.body
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, completed } = req.body;
  const userBody = req.body;
  try {
    //    if(!title || !description || !completed)
    const updatedTask = await Tasks.findByIdAndUpdate(
      { _id: taskId },
      userBody,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res
        .status(404)
        .json({ msg: `Task with the id: ${taskId} not found` });
    }
    res.status(200).json({ msg: "Task Updated", data: updatedTask });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

//delete a task /tasks/:taskId
const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  const task = await Tasks.findByIdAndDelete({ _id: taskId });
  try {
    if (!task) {
      return res
        .status(404)
        .json({ msg: `The Task with id ${taskId} cannot be found` });
    }
    res
      .status(200)
      .json({ msg: "The task has been deleted", deletedTask: task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { getTasks, createTask, singleTask, deleteTask, updateTask };
