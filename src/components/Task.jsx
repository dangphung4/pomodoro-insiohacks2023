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
    

    const textColor = theme.palette.background.paper;

    return (
        <div className="task-index">
     
            <div className={`task ${isCompleted ? 'completed' : ''}`}>
                {isEditing ? (
                    <div className="edit-mode">
                        <TextField fullWidth value={title} onChange={(e) => setTitle(e.target.value)} label="Title" />
                        <TextField fullWidth value={description} onChange={(e) => setDescription(e.target.value)} label="Description" />
                        <Button onClick={handleUpdate} style={{ color: textColor }}>
                        <span style={{ color: textColor }}> Save </span>
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="task-content">
                            <h3 className="task-title" style={{ color: textColor }}>{title}</h3>
                            <p className="task-description" style={{ color: textColor }}>{description}</p>
                        </div>
                        <p style={{ color: textColor }}>Status: {isCompleted ? 'Completed' : 'Incomplete'}</p>
                        <Button startIcon={<EditIcon />} onClick={() => setIsEditing(true)}  style={{ color: textColor }}>
                        <span style={{ color: textColor }}>Edit</span>
                        </Button>
                        <Button startIcon={<DeleteIcon />} onClick={() => onDelete(task.id)} style={{ color: textColor }}>
                        <span style={{ color: textColor }}>Delete</span>
                        </Button>
                        {isCompleted ? (
                            <CheckCircleIcon color="success" />
                        ) : (
                            <Button startIcon={<CheckCircleOutlineIcon />} onClick={() => onComplete(task.id)}  style={{ color: textColor }}>
                                 <span style={{ color: textColor }}>Mark as Complete</span>
                            </Button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
export default Task;
