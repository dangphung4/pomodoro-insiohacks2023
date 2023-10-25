import { useState } from 'react';
import { Button, TextField, Typography, useTheme } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function Task({ task, onDelete, onUpdate, onComplete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const theme = useTheme();

    const handleUpdate = () => {
        onUpdate(task.id, title, description);
        setIsEditing(false);
    };

    const isCompleted = task.completed || false; // Ensure it's false if it's null
    const isDarkMode = theme.palette.mode === 'dark';

    return (
        <div className="task-index">
     
            <div className={`task ${isCompleted ? 'completed' : ''}`}>
                {isEditing ? (
                    <div className="edit-mode">
                        <TextField fullWidth value={title} onChange={(e) => setTitle(e.target.value)} label="Title" />
                        <TextField fullWidth value={description} onChange={(e) => setDescription(e.target.value)} label="Description" />
                        <Button onClick={handleUpdate} style={{ color: isDarkMode ? 'white' : 'black' }}>
                        <span style={{ color: isDarkMode ? 'white' : 'black' }}> Save </span>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="task-content">
                            <h3 className="task-title" style={{ color: isDarkMode ? 'white' : 'black' }}>{title}</h3>
                            <p className="task-description" style={{ color: isDarkMode ? 'white' : 'black' }}>{description}</p>
                        </div>
                        <p style={{ color: isDarkMode ? 'white' : 'black' }}>Status: {isCompleted ? 'Completed' : 'Incomplete'}</p>
                        <Button startIcon={<EditIcon />} onClick={() => setIsEditing(true)}  style={{ color: isDarkMode ? 'white' : 'black' }}>
                        <span style={{ color: isDarkMode ? 'white' : 'black' }}>Edit</span>
                        </Button>
                        <Button startIcon={<DeleteIcon />} onClick={() => onDelete(task.id)} style={{ color: isDarkMode ? 'white' : 'black' }}>
                        <span style={{ color: isDarkMode ? 'white' : 'black' }}>Delete</span>
                        </Button>
                        {isCompleted ? (
                            <CheckCircleIcon color="success" />
                        ) : (
                            <Button startIcon={<CheckCircleOutlineIcon />} onClick={() => onComplete(task.id)}  style={{ color: isDarkMode ? 'white' : 'black' }}>
                                 <span style={{ color: isDarkMode ? 'white' : 'black' }}>Mark as Complete</span>
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default Task;
