import React from "react";
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
const TaskTable = ({ tasks, showAction, markDone, editTask, deleteTask }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Task Name</th>
          <th>Priority</th>
          <th>Deadline</th>
          <th>Description</th>
          <th>Image</th>
          {showAction && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.task}</td>
            <td>{task.priority}</td>
            <td>{task.deadline}</td>
            <td>{task.description}</td>
            <td>
              <img src={task.image} alt="Task" style={{ width: "100px" }} />
            </td>
            {showAction && (
              <td>
                {!task.done && (
                  <button
                    className="mark-done"
                    onClick={() => markDone(task.id)}
                  >
                  <FontAwesomeIcon icon={faCheckCircle} />  Mark Done
                  </button>
                )}
                <div className="row">
                    
                <button
                  className="edit-task" id="icons"
                  onClick={() => editTask(task.id)}
                >
                <FontAwesomeIcon icon={faEdit} />  
                </button>
                <button
                  className="delete-task" id="icons"
                  onClick={() => deleteTask(task.id)}
                >
                 <FontAwesomeIcon icon={faTrash} /> 
                </button>
                </div>
                
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
