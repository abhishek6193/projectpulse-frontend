import React, { useState, useEffect, useRef } from "react";
import { Button, TextField, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskForm from "./TaskForm"; // Assuming you have TaskForm for the modal

const CreateTaskButton = ({ projectId, updateTasksList, selectedTask, setSelectedTask }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const inputRef = useRef(null);

  const handleCreateClick = () => setIsCreating(true);

  const handleTitleChange = (e) => setTaskTitle(e.target.value);

  const handleTitleSubmit = (e) => {
    if (e.key === "Enter" && taskTitle.trim()) {
      setTaskModalOpen(true);
      setIsCreating(false); // Hide inline text field
    }
  };

  const handleClose = () => {
    setTaskModalOpen(false);
    setTaskTitle(""); // Reset title input
    setSelectedTask(null);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsCreating(false);
      setTaskTitle(""); // Reset task title
    }
  };

  useEffect(() => {
    if (isCreating) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCreating]);

  useEffect(() => {
    selectedTask && setTaskModalOpen(true);
  }, [selectedTask])

  return (
    <Box>
      <Button
        variant="text"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleCreateClick}
        sx={{ display: !isCreating ? "inline-flex" : "none" }}
      >
        Create Task
      </Button>
      {isCreating && (
        <TextField
          ref={inputRef}
          autoFocus
          fullWidth
          placeholder="Enter task title"
          value={taskTitle}
          onChange={handleTitleChange}
          onKeyPress={handleTitleSubmit}
          sx={{
            marginTop: 1,
            marginBottom: 1,
          }}
        />
      )}
      <TaskForm
        taskTitle={taskTitle}
        projectId={projectId}
        updateTasksList={updateTasksList}
        onClose={handleClose}
        open={taskModalOpen}
        task={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </Box>
  );
};

export default CreateTaskButton;
