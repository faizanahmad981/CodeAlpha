import React, { useState, useEffect } from "react";
import "./index.css";
import CustomInput from "../components/input";
import TaskTable from "../components/table";

const ToDoList = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem("completedTasks")) || []
  );
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [tasks, completedTasks]);

  const handleTaskChange = (e) => setTask(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleDeadlineChange = (e) => setDeadline(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  const addTask = () => {
    if (!task.trim() || !deadline || !description || !image) {
      alert("Please fill out all fields and upload an image.");
      return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    const newTask = {
      id: editingTaskId || tasks.length + 1,
      task,
      priority,
      deadline,
      description,
      image,
    };

    if (editingTaskId) {
      setTasks(tasks.map((t) => (t.id === editingTaskId ? newTask : t)));
      setEditingTaskId(null);
    } else {
      setTasks([...tasks, newTask]);
    }

    clearFields();
  };

  const clearFields = () => {
    setTask("");
    setPriority("top");
    setDeadline("");
    setDescription("");
    setImage(null);
  };

  const markDone = (id) => {
    const taskToComplete = tasks.find((t) => t.id === id);
    if (taskToComplete) {
      setCompletedTasks([...completedTasks, taskToComplete]);
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const deleteTask = (id, completed = false) => {
    if (completed) {
      setCompletedTasks(completedTasks.filter((t) => t.id !== id));
    } else {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const editTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);
    if (taskToEdit) {
      setTask(taskToEdit.task);
      setPriority(taskToEdit.priority);
      setDeadline(taskToEdit.deadline);
      setDescription(taskToEdit.description);
      setImage(taskToEdit.image);
      setEditingTaskId(taskToEdit.id);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>To-Do List</h1>
      </header>
      <main>
        <div className="task-form">
          <CustomInput
            type="text"
            id="task"
            placeholder="Enter task ..."
            value={task}
            onChange={handleTaskChange}
          />
          <select id="priority" value={priority} onChange={handlePriorityChange}>
            <option value="top">Top Priority</option>
            <option value="middle">Middle Priority</option>
            <option value="low">Less Priority</option>
          </select>
          <CustomInput
            type="date"
            id="deadline"
            value={deadline}
            onChange={handleDeadlineChange}
          />
        </div>
        <div className="row">
          <textarea
            className="TextArea"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
          ></textarea>
          <CustomInput
            type="file"
            className="imageUpload"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <button id="add-task" className="add-task" onClick={addTask}>
          {editingTaskId ? "Update Task" : "Add Task"}
        </button>

        {/* Task Lists */}
        <section>
          <h2 className="heading">Upcoming Tasks</h2>
          <div id="task-list">
            <TaskTable
              tasks={tasks}
              showAction={true}
              markDone={markDone}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          </div>
        </section>

        <section>
          <h2 className="cheading">Completed Tasks</h2>
          <div className="completed-task-list">
            <TaskTable
              tasks={completedTasks}
              showAction={false}
              deleteTask={(id) => deleteTask(id, true)}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default ToDoList;
