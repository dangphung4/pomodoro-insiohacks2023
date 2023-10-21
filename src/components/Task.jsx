import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export function Task({ task, onDelete, onUpdate, onComplete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleUpdate = () => {
        onUpdate(task.id, title, description);
        setIsEditing(false);
    };

    const isCompleted = task.completed || false; // Ensure it's false if it's null


    return (
        <div className={`task ${isCompleted ? 'completed' : ''}`}>
            {isEditing ? (
                <>
                    <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Title" />
                    <TextField value={description} onChange={(e) => setDescription(e.target.value)} label="Description" />
                    <Button onClick={handleUpdate}>Save</Button>
                </>
            ) : (
                <>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <p>Status: {isCompleted ? 'Completed' : 'Incomplete'}</p> {/* Display completion status */}
                    <Button startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
                        Edit
                    </Button>
                    <Button startIcon={<DeleteIcon />} onClick={() => onDelete(task.id)}>
                        Delete
                    </Button>
                    {isCompleted ? (
                        <CheckCircleIcon color="success" />
                    ) : (
                        <Button startIcon={<CheckCircleOutlineIcon />} onClick={() => onComplete(task.id)}>
                            Mark as Complete
                        </Button>
                    )}
                </>
            )}
        </div>
    );
}
export default Task;