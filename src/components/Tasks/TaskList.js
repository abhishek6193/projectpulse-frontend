import React from "react";
import { List } from "@mui/material";

import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onTaskClick }) => {
  return (
    <List>
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} />
      ))}
    </List>
  );
};

export default TaskList;
