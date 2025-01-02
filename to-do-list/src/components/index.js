import React, { useState } from "react";
import "./index.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("top");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

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
      id: tasks.length + 1,
      task,
      priority,
      deadline,
      description,
      image,
    };

    setTasks([...tasks, newTask]);
    setTask("");
    setPriority("top");
    setDeadline("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="App">
      <header>
        <h1>To Do List</h1>
      </header>
      <main>
        <div className="task-form">
          <div className="row">
            <input
              type="text"
              placeholder="Enter task..."
              value={task}
              onChange={handleTaskChange}
            />
            <select value={priority} onChange={handlePriorityChange}>
              <option value="top">Top Priority</option>
              <option value="middle">Middle Priority</option>
              <option value="low">Less Priority</option>
            </select>
            <input
              type="date"
              value={deadline}
              onChange={handleDeadlineChange}
            />
          </div>
          <div className="row">
            <textarea
              placeholder="Description"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          
        </div>
      
            <button onClick={addTask}>Add Task</button>
         
        <h2>Tasks</h2>
        <div className="task-list">
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Priority</th>
                <th>Deadline</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.task}</td>
                  <td>{t.priority}</td>
                  <td>{t.deadline}</td>
                  <td>{t.description}</td>
                  <td>
                    <img src={t.image} alt="Task" style={{ width: "100px" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ToDoList;
