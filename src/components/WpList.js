import React, { useState } from "react";
import WpCard from "./WpCard"
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    Table,
    TableBody, Input, Button
} from 'semantic-ui-react'

// WpList: Functional component that renders a list of work packages and their associated tasks.

const WpList = (props) => {
    // Destructuring props to extract necessary handlers and work package data
    const { workpackages, getWpId, editWpHandler, deleteTaskHandler, editTaskHandler } = props;

    // State for managing inline editing of work package names
    const [editingWpId, setEditingWpId] = useState(null);
    const [newName, setNewName] = useState("");

    // Function to handle saving the edited work package name
    const handleSave = (id) => {
        editWpHandler(id, newName); // Update the WP name
        setEditingWpId(null); // Exit edit mode
    };
    // Function to handle deleting a work package
    const deleteWorkpackages = (id) => {
        props.getWpId(id)
    };
    const renderWorkpackages = props.workpackages.map((workpackage) => {
        return <WpCard workpackage={workpackage} clickHandler={deleteWorkpackages}  ></WpCard>
    });
    // return <div className="ui horizontal list">{renderWorkpackages}</div>
    return (

        <div style={{ display: 'flex', overflowX: 'auto' }}>
            {workpackages.map((wp) => (
                <div key={wp.id} style={{ margin: '5px', flexShrink: 0 }}>
                    <div className="sticky-header" style={{ marginBottom: '20px' }}>
                        {editingWpId === wp.id ? (
                            <div style={{ marginLeft: "5px" }}>
                                <Input value={newName} onChange={(e) => setNewName(e.target.value)} />
                                <Button onClick={() => handleSave(wp.id)}>Save</Button>
                                <Button onClick={() => setEditingWpId(null)}>Cancel</Button>
                            </div>
                        ) : (
                            <h3 style={{ marginLeft: "5px" }}>
                                {wp.wpname}
                                <i className="edit icon" onClick={() => { setEditingWpId(wp.id); setNewName(wp.wpname); }} style={{ marginLeft: "10px" }}></i>
                                <i className="trash alternate outline icon" onClick={() => getWpId(wp.id)}></i>
                            </h3>
                        )}
                    </div>
                    <WpCard workpackage={wp} deleteTaskHandler={deleteTaskHandler} editTaskHandler={editTaskHandler} />
                </div>
            ))}
        </div>
    );
};

export default WpList;
