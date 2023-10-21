import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Task } from './Task';
import { Button, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const fetchTasks = async () => {
        const { data, error } = await supabase.from('tasks').select('*');
        if (error) console.error(error);
        else setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = async () => {
        const { error } = await supabase.from('tasks').insert([{ title, description }]);
        if (error) console.error(error);
        else {
            setTitle('');
            setDescription('');
            fetchTasks();
        }
    };

    const deleteTask = async (id) => {
        await supabase.from('tasks').delete().eq('id', id);
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
        try {
            const { data, error } = await supabase
                .from('tasks')
                .update({ completed: true })
                .eq('id', id);
            
            console.log(data); 
            console.log(error);
    
            if (error) {
                console.error("Complete task error:", error.message);
            } else {
                fetchTasks();
            }
        } catch (error) {
            console.error("Complete task error:", error);
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