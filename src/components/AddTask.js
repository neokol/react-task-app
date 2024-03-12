import React, { useState } from "react";

// AddTask: Functional component for adding tasks to work packages.
const AddTask = ({ workpackages, addTaskHandler }) => {
    // State for storing task name, selected starting and ending work packages

    const [task, setTask] = useState("");
    const [selectedFromWp, setSelectedFromWp] = useState("");
    const [selectedUntilWp, setSelectedUntilWp] = useState("");

    // Handler for form submission
    const submitTask = (e) => {
        e.preventDefault();
        // Validate if all fields are filled
        if (task && selectedFromWp && selectedUntilWp) {
            addTaskHandler(selectedFromWp, selectedUntilWp, task);
            // Reset the form fields after submission
            setTask("");
            setSelectedFromWp("");
            setSelectedUntilWp("");
        } else {
            alert("Please fill in all fields");
        }
    };
    // Render the form for adding a task
    return (
        <div>
            <form className="ui form centered grid" onSubmit={submitTask}>
                <div className="fields">
                    <input
                        type="text"
                        placeholder="Task Name"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                </div>
                <div className="fields">
                    <div className="field">
                        <select value={selectedFromWp} onChange={(e) => setSelectedFromWp(e.target.value)}>
                            <option value="">From WP</option>
                            {workpackages.map((wp) => (
                                <option key={wp.id} value={wp.id}>
                                    {wp.wpname}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <select value={selectedUntilWp} onChange={(e) => setSelectedUntilWp(e.target.value)}>
                            <option value="">Until WP</option>
                            {workpackages.map((wp) => (
                                <option key={wp.id} value={wp.id}>
                                    {wp.wpname}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="field">
                    <button className="ui button" type="submit">Add Task</button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
