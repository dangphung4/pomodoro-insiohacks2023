import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Task } from './Task';
import { Button, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export function Tasks({ user }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchTasks = async () => {
       

        console.log("Current User: ", user);  // Directly log the user object

    
        if (user) {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .eq('user_id', user.id);
            
            if (error) console.error(error);
            else setTasks(data);
        } else {
            // Fetch tasks from local storage for guest users
            const guestTasks = JSON.parse(localStorage.getItem('guestTasks')) || [];
            setTasks(guestTasks);
        }
    };
    

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {

        console.log("Current User: ", user);  // Log the user to diagnose if it's being retrieved correctly

    
        if (user) {
            const { error } = await supabase
                .from('tasks')
                .insert([{ title, description, user_id: user.id }]);
            
            if (error) console.error(error);
            else {
                setTitle('');
                setDescription('');
                fetchTasks();
            }
        } else {
            // Handle task creation locally for guest users
            const newTask = { id: Date.now(), title, description, completed: false }; // example structure, adapt as needed
            const guestTasks = JSON.parse(localStorage.getItem('guestTasks')) || [];
            guestTasks.push(newTask);
            localStorage.setItem('guestTasks', JSON.stringify(guestTasks));
            setTitle('');
            setDescription('');
            fetchTasks();
        }
    };
    

    const deleteTask = async (id) => {
    
        if (user) {
            // For authenticated users, delete the task from the database
            await supabase
                .from('tasks')
                .delete()
                .eq('id', id);
        } else {
            // For guest users, delete the task from local storage
            const guestTasks = JSON.parse(localStorage.getItem('guestTasks')) || [];
            const updatedGuestTasks = guestTasks.filter(task => task.id !== id);
            localStorage.setItem('guestTasks', JSON.stringify(updatedGuestTasks));
        }
    
        fetchTasks();
    };
    
    
    // console.log(id);
    // console.log(updatedTitle);
    const updateTask = async (id, updatedTitle, updatedDescription) => {
        try {
            console.log(updatedDescription);
            const { error } = await supabase
                .from('tasks')
                .update({ title: updatedTitle, description: updatedDescription })
                .eq('id', id)
                .select()
            
            console.log(id);
            if (error) {
                console.error("Update error:", error.message);
            } else {
                fetchTasks();
            }
        } catch (error) {
            console.error("Update error:", error);
        }
    };
    const completeTask = async (id) => {    
        if (user) {
            // For authenticated users, mark the task as completed in the database
            try {
                const { error } = await supabase
                    .from('tasks')
                    .update({ completed: true })
                    .eq('id', id);
            
                if (error) {
                    console.error("Complete task error:", error.message);
                } else {
                    fetchTasks();
                }
            } catch (error) {
                console.error("Complete task error:", error);
            }
        } else {
            // For guest users, mark the task as completed in local storage
            try {
                const guestTasks = JSON.parse(localStorage.getItem('guestTasks')) || [];
                const updatedGuestTasks = guestTasks.map(task => 
                    task.id === id ? {...task, completed: true} : task
                );
                localStorage.setItem('guestTasks', JSON.stringify(updatedGuestTasks));
                fetchTasks();
            } catch (error) {
                console.error("Complete task error:", error);
            }
        }
    };
    

    return (
        <div className="tasks">
            <div className="add-task">
                <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Title" />
                <TextField value={description} onChange={(e) => setDescription(e.target.value)} label="Description" />
                <Button startIcon={<AddCircleOutlineIcon />} onClick={addTask}>
                    Add Task
                </Button>
            </div>
            <div className="task-list">
                {tasks.map((task) => (
                    <Task key={task.id} task={task} onDelete={deleteTask} onUpdate={updateTask} onComplete={completeTask} />
                ))}
            </div>
        </div>
    );
}
export default Tasks;  