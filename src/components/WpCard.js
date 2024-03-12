import React, { useState } from 'react';
import {
    Input,
    Button
} from 'semantic-ui-react';


// WpCard: Functional component to display tasks of a work package and handle task editing and deletion.

const WpCard = (props) => {
    // console.log(props)
    // Destructuring props to extract workpackage details and tasks
    const { title, id, tasks, wpname } = props.workpackage;
    // State for managing which task is currently being edited
    const [editingTaskId, setEditingTaskId] = useState(null);
    // State for storing the new task description during editing
    const [newDescription, setNewDescription] = useState("");

    // Function to handle saving the edited task
    const handleTaskSave = (taskId) => {
        props.editTaskHandler(id, taskId, newDescription);
        setEditingTaskId(null); // Exit edit mode
    };

    // Function to handle deleting a task
    const handleDeleteTask = (taskId) => {
        props.deleteTaskHandler(id, taskId); // Call the function to delete the task
    };
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>
                    {editingTaskId === task.id ? (
                        <div style={{ marginLeft: "5px" }}>
                            <Input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                            <Button onClick={() => handleTaskSave(task.id)}>Save</Button>
                            <Button onClick={() => setEditingTaskId(null)}>Cancel</Button>
                        </div>
                    ) : (
                        <div style={{ marginLeft: "5px" }}>
                            {task.description}
                            <i className="edit icon" onClick={() => { setEditingTaskId(task.id); setNewDescription(task.description); }}></i>
                            <i className="trash alternate outline icon" onClick={() => props.deleteTaskHandler(id, task.id)}></i>
                        </div>
                    )}
                </div>

            ))}
        </div>
    );
};

export default WpCard;