import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./Header";
import AddProject from "./AddProject"
import WpList from './WpList';
import AddTask from './AddTask';
import { v4 as uuid } from 'uuid';
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  Table,
  TableBody
} from 'semantic-ui-react'


// Main App component: Manages the state and functions for handling work packages and tasks.
function App() {
  const LOCAL_STORAGE_KEY = "newWorkPackages";

  // State to store work packages
  const [workpackages, setWorkpackages] = useState([]);


  // Handler to add a new project: creates work packages based on the duration
  const addProjectHandler = (workpackage) => {
    const newWorkPackages = [];
    for (let i = 0; i < parseInt(workpackage.duration); i++) {
      newWorkPackages.push({ ...workpackage, wpname: "WP" + (i + 1), id: i + 1, tasks: [] });
    }
    // Update the state with the new work packages
    setWorkpackages([...workpackages, ...newWorkPackages]);
    console.log(newWorkPackages)
    console.log(workpackages)
  }
  // Handler to remove a work package based on its ID
  const removeWpHandler = (id) => {
    const newWorkPackages = workpackages.filter((workpackage) => {
      return workpackage.id !== id
    });
    setWorkpackages(newWorkPackages)
  }

  // Handler to add a new task to work packages within a specified range

  const addTaskHandler = (fromWpId, untilWpIdId, task) => {
    const newTask = {
      id: uuid(), // Unique ID using uuid
      description: task
    };
    setWorkpackages(workpackages.map(wp => {
      if (wp.id >= fromWpId && wp.id <= untilWpIdId) {
        return { ...wp, tasks: [...wp.tasks, newTask] };
      }
      return wp;
    }));
  };
  // Handler to edit the name of a work package
  const editWpHandler = (id, newName) => {
    setWorkpackages(workpackages.map(wp => {
      if (wp.id === id) {
        return { ...wp, wpname: newName };
      }
      return wp;
    }));
  };


  // Handler to delete a task from a work package
  const deleteTaskHandler = (wpId, taskId) => {
    setWorkpackages(workpackages.map(wp => {
      if (wp.id === wpId) {
        return {
          ...wp,
          tasks: wp.tasks.filter(task => task.id !== taskId) // Remove the task
        };
      }
      return wp;
    }));
  };
  // Handler to edit a task's description
  const editTaskHandler = (wpId, taskId, newDescription) => {
    setWorkpackages(workpackages.map(wp => {
      if (wp.id === wpId) {
        return {
          ...wp,
          tasks: wp.tasks.map(task => {
            if (task.id === taskId) {
              return { ...task, description: newDescription };
            }
            return task;
          })
        };
      }
      return wp;
    }));
  };


  // Effect for persisting work packages data to local storage
  useEffect(() => {
    // Add key
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workpackages))
  }, [workpackages]);
  // JSX for rendering the application UI
  return (
    <body>
      <div className="body-con">
        <div className="ui container">
          <Header />
        </div>
        <div className='ui container'>
          <div className='base-container'>
            <AddProject addProjectHandler={addProjectHandler} />
          </div>
          <div className='base-container'>
            <AddTask workpackages={workpackages} addTaskHandler={addTaskHandler} />
          </div>
          <div className='projects-container'>
            <Table celled basic='very'>
              <WpList workpackages={workpackages} getWpId={removeWpHandler} editWpHandler={editWpHandler} deleteTaskHandler={deleteTaskHandler} editTaskHandler={editTaskHandler} />
            </Table>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
