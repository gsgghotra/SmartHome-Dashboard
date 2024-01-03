import React, { useState, useEffect } from 'react';

const Todo = () => {
    const [tasks, setTasks] = useState(null);
    const [newTask, setNewTask] = useState('');

// Load tasks from local storage on component mount
    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log(storedTasks);
        setTasks(storedTasks);
    }, []);

    // Save tasks to local storage whenever tasks change
    useEffect(() => {
        //avoid initial run to update local storage
        if (tasks !== null){
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }, [tasks]);

    const addTask = () => {
    if (newTask.trim() !== '') {
        setTasks([...tasks, newTask]);
        setNewTask('');
    }
    };

    const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    };

    return (
    <div style= {{overflow:'scroll'}} className="innerTab container mt-4">
        <div className="input-group mb-3" style={{width:'96%', margin:'0px auto'}}>
            <input
            type="text"
            className="form-control"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            />
            <div className="input-group-append">
            <button className="btn" style={{background:'#a4a4a4', borderRadius: '0px 5px 5px 0px', color:'black'}} onClick={addTask}>
                Add
            </button>
            </div>
        </div>
        <div className="list-group" style={{width: '96%', margin:'0px auto'}}>
            {tasks && tasks.map((task, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {task}
                <button className="btn btn-danger" onClick={() => removeTask(index)}>
                Remove
                </button>
            </div>
            ))}
        </div>
    </div>
    );
};

export default Todo;
